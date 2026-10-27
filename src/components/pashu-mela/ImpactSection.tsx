import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Dna, Award, Sprout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ImpactSection = () => {
  const { language } = useLanguage();

  const impacts = [
    {
      title: language === 'hi' ? "वैज्ञानिक डेयरी फार्मिंग को बढ़ावा देना" : "Promoting Scientific Dairy Farming",
      description: language === 'hi' ? "डेटा-संचालित प्रबंधन और इष्टतम पोषण को प्रोत्साहित करना।" : "Encouraging data-driven management and optimal nutrition.",
      icon: FlaskConical,
      delay: 0.1
    },
    {
      title: language === 'hi' ? "नस्ल सुधार को प्रोत्साहित करना" : "Encouraging Breed Improvement",
      description: language === 'hi' ? "बेहतर आनुवंशिकी और प्रजनन प्रथाओं को उजागर करना।" : "Highlighting superior genetics and breeding practices.",
      icon: Dna,
      delay: 0.2
    },
    {
      title: language === 'hi' ? "डेयरी उत्कृष्टता को मान्यता देना" : "Recognising Dairy Excellence",
      description: language === 'hi' ? "शीर्ष किसानों की कड़ी मेहनत और सफलता का जश्न मनाना।" : "Celebrating the hard work and success of top farmers.",
      icon: Award,
      delay: 0.3
    },
    {
      title: language === 'hi' ? "किसान विकास का समर्थन करना" : "Supporting Farmer Growth",
      description: language === 'hi' ? "टिकाऊ खेती के माध्यम से ग्रामीण समुदायों को सशक्त बनाना।" : "Empowering rural communities through sustainable farming.",
      icon: Sprout,
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 bg-[#7B1E3A] relative overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>

      <div className="container-custom mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {language === 'hi' ? 'स्थायी प्रभाव' : 'Our Enduring Impact'}
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: impact.delay, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-colors group"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#D97706] to-[#D4AF37] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <impact.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                {impact.title}
              </h3>
              <p className="text-white/80">
                {impact.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
