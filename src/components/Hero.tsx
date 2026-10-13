import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface HeroProps {
  salon: SalonBusinessInfo;
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salon, onOpenBooking, onExploreServices }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF6F0]">
      {/* Subtle architectural backdrop accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#EAD7D7]/20 to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#C6A56B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[1px] bg-[#C6A56B]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
                {salon.eyebrow}
              </span>
              <span className="text-xs text-[#C6A56B]">•</span>
              <span className="text-xs tracking-wider text-[#242124]/70">
                Ambernath East
              </span>
            </motion.div>

            {/* Bold Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#242124] leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Your Style. <br />
              <span className="font-accent italic text-[#591C32] font-normal">
                Your Signature.
              </span>
            </motion.h1>

            {/* Engaging Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#242124]/80 max-w-xl leading-relaxed mb-8"
            >
              {salon.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#591C32] hover:bg-[#431425] active:scale-[0.98] transition-all rounded shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer group"
              >
                <span>Book Your Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#C6A56B] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 text-sm sm:text-base font-medium text-[#242124] bg-white hover:bg-[#FAF6F0] border border-[#C6A56B]/40 hover:border-[#591C32]/60 transition-all rounded shadow-sm hover:shadow cursor-pointer"
              >
                Explore Our Services
              </button>
            </motion.div>

            {/* Verified Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-[#C6A56B]/25 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold text-[#591C32]">
                  <Star className="w-3.5 h-3.5 fill-[#C6A56B] text-[#C6A56B]" />
                  <span>{salon.rating.score} Rating</span>
                </div>
                <span className="text-[#242124]/60">{salon.rating.totalReviews}+ Verified Reviews</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-[#242124]">Est. {salon.establishedYear}</span>
                <span className="text-[#242124]/60">10+ Years Legacy</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold text-[#242124]">
                  <Clock className="w-3 h-3 text-[#C6A56B]" />
                  <span>Open Daily</span>
                </div>
                <span className="text-[#242124]/60">10:30 AM – 10 PM</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold text-[#242124]">
                  <MapPin className="w-3 h-3 text-[#C6A56B]" />
                  <span>Ambernath East</span>
                </div>
                <span className="text-[#242124]/60">Kansai Section</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Editorial Hero Visual with Layered Gold Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative Gold Frame Offset */}
            <div className="absolute -inset-3 sm:-inset-4 border border-[#C6A56B]/40 rounded-lg pointer-events-none transform translate-x-2 translate-y-2 hidden sm:block" />
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#FAF6F0] aspect-[4/5] sm:aspect-[4/5]">
              <img
                src={salon.heroImage}
                alt="Cut The Crap Unisex Salon interior from Google Maps"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80';
                }}
              />

              {/* Scrim gradient overlay for luxury depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/85 via-transparent to-black/20" />

              {/* Verified Google Maps Photo Pill Label */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#C6A56B]/40 px-3 py-1 rounded text-[11px] font-semibold text-[#FAF6F0] flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C6A56B]"></span>
                <span>Google Maps Photo</span>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C6A56B]/30 shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span className="text-xs uppercase tracking-wider font-bold text-[#591C32]">
                      Salon & Academy
                    </span>
                  </div>
                  <p className="text-xs text-[#242124]/80 mt-0.5">
                    Shop No. 2, Suryoday CHS, Ambernath East
                  </p>
                </div>
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#591C32] hover:text-[#C6A56B] underline transition-colors whitespace-nowrap"
                >
                  View on Maps
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
