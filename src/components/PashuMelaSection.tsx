import React from 'react';
import { HeroSection } from './pashu-mela/HeroSection';
import { GrandMelaSlider } from './pashu-mela/GrandMelaSlider';
import { BreedShowcase } from './pashu-mela/BreedShowcase';
import { RecordBreakers } from './pashu-mela/RecordBreakers';
import { SuccessStories } from './pashu-mela/SuccessStories';
import { GallerySection } from './pashu-mela/GallerySection';
import { ImpactSection } from './pashu-mela/ImpactSection';

const PashuMelaSection = () => {
  return (
    <div className="font-sans">
      
      <GrandMelaSlider />
      <HeroSection />
      <RecordBreakers />
      <BreedShowcase />
      <SuccessStories />
      <GallerySection />
      <ImpactSection />
    </div>
  );
};

export default PashuMelaSection;
