import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PASS_BADGE, PASS_THEME } from '@/data/registrationConfig';
import bottamImg from '@/assets/bottam.png';

/**
 * The pass is the supplied artwork with a few fields drawn on top.
 *
 * public/pass-bg-animal.png and public/pass-bg-visitor.png already contain the
 * organiser + venue-partner logos, the Rangeelo mark, the PASHU MELA / VISITOR
 * badge and the footer illustration. This component only overlays the name,
 * subtitle lines, QR code and registration code — do not re-draw the rest.
 *
 * If an artwork file is missing the component falls back to a flat gradient so
 * the flow still completes rather than rendering a broken image.
 */

const BACKGROUNDS: Record<'animal' | 'visitor', string> = {
    animal: '/pass-bg-animal.png',
    visitor: '/pass-bg-visitor.png',
};

/** Artwork dimensions. Both templates are 806x1525 (visitor is 805, close enough). */
const PASS_W = 806;
const PASS_H = 1525;

/**
 * Overlay positions, measured against the artwork's two blank zones:
 *   name  — between the Rangeelo mark and the badge   (~760-960px of 1525)
 *   QR    — between the badge and the footer artwork  (~1060-1330px of 1525)
 * Values are the vertical CENTRE of each block as a % of pass height, so a
 * two-line (animal) and three-line (visitor) subtitle both stay centred.
 */
/*
 * Measured from the artwork pixels, not eyeballed:
 *   name zone 48.8→63.7 (centre 56.3) · badge 63.7→68.5 · QR zone 68.5→89.9 (centre 79.2)
 * The QR zone is only 21.4% tall, so the QR has to stay ≤26% of width or the
 * registration code runs into the footer illustration.
 */
const LAYOUT = {
    nameCenter: 56.3,
    qrCenter: 79,
    qrWidthPct: 26,
};

/**
 * Font sizes expressed as a fraction of pass width, so the rendering matches at
 * any size — including the 3x html2canvas capture. (cqw / vw units are unreliable
 * inside html2canvas, hence the measured-width approach.)
 */
const FONT_RATIO = {
    name: 0.062,
    subtitle: 0.040,
    code: 0.026,
};

interface PassCardProps {
    type: 'animal' | 'visitor';
    fullName: string;
    /** Animal passes show "Farmer"; visitor passes show profession then organisation. */
    subtitle?: string;
    secondarySubtitle?: string;
    registrationCode: string;
    verifyUrl: string;
}

