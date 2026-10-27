-- ============================================================================
-- Rangeelo — Registration schema reset
--
-- ✅ ALREADY APPLIED to project wlzrveiyathefwdcvwyy on 2026-07-31 as three
--    migrations: archive_legacy_registration_tables,
--    rebuild_registration_schema_four_types, pin_trigger_function_search_path.
--
-- 🛑 DO NOT RUN THIS AGAIN. It drops the registration tables. Re-running it
--    after real registrations have come in will delete them. This file is kept
--    as the reference record of the schema. For future changes, write a new
--    migration instead.
--
-- Original instructions (for reference only):
-- Run this in: Supabase Dashboard -> SQL Editor -> New query -> Run
--
-- ⚠️  DESTRUCTIVE. This DROPS the existing registration tables and all their
--     rows. A verified backup of all 6 tables (5,684 rows) was taken to
--     backups/2026-07-31T05-33-39/ before this script was written.
--     Do not run this until you are satisfied with that backup.
--
-- Creates 4 registration types:
--   1. animal_registrations     — Pashu Mela animal entry   (OTP + pass/QR)
--   2. visitor_registrations    — event visitors            (OTP + pass/QR)
--   3. exhibitor_registrations  — exhibitors                (OTP, no pass)
--   4. sponsor_registrations    — sponsors                  (OTP, no pass)
--
-- Security model (a change from the old schema):
--   * anon can NOT read any registration table. The old policies let anyone
--     with the public anon key dump every row; that is closed here.
--   * All public writes go through SECURITY DEFINER RPCs that enforce OTP.
--   * Admin reads/writes require a real Supabase Auth user listed in
--     admin_users. See section 9 for how to create that user.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 0. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists pgcrypto with schema extensions;

-- pg_net powers the outbound WhatsApp OTP call (section 8a). It always installs
-- into its own "net" schema. If this fails, enable "pg_net" under
-- Database -> Extensions in the dashboard, then re-run this script.
create extension if not exists pg_net;

create schema if not exists private;
revoke all on schema private from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 1a. Archive every old table inside the database before dropping anything.
--
--     The file backup in backups/ was taken with the anon key and is INCOMPLETE:
--     RLS hid otp_verifications (3,481 rows) and visitor_otp_verifications
--     (3,995 rows), and the two *_rate_limits tables (3,569 + 4,020 rows) were
--     never discovered. This step is the authoritative backup — it copies all
--     rows into an "archive" schema that nothing else touches.
--
--     Verify the counts (section 1b) BEFORE letting the drops run.
--     To restore later:  insert into public.X select * from archive.X_20260731;
-- ---------------------------------------------------------------------------
create schema if not exists archive;
revoke all on schema archive from anon, authenticated;

do $$
declare t text;
begin
    foreach t in array array[
        'registrations', 'visitor_registrations',
        'otp_verifications', 'visitor_otp_verifications',
        'otp_rate_limits', 'visitor_otp_rate_limits',
        'app_settings', 'admin_activity_log'
    ] loop
        if to_regclass('public.' || t) is not null then
            execute format(
                'create table if not exists archive.%I as table public.%I',
                t || '_20260731', t);
        end if;
    end loop;
end;
$$;

-- 1b. Archive verification. Every row count below must match the live table.
--     Expected: registrations 2422 · visitor_registrations 3262
--               otp_verifications 3481 · visitor_otp_verifications 3995
--               otp_rate_limits 3569 · visitor_otp_rate_limits 4020
--               app_settings 3 · admin_activity_log 9
do $$
declare
    t text;
    live_count bigint;
    arch_count bigint;
