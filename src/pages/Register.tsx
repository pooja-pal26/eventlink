import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Phone, Shield, User, CheckCircle, Globe, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import SearchableSelect from '@/components/SearchableSelect';
import { useLanguage } from '@/contexts/LanguageContext';
import { registrationAPI, getPassVerifyBaseUrl, supabase, type RegistrationPayload } from '@/lib/registrationApi';
import PassCard from '@/components/PassCard';
import { labelsFor } from '@/data/registrationLabels';
import {
    ANIMAL_CATEGORIES,
    INDIAN_STATES,
    MPO_LIST,
    MPO_OTHER,
    TYPE_LABELS,
    TYPES_WITH_PASS,
    VISITOR_PROFESSIONS,
    breedsForCategory,
    type RegistrationType,
} from '@/data/registrationConfig';

type Step = 'mobile' | 'otp' | 'form' | 'success' | 'already_registered';

const isValidType = (v: string | null): v is RegistrationType =>
    v === 'animal' || v === 'visitor' || v === 'exhibitor' || v === 'sponsor';

const emptyForm: RegistrationPayload = {
    full_name: '',
    address: '',
    state: '',
    category_code: '',
    breed_code: '',
    tag_number: '',
    milk_yield: '',
    proposed_milk_recording_date: '',
    mpo_name: '',
    profession_code: '',
    organisation_name: '',
    email: '',
    organisation: '',
    designation: '',
};

