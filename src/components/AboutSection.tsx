import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Scissors, BookOpen } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface AboutSectionProps {
  salon: SalonBusinessInfo;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ salon, onOpenBooking }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF6F0] relative overflow-hidden border-t border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase with Editorial Framing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={salon.aboutImage}
                alt="Cut The Crap Unisex Salon and Academy interior from Google Maps"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Google Maps Photo Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-[#C6A56B]/40 px-2.5 py-1 rounded text-[10px] font-semibold text-[#FAF6F0] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A56B]"></span>
                <span>Google Maps Interior Photo</span>
              </div>
            </div>

            {/* Inset Decorative Stats Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 rounded shadow-xl border border-[#C6A56B]/30 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#591C32]/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#591C32]" />
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#591C32] tabular-nums">
                    Est. {salon.establishedYear}
                  </span>
                  <p className="text-xs text-[#242124]/70">
                    Over a decade of dedicated craftsmanship in Ambernath
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-left"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C6A56B]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
                Our Story & Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242124] mb-6 leading-tight">
              Honest Craft. <br />
              <span className="font-accent italic text-[#591C32] font-normal">
                Uncompromising Standards.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#242124]/80 leading-relaxed mb-4">
              Founded in 2014 in Ambernath, <strong className="font-semibold text-[#242124]">{salon.name}</strong> was born from a simple conviction: luxury hair and beauty should be candid, transparent, and masterfully executed. We cut through industry hype to deliver bespoke services that genuinely enhance each client&apos;s natural features.
            </p>

            <p className="text-sm sm:text-base text-[#242124]/80 leading-relaxed mb-6">
              As both an active full-service salon and an educational academy, our team continuously refines global cutting methodologies, advanced hair bond restructuring, and luminous skincare rituals in an inclusive, contemporary environment.
            </p>

            {/* Differentiators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-8">
              <div className="flex items-start gap-3">
                <Scissors className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#242124]">Unisex Precision</h4>
                  <p className="text-xs text-[#242124]/70">Specialized styling catered equally to women, men, and children.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#242124]">In-House Academy</h4>
                  <p className="text-xs text-[#242124]/70">Trained educators ensuring the latest techniques and hygienic practices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#242124]">Authentic Products</h4>
                  <p className="text-xs text-[#242124]/70">Only verified salon-grade formulas and non-damaging treatments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#242124]">Warm Hospitality</h4>
                  <p className="text-xs text-[#242124]/70">No intimidation, just thoughtful consultations and genuine care.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded shadow transition-all cursor-pointer"
            >
              Consult with Our Stylists
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
