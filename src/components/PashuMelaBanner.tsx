import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useInView, animate, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Award, Dna, Droplets, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import cattleShowVideo from '@/assets/grandPashuMela/Cattle show.mp4';
import kashiVideo from '@/assets/grandPashuMela/Website rangeelo 2.mp4';

/** Animated counter that counts up from 0 when scrolled into view */
const CountUp = ({ target, decimals = 0, delay = 0 }: { target: number; decimals?: number; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, target, {
      duration: 3.5,
      delay,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [isInView, target, decimals, delay, motionVal]);

  return <span ref={ref}>0</span>;
};

const EDITIONS = [
  {
    id: 'kashi' as const,
    video: kashiVideo,
    titleEn: "One of India's Largest Pashu Mela Kashi",
    titleHi: "भारत के सबसे बड़े पशु मेलों में से एक (काशी)",
    href: '/pashu-mela/kashi',
  },
  {
    id: 'jaipur' as const,
    video: cattleShowVideo,
    titleEn: "One of India's Largest Pashu Mela Jaipur",
    titleHi: "भारत के सबसे बड़े पशु मेलों में से एक (जयपुर)",
    href: '/pashu-mela/jaipur',
  },
];

const PashuMelaBanner = () => {
  const { t, language } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 0 = Kashi (First), 1 = Jaipur (Second)
  const currentEdition = EDITIONS[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % EDITIONS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + EDITIONS.length) % EDITIONS.length);
  }, []);

  // Auto-advance slider every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const stats = [
    { target: 21, decimals: 0, prefix: "", suffix: "", label: t('pashu_mela.banner.winners'), icon: Award },
    { target: 7, decimals: 0, prefix: "", suffix: "", label: t('pashu_mela.banner.breeds'), icon: Dna },
    { target: 34.62, decimals: 2, prefix: "", suffix: language === 'hi' ? " किग्रा" : " Kg", label: t('pashu_mela.banner.record_yield'), icon: Droplets },
    { target: 50, decimals: 0, prefix: "₹ ", suffix: language === 'hi' ? " लाख +" : " Lakh +", label: t('pashu_mela.banner.award_payouts'), icon: Globe },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Background with video crossfade */}
      <div className="absolute inset-0 z-0 bg-black">
        {EDITIONS.map((ed, index) => (
          <video 
            key={ed.id}
            src={ed.video} 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlideIndex ? 'opacity-70 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B1E3A]/90 via-[#7B1E3A]/50 to-transparent z-[2]" />
      </div>

      {/* Slider Left / Right Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        aria-label="Previous edition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        aria-label="Next edition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="relative z-10 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16">
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">
                {t('pashu_mela.banner.competition')}
              </span>
            </div>
            
            {/* Dynamic Title: Shows Kashi when Kashi video plays, and Jaipur when Jaipur video plays */}
            <AnimatePresence mode="wait">
              <motion.h2 
                key={currentEdition.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
              >
                {language === 'hi' ? currentEdition.titleHi : currentEdition.titleEn}
              </motion.h2>
            </AnimatePresence>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              {t('pashu_mela.banner.desc')}
            </p>

            {/* Same content & stats cards for both */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-10 max-w-3xl">
              {stats.map((stat, index) => (
                <Link to={currentEdition.href} key={index} className="block h-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className="text-[#D97706] mb-3 group-hover:scale-110 transition-transform origin-left">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors whitespace-nowrap tracking-tight">
                      {stat.prefix}<CountUp target={stat.target} decimals={stat.decimals} delay={index * 0.15} />{stat.suffix}
                    </div>
                    <div className="text-sm font-medium text-white/60 uppercase tracking-wider mt-auto pt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <Link to={currentEdition.href}>
              <Button 
                size="lg" 
                className="bg-[#D97706] hover:bg-[#D4AF37] text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-[#D97706]/30 hover:-translate-y-1 transition-all group"
              >
                {t('pashu_mela.banner.register')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slider Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {EDITIONS.map((ed, idx) => (
          <button
            key={ed.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlideIndex
                ? 'w-8 h-2.5 bg-[#D4AF37]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Switch to ${ed.id}`}
          />
        ))}
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block pointer-events-none">
        <div className="absolute top-1/2 right-20 -translate-y-1/2 w-96 h-96 bg-[#D97706] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>
    </section>
  );
};

export default PashuMelaBanner;
