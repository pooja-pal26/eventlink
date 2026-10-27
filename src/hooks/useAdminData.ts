import { useCallback, useState } from 'react';
import { supabase } from '@/lib/registrationApi';
import {
    ANIMAL_BREEDS,
    ANIMAL_CATEGORIES,
    VISITOR_PROFESSIONS,
    type RegistrationType,
} from '@/data/registrationConfig';

export interface AnimalRegistration {
    id: string;
    registration_code: string;
    mobile: string;
    full_name: string;
    address: string | null;
    state: string | null;
    category_code: string | null;
    breed_code: string | null;
    tag_number: string | null;
    milk_yield: number | null;
    proposed_milk_recording_date: string | null;
    mpo_name: string | null;
    checked_in_at: string | null;
    registered_at: string;
}

export interface VisitorRegistration {
    id: string;
    registration_code: string;
    mobile: string;
    full_name: string;
    address: string | null;
    state: string | null;
    profession_code: string | null;
    organisation_name: string | null;
    email: string | null;
    checked_in_at: string | null;
    registered_at: string;
}

export interface PartnerRegistration {
    id: string;
    mobile: string;
    full_name: string;
    address: string | null;
    state: string | null;
    organisation: string | null;
    designation: string | null;
    registered_at: string;
}

export type AnyRegistration = AnimalRegistration | VisitorRegistration | PartnerRegistration;

export const TABLE_FOR: Record<RegistrationType, string> = {
    animal: 'animal_registrations',
    visitor: 'visitor_registrations',
    exhibitor: 'exhibitor_registrations',
    sponsor: 'sponsor_registrations',
};

/** Columns searched by the free-text box, per type. */
const SEARCH_COLUMNS: Record<RegistrationType, string[]> = {
    animal: ['registration_code', 'full_name', 'mobile', 'tag_number', 'mpo_name'],
    visitor: ['registration_code', 'full_name', 'mobile', 'email', 'organisation_name'],
    exhibitor: ['full_name', 'mobile', 'organisation', 'designation'],
    sponsor: ['full_name', 'mobile', 'organisation', 'designation'],
};

export interface Filters {
    search: string;
    state: string;
    /** animal only */
    category: string;
    /** visitor only */
    profession: string;
}

export const EMPTY_FILTERS: Filters = { search: '', state: 'all', category: 'all', profession: 'all' };

export interface PaginationState {
    page: number;
    pageSize: number;
    total: number;
}

const label = (list: readonly { code: string; en: string }[], code: string | null) =>
    (code && list.find(i => i.code === code)?.en) || '';

export const categoryLabel = (code: string | null) => label(ANIMAL_CATEGORIES, code);
export const breedLabel = (code: string | null) => label(ANIMAL_BREEDS, code);
export const professionLabel = (code: string | null) => label(VISITOR_PROFESSIONS, code);

const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleDateString('en-IN') : '';

/* eslint-disable @typescript-eslint/no-explicit-any */

/** CSV column definitions per type — also drives the on-screen table. */
export const COLUMNS: Record<RegistrationType, { key: string; header: string; get: (r: any) => string }[]> = {
    animal: [
        { key: 'registration_code', header: 'Registration Code', get: r => r.registration_code || '' },
        { key: 'mobile', header: 'Mobile', get: r => r.mobile || '' },
        { key: 'full_name', header: 'Full Name', get: r => r.full_name || '' },
        { key: 'address', header: 'Address', get: r => r.address || '' },
        { key: 'state', header: 'State', get: r => r.state || '' },
        { key: 'category_code', header: 'Category', get: r => categoryLabel(r.category_code) },
        { key: 'breed_code', header: 'Breed', get: r => breedLabel(r.breed_code) },
        { key: 'tag_number', header: 'Tag Number', get: r => r.tag_number || '' },
        { key: 'milk_yield', header: 'Milk Yield', get: r => (r.milk_yield ?? '') === '' ? '' : String(r.milk_yield) },
        { key: 'proposed_milk_recording_date', header: 'Proposed Live Milk Recording', get: r => formatDate(r.proposed_milk_recording_date) },
        { key: 'mpo_name', header: 'Project / MPO', get: r => r.mpo_name || '' },
        { key: 'checked_in_at', header: 'Checked In', get: r => formatDate(r.checked_in_at) },
        { key: 'registered_at', header: 'Date', get: r => formatDate(r.registered_at) },
    ],
    visitor: [
        { key: 'registration_code', header: 'Registration Code', get: r => r.registration_code || '' },
        { key: 'mobile', header: 'Mobile', get: r => r.mobile || '' },
        { key: 'full_name', header: 'Full Name', get: r => r.full_name || '' },
        { key: 'address', header: 'Address', get: r => r.address || '' },
        { key: 'state', header: 'State', get: r => r.state || '' },
        { key: 'profession_code', header: 'Profession', get: r => professionLabel(r.profession_code) },
        { key: 'organisation_name', header: 'Organisation', get: r => r.organisation_name || '' },
        { key: 'email', header: 'Email', get: r => r.email || '' },
        { key: 'checked_in_at', header: 'Checked In', get: r => formatDate(r.checked_in_at) },
        { key: 'registered_at', header: 'Date', get: r => formatDate(r.registered_at) },
    ],
    exhibitor: [
        { key: 'mobile', header: 'Mobile', get: r => r.mobile || '' },
        { key: 'full_name', header: 'Full Name', get: r => r.full_name || '' },
        { key: 'address', header: 'Address', get: r => r.address || '' },
        { key: 'state', header: 'State', get: r => r.state || '' },
        { key: 'organisation', header: 'Organisation', get: r => r.organisation || '' },
        { key: 'designation', header: 'Designation', get: r => r.designation || '' },
        { key: 'registered_at', header: 'Date', get: r => formatDate(r.registered_at) },
    ],
    sponsor: [
        { key: 'mobile', header: 'Mobile', get: r => r.mobile || '' },
        { key: 'full_name', header: 'Full Name', get: r => r.full_name || '' },
        { key: 'address', header: 'Address', get: r => r.address || '' },
        { key: 'state', header: 'State', get: r => r.state || '' },
        { key: 'organisation', header: 'Organisation', get: r => r.organisation || '' },
        { key: 'designation', header: 'Designation', get: r => r.designation || '' },
        { key: 'registered_at', header: 'Date', get: r => formatDate(r.registered_at) },
    ],
};

