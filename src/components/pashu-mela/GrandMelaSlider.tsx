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
import img16 from '@/assets/grandPashuMela/WhatsApp Image 2026-03-10 at 1.27.31 PM (1).jpeg';

// Import Kashi Award (MOG) & Cow Winner images
import dineshWinner from '@/assets/grandPashuMela/Dinesh_Moment_of_Glory.webp';
import dineshCow from '@/assets/grandPashuMela/Dinesh_Gurjar.webp';
import rajeevWinner from '@/assets/grandPashuMela/Rajeev_Kumar_MOG.webp';
import priyanshuCow from '@/assets/grandPashuMela/Priyanshu_rathi.webp';
import rambirWinner from '@/assets/grandPashuMela/Rambir_MOG.webp';
import rambirCow from '@/assets/grandPashuMela/Rambir.webp';
import gaganWinner from '@/assets/grandPashuMela/Gagan_Singh_MOG.webp';
import gaganCow from '@/assets/grandPashuMela/Gagan_Singh.webp';
import navdeepWinner from '@/assets/grandPashuMela/Navdeep_MOG.webp';
import navdeepCow from '@/assets/grandPashuMela/Navdeep.webp';

interface Slide {
  image: string;
  subtitle: string;
  title: string;
  description: string;
}

const kashiSlides: Slide[] = [
  // 1. Award Ceremony - Shri Dinesh Gurjar
  {
    image: dineshWinner,
    subtitle: 'HFCB Category — 1st Prize Winner',
    title: 'Shri Dinesh Gurjar\n34.62 Kg / 24 Hours',
    description: 'Secured 1st Prize in the HFCB Category of the Milking Competition at Rangeelo Kashi 2026 with a winning yield of 34.62 kg.',
  },
  // 2. Cow Winner - HFCB Champion Cow
  {
    image: dineshCow,
    subtitle: 'HFCB Breed — Champion Cow',
    title: 'HFCB 1st Place Champion\nRangeelo Kashi 2026',
    description: 'Outstanding milk yield and superior genetics earned this HFCB cow the top honour at Rangeelo Kashi.',
  },
  // 3. Award Ceremony - Shri Rajeev Kumar
  {
    image: rajeevWinner,
    subtitle: 'Moment of Glory — Award Ceremony',
    title: 'Shri Rajeev Kumar\nMilking Champion Felicitation',
    description: 'Honouring outstanding dairy farmers and progressive breeders at the Grand Pashu Mela award stage.',
  },
  // 4. Cow Winner - Shri Priyanshu Rathi
  {
    image: priyanshuCow,
    subtitle: 'Tharparkar Breed — 1st Prize Winner',
    title: 'Shri Priyanshu Rathi\n15.92 Kg / 24 Hours',
    description: 'Showcasing the adaptability, resilience and high yield potential of indigenous Tharparkar cattle.',
  },
  // 5. Award Ceremony - Shri Rambir
  {
    image: rambirWinner,
    subtitle: 'Grand Award Ceremony',
    title: 'Shri Rambir\nChampionship Recognition',
    description: 'Celebrating high-performing dairy management and excellence at Rangeelo Kashi 2026.',
  },
  // 6. Cow Winner - Champion Breed
  {
    image: rambirCow,
    subtitle: 'Championship Breed Showcase',
    title: 'Champion Cattle\nRangeelo Kashi 2026',
    description: 'Demonstrating excellence in animal husbandry and superior genetic traits in the competition arena.',
  },
  // 7. Award Ceremony - Shri Gagan Singh
  {
    image: gaganWinner,
    subtitle: 'Jersey Crossbreed (JYCB) — 1st Prize Winner',
    title: 'Shri Gagan Singh\n28.99 Kg / 24 Hours',
    description: 'Delivered an outstanding championship performance to win 1st Prize in the Jersey Crossbreed category.',
  },
  // 8. Cow Winner - JYCB Champion Cow
  {
    image: gaganCow,
    subtitle: 'Jersey Crossbreed — Champion Cow',
    title: 'JYCB 1st Place Champion\nRangeelo Kashi 2026',
    description: 'A testament to consistency and superior Jersey crossbreed performance at Rangeelo Kashi.',
  },
  // 9. Award Ceremony - Shri Navdeep Choudhary
  {
    image: navdeepWinner,
    subtitle: 'Sahiwal Breed — 1st Prize Winner',
    title: 'Shri Navdeep Choudhary\n18.08 Kg / 24 Hours',
    description: 'Won 1st Prize in the indigenous Sahiwal category at Rangeelo Kashi 2026 with an exceptional 24-hour milk yield of 18.08 kg.',
  },
  // 10. Cow Winner - Sahiwal Champion Cow
  {
    image: navdeepCow,
    subtitle: 'Sahiwal Breed — Champion Cow',
    title: 'Sahiwal 1st Place Champion\nRangeelo Kashi 2026',
    description: 'Reflecting the natural excellence and pure genetic potential of native indigenous Sahiwal genetics.',
  },
];

const jaipurSlides: Slide[] = [
  {
    image: img1,
    subtitle: "One of India's Largest Pashu Mela",
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
    description: 'Live milking competitions determine the true champions, with yields measured precisely — 64.44 Kg record!',
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
