import { useLanguage } from '@/contexts/LanguageContext';
import { useRef, useEffect, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import all slider images
// Rangeelo Kashi 2026 photos - shown first (WebP optimized for instant loading)
import kashi1 from '@/assets/SliderImagess/DSC_4148.webp';
import kashi2 from '@/assets/SliderImagess/DSC_4365.webp';
import exhibitorImg from '@/assets/grandPashuMela/Exhibitor.png';
import kashi3 from '@/assets/SliderImagess/DSC_4379.webp';
import kashi4 from '@/assets/SliderImagess/DSC_4411.webp';
import dineshMOG from '@/assets/grandPashuMela/Dinesh_Moment_of_Glory.webp';
import kashi6 from '@/assets/SliderImagess/DSC_4665.webp';

// Rangeelo Jaipur photos
import slide1 from '@/assets/SliderImagess/1 (3).png';
import slide2 from '@/assets/SliderImagess/2.webp';
import slide5 from '@/assets/SliderImagess/DEEP8797.JPG.jpeg';
import slide7 from '@/assets/SliderImagess/7.webp';
import slide8 from '@/assets/SliderImagess/8.webp';
import slide10 from '@/assets/SliderImagess/10.webp';
import slide11 from '@/assets/SliderImagess/24.webp';
import slide15 from '@/assets/SliderImagess/j39plxmlawhaqe9v7utp.webp';
import slide16 from '@/assets/SliderImagess/jkzqhrpwoawamttrtdx6.webp';
import slide17 from '@/assets/SliderImagess/ljjszthgbzsghzim45ud.webp';
import slide18 from '@/assets/SliderImagess/ngo6cehpk3jysuwx27f5.webp';
import slide20 from '@/assets/SliderImagess/ssgs3khcazdc61jcjrwn.webp';
import slide21 from '@/assets/SliderImagess/vsgau26ut7mhqciv71en.webp';
import slide22 from '@/assets/SliderImagess/xo0ouuzyhhkfleqro0eu.webp';
import slide23 from '@/assets/SliderImagess/xsrilhpnjhqzt0oiccrk.webp';
import slide24 from '@/assets/SliderImagess/cattle show jpg.jpeg';

const kashiImages = [kashi1, kashi2, exhibitorImg, kashi3, kashi4, dineshMOG, kashi6];
const jaipurImages = [
  slide8, slide10, slide11, slide24,
  slide2, slide7, slide21, slide22,
  slide23, slide1, slide5, slide15,
  slide16, slide17, slide18, slide20
];

const heroSlides = [...kashiImages, ...jaipurImages];

// Heading & stats text mapped to each slide source
const slideHeadings: Record<string, { number?: string; label: string; labelHi?: string }> = {
  // Rangeelo Kashi 2026
  [exhibitorImg]: { number: '150+', label: 'Exhibitor', labelHi: 'प्रदर्शक' },
  [kashi3]: { number: '7', label: 'Indigenous Breeds &\nElite Bull Showcase', labelHi: 'स्वदेशी नस्लें एवं\nउत्कृष्ट सांड प्रदर्शन' },
  [kashi4]: { number: '₹ 20,000', label: 'NDS Merit Awards &\nStudent Scholarship', labelHi: 'एनडीएस मेरिट अवार्ड्स एवं\nविद्यार्थी छात्रवृत्ति सम्मान' },
  [dineshMOG]: { number: '34.62 Kg', label: 'Milking Champion\n1st Prize Winner', labelHi: 'दुग्ध दोहन चैंपियन\nप्रथम पुरस्कार विजेता' },
  [kashi6]: { number: '10+', label: 'Dhol & Cultural Folk\nDance Performances', labelHi: 'ढोल एवं सांस्कृतिक\nलोक नृत्य प्रस्तुतियाँ' },

  // Rangeelo Jaipur (Visually matched to each slide image - Unchanged)
  [slide8]: { number: '10+', label: 'Cultural & Folk\nPerformances', labelHi: 'सांस्कृतिक एवं लोक कला\nप्रस्तुतियाँ' },
  [slide10]: { label: 'Progressive Farmer\nInteractions', labelHi: 'प्रगतिशील किसान\nसंवाद सत्र' },
  [slide11]: { number: '50,000+', label: 'Visitors\n(Farmers & Students)', labelHi: 'आगंतुक\n(किसान एवं छात्र)' },
  [slide24]: { number: '8', label: 'High Genetic\nMerit Breeds', labelHi: 'उच्च आनुवंशिक\nयोग्यता वाली नस्लें' },
  [slide7]: { number: '150+', label: 'Pashu Mela\nParticipants', labelHi: 'पशु मेला\nप्रतिभागी' },
  [slide21]: { number: '50,000+', label: 'Dairy Farmers\n& Visitors', labelHi: 'डेयरी किसान\nएवं आगंतुक' },
  [slide22]: { number: '500+', label: 'Dignitaries &\nDairy Leaders', labelHi: 'विशिष्ट अतिथि एवं\nडेयरी नेतृत्व' },
  [slide23]: { label: 'Live Machinery &\nTechnology Demo', labelHi: 'लाइव कृषि यंत्र एवं\nतकनीकी प्रदर्शन' },
  [slide1]: { label: 'Felicitation of\nDistinguished Guests', labelHi: 'विशिष्ट अतिथियों का\nअभिनंदन एवं सम्मान' },
  [slide5]: { number: '₹ 50 Lakh+', label: 'Prize Money &\nMerit Awards', labelHi: 'कुल पुरस्कार राशि\nएवं मेरिट सम्मान' },
  [slide15]: { number: '24', label: 'Milking Champions\nHonoured', labelHi: 'दुग्ध दोहन विजेता\nसम्मानित' },
  [slide16]: { label: "Welcome to India's\nLargest Pashu Mela", labelHi: 'भारत के भव्य\nपशु मेले में सुस्वागतम्' },
  [slide17]: { number: '500+', label: 'Delegates &\nIndustry Experts', labelHi: 'डेलीगेट्स एवं\nडेयरी विशेषज्ञ' },
  [slide18]: { number: '150+', label: 'Exhibition Stalls\n& Live Zones', labelHi: 'प्रदर्शनी स्टॉल\nएवं लाइव ज़ोन' },
  [slide20]: { label: 'Recognition of\nDairy Pioneers', labelHi: 'डेयरी नवाचार एवं\nप्रगतिशील किसान सम्मान' },
};

// Count-up component for hero slide numbers
function SlideCountUp({ value, animKey }: { value: string; animKey: number }) {
  const match = value.match(/^([₹]?\s*)([\d,]+)\s*(.*)$/);
  if (!match) return <>{value}</>;
  const prefix = match[1];
  const target = parseInt(match[2].replace(/,/g, ''), 10);
  const suffix = match[3];

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setDisplay(0);
    const duration = 1500;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * target));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animKey, target]);

  const fmt = (n: number) => {
    const s = n.toString();
    if (s.length <= 3) return s;
    return s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3);
  };

  return <>{prefix}{fmt(display)}{suffix ? ` ${suffix}` : ''}</>;
}

