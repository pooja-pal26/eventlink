import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useInView, animate } from 'framer-motion';
import { Trophy, Award, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams, useNavigate } from 'react-router-dom';

/** Animated counter that counts up from 0 when scrolled into view */
const CountUp = ({ target, decimals = 0, delay = 0 }: { target: number; decimals?: number; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      if (ref.current) ref.current.textContent = (0).toFixed(decimals);
      motionVal.set(0);
      return;
    }

    const controls = animate(motionVal, target, {
      duration: 3.5,
      delay,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = v.toFixed(decimals);
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, decimals, delay, motionVal]);

  return <span ref={ref}>0</span>;
};

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city')?.toLowerCase();
  const isJaipur = city === 'jaipur';
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#F8F5F0]">
      {/* Animated gradient background / parallax elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-10 -left-20 w-96 h-96 bg-[#D97706]/10 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#7B1E3A]/10 rounded-full blur-[120px]"
      />

      <div className="container-custom relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Trophy className="w-20 h-20 text-[#D4AF37]" />
            </motion.div>
          </div> */}
          {/* Location Switcher Pills
          <div className="inline-flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-[#D4AF37]/30 shadow-md mb-6">
            <button
              onClick={() => navigate('/pashu-mela?city=jaipur')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                isJaipur
                  ? "bg-gradient-to-r from-[#7B1E3A] to-[#D97706] text-white shadow-md"
                  : "text-[#3A2A1F]/80 hover:text-[#7B1E3A]"
              }`}
            >
              {language === 'hi' ? 'रंगीलो जयपुर' : 'Rangeelo Jaipur'}
            </button>
            <button
              onClick={() => navigate('/pashu-mela?city=kashi')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                !isJaipur
                  ? "bg-gradient-to-r from-[#7B1E3A] to-[#D97706] text-white shadow-md"
                  : "text-[#3A2A1F]/80 hover:text-[#7B1E3A]"
              }`}
            >
              {language === 'hi' ? 'रंगीलो काशी' : 'Rangeelo Kashi'}
            </button>
          </div>
          */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#7B1E3A] mb-6 tracking-tight">
            {language === 'hi' ? 'भव्य पशु मेला' : 'Grand Pashu Mela'}
            <br />
            <span className="text-[#D97706]">
              {isJaipur
                ? (language === 'hi' ? 'दुग्ध दोहन प्रतियोगिता जयपुर 2026' : 'Milking Competition Jaipur 2026')
                : (language === 'hi' ? 'दुग्ध दोहन प्रतियोगिता काशी 2026' : 'Milking Competition Kashi 2026')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#3A2A1F]/80 max-w-3xl mx-auto mb-12 font-medium">
            {language === 'hi'
              ? 'भारत के सर्वश्रेष्ठ डेयरी किसानों और रिकॉर्ड तोड़ दूध उत्पादन का उत्सव'
              : "Celebrating India's Best Dairy Farmers and Record-Breaking Milk Yields"}
          </p>
        </motion.div>

        {/* Statistics Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {[
            { label: language === 'hi' ? 'विजेता' : 'Winners', target: 21, decimals: 0, prefix: "", suffix: "", icon: Users },
            { label: language === 'hi' ? 'नस्लें' : 'Breeds', target: 7, decimals: 0, prefix: "", suffix: "", icon: Award },
            { label: language === 'hi' ? 'रिकॉर्ड दूध उपज' : 'Record Milk Yield', target: 34.62, decimals: 2, prefix: "", suffix: language === 'hi' ? ' किग्रा' : ' Kg', icon: TrendingUp },
            { label: language === 'hi' ? 'पुरस्कार भुगतान' : 'Award Payouts', target: 50, decimals: 0, prefix: "₹ ", suffix: language === 'hi' ? ' लाख +' : ' Lakh +', icon: Trophy },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#D4AF37]/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <stat.icon className="w-8 h-8 text-[#D97706] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#7B1E3A] mb-1">
                {stat.prefix}<CountUp target={stat.target} decimals={stat.decimals} delay={i * 0.15} />{stat.suffix}
              </div>
              <div className="text-sm text-[#3A2A1F]/70 font-semibold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
