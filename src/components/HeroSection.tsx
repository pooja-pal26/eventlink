import { useLanguage } from '@/contexts/LanguageContext';
import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
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
import kashi3 from '@/assets/SliderImagess/DSC_4379.webp';
import kashi4 from '@/assets/SliderImagess/DSC_4411.webp';
import kashi5 from '@/assets/SliderImagess/DSC_4599.webp';
import kashi6 from '@/assets/SliderImagess/DSC_4665.webp';
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

// Import exhibition video clips (10s trimmed clips starting at requested timestamps)
import websiteRangeeloExhibitor10s from '@/assets/grandPashuMela/Website_rangeelo_exhibitor_10s.mp4';
import wrapUpExhibitor10s from '@/assets/grandPashuMela/Wrap_up_exhibitor_10s.mp4';

const kashiImages = [kashi1, kashi2, kashi3, kashi4, kashi5, kashi6];
const jaipurImages = [
  slide8, slide10, slide11, slide24,
  slide2, slide7, slide21, slide22,
  slide23, slide1, slide5, slide15,
  slide16, slide17, slide18, slide20
];

const videoList = [
  wrapUpExhibitor10s,          // Wrap up Vo clip (1:27 mark, 10s exhibitor clip)
  websiteRangeeloExhibitor10s, // Website Rangeelo 2.O clip (22s mark, 10s exhibitor clip)
];

// Heading & stats text mapped to each slide source
const slideHeadings: Record<string, { number?: string; label: string; labelHi?: string }> = {
  // Rangeelo Kashi 2026 (Shown first - Latest edition stats)
  [kashi1]: { number: '50,000+', label: 'Farmers &\nVisitors', labelHi: 'किसान एवं\nआगंतुक' },
  [kashi2]: { number: '₹ 50 Lakh+', label: 'Prize Money\nMilking Competition', labelHi: 'कुल पुरस्कार राशि\nदुग्ध दोहन प्रतियोगिता' },
  [kashi3]: { number: '21', label: 'Milking Champions\nHonoured', labelHi: 'दुग्ध दोहन विजेता\nसम्मानित' },
  [kashi4]: { number: '7', label: 'Indigenous & High-Yield\nBreed Categories', labelHi: 'स्वदेशी एवं उन्नत\nनस्ल श्रेणियाँ' },
  [kashi5]: { number: '500+', label: 'Progressive Farmers\n& Delegates', labelHi: 'प्रगतिशील किसान\nएवं प्रतिनिधि' },
  [kashi6]: { number: '150+', label: 'Exhibition Stalls\n& Live Zones', labelHi: 'प्रदर्शनी स्टॉल\nएवं लाइव ज़ोन' },

  // Exhibition Videos (10s exhibitor clips)
  [wrapUpExhibitor10s]: { number: '150+', label: 'Exhibitors', labelHi: 'प्रदर्शक' },
  [websiteRangeeloExhibitor10s]: { number: '150+', label: 'Exhibitors', labelHi: 'प्रदर्शक' },

  // Rangeelo Jaipur
  [slide8]: { number: '10+', label: 'Cultural & Folk\nPerformances', labelHi: 'सांस्कृतिक एवं लोक कला\nप्रदर्शन' },
  [slide10]: { label: 'Progressive Farmer\nInteractions', labelHi: 'प्रगतिशील किसान\nसंवाद' },
  [slide11]: { number: '50,000+', label: 'Visitors\n(Farmers & Students)', labelHi: 'आगंतुक\n(किसान एवं छात्र)' },
  [slide24]: { number: '7+', label: 'High Genetic\nMerit Breeds', labelHi: 'उच्च आनुवंशिक\nयोग्यता वाली नस्लें' },
  [slide22]: { number: '500+', label: 'Delegates', labelHi: 'प्रतिनिधि' },
  [slide2]: { number: '150+', label: 'Pashu Mela\nParticipants', labelHi: 'पशु मेला\nप्रतिभागी' },
  [slide7]: { number: '150+', label: 'Pashu Mela\nParticipants', labelHi: 'पशु मेला\nप्रतिभागी' },
  [slide21]: { number: '50,000+', label: 'Visitors\n(Farmers & Students)', labelHi: 'आगंतुक\n(किसान एवं छात्र)' },
  [slide23]: { label: 'Live Demonstration\nZones', labelHi: 'लाइव प्रदर्शन\nज़ोन' },
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

type SlideItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string };

