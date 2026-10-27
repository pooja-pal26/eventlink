/**
 * Full backup of all reachable Supabase tables -> JSON + CSV.
 *
 * Usage:  node scripts/backup-supabase.mjs
 *
 * Reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.
 * Set SUPABASE_SERVICE_ROLE_KEY in the environment to back up tables that
 * RLS hides from the anon key (recommended before any destructive change).
 *
 * Output: backups/<timestamp>/<table>.json + <table>.csv + _manifest.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const readEnv = (name) => (env.match(new RegExp(`^${name}=(.*)$`, 'm')) || [])[1]?.trim();

const URL_BASE = readEnv('VITE_SUPABASE_URL');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || readEnv('VITE_SUPABASE_ANON_KEY');
const USING_SERVICE_ROLE = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

if (!URL_BASE || !KEY) {
  console.error('Missing VITE_SUPABASE_URL or key in .env');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

/** Tables referenced in the app, plus plausible siblings we probe for. */
const KNOWN = ['registrations', 'visitor_registrations', 'app_settings', 'admin_activity_log'];
const PROBE = [
  'exhibitor_registrations', 'sponsor_registrations', 'animal_registrations',
  'otp_verifications', 'visitor_otp_verifications', 'otps',
  'admins', 'admin_users', 'users', 'profiles', 'settings',
  'winners', 'gallery', 'sponsors', 'exhibitors', 'contacts', 'contact_submissions',
  'events', 'registration_counters', 'audit_log',
];

async function discover() {
  // The OpenAPI root lists every exposed table but requires service_role.
  const res = await fetch(`${URL_BASE}/rest/v1/`, { headers });
  if (res.ok) {
    const spec = await res.json();
    const names = Object.keys(spec.paths || {})
      .filter((p) => p !== '/' && !p.startsWith('/rpc/'))
      .map((p) => p.slice(1));
    if (names.length) return { names, complete: true };
  }
  // Fallback: probe candidate names one by one.
  const names = [];
  for (const t of [...KNOWN, ...PROBE]) {
    const r = await fetch(`${URL_BASE}/rest/v1/${t}?select=*&limit=1`, {
      headers: { ...headers, Prefer: 'count=exact' },
    });
    if (r.status < 300) names.push(t);
  }
  return { names, complete: false };
}

async function fetchAll(table) {
  const PAGE = 1000;
  const rows = [];
  let from = 0;
  for (;;) {
    const r = await fetch(`${URL_BASE}/rest/v1/${table}?select=*`, {
      headers: { ...headers, Range: `${from}-${from + PAGE - 1}`, Prefer: 'count=exact' },
    });
    if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
    const batch = await r.json();
    rows.push(...batch);
    if (batch.length < PAGE) break;
    from += PAGE;
  }
  return rows;
}

function toCSV(rows) {
  if (!rows.length) return '';
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const cell = (v) => {
    if (v === null || v === undefined) return '';
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const outDir = path.join(ROOT, 'backups', stamp);
fs.mkdirSync(outDir, { recursive: true });

const { names, complete } = await discover();
console.log(`Auth: ${USING_SERVICE_ROLE ? 'service_role' : 'anon'} | table list ${complete ? 'complete (OpenAPI)' : 'probed (may be partial)'}`);
console.log(`Tables found: ${names.join(', ')}\n`);

const manifest = {
  backed_up_at: new Date().toISOString(),
  supabase_url: URL_BASE,
  auth: USING_SERVICE_ROLE ? 'service_role' : 'anon',
  table_list_complete: complete,
  tables: {},
};

for (const table of names) {
  try {
    const rows = await fetchAll(table);
    fs.writeFileSync(path.join(outDir, `${table}.json`), JSON.stringify(rows, null, 2));
    fs.writeFileSync(path.join(outDir, `${table}.csv`), toCSV(rows));
    manifest.tables[table] = {
      rows: rows.length,
      columns: rows.length ? [...new Set(rows.flatMap((r) => Object.keys(r)))] : [],
    };
    console.log(`  OK  ${table.padEnd(24)} ${rows.length} rows`);
  } catch (e) {
    manifest.tables[table] = { error: e.message };
    console.log(`  ERR ${table.padEnd(24)} ${e.message}`);
  }
}

fs.writeFileSync(path.join(outDir, '_manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nBackup written to: ${outDir}`);
