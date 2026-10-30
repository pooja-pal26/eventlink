import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import { kashiPashuMelaData, jaipurPashuMelaData, BreedCategory, Winner } from '../../data/pashuMelaData';
import { Trophy, MapPin, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { kashiHiTranslations, jaipurHiTranslations } from './translations';

export const BreedShowcase = () => {
  const { language } = useLanguage();
  const { city: pathCity } = useParams<{ city?: string }>();
  const [searchParams] = useSearchParams();
  const city = (pathCity || searchParams.get('city') || 'kashi').toLowerCase();
  const isJaipur = city === 'jaipur';

  const data = isJaipur ? jaipurPashuMelaData : kashiPashuMelaData;
  const [activeBreed, setActiveBreed] = useState<BreedCategory>(data[0]);

  // Keep selected breed tab in sync when city changes
  useEffect(() => {
    setActiveBreed(prev => data.find(b => b.id === prev?.id) || data[0]);
  }, [city, data]);

  useEffect(() => {
    const handleTabChange = (e: CustomEvent<string>) => {
      const targetId = (e.detail === 'hycb') ? 'hfcb' : e.detail;
      const breed = data.find(b => b.id === targetId || b.id === e.detail);
      if (breed) {
        setActiveBreed(breed);
      }
    };
    window.addEventListener('changeBreedTab', handleTabChange as EventListener);
    return () => window.removeEventListener('changeBreedTab', handleTabChange as EventListener);
  }, [data]);

  return (
    <section id="breed-showcase" className="py-24 bg-white relative">
      <div className="container-custom mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7B1E3A] mb-4">
            {language === 'hi' ? 'चैंपियन नस्ल प्रदर्शन' : 'Champion Breeds Showcase'}
          </h2>
          <div className="w-24 h-1 bg-[#D97706] mx-auto rounded-full" />
        </div>

        {/* Breed Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {data.map((breed) => (
            <button
              key={breed.id}
              onClick={() => setActiveBreed(breed)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeBreed.id === breed.id
                  ? 'text-white shadow-lg'
                  : 'text-[#3A2A1F] hover:bg-[#F8F5F0]'
              }`}
            >
              {activeBreed.id === breed.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#7B1E3A] to-[#D97706] rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {language === 'hi' ? (
                breed.id === 'hf' ? 'HF (होल्स्टीन फ्रिसियन)' :
                breed.id === 'crossbreed' ? 'क्रॉस ब्रीड' :
                breed.id === 'gir' ? 'गिर' :
                breed.id === 'jersey' ? 'जर्सी' :
                breed.id === 'murrah' ? 'मुर्रा' :
                breed.id === 'rathi' ? 'राठी' :
                breed.id === 'sahiwal' ? 'साहीवाल' :
                breed.id === 'tharparkar' ? 'थारपारकर' :
                breed.id === 'buffalo' ? 'भैंस' :
                breed.id === 'gangatiri' ? 'गंगातीरी' :
                breed.id === 'hfcb' || breed.id === 'hycb' ? 'HFCB' :
                breed.id === 'jycb' ? 'JYCB' : breed.name
              ) : (breed.id === 'hfcb' || breed.id === 'hycb' ? 'HFCB' : breed.name)}
            </button>
          ))}
        </div>

        {/* Winners Showcase */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBreed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8"
            >
              {/* Top Winner Card (1st Place) */}
              {activeBreed.winners.filter(w => w.rank === 1).map((winner) => (
                <WinnerCard key={winner.rank} winner={winner} isFirst={true} activeBreedId={activeBreed.id} isJaipur={isJaipur} />
              ))}

              {/* 2nd and 3rd Place Cards */}
              {activeBreed.winners.filter(w => w.rank !== 1).length === 1 ? (
                activeBreed.winners.filter(w => w.rank !== 1).map((winner) => (
                  <WinnerCard 
                    key={winner.rank} 
                    winner={winner} 
                    isFirst={false} 
                    isRow={true} 
                    activeBreedId={activeBreed.id} 
                    isJaipur={isJaipur} 
                  />
                ))
              ) : activeBreed.winners.filter(w => w.rank !== 1).length > 1 ? (
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {activeBreed.winners.filter(w => w.rank !== 1).map((winner) => (
                    <WinnerCard 
                      key={winner.rank} 
                      winner={winner} 
                      isFirst={false} 
                      isRow={false} 
                      activeBreedId={activeBreed.id} 
                      isJaipur={isJaipur} 
                    />
                  ))}
                </div>
              ) : null}

              {/* Achievement Timeline */}
              {/* <AchievementTimeline winners={activeBreed.winners} breedName={activeBreed.name} /> */}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

const WinnerCard = ({ winner, isFirst, isRow = false, activeBreedId, isJaipur }: { winner: Winner, isFirst: boolean, isRow?: boolean, activeBreedId: string, isJaipur: boolean }) => {
  const { language } = useLanguage();
  const transMap = isJaipur ? jaipurHiTranslations : kashiHiTranslations;
  const transKey = activeBreedId === 'hycb' ? 'hfcb' : activeBreedId;
  const trans = transMap[transKey]?.[winner.rank];

  const farmerName = language === 'hi' && trans ? trans.farmerNameHi : winner.farmerName;
  const location = language === 'hi' && trans ? trans.locationHi : winner.location;
  const yieldText = language === 'hi' && trans ? trans.yieldHi : winner.yield;
  const description = language === 'hi' && trans ? trans.descriptionHi : winner.description;

  const isRowLayout = isFirst || isRow;

  return (
    <div className={`flex flex-col ${isRowLayout ? 'lg:flex-row' : ''} bg-[#F8F5F0] rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/30 hover:shadow-2xl transition-shadow group relative`}>
      <div className={`relative overflow-hidden bg-[#3A2A1F]/5 flex items-center justify-center ${isRowLayout ? 'lg:w-1/2 min-h-[320px]' : 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]'}`}>
        {winner.video ? (
          <video
            src={winner.video}
            poster={winner.image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img 
            src={winner.image} 
            alt={`Winner ${winner.farmerName}`} 
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
          <div className={`p-2 rounded-full ${
            winner.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
            winner.rank === 2 ? 'bg-gray-300 text-gray-800' :
            'bg-amber-600 text-white'
          }`}>
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-white font-bold text-lg drop-shadow-md">
            {language === 'hi' ? 
              (winner.rank === 1 ? 'प्रथम' : winner.rank === 2 ? 'द्वितीय' : 'तृतीय') + ' पुरस्कार'
              : (winner.rank === 1 ? '1st' : winner.rank === 2 ? '2nd' : '3rd') + ' Prize'}
          </span>
        </div>
      </div>
      
      <div className={`p-8 ${isRowLayout ? 'lg:w-1/2 flex flex-col justify-center' : ''} relative`}>
        {/* Decorative background element */}
        <Award className="absolute right-4 top-4 w-24 h-24 text-[#D4AF37]/10 -rotate-12" />
        
        <h3 className="text-2xl md:text-3xl font-bold text-[#3A2A1F] mb-2 relative z-10">{farmerName}</h3>
        <div className="flex items-center text-[#7B1E3A] mb-6 font-medium relative z-10">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
        
        <div className="mb-6 bg-white rounded-xl p-4 border border-[#D97706]/20 relative z-10">
          <p className="text-sm text-[#3A2A1F]/60 uppercase tracking-widest font-semibold mb-1">
            {language === 'hi' ? 'कुल उपज (24 घंटे)' : 'Total Yield (24 Hours)'}
          </p>
          <p className="text-3xl font-extrabold text-[#D97706]">{yieldText}</p>
        </div>

        <p className="text-[#3A2A1F]/80 leading-relaxed relative z-10 whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

const AchievementTimeline = ({ winners, breedName }: { winners: Winner[], breedName: string }) => {
  return (
    <div className="mt-16 bg-white p-8 rounded-3xl border border-[#D4AF37]/20 shadow-lg">
      <h4 className="text-xl font-bold text-[#7B1E3A] mb-8 text-center">Performance Timeline - {breedName}</h4>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#D97706]/20 -ml-[0.5px]" />
        
        <div className="space-y-8">
          {winners.map((winner, index) => (
            <motion.div 
              key={winner.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#D97706] shadow-[0_0_10px_rgba(217,119,6,0.5)] transform -translate-x-1/2" />
              
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                <div className="bg-[#F8F5F0] p-4 rounded-xl shadow-sm border border-[#7B1E3A]/10 hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-[#D97706] uppercase tracking-wide">
                    {winner.rank === 1 ? '🥇 1st Place' : winner.rank === 2 ? '🥈 2nd Place' : '🥉 3rd Place'}
                  </span>
                  <h5 className="text-lg font-bold text-[#3A2A1F] mt-1">{winner.farmerName}</h5>
                  <p className="text-[#7B1E3A] font-semibold">{winner.yield}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
