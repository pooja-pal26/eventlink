import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OrganisersSection from '@/components/OrganisersSection';
import EventProgramSection from '@/components/EventProgramSection';
import PashuMelaBanner from '@/components/PashuMelaBanner';
import ExhibitionSection from '@/components/ExhibitionSection';
import SponsorsTicker from '@/components/SponsorsTicker';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutSection1 from '@/components/AboutSection1';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Wait a small bit for the page to fully render/hydrate and Lenis to start
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SponsorsTicker />
        <OrganisersSection />
        <AboutSection />
                {/* <AboutSection1 /> */}

        
        <EventProgramSection />
        <PashuMelaBanner />
        {/* <ExhibitionSection /> */}
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
