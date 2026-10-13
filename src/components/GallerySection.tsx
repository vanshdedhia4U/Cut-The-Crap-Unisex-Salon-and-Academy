import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/salonData';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'google-maps', label: 'Google Maps Photos (6)' },
    { id: 'hair', label: 'Hair & Styling' },
    { id: 'bridal', label: 'Bridal Artistry' },
  ];

  const filteredItems = filter === 'all'
    ? gallery
    : gallery.filter((item) => item.category === filter);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
              Verified Visuals
            </span>
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242124] mb-4">
            Photos From Our Salon
          </h2>

          <p className="text-xs sm:text-sm text-[#242124]/75">
            Authentic photographs straight from our Google Maps business listing at Shop No. 2, Suryoday CHS, Ambernath East.
          </p>

          {/* Filter Pills / Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-[#591C32] text-white shadow-xs'
                    : 'bg-white/80 text-[#242124]/80 hover:text-[#591C32] hover:bg-white border border-[#C6A56B]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-[#C6A56B]/20 cursor-pointer aspect-[4/3]"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {item.isGoogleMapsPhoto && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-semibold text-[#FAF6F0] border border-[#C6A56B]/40 flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A56B]" />
                  <span>Google Maps Photo</span>
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/90 via-[#242124]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase tracking-wider text-[#C6A56B] font-semibold mb-1">
                  {item.categoryLabel}
                </span>
                <h4 className="font-serif text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-white/80 line-clamp-2 mb-3">
                  {item.caption}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-[#C6A56B] font-medium">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to view full photo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-[#C6A56B] transition-colors p-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#591C32] text-white p-2.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#591C32] text-white p-2.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="w-full max-h-[75vh] overflow-hidden rounded-lg flex items-center justify-center bg-black/40">
                <img
                  src={filteredItems[selectedImageIndex].image}
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[75vh] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="w-full mt-3 px-4 text-center">
                <span className="text-xs uppercase tracking-wider text-[#C6A56B] font-medium">
                  {filteredItems[selectedImageIndex].categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-xl mx-auto">
                  {filteredItems[selectedImageIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