begin
    foreach t in array array[
        'registrations', 'visitor_registrations',
        'otp_verifications', 'visitor_otp_verifications',
        'otp_rate_limits', 'visitor_otp_rate_limits',
        'app_settings', 'admin_activity_log'
    ] loop
        if to_regclass('public.' || t) is null then continue; end if;

        execute format('select count(*) from public.%I', t) into live_count;
        execute format('select count(*) from archive.%I', t || '_20260731') into arch_count;

        if live_count <> arch_count then
            raise exception
                'Archive mismatch for %: live=% archive=%. Aborting before any drop.',
                t, live_count, arch_count;
        end if;
        raise notice 'archived % : % rows', t, arch_count;
    end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 1c. Drop old objects
--     Also drops the new ones, so this script can be re-run safely while you
--     are still setting things up. The archive schema is never touched.
-- ---------------------------------------------------------------------------
drop table if exists public.registrations              cascade;
drop table if exists public.visitor_registrations      cascade;
drop table if exists public.otp_verifications          cascade;
drop table if exists public.visitor_otp_verifications  cascade;
drop table if exists public.otp_rate_limits            cascade;
drop table if exists public.visitor_otp_rate_limits    cascade;
drop table if exists public.admin_activity_log         cascade;
drop table if exists public.app_settings               cascade;
drop table if exists public.animal_registrations       cascade;
drop table if exists public.exhibitor_registrations    cascade;
drop table if exists public.sponsor_registrations      cascade;
drop table if exists public.animal_breeds              cascade;
drop table if exists public.animal_categories          cascade;
drop table if exists public.visitor_professions        cascade;
drop table if exists public.admin_users                cascade;
drop table if exists private.app_secrets               cascade;

drop sequence if exists public.animal_code_seq  cascade;
drop sequence if exists public.visitor_code_seq cascade;
drop type     if exists public.registration_type cascade;

-- ---------------------------------------------------------------------------
-- 2. Reference data (allowed values)
-- ---------------------------------------------------------------------------
create type public.registration_type as enum ('animal', 'visitor', 'exhibitor', 'sponsor');

create table public.animal_categories (
    code       text primary key,
    label_en   text not null,
    label_hi   text not null,
    sort_order int  not null
);

insert into public.animal_categories (code, label_en, label_hi, sort_order) values
    ('indigenous_cattle', 'Indigenous Cattle', 'देशी गाय',   1),
    ('exotic_cattle',     'Exotic Cattle',     'विदेशी गाय', 2),
    ('buffalo',           'Buffalo',           'भैंस',       3);

create table public.animal_breeds (
    code          text primary key,
    category_code text not null references public.animal_categories(code) on delete cascade,
    label_en      text not null,
    label_hi      text not null,
    sort_order    int  not null
);

insert into public.animal_breeds (code, category_code, label_en, label_hi, sort_order) values
    ('gir',              'indigenous_cattle', 'Gir',              'गिर',          1),
    ('sahiwal',          'indigenous_cattle', 'Sahiwal',          'साहीवाल',      2),
    ('tharparkar',       'indigenous_cattle', 'Tharparkar',       'थारपारकर',     3),
    ('gangatiri',        'indigenous_cattle', 'Gangatiri',        'गंगातीरी',     4),
    ('elite_hf',         'exotic_cattle',     'Elite HF',         'एलीट एचएफ',    1),
    ('crossbred_hf',     'exotic_cattle',     'Crossbred HF',     'क्रॉसब्रेड एचएफ', 2),
    ('crossbred_jersey', 'exotic_cattle',     'Crossbred Jersey', 'क्रॉसब्रेड जर्सी', 3),
    ('buffalo',          'buffalo',           'Buffalo',          'भैंस',          1);

create table public.visitor_professions (
    code       text primary key,
    label_en   text not null,
    label_hi   text not null,
    sort_order int  not null
);

insert into public.visitor_professions (code, label_en, label_hi, sort_order) values
    ('farmer',            'Farmer',            'किसान',            1),
    ('student',           'Student',           'विद्यार्थी',        2),
    ('academia_research', 'Academia/Research', 'शिक्षा/अनुसंधान',  3),
    ('ngo',               'NGO',               'एनजीओ',            4),
    ('media',             'Media',             'मीडिया',           5),
    ('general_visitor',   'General visitor',   'सामान्य आगंतुक',    6);

