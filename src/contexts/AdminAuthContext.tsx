import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/registrationApi';

/**
 * Admin auth backed by Supabase Auth.
 *
 * The previous version compared against VITE_ADMIN_USERNAME/PASSWORD, which are
 * compiled into the public JS bundle — anyone could read them. Access is now a
 * real Supabase session, and every admin query is additionally gated by the
 * is_admin() RLS check, so a valid login that is not listed in admin_users
 * still sees nothing.
 */

interface AdminAuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    email: string | null;
    login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
    logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const evaluate = async (activeSession: Session | null) => {
            if (cancelled) return;
            if (!activeSession) {
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }
            try {
                const { data, error } = await supabase.rpc('is_admin');
                if (!cancelled) setIsAdmin(!error && data === true);
            } catch (err) {
                console.error('is_admin check failed:', err);
                if (!cancelled) setIsAdmin(false);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        supabase.auth.getSession().then(({ data }) => {
            if (cancelled) return;
            setSession(data.session);
            void evaluate(data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (cancelled) return;
            setSession(newSession);
            /*
             * Supabase holds an internal auth lock for the duration of this
             * callback. Calling any other supabase client method from inside it
             * deadlocks — the promise never settles — which left isAdmin stuck
             * at false and bounced a valid admin back to the login screen.
             * Defer the RPC to a macrotask so the lock is released first.
             */
            setTimeout(() => { void evaluate(newSession); }, 0);
        });

        return () => {
            cancelled = true;
            listener.subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { ok: false, message: error.message };

        // Distinguish "not on the admin list" from "the check itself failed" —
        // reporting a network/permission fault as "no admin access" sends you
        // hunting for the wrong problem.
        const { data: adminFlag, error: adminError } = await supabase.rpc('is_admin');
        if (adminError) {
            console.error('is_admin check failed:', adminError);
            await supabase.auth.signOut();
            return { ok: false, message: `Could not verify admin access: ${adminError.message}` };
        }
        if (adminFlag !== true) {
            await supabase.auth.signOut();
            return { ok: false, message: 'This account is not on the admin list.' };
        }

        setSession(data.session);
        setIsAdmin(true);
        return { ok: true };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setIsAdmin(false);
    };

    return (
        <AdminAuthContext.Provider
            value={{
                isAuthenticated: Boolean(session) && isAdmin,
                isLoading,
                email: session?.user?.email ?? null,
                login,
                logout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = (): AdminAuthContextType => {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
