import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../data/salonData';

interface ServicesSectionProps {
  services: ServiceItem[];
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haircuts & Styling' },
    { id: 'color', label: 'Color & Treatments' },
    { id: 'skin', label: 'Skincare & Facials' },
    { id: 'bridal', label: 'Bridal & Makeover' },
    { id: 'nails', label: 'Nails & Spa' },
    { id: 'academy', label: 'Academy Courses' },
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
              Curated Offerings
            </span>
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242124] mb-4">
            Bespoke Services for Hair, Skin & Artistry
          </h2>

          <p className="text-sm sm:text-base text-[#242124]/75 leading-relaxed">
            From precision cuts and bond-restoring hair therapies to radiant facials and bridal couture makeover, every service is tailored to elevate your individuality.
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#591C32] text-white shadow-sm'
                      : 'bg-white/80 text-[#242124]/80 hover:text-[#591C32] hover:bg-white border border-[#C6A56B]/20'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg overflow-hidden border border-[#C6A56B]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Zero-Broken-Image Policy */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF6F0]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully to high-res salon photo if network fails
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category unboxed tag */}
                  <div className="absolute top-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-semibold text-[#591C32] uppercase tracking-wider border border-[#C6A56B]/30">
                    {service.categoryLabel}
                  </div>

                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-[#591C32] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <Sparkles className="w-2.5 h-2.5 text-[#C6A56B]" />
                      <span>Signature</span>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#242124] group-hover:text-[#591C32] transition-colors mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#242124]/70 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#FAF6F0]">
                    {/* Metadata strip */}
                    <div className="flex items-center justify-between text-xs text-[#242124]/75 mb-4">
                      {service.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C6A56B]" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                      
                      {service.price && (
                        <span className="font-semibold text-sm text-[#591C32] tabular-nums">
                          {service.price}
                        </span>
                      )}
                    </div>

                    {/* Book This Service Button */}
                    <button
                      onClick={() => onBookService(service.name)}
                      className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#591C32] bg-[#EAD7D7]/30 hover:bg-[#591C32] hover:text-white border border-[#C6A56B]/40 hover:border-[#591C32] rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                    >
                      <span>Book This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C6A56B] group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Service Note */}
        <div className="mt-12 text-center text-xs text-[#242124]/60">
          Looking for a customized service package, bridal group booking, or academy syllabus?{' '}
          <button
            onClick={() => onBookService('Custom Consultation')}
            className="text-[#591C32] font-semibold underline hover:text-[#C6A56B] cursor-pointer"
          >
            Chat with our stylist on WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};