-- Reference tables are safe to read publicly — they populate the form dropdowns.
alter table public.animal_categories   enable row level security;
alter table public.animal_breeds       enable row level security;
alter table public.visitor_professions enable row level security;

create policy "reference data is public" on public.animal_categories   for select using (true);
create policy "reference data is public" on public.animal_breeds       for select using (true);
create policy "reference data is public" on public.visitor_professions for select using (true);

-- ---------------------------------------------------------------------------
-- 3. Registration tables
-- ---------------------------------------------------------------------------

-- 3a. Animal (Pashu Mela) — has a pass + QR
create table public.animal_registrations (
    id                            uuid primary key default gen_random_uuid(),
    registration_code             text unique not null,
    mobile                        text not null unique check (mobile ~ '^[6-9][0-9]{9}$'),
    full_name                     text not null,
    address                       text,
    state                         text,
    category_code                 text references public.animal_categories(code),
    breed_code                    text references public.animal_breeds(code),
    tag_number                    text,
    milk_yield                    numeric(6,2),
    proposed_milk_recording_date  date,
    mpo_name                      text,
    checked_in_at                 timestamptz,
    registered_at                 timestamptz not null default now(),
    created_at                    timestamptz not null default now(),
    updated_at                    timestamptz not null default now()
);

-- 3b. Visitor — has a pass + QR
create table public.visitor_registrations (
    id                 uuid primary key default gen_random_uuid(),
    registration_code  text unique not null,
    mobile             text not null unique check (mobile ~ '^[6-9][0-9]{9}$'),
    full_name          text not null,
    address            text,
    state              text,
    profession_code    text references public.visitor_professions(code),
    organisation_name  text,
    email              text,
    checked_in_at      timestamptz,
    registered_at      timestamptz not null default now(),
    created_at         timestamptz not null default now(),
    updated_at         timestamptz not null default now()
);

-- 3c. Exhibitor — no pass, no QR
create table public.exhibitor_registrations (
    id             uuid primary key default gen_random_uuid(),
    mobile         text not null unique check (mobile ~ '^[6-9][0-9]{9}$'),
    full_name      text not null,
    address        text,
    state          text,
    organisation   text,
    designation    text,
    registered_at  timestamptz not null default now(),
    created_at     timestamptz not null default now(),
    updated_at     timestamptz not null default now()
);

-- 3d. Sponsor — no pass, no QR
create table public.sponsor_registrations (
    id             uuid primary key default gen_random_uuid(),
    mobile         text not null unique check (mobile ~ '^[6-9][0-9]{9}$'),
    full_name      text not null,
    address        text,
    state          text,
    organisation   text,
    designation    text,
    registered_at  timestamptz not null default now(),
    created_at     timestamptz not null default now(),
    updated_at     timestamptz not null default now()
);

create index on public.animal_registrations    (registered_at desc);
create index on public.animal_registrations    (state);
create index on public.animal_registrations    (category_code);
create index on public.visitor_registrations   (registered_at desc);
create index on public.visitor_registrations   (state);
create index on public.visitor_registrations   (profession_code);
create index on public.exhibitor_registrations (registered_at desc);
create index on public.sponsor_registrations   (registered_at desc);

-- keep updated_at honest
create or replace function private.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create trigger touch before update on public.animal_registrations
    for each row execute function private.touch_updated_at();
create trigger touch before update on public.visitor_registrations
    for each row execute function private.touch_updated_at();
create trigger touch before update on public.exhibitor_registrations
    for each row execute function private.touch_updated_at();
create trigger touch before update on public.sponsor_registrations
    for each row execute function private.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Registration codes
