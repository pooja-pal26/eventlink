import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/pashuMelaData';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language } = useLanguage();

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
            {language === 'hi'
              ? 'रंगीलो 2026 में डेयरी उत्कृष्टता के भव्य उत्सव की एक झलक।'
              : 'A glimpse into the grand celebration of dairy excellence at Rangeelo 2026.'}
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 5) * 0.1 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center backdrop-blur-[2px]">
                <ZoomIn className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
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
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
