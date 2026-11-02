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
import videoClip3 from '@/assets/SliderImagess/download (2).mp4';
import exhibitorImg from '@/assets/grandPashuMela/Exhibitor.png';
import kashi3 from '@/assets/SliderImagess/DSC_4379.webp';
import kashi4 from '@/assets/SliderImagess/DSC_4411.webp';
import dineshGurjar from '@/assets/grandPashuMela/Dinesh_Gurjar.webp';
import kashi6 from '@/assets/SliderImagess/DSC_4665.webp';
import vinodMOG from '@/assets/grandPashuMela/Vinod_MOG.webp';

// Compressed Videos from assets/VideoSlider/
import videoKashi1 from '@/assets/VideoSlider/Website Rangeelo 2.O.mp4';
import videoKashi2 from '@/assets/VideoSlider/Wrap up Vo_compressed.mp4';
import videoJaipur from '@/assets/VideoSlider/Website rangeelo.mp4';

// Rangeelo Jaipur photos
import slide1 from '@/assets/SliderImagess/1 (3).png';
import slide2 from '@/assets/SliderImagess/2.webp';
import slide5 from '@/assets/SliderImagess/DEEP8797.JPG.jpeg';
import slide7 from '@/assets/SliderImagess/7.webp';
import slide8 from '@/assets/SliderImagess/8.webp';
import slide10 from '@/assets/SliderImagess/DSC_4599.webp';
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

interface HeroSlideItem {
  type: 'image' | 'video';
  src: string;
}

const heroSlides: HeroSlideItem[] = [
  // 1-8: Rangeelo Kashi 2026 photos / clips
  { type: 'image', src: kashi1 },
  { type: 'image', src: kashi2 },
  { type: 'video', src: videoClip3 }, // download (2).mp4 in place of third image slider
  { type: 'image', src: kashi3 },
  { type: 'image', src: kashi4 },
  { type: 'image', src: dineshGurjar },
  { type: 'image', src: kashi6 },
  { type: 'image', src: vinodMOG },

  // 9: Progressive Farmer Interaction image (DSC_4599.webp)
  { type: 'image', src: slide10 },

  // 10: Audience image (24.webp)
  { type: 'image', src: slide11 },

  // 11-12: Rangeelo Kashi videos
  { type: 'video', src: videoKashi1 },
  { type: 'video', src: videoKashi2 },

  // 13: Rangeelo Jaipur video
  { type: 'video', src: videoJaipur },

  // 14+: Rangeelo Jaipur photos
  { type: 'image', src: slide8 },
  { type: 'image', src: slide24 },
  { type: 'image', src: slide2 },
  { type: 'image', src: slide7 },
  { type: 'image', src: slide21 },
  { type: 'image', src: slide22 },
  { type: 'image', src: slide23 },
  { type: 'image', src: slide1 },
  { type: 'image', src: slide5 },
  { type: 'image', src: slide15 },
  { type: 'image', src: slide16 },
  { type: 'image', src: slide17 },
  { type: 'image', src: slide18 },
  { type: 'image', src: slide20 },
];

