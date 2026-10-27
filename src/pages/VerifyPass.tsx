import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { verifyPass, type PassVerification } from '@/lib/registrationApi';

/**
 * Public landing page for the pass QR codes: /verify/:code
 * Shows only enough to confirm a pass is genuine — no mobile number, no email.
 */
const VerifyPass = () => {
    const { code } = useParams<{ code: string }>();
    const [result, setResult] = useState<PassVerification | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!code) {
            setResult({ valid: false });
            setLoading(false);
            return;
        }
        verifyPass(code)
            .then(setResult)
            .finally(() => setLoading(false));
    }, [code]);

    const rows: [string, string | undefined][] = result?.valid
        ? [
            ['Registration Code', result.registration_code],
            ['Name', result.full_name],
            ['Type', result.type === 'animal' ? 'Pashu Mela' : 'Visitor'],
            ['State', result.state || undefined],
            ['Category', result.category || undefined],
            ['Breed', result.breed || undefined],
            ['Profession', result.profession || undefined],
            ['Organisation', result.organisation || undefined],
            [
                'Registered On',
                result.registered_at
                    ? new Date(result.registered_at).toLocaleDateString('en-IN')
                    : undefined,
            ],
        ]
        : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted flex items-center justify-center px-4 py-10">
            <Card className="w-full max-w-md border-0 shadow-card">
                <CardContent className="pt-8 pb-8 px-6">
                    {loading ? (
                        <div className="flex flex-col items-center gap-3 py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Checking pass…</p>
                        </div>
                    ) : result?.valid ? (
                        <>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-9 h-9 text-success" />
                                </div>
                                <h1 className="text-2xl font-bold text-foreground">Valid Pass</h1>
                                {result.checked_in_at && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Checked in on{' '}
                                        {new Date(result.checked_in_at).toLocaleString('en-IN')}
                                    </p>
                                )}
                            </div>

                            <dl className="mt-6 divide-y divide-border rounded-xl border border-border overflow-hidden">
                                {rows
                                    .filter(([, value]) => value)
                                    .map(([label, value]) => (
                                        <div key={label} className="flex justify-between gap-4 px-4 py-3">
                                            <dt className="text-sm text-muted-foreground">{label}</dt>
                                            <dd className="text-sm font-medium text-foreground text-right">
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                            </dl>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center py-6">
                            <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center mb-4">
                                <XCircle className="w-9 h-9 text-destructive" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground">Pass Not Found</h1>
                            <p className="text-muted-foreground mt-2">
                                No registration matches <span className="font-mono">{code}</span>.
                            </p>
                        </div>
                    )}

                    <Link to="/" className="block mt-6">
                        <Button variant="outline" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Rangeelo
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyPass;
