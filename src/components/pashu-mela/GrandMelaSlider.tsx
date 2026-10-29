import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Import Jaipur images
import img1 from '@/assets/grandPashuMela/BSP_9813.JPG (1).jpeg';
import img2 from '@/assets/grandPashuMela/BSP_9823.JPG.jpeg';
import img3 from '@/assets/grandPashuMela/BSP_9846.JPG.jpeg';
import img4 from '@/assets/grandPashuMela/BSP_9864.JPG.jpeg';
import img5 from '@/assets/grandPashuMela/BSP_9882.JPG.jpeg';
import img6 from '@/assets/grandPashuMela/BSP_9907.JPG.jpeg';
import img7 from '@/assets/grandPashuMela/DEEP0164.JPG.jpeg';
import img8 from '@/assets/grandPashuMela/DEEP0171.JPG.jpeg';
import img9 from '@/assets/grandPashuMela/DEEP0186.JPG.jpeg';
import img10 from '@/assets/grandPashuMela/DEEP0192.JPG.jpeg';
import img11 from '@/assets/grandPashuMela/Rathi 1st rangeelo (1).png';
import img12 from '@/assets/grandPashuMela/Rathi 2nd Rangeelo.jpg (1).jpeg';
// import img13 from '@/assets/grandPashuMela/Sahiwal 1st rangeelo.jpg (1).jpeg';
// import img14 from '@/assets/grandPashuMela/Sahiwal 2nd Rangeelo.jpg.jpeg';
// import img15 from '@/assets/grandPashuMela/Tharparkar 3rd Rangeelo.jpg (1).jpeg';
import img16 from '@/assets/grandPashuMela/WhatsApp Image 2026-03-10 at 1.27.31 PM (1).jpeg';

// Import Kashi images
import kashiImg1 from '@/assets/SliderImagess/DSC_4379.webp';
import kashiImg2 from '@/assets/SliderImagess/DSC_4411.webp';
import kashiImg3 from '@/assets/SliderImagess/DSC_4599.webp';
import kashiImg4 from '@/assets/SliderImagess/DSC_4148.webp';
import kashiImg5 from '@/assets/SliderImagess/DSC_4365.webp';
import kashiImg6 from '@/assets/SliderImagess/DSC_4665.webp';

interface Slide {
  image: string;
  subtitle: string;
  title: string;
  description: string;
}

const kashiSlides: Slide[] = [
  {
    image: kashiImg1,
    subtitle: "One of India's Largest Pashu Mela Kashi",
    title: 'Grand Pashu Mela\nMilking Competition Kashi 2026',
    description: "Celebrating India's finest dairy farmers, superior genetics, and record-breaking milk yields at Rangeelo Kashi.",
  },
  {
    image: kashiImg2,
    subtitle: 'Indigenous Breed Champions',
    title: 'Excellence in\nNative Breeds',
    description: 'Showcasing the finest Gangatiri, Sahiwal, and indigenous breeds of Purvanchal and Northern India.',
  },
  {
    image: kashiImg3,
    subtitle: 'Award Distribution & Honours',
    title: 'Felicitating Champions\nRangeelo Kashi 2026',
    description: 'Honouring progressive dairy farmers with prestigious awards, cash prizes, and national recognition.',
  },
  {
    image: kashiImg4,
    subtitle: 'The Grand Gathering',
    title: '50,000+ Farmers &\nVisitors at Kashi',
    description: 'Farmers and breeders from across Uttar Pradesh, Bihar, and all over India gathered to witness dairy excellence.',
  },
  {
    image: kashiImg5,
    subtitle: 'Dignitaries & Dairy Leadership',
    title: 'Where Champions\nAre Crowned',
    description: 'Renowned dairy scientists and expert judges evaluate every breed for conformation and yield potential.',
  },
  {
    image: kashiImg6,
    subtitle: 'Superior Genetics & Heritage',
    title: 'Future of Dairy\nFarming in India',
    description: 'Building a sustainable, high-yielding future through the preservation and promotion of pure indigenous cattle.',
  },
];

