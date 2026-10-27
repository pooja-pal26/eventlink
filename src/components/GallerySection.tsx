import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import dairyFarmers from '@/assets/dairy-farmers-1.jpg';
import cattleFarm from '@/assets/cattle-farm.jpg';
import labResearch from '@/assets/lab-research.jpg';
import womenDairyGroup from '@/assets/women-dairy-group.jpg';
import milkCollectionCenter from '@/assets/milk-collection-center.jpg';
import ruralFarmers from '@/assets/rural-farmers.jpg';

const images = [
  { src: dairyFarmers, alt: 'Dairy Farmers', span: 'col-span-2 row-span-2' },
  { src: cattleFarm, alt: 'Cattle Farm', span: 'col-span-1 row-span-1' },
  { src: labResearch, alt: 'Research Lab', span: 'col-span-1 row-span-1' },
  { src: womenDairyGroup, alt: 'Women Dairy Group', span: 'col-span-1 row-span-1' },
  { src: milkCollectionCenter, alt: 'Milk Collection Center', span: 'col-span-1 row-span-1' },
  { src: ruralFarmers, alt: 'Rural Farmers', span: 'col-span-2 row-span-1' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section id="gallery" className="min-h-screen flex items-center section-padding pt-20 md:pt-24 bg-muted snap-start snap-always">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Glimpses</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-foreground">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the vibrant spirit of rural India
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.span} relative rounded-xl md:rounded-2xl overflow-hidden shadow-card group cursor-pointer`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[150px] md:min-h-[200px] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold text-sm md:text-base">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-none">
            <DialogTitle className="sr-only">Image Preview: {selectedImage?.alt}</DialogTitle>
            {selectedImage && (
              <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-md px-4 py-2 rounded-full text-background text-sm font-medium shadow-lg">
                  {selectedImage.alt}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
