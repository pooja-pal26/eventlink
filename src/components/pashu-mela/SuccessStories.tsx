import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { pashuMelaData } from '../../data/pashuMelaData';
import { Quote, Milk } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { hiTranslations } from './translations';

export const SuccessStories = () => {
  const { language } = useLanguage();

  // Extract winners that have quotes or are 1st place to feature as success stories
  const stories = pashuMelaData.flatMap(breed => 
    breed.winners
      .filter(w => w.quote || w.rank === 1)
      .map(w => ({ ...w, breedName: breed.name, breedId: breed.id }))
  );

  return (
    <section id="success-stories" className="py-24 bg-[#F8F5F0] relative">
      <div className="container-custom mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#7B1E3A] mb-4"
          >
            {language === 'hi' ? 'विजयी गूंज' : 'Voices of Victory'}
          </motion.h2>
          <div className="w-24 h-1 bg-[#D97706] mx-auto rounded-full mb-6" />
          <p className="text-[#3A2A1F]/70 max-w-2xl mx-auto text-lg">
            {language === 'hi'
              ? 'उन चैंपियंस से सुनें जिन्होंने अपना जीवन डेयरी फार्मिंग की प्रगति के लिए समर्पित कर दिया है।'
              : 'Hear from the champions who have dedicated their lives to the progress of dairy farming.'}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {stories.map((story, index) => {
                const trans = hiTranslations[story.breedId]?.[story.rank];
                const farmerName = language === 'hi' && trans ? trans.farmerNameHi : story.farmerName;
                const location = language === 'hi' && trans ? trans.locationHi : story.location;
                const yieldText = language === 'hi' && trans ? trans.yieldHi : story.yield;
                // Use description if quote is missing
                const quote = language === 'hi' && trans 
                  ? (story.quote ? trans.descriptionHi.split('।')[0] + '।' : trans.descriptionHi) // Rough approximation for quote
                  : (story.quote || story.description);

                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-4">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/20 h-full flex flex-col relative overflow-hidden group">
                      <Quote className="absolute top-4 right-4 w-24 h-24 text-[#D97706]/10 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                      
                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D97706] shadow-md flex-shrink-0">
                          <img 
                            src={story.image} 
                            alt={story.farmerName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#3A2A1F]">{farmerName}</h4>
                          <p className="text-[#7B1E3A] text-sm font-semibold">{location}</p>
                        </div>
                      </div>

                      <div className="flex-grow relative z-10">
                        <p className="text-[#3A2A1F]/80 italic mb-6 text-lg leading-relaxed whitespace-pre-line">
                          "{quote}"
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-[#D97706]/20 flex justify-between items-center relative z-10">
                        <div className="bg-[#F8F5F0] px-3 py-1 rounded-full text-sm font-semibold text-[#3A2A1F]">
                          {language === 'hi' ? (
                            story.breedId === 'hf' ? 'HF (होल्स्टीन फ्रिसियन)' :
                            story.breedId === 'crossbreed' ? 'क्रॉस ब्रीड' :
                            story.breedId === 'gir' ? 'गिर' :
                            story.breedId === 'jersey' ? 'जर्सी' :
                            story.breedId === 'murrah' ? 'मुर्रा' :
                            story.breedId === 'rathi' ? 'राठी' :
                            story.breedId === 'sahiwal' ? 'साहीवाल' :
                            story.breedId === 'tharparkar' ? 'थारपारकर' : story.breedName
                          ) : story.breedName}
                        </div>
                        <div className="flex items-center text-[#D97706] font-bold">
                          <Milk className="w-4 h-4 mr-1" />
                          {yieldText}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
        </motion.div>

      </div>
    </section>
  );
};
