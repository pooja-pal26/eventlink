import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
    useAdminData,
    useRegistrationToggles,
    logAdminActivity,
    EMPTY_FILTERS,
    TABLE_FOR,
    type Filters,
    type AnyRegistration,
} from '@/hooks/useAdminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import EditRegistrationModal from '@/components/admin/EditRegistrationModal';
import {
    ANIMAL_CATEGORIES,
    INDIAN_STATES,
    TYPE_LABELS,
    VISITOR_PROFESSIONS,
    REGISTRATION_TYPES,
    type RegistrationType,
} from '@/data/registrationConfig';
import {
    LogOut, Search, Download, Edit2, Trash2, Users, UserPlus,
    ChevronLeft, ChevronRight, RefreshCw, Power, AlertCircle, CheckCircle2,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { isAuthenticated, isLoading: authLoading, email, logout } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [activeType, setActiveType] = useState<RegistrationType>('animal');
    const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
    const [stats, setStats] = useState({ total: 0, today: 0 });
    const [deleting, setDeleting] = useState<AnyRegistration | null>(null);
    const [editing, setEditing] = useState<AnyRegistration | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pendingToggle, setPendingToggle] = useState<RegistrationType | null>(null);

    const {
        rows, loading, error, pagination, fetchRows,
        updateRow, deleteRow, getStats, exportToCSV, columns,
    } = useAdminData(activeType);

    const { enabled, fetchToggles, toggle } = useRegistrationToggles();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) navigate('/admin-access');
    }, [authLoading, isAuthenticated, navigate]);

    // Reset filters and paging whenever the tab changes.
    useEffect(() => {
        setFilters(EMPTY_FILTERS);
    }, [activeType]);

    const refresh = useCallback(
        (page = 1) => fetchRows(filters, page, pagination.pageSize),
        [fetchRows, filters, pagination.pageSize],
    );

    useEffect(() => {
        if (!isAuthenticated) return;
        const debounce = setTimeout(() => {
            refresh(1);
            getStats().then(setStats);
        }, 300);
        return () => clearTimeout(debounce);
    }, [isAuthenticated, activeType, filters]);

    useEffect(() => {
        if (isAuthenticated) fetchToggles();
    }, [isAuthenticated, fetchToggles]);

    const handleExport = async () => {
        const csv = await exportToCSV(filters);
        if (!csv) {
            toast({ title: 'Export failed', description: 'No data to export', variant: 'destructive' });
            return;
        }
        const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeType}_registrations_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        await logAdminActivity('export_csv', { table: TABLE_FOR[activeType] });
        toast({ title: 'Export successful', description: 'CSV file downloaded' });
    };

    const handleSaveEdit = async (id: string, updates: Record<string, unknown>) => {
        const ok = await updateRow(id, updates);
        if (ok) {
            await logAdminActivity('edit', {
                table: TABLE_FOR[activeType],
                id,
                code: (editing as { registration_code?: string } | null)?.registration_code,
                details: { updates },
            });
            toast({ title: 'Success', description: 'Registration updated' });
            refresh(pagination.page);
        } else {
            toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
        }
        return ok;
    };

    const handleDelete = async () => {
        if (!deleting) return;
        setIsDeleting(true);
        const ok = await deleteRow(deleting.id);
        if (ok) {
            await logAdminActivity('delete', {
                table: TABLE_FOR[activeType],
                id: deleting.id,
                code: (deleting as { registration_code?: string }).registration_code,
                details: { full_name: deleting.full_name, mobile: deleting.mobile },
            });
            toast({ title: 'Deleted', description: 'Registration removed' });
            refresh(pagination.page);
            getStats().then(setStats);
        } else {
            toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
        }
        setIsDeleting(false);
        setDeleting(null);
    };

    const handleToggle = async (type: RegistrationType) => {
        setPendingToggle(null);
        const next = !enabled[type];
        const ok = await toggle(type, next);
        if (ok) {
            await logAdminActivity('toggle_registration', { details: { type, enabled: next } });
            toast({
                title: `${TYPE_LABELS[type].en} registration ${next ? 'enabled' : 'paused'}`,
            });
        } else {
            toast({ title: 'Error', description: 'Failed to update setting', variant: 'destructive' });
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
            </div>
        );
    }
    if (!isAuthenticated) return null;

    const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
    const hasCode = activeType === 'animal' || activeType === 'visitor';

    return (
        <div className="min-h-screen bg-gray-900">
            <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
                <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                        {email && <p className="text-xs text-gray-400">{email}</p>}
                    </div>
                    <Button
                        variant="outline"
                        onClick={async () => { await logout(); navigate('/admin-access'); }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
                {/* Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-800 border border-gray-700 rounded-xl p-1">
                    {REGISTRATION_TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeType === type
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                        >
                            {TYPE_LABELS[type].en}
                        </button>
                    ))}
                </div>

                {/* Stats + switch */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Registrations</p>
                            <p className="text-2xl font-bold text-white">{stats.total}</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Today's Registrations</p>
                            <p className="text-2xl font-bold text-white">{stats.today}</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${enabled[activeType] ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                                <Power className={`w-5 h-5 ${enabled[activeType] ? 'text-green-400' : 'text-red-400'}`} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">{TYPE_LABELS[activeType].en}</p>
                                <p className={`text-sm font-semibold ${enabled[activeType] ? 'text-green-400' : 'text-red-400'}`}>
                                    {enabled[activeType] ? 'Open' : 'Paused'}
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={enabled[activeType]}
                            onCheckedChange={() => setPendingToggle(activeType)}
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                    <div className="flex flex-wrap gap-3">
                        <div className="flex-1 min-w-[220px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input
                                placeholder="Search name, mobile, code…"
                                value={filters.search}
                                onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
                                className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                            />
                        </div>

                        <Select value={filters.state} onValueChange={v => setFilters(p => ({ ...p, state: v }))}>
                            <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-white">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 max-h-80">
                                <SelectItem value="all" className="text-white">All States</SelectItem>
                                {INDIAN_STATES.map(s => (
                                    <SelectItem key={s} value={s} className="text-white">{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {activeType === 'animal' && (
                            <Select value={filters.category} onValueChange={v => setFilters(p => ({ ...p, category: v }))}>
                                <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-white">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="all" className="text-white">All Categories</SelectItem>
                                    {ANIMAL_CATEGORIES.map(c => (
                                        <SelectItem key={c.code} value={c.code} className="text-white">{c.en}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {activeType === 'visitor' && (
                            <Select value={filters.profession} onValueChange={v => setFilters(p => ({ ...p, profession: v }))}>
                                <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-white">
                                    <SelectValue placeholder="Profession" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="all" className="text-white">All Professions</SelectItem>
                                    {VISITOR_PROFESSIONS.map(p => (
                                        <SelectItem key={p.code} value={p.code} className="text-white">{p.en}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        <Button onClick={() => refresh(pagination.page)} variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <RefreshCw className="w-4 h-4 mr-2" />Refresh
                        </Button>

                        <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white">
                            <Download className="w-4 h-4 mr-2" />Export CSV
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900/50">
                                <tr>
                                    {columns.map(c => (
                                        <th key={c.key}
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                            {c.header}
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500" />
                                                Loading…
                                            </div>
                                        </td>
                                    </tr>
                                ) : rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">
                                            No {TYPE_LABELS[activeType].en.toLowerCase()} registrations found
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map(row => (
                                        <tr key={row.id} className="hover:bg-gray-700/50">
                                            {columns.map(c => {
                                                const value = c.get(row);
                                                const isCode = c.key === 'registration_code';
                                                const isCheckedIn = c.key === 'checked_in_at';
                                                return (
                                                    <td key={c.key}
                                                        className={`px-4 py-3 text-sm max-w-[220px] truncate ${isCode ? 'text-green-400 font-mono' : 'text-gray-300'}`}
                                                        title={value}>
                                                        {isCheckedIn && value ? (
                                                            <span className="inline-flex items-center gap-1 text-green-400">
                                                                <CheckCircle2 className="w-3.5 h-3.5" />{value}
                                                            </span>
                                                        ) : (value || '-')}
                                                    </td>
                                                );
                                            })}
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => setEditing(row)}
                                                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-gray-400 hover:text-white"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleting(row)}
                                                        className="p-2 hover:bg-red-600/20 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination.total > pagination.pageSize && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
                            <p className="text-sm text-gray-400">
                                Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
                                {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm"
                                    onClick={() => refresh(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-gray-400 text-sm">
                                    Page {pagination.page} of {totalPages}
                                </span>
                                <Button variant="outline" size="sm"
                                    onClick={() => refresh(pagination.page + 1)}
                                    disabled={pagination.page >= totalPages}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {editing && (
                <EditRegistrationModal
                    registration={editing}
                    type={activeType}
                    onSave={handleSaveEdit}
                    onClose={() => setEditing(null)}
                />
            )}

            {deleting && (
                <DeleteConfirmModal
                    registrationCode={
                        (deleting as { registration_code?: string }).registration_code
                        || `${deleting.full_name} (${deleting.mobile})`
                    }
                    onConfirm={handleDelete}
                    onCancel={() => setDeleting(null)}
                    isDeleting={isDeleting}
                />
            )}

            {pendingToggle && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 ${enabled[pendingToggle] ? 'bg-red-500/20' : 'bg-green-500/20'} rounded-xl flex items-center justify-center`}>
                                <AlertCircle className={`w-6 h-6 ${enabled[pendingToggle] ? 'text-red-400' : 'text-green-400'}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                {enabled[pendingToggle] ? 'Pause' : 'Enable'} {TYPE_LABELS[pendingToggle].en} registrations?
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-6">
                            {enabled[pendingToggle]
                                ? 'New registrations of this type will be blocked. Other types are unaffected.'
                                : 'New registrations of this type will be accepted again.'}
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setPendingToggle(null)}
                                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                                Cancel
                            </Button>
                            <Button onClick={() => handleToggle(pendingToggle)}
                                className={`flex-1 ${enabled[pendingToggle] ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>
                                {enabled[pendingToggle] ? 'Pause' : 'Enable'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