--    RNG-PM-00001 (animal) / RNG-VS-00001 (visitor)
-- ---------------------------------------------------------------------------
create sequence public.animal_code_seq  start 1;
create sequence public.visitor_code_seq start 1;

create or replace function private.next_registration_code(p_type public.registration_type)
returns text language plpgsql security definer set search_path = public, private as $$
begin
    return case p_type
        when 'animal'  then 'RNG-PM-' || lpad(nextval('public.animal_code_seq')::text,  5, '0')
        when 'visitor' then 'RNG-VS-' || lpad(nextval('public.visitor_code_seq')::text, 5, '0')
        else null
    end;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. OTP verification
-- ---------------------------------------------------------------------------
create table public.otp_verifications (
    id                 uuid primary key default gen_random_uuid(),
    mobile             text not null,
    reg_type           public.registration_type not null,
    otp_hash           text not null,
    attempts           int  not null default 0,
    resend_count       int  not null default 0,
    sent_at            timestamptz not null default now(),
    last_resend_at     timestamptz,
    expires_at         timestamptz not null,
    verified_at        timestamptz,
    session_token      uuid,
    token_expires_at   timestamptz,
    created_at         timestamptz not null default now(),
    unique (mobile, reg_type)
);

create index on public.otp_verifications (session_token);

-- Tunables
--   OTP lifetime 10 min · max 5 wrong guesses · max 2 resends · 60s between sends
--   verified session token lifetime 30 min
create or replace function private.otp_hash(p_mobile text, p_otp text)
returns text language sql immutable set search_path = extensions as $$
    select encode(extensions.digest(p_mobile || ':' || p_otp || ':rangeelo', 'sha256'), 'hex');
$$;

-- ---------------------------------------------------------------------------
-- 6. Settings, secrets, admin
-- ---------------------------------------------------------------------------
create table public.app_settings (
    key        text primary key,
    value      text not null,
    updated_at timestamptz not null default now()
);

insert into public.app_settings (key, value) values
    ('animal_registration_enabled',    'true'),
    ('visitor_registration_enabled',   'true'),
    ('exhibitor_registration_enabled', 'true'),
    ('sponsor_registration_enabled',   'true'),
    ('pass_verify_base_url',           'https://rangeelo.in/verify');

-- Anyone may read the on/off switches (the register page needs them).
alter table public.app_settings enable row level security;
create policy "settings are public" on public.app_settings for select using (true);

-- Secrets live in the private schema — never exposed through PostgREST.
create table private.app_secrets (
    key   text primary key,
    value text not null
);

-- ⚠️  The API key must be set after install (see POST-INSTALL step 1).
--     It is deliberately NOT written here so this file stays safe to commit.
--     Copy the exact value out of the current send-otp Edge Function.
insert into private.app_secrets (key, value) values
    ('whatsapp_api_key',     'REPLACE_ME'),
    ('whatsapp_from_number', '917092922421'),
    ('whatsapp_template',    'animal_registration');

