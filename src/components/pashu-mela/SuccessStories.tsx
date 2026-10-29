import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { kashiPashuMelaData, jaipurPashuMelaData } from '../../data/pashuMelaData';
import { Quote, Milk } from 'lucide-react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { kashiHiTranslations, jaipurHiTranslations } from './translations';

const kashiQuotes: Record<string, { quoteEn: string; quoteHi: string; breedLabelEn: string; breedLabelHi: string }> = {
  hfcb: {
    quoteEn: 'Setting the standard in high-yield crossbreed dairying.',
    quoteHi: 'उच्च-उत्पादन क्रॉस-ब्रीड डेयरी में नए मानक स्थापित करना।',
    breedLabelEn: 'HFCB',
    breedLabelHi: 'HFCB (हाई-यील्ड क्रॉस-ब्रीड)',
  },
  hycb: {
    quoteEn: 'Setting the standard in high-yield crossbreed dairying.',
    quoteHi: 'उच्च-उत्पादन क्रॉस-ब्रीड डेयरी में नए मानक स्थापित करना।',
    breedLabelEn: 'HFCB',
    breedLabelHi: 'HFCB (हाई-यील्ड क्रॉस-ब्रीड)',
  },
  jycb: {
    quoteEn: 'A testament to consistency and Jersey crossbreed performance.',
    quoteHi: 'निरंतरता और जर्सी क्रॉस-ब्रीड प्रदर्शन का जीवंत प्रमाण।',
    breedLabelEn: 'JYCB (Jersey Crossbreed)',
    breedLabelHi: 'JYCB (जर्सी क्रॉस-ब्रीड)',
  },
  gir: {
    quoteEn: 'Demonstrating the true milk potential of indigenous Gir cattle.',
    quoteHi: 'स्वदेशी गिर गायों की वास्तविक दुग्ध क्षमता का प्रदर्शन।',
    breedLabelEn: 'Gir',
    breedLabelHi: 'गिर',
  },
  buffalo: {
    quoteEn: 'Highlighting strength and productivity in Murrah herd management.',
    quoteHi: 'मुर्रा झुंड प्रबंधन में शक्ति और उत्पादकता को उजागर करना।',
    breedLabelEn: 'Buffalo (Murrah)',
    breedLabelHi: 'भैंस (मुर्रा)',
  },
  sahiwal: {
    quoteEn: 'Reflecting the natural excellence of native Sahiwal genetics.',
    quoteHi: 'मूल साहीवाल आनुवंशिकी की प्राकृतिक उत्कृष्टता का परिचायक।',
    breedLabelEn: 'Sahiwal',
    breedLabelHi: 'साहीवाल',
  },
  tharparkar: {
    quoteEn: 'Showcasing adaptability and sustainable yield in Tharparkar dairying.',
    quoteHi: 'थारपारकर डेयरी में अनुकूलनशीलता और स्थायी उत्पादन का प्रदर्शन।',
    breedLabelEn: 'Tharparkar',
    breedLabelHi: 'थारपारकर',
  },
  gangatiri: {
    quoteEn: 'Unlocking the traditional strength and efficiency of Gangatiri breeds.',
    quoteHi: 'गंगातीरी नस्ल की पारंपरिक शक्ति और दक्षता को उजागर करना।',
    breedLabelEn: 'Gangatiri',
    breedLabelHi: 'गंगातीरी',
  },
};

export const SuccessStories = () => {
  const { language } = useLanguage();
  const { city: pathCity } = useParams<{ city?: string }>();
  const [searchParams] = useSearchParams();
  const city = (pathCity || searchParams.get('city') || 'kashi').toLowerCase();
  const isJaipur = city === 'jaipur';

  const data = isJaipur ? jaipurPashuMelaData : kashiPashuMelaData;

  // Extract winners that have quotes or are 1st place to feature as success stories
  const stories = data.flatMap(breed => 
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
            {isJaipur
              ? (language === 'hi' ? 'विजयी गूंज (रंगीलो जयपुर)' : 'Voices of Victory (Rangeelo Jaipur)')
              : (language === 'hi' ? 'विजयी गूंज (रंगीलो काशी)' : 'Voices of Victory (Rangeelo Kashi)')}
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
                const transMap = isJaipur ? jaipurHiTranslations : kashiHiTranslations;
                const trans = transMap[story.breedId]?.[story.rank];
                const farmerName = language === 'hi' && trans ? trans.farmerNameHi : story.farmerName;
                const location = language === 'hi' && trans ? trans.locationHi : story.location;
                const yieldText = language === 'hi' && trans ? trans.yieldHi : story.yield;
                // Use Kashi custom quote if in Kashi mode, otherwise default
                const quote = !isJaipur && kashiQuotes[story.breedId]
                  ? (language === 'hi' ? kashiQuotes[story.breedId].quoteHi : kashiQuotes[story.breedId].quoteEn)
                  : (language === 'hi' && trans 
                      ? (story.quote ? trans.descriptionHi.split('।')[0] + '।' : trans.descriptionHi)
                      : (story.quote || story.description));

                const breedTag = !isJaipur && kashiQuotes[story.breedId]
                  ? (language === 'hi' ? kashiQuotes[story.breedId].breedLabelHi : kashiQuotes[story.breedId].breedLabelEn)
                  : (language === 'hi' ? (
                      story.breedId === 'hf' ? 'HF (होल्स्टीन फ्रिसियन)' :
                      story.breedId === 'crossbreed' ? 'क्रॉस ब्रीड' :
                      story.breedId === 'gir' ? 'गिर' :
                      story.breedId === 'jersey' ? 'जर्सी' :
                      story.breedId === 'murrah' ? 'मुर्रा' :
                      story.breedId === 'rathi' ? 'राठी' :
                      story.breedId === 'sahiwal' ? 'साहीवाल' :
                      story.breedId === 'tharparkar' ? 'थारपारकर' :
                      story.breedId === 'gangatiri' ? 'गंगातीरी' :
                      story.breedId === 'hycb' || story.breedId === 'hfcb' ? 'HFCB' :
                      story.breedId === 'jycb' ? 'JYCB' : story.breedName
                    ) : story.breedName);

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
                          {breedTag}
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
