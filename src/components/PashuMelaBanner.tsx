import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useInView, animate } from 'framer-motion';
import { Trophy, ArrowRight, Award, Dna, Droplets, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import cattleShowVideo from '@/assets/grandPashuMela/Cattle show.mp4';

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

const PashuMelaBanner = () => {
  const { t, language } = useLanguage();

  const stats = [
    { target: 24, decimals: 0, prefix: "", suffix: "", label: t('pashu_mela.banner.winners'), icon: Award },
    { target: 8, decimals: 0, prefix: "", suffix: "", label: t('pashu_mela.banner.breeds'), icon: Dna },
    { target: 64.4, decimals: 1, prefix: "", suffix: language === 'hi' ? " किग्रा" : " Kg", label: t('pashu_mela.banner.record_yield'), icon: Droplets },
    { target: 50, decimals: 0, prefix: "₹ ", suffix: language === 'hi' ? " लाख +" : " Lakh +", label: t('pashu_mela.banner.award_payouts'), icon: Globe },
  ];

  return (
    <section className="relative py-20 
    overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          src={cattleShowVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B1E3A]/90 via-[#7B1E3A]/50 to-transparent" />
      </div>

      <div className="relative z-10 pl-6 md:pl-12 lg:pl-20">
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
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
             {t('pashu_mela.banner.title')}
            </h2>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              {t('pashu_mela.banner.desc')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-10 max-w-3xl">
              {stats.map((stat, index) => (
                <Link to="/pashu-mela" key={index} className="block h-full">
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

            <Link to="/pashu-mela">
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

      {/* Decorative Gold Elements */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block pointer-events-none">
        <div className="absolute top-1/2 right-20 -translate-y-1/2 w-96 h-96 bg-[#D97706] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>
    </section>
  );
};

export default PashuMelaBanner;
