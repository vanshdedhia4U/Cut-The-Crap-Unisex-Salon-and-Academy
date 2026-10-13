import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scissors, ShieldCheck, HeartHandshake } from 'lucide-react';
import { whyChooseUsFeatures } from '../data/salonData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#591C32]" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#591C32]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#591C32]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-5 h-5 text-[#591C32]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-white relative border-b border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
              The CTC Standard
            </span>
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#242124] mb-3">
            Why Ambernath Trusts Cut The Crap
          </h2>

          <p className="text-xs sm:text-sm text-[#242124]/75">
            Craftsmanship rooted in client individuality, clinical hygiene, and transparent advice.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-lg bg-[#FAF6F0] border border-[#C6A56B]/25 hover:border-[#591C32]/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-white border border-[#C6A56B]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
                  {getIcon(feature.iconName)}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#242124] group-hover:text-[#591C32] transition-colors mb-2">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#242124]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C6A56B]/15 flex items-center justify-between text-[11px] text-[#C6A56B] font-semibold tracking-wider uppercase">
                <span>0{idx + 1}</span>
                <span className="w-4 h-[1px] bg-[#C6A56B]/40" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