const applyFilters = (query: any, type: RegistrationType, filters: Filters) => {
    if (filters.search) {
        const term = filters.search.replace(/[,()]/g, '');
        query = query.or(SEARCH_COLUMNS[type].map(c => `${c}.ilike.%${term}%`).join(','));
    }
    if (filters.state && filters.state !== 'all') {
        query = query.eq('state', filters.state);
    }
    if (type === 'animal' && filters.category && filters.category !== 'all') {
        query = query.eq('category_code', filters.category);
    }
    if (type === 'visitor' && filters.profession && filters.profession !== 'all') {
        query = query.eq('profession_code', filters.profession);
    }
    return query;
};

export const useAdminData = (type: RegistrationType) => {
    const [rows, setRows] = useState<AnyRegistration[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({ page: 1, pageSize: 20, total: 0 });

    const table = TABLE_FOR[type];

    const fetchRows = useCallback(async (filters: Filters, page: number, pageSize: number) => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase
                .from(table)
                .select('*', { count: 'exact' })
                .order('registered_at', { ascending: false });

            query = applyFilters(query, type, filters);

            const from = (page - 1) * pageSize;
            query = query.range(from, from + pageSize - 1);

            const { data, error: fetchError, count } = await query;
            if (fetchError) throw fetchError;

            setRows((data || []) as AnyRegistration[]);
            setPagination({ page, pageSize, total: count || 0 });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load registrations');
        } finally {
            setLoading(false);
        }
    }, [table, type]);

    const updateRow = async (id: string, updates: Record<string, unknown>) => {
        const { error: updateError } = await supabase.from(table).update(updates).eq('id', id);
        if (updateError) {
            setError(updateError.message);
            return false;
        }
        return true;
    };

    const deleteRow = async (id: string) => {
        const { error: deleteError } = await supabase.from(table).delete().eq('id', id);
        if (deleteError) {
            setError(deleteError.message);
            return false;
        }
        return true;
    };

    const getStats = async () => {
        const { count: total } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const { count: today } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
            .gte('registered_at', startOfToday.toISOString());

        return { total: total || 0, today: today || 0 };
    };

    /** Pulls every matching row in pages of 1000, then builds the CSV. */
    const exportToCSV = async (filters: Filters) => {
        const BATCH = 1000;
        const all: any[] = [];
        let from = 0;

        for (;;) {
            let query = supabase
                .from(table)
                .select('*')
                .order('registered_at', { ascending: false })
                .range(from, from + BATCH - 1);
            query = applyFilters(query, type, filters);

            const { data, error: fetchError } = await query;
            if (fetchError) {
                setError(fetchError.message);
                return null;
            }
            if (!data?.length) break;

            all.push(...data);
            if (data.length < BATCH) break;
            from += BATCH;
        }

        if (!all.length) return null;

        const cols = COLUMNS[type];
        const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
        return [
            cols.map(c => c.header).join(','),
            ...all.map(row => cols.map(c => escape(c.get(row))).join(',')),
        ].join('\n');
    };

    return {
        rows,
        loading,
        error,
        pagination,
        setPagination,
        fetchRows,
        updateRow,
        deleteRow,
        getStats,
        exportToCSV,
        columns: COLUMNS[type],
    };
};

/** Registration on/off switches, one per type. */
export const useRegistrationToggles = () => {
    const [enabled, setEnabled] = useState<Record<RegistrationType, boolean>>({
        animal: true, visitor: true, exhibitor: true, sponsor: true,
    });

    const fetchToggles = useCallback(async () => {
        const { data } = await supabase.from('app_settings').select('key, value');
        if (!data) return;
        setEnabled(prev => {
            const next = { ...prev };
            (Object.keys(next) as RegistrationType[]).forEach(t => {
                const row = data.find(s => s.key === `${t}_registration_enabled`);
                if (row) next[t] = row.value === 'true';
            });
            return next;
        });
    }, []);

    const toggle = async (type: RegistrationType, value: boolean) => {
        const { error } = await supabase
            .from('app_settings')
            .update({ value: value ? 'true' : 'false', updated_at: new Date().toISOString() })
            .eq('key', `${type}_registration_enabled`);
        if (error) return false;
        setEnabled(prev => ({ ...prev, [type]: value }));
        return true;
    };

    return { enabled, fetchToggles, toggle };
};

export const logAdminActivity = async (
    action: string,
    opts: { table?: string; id?: string; code?: string; details?: object } = {},
) => {
    const { data } = await supabase.auth.getUser();
    await supabase.from('admin_activity_log').insert({
        actor_email: data.user?.email ?? null,
        action,
        target_table: opts.table ?? null,
        target_id: opts.id ?? null,
        target_code: opts.code ?? null,
        details: opts.details ?? null,
    });
};
