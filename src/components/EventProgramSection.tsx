import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Users, Award, Mic, Music, Handshake, GraduationCap, Trophy, Play, Pause } from 'lucide-react';
import { useInView } from 'framer-motion';
import rangeeloVideoJaipur from '@/assets/grandPashuMela/Website rangeelo.mp4';
import rangeeloVideoKashi from '@/assets/grandPashuMela/Website rangeelo 2.mp4';
import rangeeloAudio from '@/assets/Event/WhatsApp Audio 2026-07-17 at 6.11.39 PM.mpeg';

type EditionId = 'kashi' | 'jaipur';

const EDITIONS: { id: EditionId; en: string; hi: string; video: string }[] = [
  { id: 'kashi', en: 'Kashi', hi: 'काशी', video: rangeeloVideoKashi },
  { id: 'jaipur', en: 'Jaipur', hi: 'जयपुर', video: rangeeloVideoJaipur },
];

const EventProgramSection = () => {
  const { t, language } = useLanguage();
  const [edition, setEdition] = useState<EditionId>('kashi');
  const activeVideo = EDITIONS.find(e => e.id === edition)!.video;

  const events = [
    {
      title: language === 'hi' ? 'उद्घाटन समारोह' : 'Inaugural Ceremony',
      description: language === 'hi' ? 'भव्य उद्घाटन और दीप प्रज्वलन समारोह।' : 'Grand opening & lamp lighting ceremony',
      icon: Calendar,
    },
    {
      title: language === 'hi' ? 'भव्य पशु मेला' : 'Grand Pashu Mela',
      description: language === 'hi' ? 'उत्कृष्ट नस्लों का प्रदर्शन और प्रतियोगिता।' : 'Finest breed showcase & competition',
      icon: Trophy,
    },
    {
      title: language === 'hi' ? 'प्रगतिशील किसान अनुभव साझाकरण' : 'Progressive Farmer Experience Sharing',
      description: language === 'hi' ? 'प्रगतिशील किसानों की सफलता की कहानियाँ।' : 'Success stories from progressive farmers',
      icon: Users,
    },
    {
      title: language === 'hi' ? 'कृषि और डेयरी नवाचार वार्ता' : 'Agri & Dairy Innovation Talks',
      description: language === 'hi' ? 'नवीनतम कृषि और डेयरी तकनीकों पर विशेषज्ञों की चर्चा।' : 'Expert talks on latest agri & dairy technologies',
      icon: Mic,
    },
    {
      title: language === 'hi' ? 'ज्ञान सत्र' : 'Knowledge Sessions',
      description: language === 'hi' ? 'विशेषज्ञों द्वारा शैक्षिक और तकनीकी सत्र।' : 'Educational & technical sessions by experts',
      icon: GraduationCap,
    },
    {
      title: language === 'hi' ? 'लोक एवं सांस्कृतिक प्रस्तुतियाँ' : 'Folk & Cultural Performances',
      description: language === 'hi' ? 'लोक कला और संगीत का उत्सव।' : 'Celebration of folk art & music',
      icon: Music,
    },
    {
      title: language === 'hi' ? 'किसान संवाद और नेटवर्किंग' : 'Farmer Interaction & Networking',
      description: language === 'hi' ? 'किसानों और विशेषज्ञों के बीच सीधा संवाद।' : 'Direct interaction between farmers & experts',
      icon: Handshake,
    },
    {
      title: language === 'hi' ? 'समापन समारोह और पुरस्कार' : 'Valedictory Ceremony & Awards',
      description: language === 'hi' ? 'विजेताओं का सम्मान और भव्य समापन।' : 'Honouring winners & grand closing',
      icon: Award,
    },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(frameRef, { margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync audio with video when section comes in/out of view
  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      if (isInView) {
        // Reset audio to start when video starts
        audioRef.current.currentTime = videoRef.current.currentTime % (audioRef.current.duration || Infinity);
        videoRef.current.play()
          .then(() => {
            audioRef.current?.play().catch(() => {});
            setIsPlaying(true);
          })
          .catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, edition]);

  const togglePlay = () => {
    if (videoRef.current && audioRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current.pause();
      } else {
        videoRef.current.play();
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="event-program" className="min-h-screen flex flex-col pt-20 md:pt-24 bg-background snap-start snap-always pb-20">
      <div className="container-custom mb-12 md:mb-16">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          {/* <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t('nav.program')}</span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-foreground">
            {t('program.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('program.subtitle')}
          </p>
        </div>

        {/* One tab per edition */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6" role="tablist">
          {EDITIONS.map(e => (
            <button
              key={e.id}
              type="button"
              role="tab"
              aria-selected={edition === e.id}
              onClick={() => setEdition(e.id)}
              className={`px-5 sm:px-7 py-2 rounded-full text-sm sm:text-base font-semibold transition-colors ${
                edition === e.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {language === 'hi' ? e.hi : e.en}
            </button>
          ))}
        </div>

        {/* Video */}
        <div ref={frameRef} className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <video
            key={edition}
            ref={videoRef}
            src={activeVideo}
            loop
            playsInline
            className="w-full h-auto block"
          />
          <audio
            ref={audioRef}
            src={rangeeloAudio}
            loop
            preload="auto"
          />
          <button
            onClick={togglePlay}
            className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-black/50 hover:bg-black/70 text-white p-2.5 md:p-3.5 rounded-full backdrop-blur-md transition-all shadow-lg z-10 hover:scale-110"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
            ) : (
              <Play className="ml-0.5 w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
            )}
          </button>
        </div>
      </div>

      <div className="container-custom">
        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="group card-hover border-0 shadow-card bg-card overflow-hidden"
            >
              <CardContent className="p-6 md:p-8 text-center">
                <div className="mb-5 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
                  <event.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-foreground mb-2 leading-tight">{event.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventProgramSection;