// Heading & stats text mapped to each slide source
const slideHeadings: Record<string, { number?: string; label: string; labelHi?: string }> = {
  // Rangeelo Kashi 2026
  [kashi2]: { number: '500+', label: 'Delegates', labelHi: 'डेलीगेट्स' },
  [videoClip3]: { number: '150+', label: 'Exhibitors', labelHi: 'प्रदर्शक' },
  [exhibitorImg]: { number: '150+', label: 'Exhibitors', labelHi: 'प्रदर्शक' },
  [kashi3]: { number: '', label: 'Featuring High \nGenetic Merit Bulls', labelHi: 'स्वदेशी नस्लें एवं\nउत्कृष्ट सांड प्रदर्शन' },
  [kashi4]: { number: '40+', label: 'NDS Merit Awards', labelHi: 'एनडीएस मेरिट अवार्ड्स एवं\nविद्यार्थी छात्रवृत्ति सम्मान' },
  [dineshGurjar]: { number: '21', label: 'Milking Champions \n Felicitated', labelHi: 'दुग्ध दोहन विजेता\nसम्मानित' },
  [kashi6]: { number: '10+', label: 'Cultural & Folk\nPerformances', labelHi: 'ढोल एवं सांस्कृतिक\nलोक नृत्य प्रस्तुतियाँ' },
  [vinodMOG]: { number: '150+', label: 'Pashu Mela\nParticipants', labelHi: 'पशु मेला\nप्रतिभागी' },

  // Rangeelo Jaipur (Visually matched to each slide image - Unchanged)
  [slide10]: { label: 'Progressive Farmer\nInteraction', labelHi: 'प्रगतिशील किसान\nसंवाद सत्र' },
  [slide24]: { number: '7+', label: 'One Milking Breeds', labelHi: 'उच्च आनुवंशिक\nयोग्यता वाली नस्लें' },
  [slide18]: { number: '', label: 'Live Demonstration\nZones', labelHi: 'प्रदर्शनी स्टॉल\nएवं लाइव ज़ोन' },
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
    () => (heroSlides[0] ? slideHeadings[heroSlides[0].src] || null : null)
  );
  const [headingKey, setHeadingKey] = useState(0);

  // Preload all slider images on mount
  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.type === 'image') {
        const img = new Image();
        img.src = slide.src;
      }
    });
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const currentSlide = heroSlides[swiper.realIndex];
    setActiveHeading(currentSlide ? slideHeadings[currentSlide.src] || null : null);
    setHeadingKey((prev) => prev + 1);

    // Play active slide's video (if video slide), pause all other videos
    if (swiper.slides && swiper.slides.length > 0) {
      const activeSlideEl = swiper.slides[swiper.activeIndex];
      const activeVideo = activeSlideEl ? (activeSlideEl.querySelector('video') as HTMLVideoElement | null) : null;

      if (activeVideo) {
        activeVideo.currentTime = 0;
        activeVideo.play().catch(() => {});
      }

      if (swiper.el) {
        const allVideos = swiper.el.querySelectorAll('video');
        allVideos.forEach((v) => {
          if (v !== activeVideo) {
            v.pause();
          }
        });
      }
    }
  }, []);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    const currentSlide = heroSlides[swiper.realIndex];
    if (currentSlide?.type === 'video') {
      const activeSlideEl = swiper.slides[swiper.activeIndex];
      const activeVideo = activeSlideEl ? (activeSlideEl.querySelector('video') as HTMLVideoElement | null) : null;
      if (activeVideo) {
        activeVideo.play().catch(() => {});
      }
    }
  }, []);

  // Spacebar to pause/resume swiper autoplay & video
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code !== 'Space' || e.target !== document.body) return;
    e.preventDefault();
    const swiper = swiperRef.current;
    if (!swiper) return;

    const activeSlideEl = swiper.slides ? swiper.slides[swiper.activeIndex] : null;
    const activeVideo = activeSlideEl ? (activeSlideEl.querySelector('video') as HTMLVideoElement | null) : null;

    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      activeVideo?.pause();
    } else {
      swiper.autoplay.start();
      activeVideo?.play().catch(() => {});
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
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
          allowTouchMove={true}
        >
          {heroSlides.map((slide, index) => {
            const slideImgClass =
              slide.src === kashi1
                ? 'hero-slide-kashi1'
                : slide.src === kashi2
                ? 'hero-slide-kashi2'
                : 'object-cover';

            return (
              <SwiperSlide
                key={index}
                data-swiper-autoplay={slide.src === videoClip3 ? 4000 : slide.type === 'video' ? 12000 : 4000}
                className="w-full h-full bg-black"
              >
                {slide.type === 'image' ? (
                  <div className="w-full h-full bg-black">
                    <img
                      src={slide.src}
                      alt={`Rangeelo Event ${index + 1}`}
                      className={`w-full h-full ${slideImgClass}`}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video
                      src={slide.src}
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onEnded={() => swiperRef.current?.slideNext()}
                    />
                  </div>
                )}
              </SwiperSlide>
            );
          })}
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

      {/* Heading animation keyframes & slide image/video framing */}
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
        .hero-slider-section .swiper-slide img.hero-slide-kashi1 {
          object-fit: cover !important;
          object-position: center 35% !important;
        }
        .hero-slider-section .swiper-slide img.hero-slide-kashi2 {
          object-fit: cover !important;
          object-position: center 75% !important;
        }
        .hero-slider-section .swiper-slide video {
          object-fit: cover !important;
          object-position: center center !important;
        }
        @media (max-width: 767px) {
          .hero-slider-section .swiper-slide img.hero-slide-kashi1,
          .hero-slider-section .swiper-slide img.hero-slide-kashi2,
          .hero-slider-section .swiper-slide video {
            object-fit: contain !important;
            object-position: center center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;