const Register = () => {
    const { language, setLanguage } = useLanguage();
    const L = labelsFor(language);
    const [searchParams] = useSearchParams();

    const typeParam = searchParams.get('type');
    const regType: RegistrationType = isValidType(typeParam) ? typeParam : 'animal';
    const hasPass = TYPES_WITH_PASS.includes(regType);

    const [step, setStep] = useState<Step>('mobile');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [form, setForm] = useState<RegistrationPayload>(emptyForm);
    const [sessionToken, setSessionToken] = useState('');
    const [registrationCode, setRegistrationCode] = useState('');
    const [verifyBaseUrl, setVerifyBaseUrl] = useState('');

    /** MPO area — required on the animal form; "Other" reveals a free-text box. */
    const [mpoChoice, setMpoChoice] = useState('');
    const [mpoOther, setMpoOther] = useState('');

    /** T&C consent — mandatory for every registration type. */
    const [agreed, setAgreed] = useState(false);

    /**
     * 'register' is the normal signup. 'retrieve' is an already-registered user
     * re-issuing their pass — same OTP gate, but it skips the details form and
     * loads the stored pass instead.
     */
    const [mode, setMode] = useState<'register' | 'retrieve'>('register');
    const [retrievedPass, setRetrievedPass] = useState<
        { fullName: string; subtitle?: string; secondary?: string } | null
    >(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [resendCount, setResendCount] = useState(0);

    // The registration on/off check must never block the form. We assume open
    // and only swap to the "closed" screen once we positively learn otherwise.
    const [registrationEnabled, setRegistrationEnabled] = useState(true);
    const [statusChecked, setStatusChecked] = useState(false);

    // Reset the whole flow when the registration type changes.
    useEffect(() => {
        setStep('mobile');
        setMobile('');
        setOtp('');
        setForm(emptyForm);
        setSessionToken('');
        setRegistrationCode('');
        setError('');
        setResendCount(0);
        setResendTimer(0);
        setMode('register');
        setRetrievedPass(null);
        setMpoChoice('');
        setMpoOther('');
        setAgreed(false);
    }, [regType]);

    useEffect(() => {
        let cancelled = false;
        setStatusChecked(false);

        const settle = (enabled: boolean) => {
            if (cancelled) return;
            setRegistrationEnabled(enabled);
            setStatusChecked(true);
        };

        // If the check is slow or never settles, fall back to "open" rather
        // than leaving the user staring at a spinner.
        const timer = setTimeout(() => settle(true), 5000);

        // Note: the Supabase builder is a thenable, not a real Promise — it has
        // no .catch(). Await it inside try/catch so a rejection can't strand us.
        (async () => {
            try {
                const { data, error } = await supabase
                    .from('app_settings')
                    .select('value')
                    .eq('key', `${regType}_registration_enabled`)
                    .maybeSingle();
                if (error) console.error('Registration status check failed:', error);
                settle(data ? data.value === 'true' : true);
            } catch (err) {
                console.error('Registration status check threw:', err);
                settle(true);
            } finally {
                clearTimeout(timer);
            }
        })();

        return () => { cancelled = true; clearTimeout(timer); };
    }, [regType]);

    useEffect(() => {
        getPassVerifyBaseUrl().then(setVerifyBaseUrl);
    }, []);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const errorMessage = (code: string) => L.errors[code] || code;

    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile.length !== 10) return;

        setLoading(true);
        setError('');
        const res = await registrationAPI.sendOTP(mobile, regType);
        setLoading(false);

        if (res.error === 'already_registered') {
            setRegistrationCode(res.registration_code || '');
            setStep('already_registered');
        } else if (res.error) {
            setError(errorMessage(res.error));
        } else {
            setStep('otp');
            setResendTimer(60);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;

        setLoading(true);
        setError('');
        const res = await registrationAPI.verifyOTP(mobile, regType, otp);

        if (res.error) {
            setLoading(false);
            setError(errorMessage(res.error));
            return;
        }

        const token = res.session_token || '';
        setSessionToken(token);

        if (mode === 'register') {
            setLoading(false);
            setStep('form');
            return;
        }

        // Retrieval: pull the stored pass instead of showing the details form.
        const pass = await registrationAPI.getPass(token, regType);
        setLoading(false);

        if (pass.error) {
            setError(errorMessage(pass.error));
            return;
        }
        setRetrievedPass({
            fullName: pass.full_name || '',
            subtitle: pass.subtitle || undefined,
            secondary: pass.secondary_subtitle || undefined,
        });
        setRegistrationCode(pass.registration_code || '');
        setStep('success');
    };

    /** Kick off the "get my pass again" flow from the already-registered screen. */
    const handleRetrievePass = async () => {
        setLoading(true);
        setError('');
        const res = await registrationAPI.requestPassOTP(mobile, regType);
        setLoading(false);

        if (res.error) {
            if (res.retry_after_seconds) setResendTimer(res.retry_after_seconds);
            setError(errorMessage(res.error));
            return;
        }
        setMode('retrieve');
        setOtp('');
        setResendCount(0);
        setResendTimer(60);
        setStep('otp');
    };

    const handleResend = async () => {
        if (resendTimer > 0 || resendCount >= 2) return;
        setLoading(true);
        setError('');
        const res = mode === 'retrieve'
            ? await registrationAPI.requestPassOTP(mobile, regType)
            : await registrationAPI.resendOTP(mobile, regType);
        setLoading(false);

        if (res.error) {
            if (res.retry_after_seconds) setResendTimer(res.retry_after_seconds);
            setError(errorMessage(res.error));
        } else {
            setResendCount(c => c + 1);
            setResendTimer(resendCount === 0 ? 120 : 0);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // "Other" stores the typed name. The key is omitted rather than sent
        // blank so mpo_name is NULL, not '', for any non-animal type.
        const mpoValue = mpoChoice === MPO_OTHER ? mpoOther.trim() : mpoChoice;
        const payload: RegistrationPayload = { ...form };
        if (mpoValue) payload.mpo_name = mpoValue;
        else delete payload.mpo_name;

        const res = await registrationAPI.completeRegistration(sessionToken, regType, payload);
        setLoading(false);

        if (res.error) {
            setError(errorMessage(res.error));
            // A dead session must send the user back to the start.
            if (res.error === 'session_expired' || res.error === 'not_verified') setStep('mobile');
        } else {
            setRegistrationCode(res.registration_code || '');
            setStep('success');
        }
    };

    const update = (field: keyof RegistrationPayload, value: string) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const availableBreeds = useMemo(
        () => (form.category_code ? breedsForCategory(form.category_code) : []),
        [form.category_code],
    );

    /** Every field on the form is mandatory. */
    const canSubmit = useMemo(() => {
        if (loading || !agreed) return false;

        const filled = (v?: string) => Boolean(v && v.trim());
        const isEmail = (v?: string) => Boolean(v && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()));

        if (!filled(form.full_name) || !filled(form.address) || !filled(form.state)) return false;

        switch (regType) {
            case 'animal': {
                if (!filled(form.category_code) || !filled(form.breed_code)) return false;
                if (!filled(form.tag_number) || !filled(form.milk_yield)) return false;
                if (!filled(form.proposed_milk_recording_date)) return false;
                // MPO area is mandatory; "Other" additionally needs the typed name.
                if (!mpoChoice) return false;
                if (mpoChoice === MPO_OTHER && !filled(mpoOther)) return false;
                return true;
            }
            case 'visitor':
                // Organisation and email are optional; email is only validated
                // when the user actually typed something.
                return filled(form.profession_code)
                    && (!filled(form.email) || isEmail(form.email));
            case 'exhibitor':
            case 'sponsor':
                return filled(form.organisation) && filled(form.designation);
            default:
                return false;
        }
    }, [form, regType, loading, mpoChoice, mpoOther, agreed]);

    // Retrieval skips the details form, so drop that stage from the stepper.
    const steps = [
        { key: 'mobile', label: L.stepMobile, icon: Phone },
        { key: 'otp', label: L.stepVerify, icon: Shield },
        ...(mode === 'retrieve' ? [] : [{ key: 'form', label: L.stepDetails, icon: User }]),
        { key: 'success', label: L.stepDone, icon: CheckCircle },
    ];
    const currentStepIndex = steps.findIndex(s => s.key === step);

    const passSubtitle = regType === 'animal'
        ? L.farmer
        : VISITOR_PROFESSIONS.find(p => p.code === form.profession_code)?.[language];

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
            <header className="bg-card/80 backdrop-blur-md shadow-soft border-b border-border sticky top-0 z-50">
                <div className="container-custom px-4 md:px-8 py-4 grid grid-cols-3 items-center">
                    <div className="flex justify-start">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline font-medium text-sm">{L.backHome}</span>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <h1 className="text-sm sm:text-base md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-center leading-tight px-1">
                            {TYPE_LABELS[regType][language]}
                        </h1>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            className="px-3 text-foreground hover:bg-primary/10"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            <span className="font-bold">{language === 'en' ? 'EN' : 'हि'}</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container-custom px-4 md:px-8 py-5 md:py-8">
                {/* Progress */}
                {step !== 'already_registered' && (
                    <div className="max-w-lg mx-auto mb-6 md:mb-8">
                        <div className="flex justify-between items-center relative">
                            {steps.map((s, index) => (
                                <div key={s.key} className="flex-1 flex flex-col items-center relative z-10">
                                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${index <= currentStepIndex
                                        ? 'bg-primary text-primary-foreground shadow-glow'
                                        : 'bg-muted text-muted-foreground'}`}>
                                        <s.icon className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <span className={`text-[10px] md:text-xs mt-2 font-semibold uppercase tracking-wider ${index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {s.label}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div className={`absolute top-4 md:top-5 left-[60%] w-[80%] h-0.5 -z-10 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="max-w-lg mx-auto">
                    {/* ---------------------------------------------------- mobile */}
                    {step === 'mobile' && (
                        <Card className="border-0 shadow-card overflow-hidden">
                            {statusChecked && !registrationEnabled ? (
                                <CardContent className="pt-10 pb-8 px-6 md:px-10 text-center space-y-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">{L.closedTitle}</h2>
                                    <p className="text-muted-foreground">{L.closedDesc}</p>
                                    <Link to="/" className="block pt-2">
                                        <Button variant="outline" className="w-full h-12">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            {L.backHome}
                                        </Button>
                                    </Link>
                                </CardContent>
                            ) : (
                                <>
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-2xl">{TYPE_LABELS[regType][language]}</CardTitle>
                                        <CardDescription>{L.otpWhatsapp}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {(
                                            <>
                                                {error && (
                                                    <Alert variant="destructive" className="mb-4">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <AlertDescription>{error}</AlertDescription>
                                                    </Alert>
                                                )}
                                                <form onSubmit={handleMobileSubmit} className="space-y-6">
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="mobile">{L.mobile} *</Label>
                                                        <div className="flex items-stretch h-11 rounded-lg border border-input overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                                                            <div className="flex items-center px-4 bg-muted/50 border-r border-input text-muted-foreground font-medium text-sm">
                                                                +91
                                                            </div>
                                                            <Input
                                                                id="mobile"
                                                                type="tel"
                                                                inputMode="numeric"
                                                                placeholder={L.mobilePlaceholder}
                                                                value={mobile}
                                                                onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
                                                                disabled={loading}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button type="submit" className="w-full" size="lg" disabled={mobile.length !== 10 || loading}>
                                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        {L.sendOtp}
                                                    </Button>
                                                </form>
                                            </>
                                        )}
                                    </CardContent>
                                </>
                            )}
                        </Card>
                    )}

                    {/* ------------------------------------------------------- otp */}
                    {step === 'otp' && (
                        <Card className="border-0 shadow-card">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">{L.otpTitle}</CardTitle>
                                <CardDescription>{L.otpSentTo} +91 {mobile}</CardDescription>
                                <div className="mt-2 text-primary font-medium text-sm">{L.otpWhatsapp}</div>
                            </CardHeader>
                            <CardContent>
                                {error && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                <form onSubmit={handleOtpSubmit} className="space-y-6">
                                    <div className="flex justify-center">
                                        <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={loading}>
                                            <InputOTPGroup>
                                                {[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} />)}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <Button type="submit" className="w-full" size="lg" disabled={otp.length !== 6 || loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {L.verify}
                                    </Button>
                                    <div className="space-y-1.5">
                                        {resendCount < 2 && (
                                            <p className="text-center text-sm text-muted-foreground">
                                                {L.noCode}{' '}
                                                {resendTimer > 0 ? (
                                                    <span className="text-primary">{L.availableIn} {resendTimer} {L.seconds}</span>
                                                ) : (
                                                    <button type="button" onClick={handleResend} disabled={loading} className="text-primary hover:underline disabled:opacity-50">
                                                        {L.resend}
                                                    </button>
                                                )}
                                            </p>
                                        )}
                                        <div className="text-center">
                                            <Button type="button" variant="ghost" size="sm" disabled={loading}
                                                onClick={() => { setStep('mobile'); setOtp(''); setError(''); setResendCount(0); setResendTimer(0); }}>
                                                {L.changeNumber}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* ------------------------------------------------------ form */}
                    {step === 'form' && (
                        <Card className="border-0 shadow-card">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl">{L.detailsTitle}</CardTitle>
                                <CardDescription>{L.detailsDesc}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {error && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                    {/* Shared by all four types */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="full_name">{L.fullName} *</Label>
                                        <Input id="full_name" placeholder={L.fullNamePlaceholder}
                                            value={form.full_name} onChange={e => update('full_name', e.target.value)} required />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="address">{L.address} *</Label>
                                            <Input id="address" placeholder={L.addressPlaceholder}
                                                value={form.address} onChange={e => update('address', e.target.value)} required />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="state">{L.state} *</Label>
                                            <SearchableSelect
                                                id="state"
                                                value={form.state || ''}
                                                onChange={v => update('state', v)}
                                                options={INDIAN_STATES.map(s => ({ value: s, label: s }))}
                                                placeholder={L.statePlaceholder}
                                                searchPlaceholder={L.searchPlaceholder}
                                                emptyText={L.noResults}
                                            />
                                        </div>
                                    </div>

                                    {/* ------------------------------------------ animal */}
                                    {regType === 'animal' && (
                                        <>
                                            <div className="flex items-center gap-3 pt-1">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
                                                    {L.sectionAnimal}
                                                </span>
                                                <span className="h-px flex-1 bg-border" />
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="category">{L.category} *</Label>
                                                    <Select
                                                        value={form.category_code}
                                                        onValueChange={v => { update('category_code', v); update('breed_code', ''); }}
                                                    >
                                                        <SelectTrigger id="category"><SelectValue placeholder={L.categoryPlaceholder} /></SelectTrigger>
                                                        <SelectContent>
                                                            {ANIMAL_CATEGORIES.map(c => (
                                                                <SelectItem key={c.code} value={c.code}>{c[language]}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <Label htmlFor="breed">{L.breed} *</Label>
                                                    <Select
                                                        value={form.breed_code}
                                                        onValueChange={v => update('breed_code', v)}
                                                        disabled={!form.category_code}
                                                    >
                                                        <SelectTrigger id="breed">
                                                            <SelectValue placeholder={form.category_code ? L.breedPlaceholder : L.breedSelectCategoryFirst} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableBreeds.map(b => (
                                                                <SelectItem key={b.code} value={b.code}>{b[language]}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="tag_number">{L.tagNumber} *</Label>
                                                    <Input id="tag_number" placeholder={L.tagPlaceholder}
                                                        value={form.tag_number} onChange={e => update('tag_number', e.target.value.slice(0, 20))} required />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="milk_yield">{L.milkYield} *</Label>
                                                    <Input id="milk_yield" type="number" step="0.01" min="0" placeholder={L.milkYieldPlaceholder}
                                                        value={form.milk_yield} onChange={e => update('milk_yield', e.target.value)} required />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="recording_date">{L.recordingDate} *</Label>
                                                <Input id="recording_date" type="date"
                                                    value={form.proposed_milk_recording_date}
                                                    onChange={e => update('proposed_milk_recording_date', e.target.value)} required />
                                            </div>

                                            {/* MPO area — always shown, always required */}
                                            <div className="space-y-3 rounded-lg border border-border/70 bg-muted/30 p-3">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="mpo" className="font-medium">{L.mpoAreaQuestion} *</Label>
                                                    <SearchableSelect
                                                        id="mpo"
                                                        value={mpoChoice}
                                                        onChange={setMpoChoice}
                                                        options={[
                                                            ...MPO_LIST.map(m => ({ value: m, label: m })),
                                                            { value: MPO_OTHER, label: L.otherOption },
                                                        ]}
                                                        placeholder={L.mpoPlaceholder}
                                                        searchPlaceholder={L.searchPlaceholder}
                                                        emptyText={L.noResults}
                                                    />
                                                </div>

                                                {mpoChoice === MPO_OTHER && (
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="mpo_other">{L.mpoOther} *</Label>
                                                        <Input
                                                            id="mpo_other"
                                                            placeholder={L.mpoOtherPlaceholder}
                                                            value={mpoOther}
                                                            onChange={e => setMpoOther(e.target.value)}
                                                            maxLength={80}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {/* ----------------------------------------- visitor */}
                                    {regType === 'visitor' && (
                                        <>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="profession">{L.profession} *</Label>
                                                    <Select value={form.profession_code} onValueChange={v => update('profession_code', v)}>
                                                        <SelectTrigger id="profession"><SelectValue placeholder={L.professionPlaceholder} /></SelectTrigger>
                                                        <SelectContent>
                                                            {VISITOR_PROFESSIONS.map(p => (
                                                                <SelectItem key={p.code} value={p.code}>{p[language]}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <Label htmlFor="organisation_name">{L.organisationName}</Label>
                                                    <Input id="organisation_name" placeholder={L.organisationPlaceholder}
                                                        value={form.organisation_name} onChange={e => update('organisation_name', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="email">{L.email}</Label>
                                                <Input id="email" type="email" placeholder={L.emailPlaceholder}
                                                    value={form.email} onChange={e => update('email', e.target.value)} />
                                            </div>
                                        </>
                                    )}

                                    {/* -------------------------------- exhibitor / sponsor */}
                                    {(regType === 'exhibitor' || regType === 'sponsor') && (
                                        <>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="organisation">{L.organisationName} *</Label>
                                                    <Input id="organisation" placeholder={L.organisationPlaceholder}
                                                        value={form.organisation} onChange={e => update('organisation', e.target.value)} required />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="designation">{L.designation} *</Label>
                                                    <Input id="designation" placeholder={L.designationPlaceholder}
                                                        value={form.designation} onChange={e => update('designation', e.target.value)} required />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Consent — required for every registration type */}
                                    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-3">
                                        <Checkbox
                                            id="agree_terms"
                                            checked={agreed}
                                            onCheckedChange={v => setAgreed(v === true)}
                                            className="mt-0.5"
                                        />
                                        {/*
                                          * The link is a SIBLING of the label, not inside it: an anchor
                                          * nested in a <label> can have its click swallowed as a label
                                          * activation, toggling the checkbox instead of opening the tab.
                                          * A plain <a> (not react-router Link) is used so the new tab
                                          * loads /terms independently of this tab's router state.
                                          */}
                                        <p className="text-sm leading-relaxed">
                                            <Label
                                                htmlFor="agree_terms"
                                                className="font-normal leading-relaxed cursor-pointer"
                                            >
                                                {L.agreePrefix}
                                            </Label>{' '}
                                            <a
                                                href="/terms"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-primary underline underline-offset-2 inline-flex items-center gap-1"
                                            >
                                                {L.agreeLink}
                                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                            </a>
                                            {L.agreeSuffix ? ` ${L.agreeSuffix}` : ''} *
                                        </p>
                                    </div>

                                    <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {L.submit}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* --------------------------------------------------- success */}
                    {step === 'success' && (
                        hasPass ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {retrievedPass ? L.retrieveTitle : L.successTitle}
                                    </h2>
                                    <p className="text-muted-foreground mt-1">{L.successPassDesc}</p>
                                </div>
                                <PassCard
                                    type={regType as 'animal' | 'visitor'}
                                    fullName={retrievedPass ? retrievedPass.fullName : form.full_name}
                                    subtitle={retrievedPass ? retrievedPass.subtitle : passSubtitle}
                                    secondarySubtitle={
                                        retrievedPass
                                            ? retrievedPass.secondary
                                            : (regType === 'visitor' ? form.organisation_name : undefined)
                                    }
                                    registrationCode={registrationCode}
                                    verifyUrl={`${verifyBaseUrl || `${window.location.origin}/verify`}/${registrationCode}`}
                                />
                                <Link to="/" className="block">
                                    <Button variant="outline" size="lg" className="w-full">{L.backHome}</Button>
                                </Link>
                            </div>
                        ) : (
                            <Card className="border-0 shadow-card text-center">
                                <CardContent className="pt-8 pb-8">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success flex items-center justify-center">
                                        <CheckCircle className="w-10 h-10 text-success-foreground" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">{L.successTitle}</h2>
                                    <p className="text-muted-foreground mb-8">{L.successNoPassDesc}</p>
                                    <Link to="/">
                                        <Button variant="outline" size="lg" className="w-full">{L.backHome}</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    )}

                    {/* ----------------------------------------- already registered */}
                    {step === 'already_registered' && (
                        <Card className="border-0 shadow-card text-center">
                            <CardContent className="pt-8 pb-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <AlertCircle className="w-10 h-10 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">{L.alreadyTitle}</h2>
                                <p className="text-muted-foreground mb-6">{L.alreadyDesc}</p>

                                {hasPass && registrationCode && registrationCode !== 'REGISTERED' && (
                                    <div className="bg-muted rounded-xl p-6 mb-6">
                                        <p className="text-sm text-muted-foreground mb-2">{L.yourCode}</p>
                                        <p className="text-2xl font-bold text-primary font-mono">{registrationCode}</p>
                                    </div>
                                )}

                                {error && (
                                    <Alert variant="destructive" className="mb-4 text-left">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Re-issue the pass, gated by the same OTP check. */}
                                {hasPass && (
                                    <>
                                        <p className="text-sm text-muted-foreground mb-3">{L.retrieveDesc}</p>
                                        <Button
                                            size="lg"
                                            className="w-full mb-3 font-bold"
                                            onClick={handleRetrievePass}
                                            disabled={loading}
                                        >
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {L.downloadMyPass}
                                        </Button>
                                    </>
                                )}

                                <Link to="/">
                                    <Button variant="outline" size="lg" className="w-full">{L.backHome}</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Register;
