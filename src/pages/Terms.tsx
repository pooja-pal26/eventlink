import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    TERMS,
    TERMS_UPDATED,
    TERMS_PHONE,
    TERMS_PHONE_DISPLAY,
} from '@/data/termsContent';

/**
 * Public Terms & Conditions / DPDP consent notice at /terms.
 * Linked from the mandatory consent checkbox on every registration form.
 *
 * DPDP s.5(3) requires the notice to be readable in English or an Eighth
 * Schedule language, so this page carries its own language toggle rather than
 * relying on the user having already switched the site language.
 *
 * Numbering (1, 1.1, 1.5.1) uses CSS counters rendered via ::before —
 * `list-style: none` suppresses ::marker in some browsers (Safari especially).
 */
const Terms = () => {
    const { language, setLanguage } = useLanguage();
    const doc = TERMS[language];

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
            <style>{`
                .legal { counter-reset: sec; }
                .legal > li { counter-increment: sec; }
                .legal > li > .sec-head::before { content: counter(sec) ". "; }
                .legal ol.lvl2 { counter-reset: sub; }
                .legal ol.lvl2 > li {
                    counter-increment: sub;
                    position: relative;
                    padding-left: 2.75rem;
                }
                .legal ol.lvl2 > li::before {
                    content: counter(sec) "." counter(sub);
                    position: absolute; left: 0; top: 0;
                    color: hsl(var(--muted-foreground));
                    font-variant-numeric: tabular-nums;
                    font-weight: 600;
                }
                .legal ol.lvl3 { counter-reset: subsub; }
                .legal ol.lvl3 > li {
                    counter-increment: subsub;
                    position: relative;
                    padding-left: 3.25rem;
                }
                .legal ol.lvl3 > li::before {
                    content: counter(sec) "." counter(sub) "." counter(subsub);
                    position: absolute; left: 0; top: 0;
                    color: hsl(var(--muted-foreground));
                    font-variant-numeric: tabular-nums;
                }
            `}</style>

            <header className="bg-card/90 backdrop-blur-md shadow-soft border-b border-border sticky top-0 z-40">
                <div className="container-custom px-4 md:px-8 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline font-medium text-sm">
                            {language === 'en' ? 'Back' : 'वापस'}
                        </span>
                    </Link>
                    <h1 className="text-center text-sm sm:text-lg font-bold text-foreground leading-tight px-1">
                        {doc.title}
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="px-2 sm:px-3 text-foreground hover:bg-primary/10"
                    >
                        <Globe className="w-4 h-4 sm:mr-2" />
                        <span className="font-bold hidden sm:inline">{language === 'en' ? 'EN' : 'हि'}</span>
                    </Button>
                </div>
            </header>

            <main className="container-custom px-4 md:px-8 py-8 md:py-12">
                <article className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{doc.title}</h2>
                    <p className="text-sm md:text-base font-semibold text-primary mt-2 leading-snug">
                        {doc.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                        {doc.updatedLabel}: {TERMS_UPDATED}
                    </p>

                    <p className="mt-6 text-foreground/85 leading-relaxed">{doc.intro}</p>

                    <ol className="legal mt-8 space-y-7 list-none pl-0">
                        {doc.sections.map(section => (
                            <li key={section.heading}>
                                <h3 className="sec-head font-bold text-foreground text-lg mb-3">
                                    {section.heading}
                                </h3>

                                <ol className="lvl2 list-none pl-0 space-y-3">
                                    {section.items.map(item => (
                                        <li key={item.text} className="text-foreground/85 leading-relaxed">
                                            {item.text}

                                            {item.subs && (
                                                <ol className="lvl3 list-none pl-0 mt-2 space-y-2">
                                                    {item.subs.map(sub => (
                                                        <li key={sub} className="text-foreground/80 leading-relaxed">
                                                            {sub}
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-10 pt-6 border-t border-border">
                        <h3 className="font-bold text-foreground text-lg">{doc.contactHeading}</h3>
                        {doc.contactLines.map(line => (
                            <p key={line} className="mt-1 text-foreground/85">{line}</p>
                        ))}
                        <p className="mt-3">
                            <a
                                href={`tel:${TERMS_PHONE}`}
                                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                            >
                                <Phone className="w-4 h-4" />
                                {doc.phoneLabel}: {TERMS_PHONE_DISPLAY}
                            </a>
                        </p>
                    </div>

                    <Link to="/" className="block mt-8">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'Back to Home' : 'होम पर वापस जाएं'}
                        </Button>
                    </Link>
                </article>
            </main>
        </div>
    );
};

export default Terms;
