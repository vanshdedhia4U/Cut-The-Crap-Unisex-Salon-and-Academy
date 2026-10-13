import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react';
import { ReviewItem, SalonBusinessInfo } from '../data/salonData';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  salon: SalonBusinessInfo;
  onOpenBooking: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, salon, onOpenBooking }) => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white relative border-b border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with verified rating summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C6A56B]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
                Customer Sentiment
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242124]">
              Loved by Ambernath
            </h2>

            <p className="text-xs sm:text-sm text-[#242124]/75 mt-3 max-w-xl">
              Real feedback from clients who visit us for precision haircuts, hair bond restoration treatments, and radiant wedding glam.
            </p>
          </div>

          {/* Rating scorecard badge */}
          <div className="bg-[#FAF6F0] p-6 rounded-lg border border-[#C6A56B]/30 flex items-center gap-6 shrink-0 shadow-xs">
            <div className="text-center border-r border-[#C6A56B]/30 pr-6">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#591C32] tabular-nums">
                {salon.rating.score}
              </span>
              <div className="flex items-center justify-center gap-0.5 mt-1 text-[#C6A56B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(salon.rating.score)
                        ? 'fill-[#C6A56B]'
                        : i < salon.rating.score
                        ? 'fill-[#C6A56B]/60'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#242124] text-sm">
                450+ Verified Reviews
              </span>
              <span className="text-[#242124]/70">
                Google Maps & Local Portals
              </span>
              <a
                href={salon.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#591C32] font-semibold hover:underline mt-1.5"
              >
                <span>Read Google Reviews</span>
                <ExternalLink className="w-3 h-3 text-[#C6A56B]" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF6F0] p-6 rounded-lg border border-[#C6A56B]/25 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars & verified chip */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating
                            ? 'fill-[#C6A56B] text-[#C6A56B]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-[#242124]/60 font-medium">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#242124]/80 italic leading-relaxed mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#C6A56B]/15 flex items-center gap-3">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#C6A56B]/40 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#591C32]/10 text-[#591C32] font-bold text-xs flex items-center justify-center shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#242124] truncate">{rev.author}</span>
                    <CheckCircle className="w-3 h-3 text-[#591C32] shrink-0" />
                  </div>
                  {rev.serviceMentioned && (
                    <span className="text-[11px] text-[#591C32] font-medium block truncate">
                      {rev.serviceMentioned}
                    </span>
                  )}
                  <span className="text-[10px] text-[#242124]/50 block">
                    {rev.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Experience CTA */}
        <div className="mt-12 text-center p-6 bg-[#FAF6F0] rounded border border-[#C6A56B]/20 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-sm font-bold text-[#242124]">
              Ready for your transformation?
            </h4>
            <p className="text-xs text-[#242124]/70">
              Speak with our senior stylists to schedule your consultation.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-colors whitespace-nowrap cursor-pointer"
          >
            Book via WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};
