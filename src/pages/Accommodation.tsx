import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Globe, Star, MapPin, Phone, Mail, ExternalLink,
    ChevronDown, Navigation, Search, Info, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOTELS, MEAL_PLANS, type Hotel, type Tariff } from '@/data/hotelsData';

type SortKey = 'distance' | 'price' | 'stars';

const COPY = {
    en: {
        title: 'Accommodation',
        lead: 'Special rates have been negotiated with the hotels below for Rangeelo guests. Book directly with the hotel and mention Rangeelo to get the listed tariff.',
        note: 'Rates are as shared by the hotels and are subject to availability and change. Taxes are extra unless the hotel has stated otherwise. Please confirm the final tariff, cancellation policy and check-in time with the hotel at the time of booking.',
        search: 'Search hotel or area',
        sortBy: 'Sort by',
        sortDistance: 'Nearest first',
        sortPrice: 'Lowest price',
        sortStars: 'Highest rating',
        allRatings: 'All ratings',
        star: 'Star',
        from: 'From',
        perNight: 'per night',
        onRequest: 'On request',
        fromVenue: 'from venue',
        viewTariff: 'View tariff',
        hideTariff: 'Hide tariff',
        single: 'Single',
        double: 'Double',
        triple: 'Triple',
        mealPlans: 'Meal plans',
        contact: 'Contact',
        email: 'Email',
        website: 'Website',
        directions: 'Directions',
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        showing: 'Showing',
        of: 'of',
        hotels: 'hotels',
        noResults: 'No hotels match your filters.',
        reset: 'Reset filters',
        back: 'Back to Home',
        taxesNote: 'Taxes extra unless stated',
    },
    hi: {
        title: 'आवास',
        lead: 'रंगीलो के अतिथियों के लिए नीचे दिए गए होटलों के साथ विशेष दरें तय की गई हैं। होटल से सीधे बुकिंग करें और सूचीबद्ध दर पाने के लिए रंगीलो का उल्लेख करें।',
        note: 'दरें होटलों द्वारा साझा की गई हैं तथा उपलब्धता और बदलाव के अधीन हैं। जब तक होटल ने अन्यथा न बताया हो, कर अतिरिक्त हैं। कृपया बुकिंग के समय होटल से अंतिम दर, रद्दीकरण नीति और चेक-इन समय की पुष्टि करें।',
        search: 'होटल या क्षेत्र खोजें',
        sortBy: 'क्रमबद्ध करें',
        sortDistance: 'निकटतम पहले',
        sortPrice: 'सबसे कम कीमत',
        sortStars: 'उच्चतम रेटिंग',
        allRatings: 'सभी रेटिंग',
        star: 'स्टार',
        from: 'से',
        perNight: 'प्रति रात',
        onRequest: 'अनुरोध पर',
        fromVenue: 'आयोजन स्थल से',
        viewTariff: 'दरें देखें',
        hideTariff: 'दरें छिपाएं',
        single: 'सिंगल',
        double: 'डबल',
        triple: 'ट्रिपल',
        mealPlans: 'भोजन योजना',
        contact: 'संपर्क',
        email: 'ईमेल',
        website: 'वेबसाइट',
        directions: 'रास्ता',
        checkIn: 'चेक-इन',
        checkOut: 'चेक-आउट',
        showing: 'दिखा रहे हैं',
        of: 'में से',
        hotels: 'होटल',
        noResults: 'आपके फ़िल्टर से कोई होटल मेल नहीं खाता।',
        reset: 'फ़िल्टर हटाएं',
        back: 'होम पर वापस जाएं',
        taxesNote: 'जब तक न बताया हो, कर अतिरिक्त',
    },
};

type Copy = (typeof COPY)['en'];

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

const mapsUrl = (h: Hotel) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${h.name}, ${h.address}`)}`;

