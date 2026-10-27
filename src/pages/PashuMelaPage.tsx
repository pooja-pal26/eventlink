import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PashuMelaSection from '@/components/PashuMelaSection';

const PashuMelaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PashuMelaSection />
      </main>
      <Footer />
    </div>
  );
};

export default PashuMelaPage;
