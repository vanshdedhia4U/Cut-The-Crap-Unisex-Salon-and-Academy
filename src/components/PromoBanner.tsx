import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface PromoBannerProps {
  announcement: SalonBusinessInfo['announcement'];
  onOpenBooking: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ announcement, onOpenBooking }) => {
  if (!announcement.enabled) return null;

  return (
    <section className="bg-[#591C32] text-white py-10 px-4 sm:px-6 relative overflow-hidden border-y border-[#C6A56B]/30">
      {/* Decorative Gold Accent Lines */}
      <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full border border-[#C6A56B]/20 pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border border-[#C6A56B]/20 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#C6A56B]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold">
            Salon Invitation
          </span>
          <Sparkles className="w-4 h-4 text-[#C6A56B]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF6F0] mb-3"
        >
          {announcement.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#FAF6F0]/85 max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          {announcement.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center justify-center"
        >
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#591C32] bg-[#FAF6F0] hover:bg-white active:scale-95 transition-all rounded shadow-md flex items-center gap-2 cursor-pointer group"
          >
            <span>{announcement.ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#591C32] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