const PassCard = ({
    type,
    fullName,
    subtitle,
    secondarySubtitle,
    registrationCode,
    verifyUrl,
}: PassCardProps) => {
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [bgFailed, setBgFailed] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [passWidth, setPassWidth] = useState(420);
    const passRef = useRef<HTMLDivElement>(null);
    const theme = PASS_THEME[type];

    // Track the rendered width so text scales with the artwork.
    useEffect(() => {
        const el = passRef.current;
        if (!el) return;
        const update = () => setPassWidth(el.getBoundingClientRect().width || 420);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const px = (ratio: number) => `${Math.round(passWidth * ratio)}px`;

    /**
     * Long names would wrap to a second line and eat the clearance around the
     * badge, so step the size down instead of letting the block grow.
     */
    const nameRatio =
        fullName.length > 24 ? FONT_RATIO.name * 0.74 :
        fullName.length > 17 ? FONT_RATIO.name * 0.86 :
        FONT_RATIO.name;

    useEffect(() => {
        QRCode.toDataURL(verifyUrl, {
            width: 640,
            margin: 0,
            // 'Q' (25% recovery) so the code still scans from a creased printout
            // or a phone screen at an angle on the gate.
            errorCorrectionLevel: 'Q',
            color: { dark: '#111111', light: '#FFFFFF' },
        })
            .then(setQrDataUrl)
            .catch(err => console.error('QR generation failed:', err));
    }, [verifyUrl]);

    const handleDownload = async () => {
        if (!passRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(passRef.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
            });
            const link = document.createElement('a');
            link.download = `rangeelo-pass-${registrationCode}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Pass download failed:', err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="w-full max-w-[420px] mx-auto">
            <div
                ref={passRef}
                className="relative w-full overflow-hidden rounded-2xl"
                style={{
                    aspectRatio: `${PASS_W} / ${PASS_H}`,
                    // Only visible if the artwork fails to load.
                    background: bgFailed
                        ? `linear-gradient(180deg, ${theme.pageFrom} 0%, ${theme.pageTo} 100%)`
                        : undefined,
                }}
            >
                {!bgFailed ? (
                    <img
                        src={BACKGROUNDS[type]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => setBgFailed(true)}
                    />
                ) : (
                    /**
                     * Fallback chrome, drawn only when the artwork file is absent.
                     * Approximates the template so a missing asset never ships a
                     * bare pass. Delete this branch once the artwork is permanent.
                     */
                    <div className="absolute inset-0">
                        {/* white card */}
                        <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-[7%]" style={{ top: '18%' }} />
                        {/* organiser logos */}
                        <div className="absolute left-0 right-0 flex items-center justify-center gap-[5%]" style={{ top: '22%' }}>
                            <img src="/nddb.png" alt="NDDB" className="object-contain" style={{ height: px(0.075) }} />
                            <img src="/nddbds.png" alt="NDS" className="object-contain" style={{ height: px(0.075) }} />
                        </div>
                        {/* Rangeelo mark */}
                        <div className="absolute left-0 right-0 flex justify-center" style={{ top: '29%' }}>
                            <img src="/LOGO RANGEELO.png" alt="Rangeelo" className="object-contain" style={{ height: px(0.24) }} />
                        </div>
                        {/* type badge, sits between the name block and the QR block */}
                        <div
                            className="absolute rounded-2xl text-center py-[2.5%]"
                            style={{ left: '8%', right: '8%', top: '61%', backgroundColor: theme.badgeBg }}
                        >
                            <span className="font-extrabold tracking-wide"
                                style={{ color: theme.badgeText, fontSize: px(0.075) }}>
                                {PASS_BADGE[type]}
                            </span>
                        </div>
                        <img src={bottamImg} alt="" className="absolute bottom-0 left-0 right-0 w-full" />
                    </div>
                )}

                {/* Name + subtitle lines */}
                <div
                    className="absolute left-0 right-0 px-[10%] text-center"
                    style={{ top: `${LAYOUT.nameCenter}%`, transform: 'translateY(-50%)' }}
                >
                    <p
                        className="font-extrabold text-gray-900 leading-tight break-words"
                        style={{ fontSize: px(nameRatio) }}
                    >
                        {fullName}
                    </p>
                    {subtitle && (
                        <p className="text-gray-700 leading-snug" style={{ fontSize: px(FONT_RATIO.subtitle) }}>
                            {subtitle}
                        </p>
                    )}
                    {secondarySubtitle && (
                        <p className="text-gray-700 leading-snug" style={{ fontSize: px(FONT_RATIO.subtitle) }}>
                            {secondarySubtitle}
                        </p>
                    )}
                </div>

                {/* QR + registration code */}
                <div
                    className="absolute left-0 right-0 flex flex-col items-center"
                    style={{ top: `${LAYOUT.qrCenter}%`, transform: 'translateY(-50%)' }}
                >
                    {qrDataUrl ? (
                        <img
                            src={qrDataUrl}
                            alt={`QR code for ${registrationCode}`}
                            style={{ width: `${LAYOUT.qrWidthPct}%` }}
                        />
                    ) : (
                        <div
                            className="flex items-center justify-center aspect-square"
                            style={{ width: `${LAYOUT.qrWidthPct}%` }}
                        >
                            <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
                        </div>
                    )}
                    <p
                        className="mt-[2%] font-mono tracking-[0.15em] text-gray-600"
                        style={{ fontSize: px(FONT_RATIO.code) }}
                    >
                        {registrationCode}
                    </p>
                </div>
            </div>

            <Button
                onClick={handleDownload}
                disabled={downloading || !qrDataUrl}
                size="lg"
                className="w-full mt-4 font-bold"
            >
                {downloading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Preparing…</>
                ) : (
                    <><Download className="w-4 h-4 mr-2" />Download Pass</>
                )}
            </Button>
        </div>
    );
};

export default PassCard;
