import { createClient } from '@supabase/supabase-js';
import type { RegistrationType } from '@/data/registrationConfig';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * All public registration traffic goes through SECURITY DEFINER RPCs.
 * The anon key has no direct read or write access to the registration tables —
 * see section 7 of supabase/migrations/001_reset_registration_schema.sql.
 */

export interface RpcResult {
    success?: boolean;
    error?: string;
    registration_code?: string;
    session_token?: string;
    retry_after_seconds?: number;
    /** get_pass only */
    full_name?: string;
    subtitle?: string | null;
    secondary_subtitle?: string | null;
}

/** Fields collected per type; extra keys are ignored by the RPC. */
export interface RegistrationPayload {
    full_name: string;
    address?: string;
    state?: string;
    // animal
    category_code?: string;
    breed_code?: string;
    tag_number?: string;
    milk_yield?: string;
    proposed_milk_recording_date?: string;
    mpo_name?: string;
    // visitor
    profession_code?: string;
    organisation_name?: string;
    email?: string;
    // exhibitor / sponsor
    organisation?: string;
    designation?: string;
}

/**
 * supabase-js has no default request timeout: on a flaky connection a call can
 * hang forever, which leaves the submit button spinning with no error and no
 * way forward. Every RPC is bounded here so the UI always resolves.
 */
const RPC_TIMEOUT_MS = 20_000;

const call = async (fn: string, args: Record<string, unknown>): Promise<RpcResult> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), RPC_TIMEOUT_MS);
    try {
        const { data, error } = await supabase.rpc(fn, args).abortSignal(controller.signal);
        if (error) {
            console.error(`${fn} error:`, error);
            return { error: controller.signal.aborted ? 'timeout' : 'network_error' };
        }
        return (data ?? {}) as RpcResult;
    } catch (err) {
        console.error(`${fn} threw:`, err);
        return { error: controller.signal.aborted ? 'timeout' : 'network_error' };
    } finally {
        clearTimeout(timer);
    }
};

export const registrationAPI = {
    sendOTP: (mobile: string, regType: RegistrationType) =>
        call('request_otp', { p_mobile: mobile, p_reg_type: regType, p_resend: false }),

    resendOTP: (mobile: string, regType: RegistrationType) =>
        call('request_otp', { p_mobile: mobile, p_reg_type: regType, p_resend: true }),

    verifyOTP: (mobile: string, regType: RegistrationType, otp: string) =>
        call('verify_otp', { p_mobile: mobile, p_reg_type: regType, p_otp: otp }),

    completeRegistration: (
        sessionToken: string,
        regType: RegistrationType,
        payload: RegistrationPayload,
    ) =>
        call('complete_registration', {
            p_session_token: sessionToken,
            p_reg_type: regType,
            p_payload: payload,
        }),

    /** Send an OTP to a number that is ALREADY registered, to re-issue its pass. */
    requestPassOTP: (mobile: string, regType: RegistrationType) =>
        call('request_pass_otp', { p_mobile: mobile, p_reg_type: regType }),

    /** Fetch the pass details for a mobile proven by verifyOTP. */
    getPass: (sessionToken: string, regType: RegistrationType) =>
        call('get_pass', { p_session_token: sessionToken, p_reg_type: regType }),
};

export interface PassVerification {
    valid: boolean;
    type?: 'animal' | 'visitor';
    registration_code?: string;
    full_name?: string;
    state?: string;
    category?: string;
    breed?: string;
    profession?: string;
    organisation?: string;
    registered_at?: string;
    checked_in_at?: string | null;
}

export const verifyPass = async (code: string): Promise<PassVerification> => {
    const { data, error } = await supabase.rpc('verify_pass', { p_code: code });
    if (error) {
        console.error('verify_pass error:', error);
        return { valid: false };
    }
    return (data ?? { valid: false }) as PassVerification;
};

/** Base URL the pass QR codes point at (admin-configurable in app_settings). */
export const getPassVerifyBaseUrl = async (): Promise<string> => {
    const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'pass_verify_base_url')
        .maybeSingle();
    return data?.value || `${window.location.origin}/verify`;
};
