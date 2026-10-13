import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Check, MessageSquare } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface AcademySpotlightProps {
  salon: SalonBusinessInfo;
  onInquireAcademy: () => void;
}

export const AcademySpotlight: React.FC<AcademySpotlightProps> = ({ salon, onInquireAcademy }) => {
  const highlights = [
    "Practical hands-on training on live models",
    "Certification in International Cutting & Color Formulations",
    "Advanced Bridal Hair Artistry & Makeup Draping",
    "Salon Management, Hygiene & Client Consultation Skills",
  ];

  return (
    <section className="py-16 bg-[#591C32] text-white relative overflow-hidden">
      {/* Decorative Geometry */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 text-left">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-[#C6A56B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-semibold">
                Professional Academy Division
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF6F0] mb-4">
              Learn the Art of Professional Hair & Aesthetics
            </h2>

            <p className="text-sm sm:text-base text-[#FAF6F0]/85 leading-relaxed max-w-2xl mb-6">
              Turn your passion for beauty into a recognized career. Our academy at {salon.shortName} provides comprehensive diplomas designed to shape future creative directors, colorists, and bridal artists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF6F0]/90">
                  <div className="w-4 h-4 rounded-full bg-[#C6A56B]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#C6A56B]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
            <div className="bg-[#FAF6F0] text-[#242124] p-6 rounded-lg shadow-xl border border-[#C6A56B]/30 w-full max-w-sm">
              <div className="flex items-center gap-2 mb-2 text-[#591C32]">
                <Award className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-bold">Admissions Open</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#242124] mb-2">
                Diploma Courses 2026
              </h3>
              <p className="text-xs text-[#242124]/70 mb-4 leading-relaxed">
                Receive course prospectus, schedule details, and fee structure directly on WhatsApp.
              </p>
              <button
                onClick={onInquireAcademy}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-all flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#C6A56B]" />
                <span>Inquire About Academy</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
