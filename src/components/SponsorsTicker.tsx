import { useLanguage } from "@/contexts/LanguageContext";

// Paths must match the filenames in /public exactly: Vercel serves files
// case-sensitively, so "10.PNG" cannot be written as "10.png".

type Card = { logo: string; en: string; hi: string };

// One row per group, top to bottom: Platinum, Diamond + Gold, partners.
const tiers: { cards: Card[]; cardClass: string }[] = [
    {
        cards: [{ logo: "/p.png", en: "Platinum Sponsor", hi: "प्लैटिनम प्रायोजक" }],
        cardClass: "w-60 md:w-72 h-28 md:h-32",
    },
    {
        cards: [
            { logo: "/d.jpeg", en: "Diamond Sponsor", hi: "डायमंड प्रायोजक" },
            { logo: "/g.png", en: "Gold Sponsor", hi: "गोल्ड प्रायोजक" },
            { logo: "/g2.png", en: "Gold Sponsor", hi: "गोल्ड प्रायोजक" },
        ],
        cardClass: "w-40 md:w-52 h-20 md:h-24",
    },
    {
        cards: [
            { logo: "/1.png", en: "Banking Excellence Partner", hi: "बैंकिंग उत्कृष्टता भागीदार" },
            { logo: "/2.png", en: "Music Streaming Partner", hi: "म्यूज़िक स्ट्रीमिंग भागीदार" },
        ],
        cardClass: "w-40 md:w-52 h-20 md:h-24",
    },
];

const sponsorLogos = [
    "/3.jpeg", "/4.jpeg", "/5.png",
    "/6.png", "/7.jpeg", "/8.jpeg", "/9.png", "/10.PNG",
    "/11.png", "/12.png", "/13.png", "/14.jpg", "/15.jpeg",
    "/16.png", "/17.png", "/18.jpeg", "/19.jpeg", "/20.jpeg",
    "/21.jpeg", "/22.jpeg", "/23.png", "/24.png", "/25.png", "/26.jpeg",
];

// The shared .animate-scroll runs 30s for 8 logos; scale it so this list
// moves at the same speed instead of faster.
const SCROLL_DURATION = `${Math.round((30 * sponsorLogos.length) / 8)}s`;

const SponsorsTicker = () => {
    const { t, language } = useLanguage();

    return (
        <div className="bg-muted/40 border-y border-border py-4 md:py-5 overflow-hidden relative">
            <div className="container-custom mb-3">
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    {t('sponsors.supported_by')}
                </p>
            </div>

            {/* Tiered sponsors: Platinum, then Diamond + Gold, then partners */}
            <div className="container-custom px-4 mb-4 space-y-3">
                {tiers.map((tier, i) => (
                    <div key={i} className="flex flex-wrap justify-center gap-3 md:gap-6">
                        {tier.cards.map((card) => (
                            <div key={card.logo} className="flex flex-col items-center">
                                <div
                                    className={`${tier.cardClass} max-w-[80vw] bg-white rounded-xl border border-border shadow-sm p-2 flex items-center justify-center`}
                                >
                                    <img
                                        src={card.logo}
                                        alt={card[language]}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <p className="mt-1 text-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-foreground/80 leading-tight">
                                    {card[language]}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Scrolling sponsors */}
            <div className="flex w-full overflow-hidden">
                <div
                    className="flex animate-scroll whitespace-nowrap py-1"
                    style={{ animationDuration: SCROLL_DURATION }}
                >
                    {[...sponsorLogos, ...sponsorLogos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center shrink-0 mx-2 md:mx-3 h-16 md:h-20 w-32 md:w-44 bg-white rounded-xl border border-border shadow-sm p-2"
                        >
                            <img
                                src={logo}
                                alt={index < sponsorLogos.length ? "Sponsor" : ""}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SponsorsTicker;