const jaipurSlides: Slide[] = [
  {
    image: img1,
    subtitle: "One of India's Largest Pashu Mela Jaipur",
    title: 'Grand Pashu Mela\nMilking Competition 2026',
    description: 'Celebrating India\'s finest dairy farmers, superior genetics, and record-breaking milk yields at Rangeelo.',
  },
  {
    image: img11,
    subtitle: 'Rathi Breed — Champion',
    title: 'Rathi 1st Place\nRangeelo 2026',
    description: 'Outstanding milk yield and superior genetics earned this Rathi the top honour at the Grand Pashu Mela.',
  },
  {
    image: img7,
    subtitle: 'Expert Livestock Judging',
    title: 'Where Champions\nAre Crowned',
    description: 'Renowned judges evaluate each animal on breed standards, conformation, and milking potential.',
  },
  // {
  //   image: img13,
  //   subtitle: 'Sahiwal Breed — Champion',
  //   title: 'Sahiwal 1st Place\nRangeelo 2026',
  //   description: 'The Sahiwal champion demonstrated exceptional dairy qualities and breed purity.',
  // },
  {
    image: img3,
    subtitle: 'The Competition Arena',
    title: 'A Gathering of\nIndia\'s Best Breeders',
    description: 'Farmers from across the nation bring their best animals to compete in this prestigious event.',
  },
  // {
  //   image: img12,
  //   subtitle: 'Rathi Breed — Runner Up',
  //   title: 'Rathi 2nd Place\nRangeelo 2026',
  //   description: 'A remarkable display of breed quality and dairy performance from this Rathi contender.',
  // },
  {
    image: img8,
    subtitle: 'Record-Breaking Yields',
    title: 'Live Milking\nTrials & Records',
    description: 'Live milking competitions determine the true champions, with yields measured precisely — 34.62 Kg record!',
  },
  // {
  //   image: img14,
  //   subtitle: 'Sahiwal Breed — Runner Up',
  //   title: 'Sahiwal 2nd Place\nRangeelo 2026',
  //   description: 'This Sahiwal showcased remarkable consistency in milk yield throughout the competition.',
  // },
  {
    image: img4,
    subtitle: 'Community & Knowledge',
    title: 'Progressive Dairy\nFarming Community',
    description: 'The mela brings together progressive dairy farmers to share knowledge and celebrate excellence.',
  },
  // {
  //   image: img15,
  //   subtitle: 'Tharparkar Breed',
  //   title: 'Tharparkar 3rd Place\nRangeelo 2026',
  //   description: 'The Tharparkar breed is celebrated for its adaptability and consistent performance in arid regions.',
  // },
  {
    image: img16,
    subtitle: '₹50 Lakh+ in Prizes',
    title: 'Grand Award\nCeremony',
    description: 'Winners receive some of the highest award payouts in any Pashu Mela across India.',
  },
  {
    image: img5,
    subtitle: 'Culture Meets Agriculture',
    title: 'Festival of\nHeritage & Pride',
    description: 'Rangeelo blends vibrant rural culture with agricultural excellence for a one-of-a-kind celebration.',
  },
  {
    image: img9,
    subtitle: 'Superior Genetics on Display',
    title: 'Breed Excellence\nAcross 8 Categories',
    description: 'Each competition category highlights the best genetic traits across indigenous cattle breeds.',
  },
  {
    image: img6,
    subtitle: 'Showcasing the Best',
    title: 'The Grand\nParade of Champions',
    description: 'A majestic parade of the finest animals marks the highlight of the Grand Pashu Mela.',
  },
  {
    image: img2,
    subtitle: 'Pride of India',
    title: 'Celebrating the\nBackbone of India',
    description: 'Every award recognises not just an animal, but the farmer\'s years of dedication and care.',
  },
  {
    image: img10,
    subtitle: 'The Future of Dairy',
    title: 'Empowering Farmers\nThrough Recognition',
    description: 'Building a legacy of excellence in indigenous livestock breeding for generations to come.',
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export const GrandMelaSlider = () => {
  const { city: pathCity } = useParams<{ city?: string }>();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const city = (pathCity || searchParams.get('city') || 'kashi').toLowerCase();
  const isJaipur = city === 'jaipur';

  const activeSlides = isJaipur ? jaipurSlides : kashiSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Reset to first slide when switching cities
  useEffect(() => {
    setCurrentIndex(0);
  }, [city]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, activeSlides.length]);

  const currentSlide = activeSlides[currentIndex];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Images with crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
            style={{
              objectPosition: "center 10%",
            }}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Text shadow ensures readability without dark overlays */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-6 md:pb-8">
        
        {/* Winners Banner Strip */}
        <div className="w-full">
          <div className="hero-tagline-banner inline-flex items-center pl-4 pr-8 md:pl-8 md:pr-12 lg:pl-12 py-2 md:py-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-lg" style={{ color: '#dd984a' }}>
              {isJaipur
                ? (language === 'hi' ? 'रंगीलो जयपुर के विजेता' : 'Winners of Rangeelo Jaipur')
                : (language === 'hi' ? 'रंगीलो काशी के विजेता' : 'Winners of Rangeelo Kashi')}
            </h1>
          </div>
        </div>

        {/* <div className="container-custom px-6 md:px-12 lg:px-20 w-full">
          <div className="max-w-xl drop-shadow-2xl">
           
            <AnimatePresence mode="wait">
              <motion.span
                key={`sub-${currentIndex}`}
                className="inline-block text-[#D97706] text-xs md:text-sm font-semibold tracking-wide mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {currentSlide.subtitle}
              </motion.span>
            </AnimatePresence>

            
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${currentIndex}`}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-4 whitespace-pre-line drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {currentSlide.title}
              </motion.h2>
            </AnimatePresence>

            
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentIndex}`}
                className="text-white text-sm md:text-base max-w-lg mb-6 leading-relaxed font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <a
                  href="#register"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold text-sm hover:bg-white hover:text-[#3A1008] transition-all duration-300 group"
                >
                  Learn More  Register Animal
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div> */}
      </div>

    </section>
  );
};