const HeroSection = () => {
  const { t, language } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeHeading, setActiveHeading] = useState<{ number?: string; label: string; labelHi?: string } | null>(
    () => slideHeadings[heroSlides[0]] || null
  );
  const [headingKey, setHeadingKey] = useState(0);

  // Preload all slider images on mount
  useEffect(() => {
    heroSlides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const currentImg = heroSlides[swiper.realIndex];
    setActiveHeading(slideHeadings[currentImg] || null);
    setHeadingKey((prev) => prev + 1);
  }, []);

  // Spacebar to pause/resume swiper autoplay
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code !== 'Space' || e.target !== document.body) return;
    e.preventDefault();
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="hero" className="hero-slider-section relative min-h-screen flex items-end overflow-hidden bg-black">
      {/* Fullscreen Swiper Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Swiper
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.hero-pagination',
            bulletClass: 'hero-dot',
            bulletActiveClass: 'hero-dot-active',
          }}
          navigation={{
            prevEl: '.hero-arrow-prev',
            nextEl: '.hero-arrow-next',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
          allowTouchMove={true}
        >
          {heroSlides.map((src, index) => (
            <SwiperSlide key={index} className="w-full h-full bg-black">
              <div className="w-full h-full bg-black">
                <img
                  src={src}
                  alt={`Rangeelo Event ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slide Heading Overlay — Top Right */}
      {activeHeading && (
        <div
          key={headingKey}
          className="absolute top-20 md:top-24 right-4 md:right-10 z-20 text-right pointer-events-none"
          style={{
            animation: 'heroHeadingIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div
            className="inline-block px-5 py-3 md:px-7 md:py-4 rounded-2xl"
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {activeHeading.number && (
              <p
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-none mb-1"
                style={{ color: '#dd984a' }}
              >
                <SlideCountUp value={activeHeading.number} animKey={headingKey} />
              </p>
            )}
            <p className="text-base md:text-xl lg:text-2xl font-bold text-white leading-snug whitespace-pre-line">
              {language === 'hi' && activeHeading.labelHi ? activeHeading.labelHi : activeHeading.label}
            </p>
          </div>
        </div>
      )}

      {/* Left / Right Arrow Buttons */}
      <button className="hero-arrow hero-arrow-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      <button className="hero-arrow hero-arrow-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20" aria-label="Next slide">
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Tagline commented out as requested */}
      {/*
      <div className="relative z-10 w-full pb-5 md:pb-5">
        <div className="hero-tagline-banner inline-flex items-center pl-1 pr-1 md:pl-1 md:pr-2 lg:pl-3 lg:pr-2 py-1 md:py-2">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold animate-fade-up tracking-tight whitespace-nowrap drop-shadow-lg" style={{ color: '#dd984a' }}>
            {t('hero.tagline')}
          </h1>
        </div>
      </div>
      */}

      <div className="hero-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" />

      {/* Heading animation keyframes */}
      <style>{`
        @keyframes heroHeadingIn {
          0% {
            opacity: 0;
            transform: translateY(-20px) translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