function buildMixedSlides(): SlideItem[] {
  const slides: SlideItem[] = [];

  // 1. All Kashi images first (as requested)
  kashiImages.forEach((src) => {
    slides.push({ type: 'image', src });
  });

  // 2. First 10s exhibitor video clip right after Kashi images
  if (videoList[0]) {
    slides.push({ type: 'video', src: videoList[0] });
  }

  // 3. Jaipur images interleaved with the second 10s exhibitor video clip
  let vIndex = 1;
  for (let i = 0; i < jaipurImages.length; i++) {
    slides.push({ type: 'image', src: jaipurImages[i] });
    if ((i + 1) % 4 === 0 && vIndex < videoList.length) {
      slides.push({ type: 'video', src: videoList[vIndex] });
      vIndex++;
    }
  }

  return slides;
}

const mixedSlides = buildMixedSlides();

const IMAGE_SLIDE_DURATION_MS = 4000;

const HeroSection = () => {
  const { t, language } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);

  // --- Custom "one clock" advance engine (replaces Swiper's Autoplay module) ---
  const advanceTimerRef = useRef<number | null>(null); // setTimeout id for image slides
  const remainingMsRef = useRef<number>(IMAGE_SLIDE_DURATION_MS); // used for accurate pause/resume
  const timerStartedAtRef = useRef<number>(0);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeIsVideo, setActiveIsVideo] = useState(false);
  const [activeHeading, setActiveHeading] = useState<{ number?: string; label: string; labelHi?: string } | null>(null);
  const [headingKey, setHeadingKey] = useState(0);

  // Detect header visibility by checking its CSS classes directly (unchanged)
  useEffect(() => {
    const checkHeaderVisibility = () => {
      const header = document.querySelector('header');
      if (header) {
        const classes = header.className;
        const isHidden = classes.includes('opacity-0') || classes.includes('-translate-y-full');
        setIsHeaderVisible(!isHidden);
      }
    };

    const header = document.querySelector('header');
    if (header) {
      const observer = new MutationObserver(checkHeaderVisibility);
      observer.observe(header, { attributes: true, attributeFilter: ['class'] });
      header.addEventListener('transitionend', checkHeaderVisibility);
      checkHeaderVisibility();
      return () => {
        observer.disconnect();
        header.removeEventListener('transitionend', checkHeaderVisibility);
      };
    }
  }, []);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  // Preload all slider images on mount to eliminate blank screen when transitioning
  useEffect(() => {
    [...kashiImages, ...jaipurImages].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  // Pauses other videos and strips stale listeners without wiping decoded frames
  const pauseAllVideos = useCallback(() => {
    const swiper = swiperRef.current;
    const swiperEl = swiper?.el;
    if (!swiperEl) return;
    const activeSlideEl = swiper?.slides?.[swiper?.activeIndex];
    const currentVideo = activeSlideEl?.querySelector('video');

    swiperEl.querySelectorAll('video').forEach((v: HTMLVideoElement) => {
      if (v !== currentVideo) {
        v.pause();
        v.onended = null;
      }
    });
  }, []);

  // Starts (or restarts) the image auto-advance timer for a given duration.
  const scheduleImageAdvance = useCallback((durationMs: number) => {
    clearAdvanceTimer();
    remainingMsRef.current = durationMs;
    timerStartedAtRef.current = Date.now();
    advanceTimerRef.current = window.setTimeout(() => {
      remainingMsRef.current = 0;
      swiperRef.current?.slideNext();
    }, durationMs);
  }, [clearAdvanceTimer]);

  // Single source of truth: decide how the *current* active slide should advance.
  const advanceActiveSlide = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    clearAdvanceTimer();
    const currentSlide = mixedSlides[swiper.realIndex];
    if (!currentSlide) return;

    // Update heading for this slide
    const heading = slideHeadings[currentSlide.src] || null;
    setActiveHeading(heading);
    setHeadingKey((prev) => prev + 1);

    if (currentSlide.type === 'video') {
      setActiveIsVideo(true);

      // With loop=true, Swiper renders duplicated slide nodes, so we must read
      // the DOM element via activeIndex (not realIndex) to get the real <video>.
      const activeSlideEl = swiper.slides[swiper.activeIndex];
      const videoEl = activeSlideEl?.querySelector('video') as HTMLVideoElement | null;
      if (!videoEl) return;

      if (videoEl.currentTime > 0.5 && !videoEl.paused) {
        videoEl.currentTime = 0;
      }
      videoEl.onended = () => {
        swiper.slideNext();
      };

      if (!isPausedRef.current) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Video autoplay prevented', err);
            // Autoplay blocked by the browser — advance gracefully after 5s instead of instant blank skip
            if (!isPausedRef.current) {
              scheduleImageAdvance(5000);
            }
          });
        }
      }
    } else {
      setActiveIsVideo(false);
      if (!isPausedRef.current) {
        scheduleImageAdvance(IMAGE_SLIDE_DURATION_MS);
      } else {
        remainingMsRef.current = IMAGE_SLIDE_DURATION_MS;
      }
    }
  }, [clearAdvanceTimer, scheduleImageAdvance]);

  const handleSlideChange = useCallback(() => {
    pauseAllVideos();
    advanceActiveSlide();
  }, [pauseAllVideos, advanceActiveSlide]);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    advanceActiveSlide(); // kick off the first slide's timer/video manually
  }, [advanceActiveSlide]);

  // Spacebar to toggle pause/play — pauses the video OR the image timer, precisely.
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code !== 'Space' || e.target !== document.body) return;
    e.preventDefault();

    const swiper = swiperRef.current;
    if (!swiper) return;

    const currentSlide = mixedSlides[swiper.realIndex];
    const activeSlideEl = swiper.slides[swiper.activeIndex];
    const videoEl = activeSlideEl?.querySelector('video') as HTMLVideoElement | null;

    setIsPaused((prev) => {
      const next = !prev;
      isPausedRef.current = next;

      if (next) {
        // --- pausing ---
        if (currentSlide?.type === 'video') {
          videoEl?.pause();
        } else if (advanceTimerRef.current !== null) {
          const elapsed = Date.now() - timerStartedAtRef.current;
          remainingMsRef.current = Math.max(remainingMsRef.current - elapsed, 0);
          clearAdvanceTimer();
        }
      } else {
        // --- resuming ---
        if (currentSlide?.type === 'video') {
          videoEl?.play();
        } else {
          scheduleImageAdvance(
            remainingMsRef.current > 0 ? remainingMsRef.current : IMAGE_SLIDE_DURATION_MS
          );
        }
      }
      return next;
    });
  }, [clearAdvanceTimer, scheduleImageAdvance]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Cleanup on unmount: kill any pending timer, stop any playing video.
  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      pauseAllVideos();
    };
  }, [clearAdvanceTimer, pauseAllVideos]);

  return (
    <section id="hero" className="hero-slider-section relative min-h-screen flex items-end overflow-hidden bg-black">
      {/* Fullscreen Swiper Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Swiper
          modules={[EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={1000}
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
          allowTouchMove={false}
        >
          {mixedSlides.map((slide, index) => (
            <SwiperSlide key={index} className="w-full h-full bg-black">
              {slide.type === 'image' ? (
                <div className="w-full h-full bg-black">
                  <img
                    src={slide.src}
                    alt={`Rangeelo Event ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-black">
                  <video
                    src={slide.src}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Removed gradient overlays so image/video is 100% visible */}

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

      {/* Tagline */}
      <div className="relative z-10 w-full pb-5 md:pb-5">
        <div className="hero-tagline-banner inline-flex items-center pl-1 pr-1 md:pl-1 md:pr-2 lg:pl-3 lg:pr-2 py-1 md:py-2">
          {/* Commented out as requested: "comment out this (image 1) Book Stall or jo bhi likha hh." */}
          {/* {activeIsVideo ? (
            <div className="flex flex-col gap-1 md:gap-2 animate-fade-up">
              <h1 className="text-base md:text-xl lg:text-2xl font-extrabold tracking-tight drop-shadow-lg leading-snug" style={{ color: '#dd984a' }}>
                Asia's Largest Celebration of Farmers, Livestock & Rural Prosperity
              </h1>
              <Link
                to="/register?type=exhibitor"
                className="inline-block self-start bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm md:text-lg px-5 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg tracking-wide uppercase cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                Book a Stall
              </Link>
            </div>
          ) : ( */}
            <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold animate-fade-up tracking-tight whitespace-nowrap drop-shadow-lg" style={{ color: '#dd984a' }}>
              {t('hero.tagline')}
            </h1>
          {/* )} */}
        </div>
      </div>

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