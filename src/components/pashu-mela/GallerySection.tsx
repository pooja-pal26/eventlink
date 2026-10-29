import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import { galleryImages } from '../../data/pashuMelaData';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import Kashi celebration images
import kashiImg1 from '@/assets/SliderImagess/DSC_4365.webp';
import kashiImg2 from '@/assets/SliderImagess/DSC_4379.webp';
import kashiImg3 from '@/assets/SliderImagess/DSC_4411.webp';
import kashiImg4 from '@/assets/SliderImagess/DSC_4599.webp';
import kashiImg5 from '@/assets/SliderImagess/DSC_4148.webp';
import kashiImg6 from '@/assets/SliderImagess/DSC_4665.webp';

// Kashi Winner & Champion Images (from grandPashuMela)
// HFCB
import dineshMOG from '@/assets/grandPashuMela/Dinesh_Moment_of_Glory.webp';
import dineshCow from '@/assets/grandPashuMela/Dinesh_Gurjar.webp';
import abhishekMOG from '@/assets/grandPashuMela/Abhishek_Pandey_MOG.webp';
import abhishekStage from '@/assets/grandPashuMela/Abhishek_Pandey.webp';
import vishalMOG from '@/assets/grandPashuMela/Vishal_Yadav_MOG.webp';
import vishalStage from '@/assets/grandPashuMela/Vishal_Yadav.webp';

// JYCB
import gaganMOG from '@/assets/grandPashuMela/Gagan_Singh_MOG.webp';
import gaganStage from '@/assets/grandPashuMela/Gagan_Singh.webp';
import ravindraMOG from '@/assets/grandPashuMela/Ravindra_MOG.webp';
import ravindraStage from '@/assets/grandPashuMela/Ravindra_Yadav.webp';
import rajeevMOG from '@/assets/grandPashuMela/Rajeev_Kumar_MOG.webp';
import rajeevStage from '@/assets/grandPashuMela/Rajeev_Kumar.webp';

// Gir
import vinodMOG from '@/assets/grandPashuMela/Vinod_MOG.webp';
import vinodStage from '@/assets/grandPashuMela/Vinod.webp';
import ramjagausiMOG from '@/assets/grandPashuMela/Ramjagausi_MOG.webp';
import ramjagausiStage from '@/assets/grandPashuMela/Ramjagausi.webp';
import omprakashMOG from '@/assets/grandPashuMela/Omprakash_MOG.webp';
import omprakashStage from '@/assets/grandPashuMela/Omprakash.webp';

// Buffalo (Murrah)
import gudduMOG from '@/assets/grandPashuMela/Guddu_MOG.webp';
import gudduStage from '@/assets/grandPashuMela/Guddu.webp';
import rambirMOG from '@/assets/grandPashuMela/Rambir_MOG.webp';
import rambirStage from '@/assets/grandPashuMela/Rambir.webp';
import mohdRashidMOG from '@/assets/grandPashuMela/Mohd_Rashid_MOG.webp';
import mohdRashidStage from '@/assets/grandPashuMela/Mohd_Rashid.webp';

// Sahiwal
import navdeepMOG from '@/assets/grandPashuMela/Navdeep_MOG.webp';
import navdeepStage from '@/assets/grandPashuMela/Navdeep.webp';
import sanjayMOG from '@/assets/grandPashuMela/Sanjay_Maurya_MOG.webp';
import sanjayStage from '@/assets/grandPashuMela/Sanjay_Maurya.webp';
import anilMOG from '@/assets/grandPashuMela/Anil_Yadav_MOG.webp';
import anilStage from '@/assets/grandPashuMela/Anil_Yadav.webp';

// Gangatiri
import prahladMOG from '@/assets/grandPashuMela/Prahlad_Singh_MOG.webp';
import prahladStage from '@/assets/grandPashuMela/Prahlad_Singh.webp';
import gorakhnathMOG from '@/assets/grandPashuMela/Gorakhnath_Yadav_MOG.webp';
import gorakhnathStage from '@/assets/grandPashuMela/Gorakhnath_Yadav.webp';
import harimohanMOG from '@/assets/grandPashuMela/Harimohan_Yadav_MOG.webp';
import harimohanStage from '@/assets/grandPashuMela/Harimohan_Yadav.webp';

const kashiGalleryImages = [
  // Flagship HFCB Record Breakers
  dineshMOG,
  dineshCow,
  abhishekStage,
  abhishekMOG,
  vishalStage,
  vishalMOG,

  // Grand Event Ceremony Highlights
  kashiImg1,
  kashiImg2,
  kashiImg3,
  kashiImg4,

  // JYCB Champions
  gaganMOG,
  gaganStage,
  ravindraMOG,
  ravindraStage,
  rajeevMOG,
  rajeevStage,

  // Murrah Buffalo Champions
  gudduMOG,
  gudduStage,
  rambirMOG,
  rambirStage,
  mohdRashidMOG,
  mohdRashidStage,

  // Sahiwal Champions
  navdeepMOG,
  navdeepStage,
  sanjayMOG,
  sanjayStage,
  anilMOG,
  anilStage,

  // Gir Champions
  vinodMOG,
  vinodStage,
  ramjagausiMOG,
  ramjagausiStage,
  omprakashMOG,
  omprakashStage,

  // Gangatiri Champions
  prahladMOG,
  prahladStage,
  gorakhnathMOG,
  gorakhnathStage,
  harimohanMOG,
  harimohanStage,

  // Cultural & Closing Ceremony
  kashiImg5,
  kashiImg6,
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language } = useLanguage();
  const { city: pathCity } = useParams<{ city?: string }>();
  const [searchParams] = useSearchParams();
  const city = (pathCity || searchParams.get('city') || 'kashi').toLowerCase();
  const isJaipur = city === 'jaipur';

  const activeGalleryImages = isJaipur ? galleryImages : kashiGalleryImages;

  return (
    <section className="py-24 bg-white relative">
      <div className="container-custom mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#7B1E3A] mb-4"
          >
            {language === 'hi' ? 'गौरव के पल' : 'Moments of Glory'}
          </motion.h2>
          <div className="w-24 h-1 bg-[#D97706] mx-auto rounded-full mb-6" />
          <p className="text-[#3A2A1F]/70 max-w-2xl mx-auto text-lg">
            {isJaipur
              ? (language === 'hi'
                  ? 'रंगीलो जयपुर 2026 में डेयरी उत्कृष्टता के भव्य उत्सव की एक झलक।'
                  : 'A glimpse into the grand celebration of dairy excellence at Rangeelo Jaipur 2026.')
              : (language === 'hi'
                  ? 'रंगीलो काशी 2026 में डेयरी उत्कृष्टता के भव्य उत्सव की एक झलक।'
                  : 'A glimpse into the grand celebration of dairy excellence at Rangeelo Kashi 2026.')}
          </p>
        </div>

        {/* 4 Images per row grid on desktop / 2 on mobile / 3 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {activeGalleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.06 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 aspect-[4/3] bg-zinc-100 border border-[#D4AF37]/20"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Moments of Glory ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center backdrop-blur-[2px]">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