create table public.admin_users (
    user_id    uuid primary key references auth.users(id) on delete cascade,
    email      text not null,
    created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
    select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create policy "admins read admin list" on public.admin_users
    for select to authenticated using (public.is_admin());

create table public.admin_activity_log (
    id           uuid primary key default gen_random_uuid(),
    actor_email  text,
    action       text not null,
    target_table text,
    target_id    uuid,
    target_code  text,
    details      jsonb,
    performed_at timestamptz not null default now()
);

create index on public.admin_activity_log (performed_at desc);

-- ---------------------------------------------------------------------------
-- 7. Row Level Security
--    anon gets nothing. Admins (authenticated + in admin_users) get everything.
--    Public writes happen only through the SECURITY DEFINER RPCs in section 8.
-- ---------------------------------------------------------------------------
alter table public.animal_registrations    enable row level security;
alter table public.visitor_registrations   enable row level security;
alter table public.exhibitor_registrations enable row level security;
alter table public.sponsor_registrations   enable row level security;
alter table public.otp_verifications       enable row level security;
alter table public.admin_activity_log      enable row level security;

do $$
declare t text;
begin
    foreach t in array array[
        'animal_registrations', 'visitor_registrations',
        'exhibitor_registrations', 'sponsor_registrations',
        'admin_activity_log'
    ] loop
        execute format(
            'create policy "admins full access" on public.%I for all to authenticated
             using (public.is_admin()) with check (public.is_admin())', t);
    end loop;
end;
$$;

-- otp_verifications has NO policies at all: unreachable except via RPCs.

-- Only admins may flip the registration switches.
create policy "admins write settings" on public.app_settings
    for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 8. Public RPCs (the only way an anonymous visitor touches the data)
-- ---------------------------------------------------------------------------

-- 8a. WhatsApp delivery via pg_net.
--     This body is a direct port of the request the existing send-otp Edge
--     Function makes, so the DoubleTick template and sender stay unchanged:
--       template "animal_registration", sender 917092922421,
--       recipient "91XXXXXXXXXX" (no leading +), single body placeholder = OTP.
create or replace function private.send_whatsapp_otp(p_mobile text, p_otp text)
returns void language plpgsql security definer set search_path = private, net, extensions, public as $$
declare
    v_key      text;
    v_from     text;
    v_template text;
begin
    select value into v_key      from private.app_secrets where key = 'whatsapp_api_key';
    select value into v_from     from private.app_secrets where key = 'whatsapp_from_number';
    select value into v_template from private.app_secrets where key = 'whatsapp_template';

    if v_key is null or v_key = 'REPLACE_ME' then
        raise warning 'WhatsApp API key not configured — OTP not sent';
        return;
    end if;

    perform net.http_post(
        url     := 'https://public.doubletick.io/whatsapp/message/template',
        headers := jsonb_build_object(
            'content-type',  'application/json',
            'accept',        'application/json',
            'Authorization', v_key
        ),
        body := jsonb_build_object(
            'messages', jsonb_build_array(jsonb_build_object(
                'from',    v_from,
                'to',      '91' || p_mobile,   -- DoubleTick expects no leading '+'
                'content', jsonb_build_object(
                    'language',     'en',
                    'templateName', v_template,
                    'templateData', jsonb_build_object(
                        'body', jsonb_build_object(
                            'placeholders', jsonb_build_array(p_otp)
                        ),
                        'buttons', jsonb_build_array(
                            jsonb_build_object('type', 'URL')
                        )
                    )
                )
            ))
        )
    );
end;
$$;

-- 8b. Is this mobile already registered for this type?
create or replace function private.existing_registration(p_mobile text, p_type public.registration_type)
returns text language plpgsql security definer set search_path = public as $$
declare v_code text;
begin
    case p_type
        when 'animal' then
            select registration_code into v_code from public.animal_registrations where mobile = p_mobile;
        when 'visitor' then
            select registration_code into v_code from public.visitor_registrations where mobile = p_mobile;
        when 'exhibitor' then
            select 'REGISTERED' into v_code from public.exhibitor_registrations where mobile = p_mobile;
        when 'sponsor' then
            select 'REGISTERED' into v_code from public.sponsor_registrations where mobile = p_mobile;
        else
            v_code := null;
    end case;
    return v_code;
end;
$$;

-- 8c. request_otp — send (or resend) a one-time password
create or replace function public.request_otp(
    p_mobile   text,
    p_reg_type public.registration_type,
    p_resend   boolean default false
)
returns jsonb language plpgsql security definer set search_path = public, private as $$
declare
    v_enabled  text;
    v_existing text;
    v_row      public.otp_verifications%rowtype;
    v_otp      text;
begin
    if p_mobile !~ '^[6-9][0-9]{9}$' then
        return jsonb_build_object('error', 'invalid_mobile');
    end if;

    select value into v_enabled from public.app_settings
     where key = p_reg_type::text || '_registration_enabled';
    if coalesce(v_enabled, 'true') <> 'true' then
        return jsonb_build_object('error', 'registration_paused');
    end if;

    v_existing := private.existing_registration(p_mobile, p_reg_type);
    if v_existing is not null then
        return jsonb_build_object('error', 'already_registered', 'registration_code', v_existing);
    end if;

    select * into v_row from public.otp_verifications
     where mobile = p_mobile and reg_type = p_reg_type;

    if found then
        -- 60s cooldown between sends
        if now() - coalesce(v_row.last_resend_at, v_row.sent_at) < interval '60 seconds' then
            return jsonb_build_object(
                'error', 'resend_too_soon',
                'retry_after_seconds',
                    60 - extract(epoch from now() - coalesce(v_row.last_resend_at, v_row.sent_at))::int
            );
        end if;
        if p_resend and v_row.resend_count >= 2 then
            return jsonb_build_object('error', 'resend_limit_exceeded');
        end if;
    end if;

    v_otp := lpad((floor(random() * 1000000))::int::text, 6, '0');

    insert into public.otp_verifications
        (mobile, reg_type, otp_hash, expires_at, sent_at, resend_count)
    values
        (p_mobile, p_reg_type, private.otp_hash(p_mobile, v_otp), now() + interval '10 minutes', now(), 0)
    on conflict (mobile, reg_type) do update set
        otp_hash         = excluded.otp_hash,
        expires_at       = excluded.expires_at,
        attempts         = 0,
        verified_at      = null,
        session_token    = null,
        token_expires_at = null,
        -- ON CONFLICT refers to the existing row by table name, not schema-qualified.
        last_resend_at   = case when p_resend then now() else otp_verifications.last_resend_at end,
        sent_at          = case when p_resend then otp_verifications.sent_at else now() end,
        resend_count     = case when p_resend then otp_verifications.resend_count + 1 else 0 end;

    perform private.send_whatsapp_otp(p_mobile, v_otp);

    return jsonb_build_object('success', true);
end;
$$;

-- 8d. verify_otp — exchange a correct OTP for a short-lived session token
create or replace function public.verify_otp(
    p_mobile   text,
    p_reg_type public.registration_type,
    p_otp      text
)
returns jsonb language plpgsql security definer set search_path = public, private as $$
declare
    v_row   public.otp_verifications%rowtype;
    v_token uuid;
begin
    select * into v_row from public.otp_verifications
     where mobile = p_mobile and reg_type = p_reg_type;

    if not found then
        return jsonb_build_object('error', 'invalid_otp');
    end if;
    if v_row.expires_at < now() then
        return jsonb_build_object('error', 'otp_expired');
    end if;
    if v_row.attempts >= 5 then
        return jsonb_build_object('error', 'too_many_attempts');
    end if;

    if v_row.otp_hash <> private.otp_hash(p_mobile, p_otp) then
        update public.otp_verifications set attempts = attempts + 1 where id = v_row.id;
        return jsonb_build_object('error', 'invalid_otp');
    end if;

    v_token := gen_random_uuid();
    update public.otp_verifications
       set verified_at      = now(),
           session_token    = v_token,
           token_expires_at = now() + interval '30 minutes'
     where id = v_row.id;

    return jsonb_build_object('success', true, 'session_token', v_token);
end;
$$;

-- 8e. complete_registration — write the row, return the code
create or replace function public.complete_registration(
    p_session_token uuid,
    p_reg_type      public.registration_type,
    p_payload       jsonb
)
returns jsonb language plpgsql security definer set search_path = public, private as $$
declare
    v_row    public.otp_verifications%rowtype;
    v_mobile text;
    v_code   text;
begin
    select * into v_row from public.otp_verifications
     where session_token = p_session_token and reg_type = p_reg_type;

    if not found or v_row.verified_at is null then
        return jsonb_build_object('error', 'not_verified');
    end if;
    if v_row.token_expires_at < now() then
        return jsonb_build_object('error', 'session_expired');
    end if;

    v_mobile := v_row.mobile;

    if private.existing_registration(v_mobile, p_reg_type) is not null then
        return jsonb_build_object('error', 'already_registered');
    end if;

    if coalesce(trim(p_payload ->> 'full_name'), '') = '' then
        return jsonb_build_object('error', 'missing_full_name');
    end if;

    case p_reg_type
        when 'animal' then
            v_code := private.next_registration_code('animal');
            insert into public.animal_registrations (
                registration_code, mobile, full_name, address, state,
                category_code, breed_code, tag_number, milk_yield,
                proposed_milk_recording_date, mpo_name
            ) values (
                v_code, v_mobile,
                p_payload ->> 'full_name',
                p_payload ->> 'address',
                p_payload ->> 'state',
                -- '' would violate the foreign keys; store NULL instead.
                nullif(p_payload ->> 'category_code', ''),
                nullif(p_payload ->> 'breed_code', ''),
                p_payload ->> 'tag_number',
                nullif(p_payload ->> 'milk_yield', '')::numeric,
                nullif(p_payload ->> 'proposed_milk_recording_date', '')::date,
                p_payload ->> 'mpo_name'
            );

        when 'visitor' then
            v_code := private.next_registration_code('visitor');
            insert into public.visitor_registrations (
                registration_code, mobile, full_name, address, state,
                profession_code, organisation_name, email
            ) values (
                v_code, v_mobile,
                p_payload ->> 'full_name',
                p_payload ->> 'address',
                p_payload ->> 'state',
                nullif(p_payload ->> 'profession_code', ''),
                p_payload ->> 'organisation_name',
                nullif(p_payload ->> 'email', '')
            );

        when 'exhibitor' then
            insert into public.exhibitor_registrations (
                mobile, full_name, address, state, organisation, designation
            ) values (
                v_mobile,
                p_payload ->> 'full_name',
                p_payload ->> 'address',
                p_payload ->> 'state',
                p_payload ->> 'organisation',
                p_payload ->> 'designation'
            );

        when 'sponsor' then
            insert into public.sponsor_registrations (
                mobile, full_name, address, state, organisation, designation
            ) values (
                v_mobile,
                p_payload ->> 'full_name',
                p_payload ->> 'address',
                p_payload ->> 'state',
                p_payload ->> 'organisation',
                p_payload ->> 'designation'
            );

        else
            return jsonb_build_object('error', 'unknown_registration_type');
    end case;

    -- burn the token
    delete from public.otp_verifications where id = v_row.id;

    return jsonb_build_object('success', true, 'registration_code', v_code);
end;
$$;

-- 8f. verify_pass — public pass check behind the QR code URL.
--     Deliberately returns the minimum needed to confirm a pass is genuine.
create or replace function public.verify_pass(p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v jsonb;
begin
    select jsonb_build_object(
        'valid', true, 'type', 'animal',
        'registration_code', a.registration_code,
        'full_name', a.full_name,
        'state', a.state,
        'category', c.label_en,
        'breed', b.label_en,
        'registered_at', a.registered_at,
        'checked_in_at', a.checked_in_at
    ) into v
      from public.animal_registrations a
      left join public.animal_categories c on c.code = a.category_code
      left join public.animal_breeds     b on b.code = a.breed_code
     where upper(a.registration_code) = upper(p_code);

    if v is not null then return v; end if;

    select jsonb_build_object(
        'valid', true, 'type', 'visitor',
        'registration_code', vr.registration_code,
        'full_name', vr.full_name,
        'state', vr.state,
        'profession', p.label_en,
        'organisation', vr.organisation_name,
        'registered_at', vr.registered_at,
        'checked_in_at', vr.checked_in_at
    ) into v
      from public.visitor_registrations vr
      left join public.visitor_professions p on p.code = vr.profession_code
     where upper(vr.registration_code) = upper(p_code);

    return coalesce(v, jsonb_build_object('valid', false));
end;
$$;

-- 8g. check_in — admin-only, called by the scan screen
create or replace function public.check_in(p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_count int;
begin
    if not public.is_admin() then
        return jsonb_build_object('error', 'forbidden');
    end if;

    update public.animal_registrations set checked_in_at = now()
     where upper(registration_code) = upper(p_code) and checked_in_at is null;
    get diagnostics v_count = row_count;
    if v_count > 0 then return jsonb_build_object('success', true, 'type', 'animal'); end if;

    update public.visitor_registrations set checked_in_at = now()
     where upper(registration_code) = upper(p_code) and checked_in_at is null;
    get diagnostics v_count = row_count;
    if v_count > 0 then return jsonb_build_object('success', true, 'type', 'visitor'); end if;

    return jsonb_build_object('error', 'not_found_or_already_checked_in');
end;
$$;

-- ---------------------------------------------------------------------------
-- 9. Grants — anon may call the registration RPCs and nothing else
-- ---------------------------------------------------------------------------
-- Postgres grants EXECUTE on new functions to PUBLIC by default, which would
-- let anon call anything in this schema regardless of the grants below.
-- Revoke the blanket grant first, then hand out execute rights one by one.
revoke execute on all functions in schema public from public;
revoke all     on all tables    in schema public from anon;
revoke all     on all functions in schema public from anon;

grant select on public.animal_categories, public.animal_breeds,
                public.visitor_professions, public.app_settings to anon, authenticated;

grant execute on function public.request_otp(text, public.registration_type, boolean) to anon, authenticated;
grant execute on function public.verify_otp(text, public.registration_type, text)     to anon, authenticated;
grant execute on function public.complete_registration(uuid, public.registration_type, jsonb) to anon, authenticated;
grant execute on function public.verify_pass(text) to anon, authenticated;
grant execute on function public.check_in(text)    to authenticated;
grant execute on function public.is_admin()        to authenticated;

grant select, insert, update, delete on
    public.animal_registrations, public.visitor_registrations,
    public.exhibitor_registrations, public.sponsor_registrations,
    public.admin_activity_log to authenticated;
grant select, update on public.app_settings to authenticated;
grant select on public.admin_users to authenticated;
grant usage on all sequences in schema public to authenticated;

commit;

-- ============================================================================
-- POST-INSTALL — three manual steps
-- ============================================================================
--
-- 1. WhatsApp API key — use the long DoubleTick key from your DoubleTick
--    account. Verified working: the template endpoint returns HTTP 200.
--
--    ⚠️  Do NOT use the short "key_CW9swqJ2aH" that was hardcoded in the old
--        send-otp Edge Function — it is dead and returns 403 FORBIDDEN.
--        (Verified 2026-07-31.) An invalid key fails silently: the guard below
--        only rejects the literal 'REPLACE_ME', so a bad key sails through and
--        the OTP just never arrives.
--
--      update private.app_secrets set value = '<the long key_... value>'
--       where key = 'whatsapp_api_key';
--
--    The sender number and template name are already seeded to match the
--    existing functions, so nothing else needs changing.
--
--    Then send yourself a test OTP before opening registration:
--      select public.request_otp('9XXXXXXXXX', 'visitor');
--
-- 2. Admin user. Dashboard -> Authentication -> Users -> "Add user",
--    set an email + strong password, confirm it, then:
--
--      insert into public.admin_users (user_id, email)
--      select id, email from auth.users where email = 'admin@yourdomain.com';
--
-- 3. Pass verification URL (whatever domain the site is served from):
--
--      update public.app_settings set value = 'https://your-domain.com/verify'
--       where key = 'pass_verify_base_url';
--
-- ============================================================================