/** One occupancy block of the tariff; renders nothing if the hotel gave no rates. */
const TariffRow = ({ label, tariff }: { label: string; tariff: Tariff }) => {
    if (!Object.keys(tariff).length) return null;
    return (
        <div className="py-2.5 border-b border-border/60 last:border-0">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">{label}</p>
            <dl className="grid gap-1.5">
                {MEAL_PLANS.filter(p => tariff[p.code]).map(p => (
                    <div key={p.code} className="flex gap-2 text-sm">
                        <dt className="shrink-0 w-11 font-semibold text-muted-foreground">{p.short}</dt>
                        <dd className="text-foreground/90">{tariff[p.code]}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

const HotelCard = ({ hotel, t }: { hotel: Hotel; t: Copy }) => {
    const [open, setOpen] = useState(false);
    const hasTariff = [hotel.single, hotel.double, hotel.triple].some(x => Object.keys(x).length);

    return (
        <article className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden flex flex-col">
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="font-bold text-lg text-foreground leading-tight">{hotel.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">{hotel.stars} {t.star}</span>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        {hotel.fromPrice ? (
                            <>
                                <p className="text-[11px] text-muted-foreground leading-none">{t.from}</p>
                                <p className="text-xl font-extrabold text-primary leading-tight">{inr(hotel.fromPrice)}</p>
                                <p className="text-[11px] text-muted-foreground leading-none">{t.perNight}</p>
                            </>
                        ) : (
                            <p className="text-sm font-semibold text-muted-foreground">{t.onRequest}</p>
                        )}
                    </div>
                </div>

                <p className="flex items-start gap-1.5 text-sm text-muted-foreground mt-3">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/10 text-primary rounded-full px-2.5 py-1">
                        <Navigation className="w-3 h-3" />
                        {hotel.distanceLabel} {t.fromVenue}
                    </span>
                    {hotel.checkIn && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                            <Clock className="w-3 h-3" />
                            {t.checkIn} {hotel.checkIn}
                            {hotel.checkOut && ` · ${t.checkOut} ${hotel.checkOut}`}
                        </span>
                    )}
                </div>

                {/* One-tap actions — most guests will be on a phone */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {hotel.phones.map(p => (
                        <a key={p} href={`tel:${p.replace(/\s/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors">
                            <Phone className="w-3.5 h-3.5" />{p}
                        </a>
                    ))}
                    {hotel.email && (
                        <a href={`mailto:${hotel.email}`}
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                            <Mail className="w-3.5 h-3.5" />{t.email}
                        </a>
                    )}
                    <a href={mapsUrl(hotel)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                        <Navigation className="w-3.5 h-3.5" />{t.directions}
                    </a>
                    {hotel.website && (
                        <a href={hotel.website} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />{t.website}
                        </a>
                    )}
                </div>

                {hotel.contactPerson && hotel.contactPerson.toLowerCase() !== hotel.name.toLowerCase() && (
                    <p className="text-xs text-muted-foreground mt-3">
                        {t.contact}: <span className="font-medium text-foreground/80">{hotel.contactPerson}</span>
                    </p>
                )}
            </div>

            {hasTariff && (
                <>
                    <button
                        onClick={() => setOpen(o => !o)}
                        aria-expanded={open}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-semibold text-primary border-t border-border/60 hover:bg-primary/5 transition-colors"
                    >
                        {open ? t.hideTariff : t.viewTariff}
                        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
                    </button>
                    {open && (
                        <div className="px-5 pb-5 pt-1 bg-muted/30">
                            <TariffRow label={t.single} tariff={hotel.single} />
                            <TariffRow label={t.double} tariff={hotel.double} />
                            <TariffRow label={t.triple} tariff={hotel.triple} />
                            <p className="text-[11px] text-muted-foreground mt-3">{t.taxesNote}</p>
                        </div>
                    )}
                </>
            )}
        </article>
    );
};

const Accommodation = () => {
    const { language, setLanguage } = useLanguage();
    const t = COPY[language];

    const [query, setQuery] = useState('');
    const [stars, setStars] = useState<number | 'all'>('all');
    const [sort, setSort] = useState<SortKey>('distance');

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return HOTELS
            .filter(h => stars === 'all' || h.stars === stars)
            .filter(h => !q || h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q))
            .slice()
            .sort((a, b) => {
                if (sort === 'stars') return b.stars - a.stars || a.distanceKm - b.distanceKm;
                // hotels with no derived price sort last rather than first
                if (sort === 'price') return (a.fromPrice ?? Infinity) - (b.fromPrice ?? Infinity);
                return a.distanceKm - b.distanceKm;
            });
    }, [query, stars, sort]);

    const starOptions = useMemo(
        () => [...new Set(HOTELS.map(h => h.stars))].sort((a, b) => b - a),
        [],
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
            <header className="bg-card/90 backdrop-blur-md shadow-soft border-b border-border sticky top-0 z-40">
                <div className="container-custom px-4 md:px-8 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline font-medium text-sm">{t.back}</span>
                    </Link>
                    <h1 className="text-center text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {t.title}
                    </h1>
                    <Button variant="ghost" size="sm" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="px-2 sm:px-3 text-foreground hover:bg-primary/10">
                        <Globe className="w-4 h-4 sm:mr-2" />
                        <span className="font-bold hidden sm:inline">{language === 'en' ? 'EN' : 'हि'}</span>
                    </Button>
                </div>
            </header>

            <main className="container-custom px-4 md:px-8 py-6 md:py-10">
                <div className="max-w-5xl mx-auto">
                    <p className="text-foreground/85 leading-relaxed max-w-3xl">{t.lead}</p>

                    <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20 max-w-3xl">
                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{t.note}</p>
                    </div>

                    {/* Meal plan legend — EP/CP/MAP/AP are hotel-trade jargon */}
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{t.mealPlans}:</span>
                        {MEAL_PLANS.map(p => (
                            <span key={p.code}>
                                <strong className="text-foreground/80">{p.short}</strong> — {p[language]}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={query} onChange={e => setQuery(e.target.value)}
                                placeholder={t.search} className="pl-9 bg-card" />
                        </div>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value as SortKey)}
                            aria-label={t.sortBy}
                            className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground"
                        >
                            <option value="distance">{t.sortDistance}</option>
                            <option value="price">{t.sortPrice}</option>
                            <option value="stars">{t.sortStars}</option>
                        </select>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button onClick={() => setStars('all')}
                            className={cn('text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors',
                                stars === 'all'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card text-muted-foreground border-border hover:bg-muted')}>
                            {t.allRatings}
                        </button>
                        {starOptions.map(s => (
                            <button key={s} onClick={() => setStars(s)}
                                className={cn('inline-flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors',
                                    stars === s
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-card text-muted-foreground border-border hover:bg-muted')}>
                                {s} <Star className={cn('w-3 h-3', stars === s ? 'fill-current' : 'fill-amber-400 text-amber-400')} />
                            </button>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto">
                            {t.showing} {visible.length} {t.of} {HOTELS.length} {t.hotels}
                        </span>
                    </div>

                    {visible.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">{t.noResults}</p>
                            <Button variant="outline" className="mt-4"
                                onClick={() => { setQuery(''); setStars('all'); }}>
                                {t.reset}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 mt-5">
                            {visible.map(h => <HotelCard key={h.id} hotel={h} t={t} />)}
                        </div>
                    )}

                    <Link to="/" className="block mt-10">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <ArrowLeft className="w-4 h-4 mr-2" />{t.back}
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Accommodation;
