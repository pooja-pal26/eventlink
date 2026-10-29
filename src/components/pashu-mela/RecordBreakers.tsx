import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useInView, animate } from 'framer-motion';
import { Crown, Star, Medal, ArrowUpRight, Trophy, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams, useParams } from 'react-router-dom';

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

export const RecordBreakers = () => {
  const { language } = useLanguage();
  const { city: pathCity } = useParams<{ city?: string }>();
  const [searchParams] = useSearchParams();
  const city = (pathCity || searchParams.get('city') || 'kashi').toLowerCase();
  const isJaipur = city === 'jaipur';

  const records = [
    {
      title: language === 'hi' ? "सर्वाधिक दूध उपज" : "Highest Milk Yield",
      value: "34.62",
      unit: language === 'hi' ? "किग्रा" : "Kg",
      subtitle: language === 'hi' ? "HFCB श्रेणी (24 घंटे)" : "HFCB Category (24 Hours)",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.4)",
      link: "#breed-showcase",
      tabId: "hfcb"
    },
    {
      title: language === 'hi' ? "सर्वश्रेष्ठ स्वदेशी नस्ल" : "Best Indigenous Breed",
      value: "18.58",
      unit: language === 'hi' ? "किग्रा" : "Kg",
      subtitle: language === 'hi' ? "गंगातीरी श्रेणी" : "Gangatiri Category",
      icon: Star,
      color: "from-amber-400 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.4)",
      link: "#breed-showcase",
      tabId: "gangatiri"
    },
    {
      title: language === 'hi' ? "सर्वश्रेष्ठ भैंस नस्ल" : "Best Buffalo Breed",
      value: "26.94",
      unit: language === 'hi' ? "किग्रा" : "Kg",
      subtitle: language === 'hi' ? "मुर्रा श्रेणी" : "Murrah Category",
      icon: Medal,
      color: "from-fuchsia-500 to-purple-600",
      glowColor: "rgba(217, 70, 239, 0.4)",
      link: "#breed-showcase",
      tabId: "buffalo"
    },
    {
      title: language === 'hi' ? "शीर्ष डेयरी किसान" : "Top Dairy Farmer",
      value: language === 'hi' ? "श्री दिनेश गुर्जर" : "Shri Dinesh Gurjar",
      unit: "",
      subtitle: language === 'hi' ? "अजमेर, राजस्थान" : "Ajmer, Rajasthan",
      icon: Crown,
      color: "from-rose-500 to-red-600",
      glowColor: "rgba(244, 63, 94, 0.4)",
      link: "#success-stories"
    }
  ];

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/10 blur-[150px]" />
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>
      
      <div className="container-custom mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto mb-20 px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-zinc-200 uppercase tracking-[0.2em]">{language === 'hi' ? 'हॉल ऑफ़ फ़ेम' : 'Hall of Fame'}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-6 tracking-tight whitespace-normal md:whitespace-nowrap"
          >
            {isJaipur
              ? (language === 'hi' ? 'मुख्य श्रेणियाँ और रिकॉर्ड (रंगीलो जयपुर)' : 'Milestone Record Breakers (Rangeelo Jaipur)')
              : (language === 'hi' ? 'मुख्य श्रेणियाँ और रिकॉर्ड (रंगीलो काशी)' : 'Milestone Record Breakers (Rangeelo Kashi)')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {language === 'hi'
              ? 'विभिन्न श्रेणियों में डेयरी उद्योग में नए मानक स्थापित करने वाली असाधारण उपलब्धियों के साक्षी बनें।'
              : 'Witness the exceptional achievements that set new benchmarks in the dairy industry across various categories.'}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {records.map((record, index) => (
            <motion.a
              href={record.link}
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative group block cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (record.tabId) {
                  window.dispatchEvent(new CustomEvent('changeBreedTab', { detail: record.tabId }));
                }
                document.querySelector(record.link)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Animated Glow behind card */}
              <div 
                className="absolute inset-0 rounded-[2rem] blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100"
                style={{ background: record.glowColor, transform: 'scale(0.9)' }}
              />
              
              <div className="relative h-full rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl p-8 overflow-hidden flex flex-col transition-all duration-500 group-hover:border-white/20 group-hover:bg-zinc-900/60 shadow-2xl">
                
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-150%] group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg]" />

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${record.color} shadow-[0_0_30px_rgba(0,0,0,0.3)] relative group-hover:scale-110 transition-transform duration-500`}>
                    <div className="absolute inset-0 rounded-2xl blur-md opacity-40 bg-inherit" />
                    <record.icon className="w-7 h-7 text-white relative z-10" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-500 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                
                <div className="relative z-10 flex-grow flex flex-col items-center text-center">
                  <h3 className="text-zinc-400 font-medium text-xs mb-3 tracking-[0.15em] uppercase h-8 flex items-center justify-center">
                    {record.title}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1.5 mb-auto">
                    <span className={`font-black text-white tracking-tighter ${!record.unit ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'}`}>
                      {isNaN(Number(record.value)) ? (
                        record.value
                      ) : (
                        <CountUp target={Number(record.value)} decimals={record.value.includes('.') ? 2 : 0} delay={index * 0.15 + 0.2} />
                      )}
                    </span>
                    {record.unit && (
                      <span className="text-xl font-bold text-zinc-500">
                        {record.unit}
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-1 rounded-full my-5 opacity-30 group-hover:opacity-100 group-hover:w-full transition-all duration-700 ease-out mx-auto" 
                       style={{ background: `linear-gradient(to right, transparent, ${record.glowColor.replace('0.4', '1')}, transparent)` }} />
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 h-10 flex items-center justify-center">
                    {record.subtitle}
                  </p>
                </div>

              </div>
            </motion.a>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </section>
  );
};
