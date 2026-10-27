import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aboutImg from '@/assets/AboutUs/about.jpg';
import pashuMela from '@/assets/pashu-mela.jpg';

const AboutSection1 = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#FDFCFA] overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image with Glare */}
            <div className="relative rounded-3xl overflow-hidden group w-11/12 ml-auto shadow-2xl">
              <img 
                src={aboutImg} 
                alt="Indian Pashu Mela" 
                className="w-full h-auto object-cover aspect-[4/3] md:aspect-[16/10]"
              />
              {/* Glare Effect */}
              <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-10" />
            </div>

            {/* Rotating Logo (Top Right) */}
            <div className="absolute -top-12 -right-6 md:-top-16 md:-right-10 w-32 h-32 md:w-44 md:h-44 flex items-center justify-center z-20 animate-[spin_12s_linear_infinite]">
              <img 
                src="/LOGO RANGEELO.png" 
                alt="Rangeelo Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Blob Image (Bottom Left) */}
            <div className="absolute -bottom-10 -left-6 md:-bottom-16 md:-left-12 w-48 h-48 md:w-64 md:h-64 z-20">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Blob Masked Image */}
                <div 
                  className="w-4/5 h-4/5 overflow-hidden shadow-2xl border-4 border-white"
                  style={{ borderRadius: "43% 57% 65% 35% / 54% 47% 53% 46%" }}
                >
                  <img 
                    src={pashuMela} 
                    alt="Cow Face" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Splatter Dots/Accents */}
                <div className="absolute top-[10%] left-[5%] w-4 h-4 bg-[#A38D82] rounded-full opacity-60" />
                <div className="absolute bottom-[20%] left-0 w-6 h-6 bg-[#7B1E3A] rounded-full opacity-40" />
                <div className="absolute -bottom-2 left-[40%] w-8 h-8 bg-[#D97706] rounded-full opacity-50" />
                <div className="absolute top-[30%] -right-2 w-5 h-5 bg-[#3A2A1F] rounded-full opacity-30" />
                <div className="absolute top-0 right-[20%] w-3 h-3 bg-[#7B1E3A] rounded-full opacity-60" />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 mt-16 lg:mt-0 px-4 md:px-0">
            {/* Small icon and line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-[#4A2D23]">
                {/* Custom Cow/Cattle Icon SVG */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8v4c0 1.5 1 3 2 3h12c1 0 2-1.5 2-3V8" />
                  <path d="M2 10h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z" />
                  <path d="M8 3v5" />
                  <path d="M16 3v5" />
                  <path d="M9 16v.01" />
                  <path d="M15 16v.01" />
                </svg>
              </div>
              <div className="w-20 h-[2px] bg-[#4A2D23]/30" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-[1.2] mb-6">
              About Us – Indian Pashu<br />Mela (IPM)
            </h2>

            <p className="text-lg md:text-xl text-[#666666] mb-6 leading-relaxed font-medium">
              The Indian Pashu Mela (IPM) is a visionary initiative created to place India's indigenous cow breeds on the global stage.
            </p>

            <p className="text-lg md:text-xl text-[#666666] mb-12 leading-relaxed">
              Rooted in the philosophy that every farmer and gaupalak (cattle keeper) deserves global recognition, ICS serves as a bridge between India's ancient rural wisdom and the modern world.
            </p>

            <Button 
              className="bg-[#5A201C] hover:bg-[#431613] text-white font-bold py-7 px-8 rounded-lg text-lg group shadow-xl transition-all hover:shadow-2xl"
            >
              Learn More About us
              <div className="ml-3 bg-white text-[#5A201C] rounded p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection1;
