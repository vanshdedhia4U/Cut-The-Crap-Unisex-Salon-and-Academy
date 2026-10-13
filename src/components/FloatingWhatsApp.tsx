import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { createWhatsAppBookingUrl } from '../utils/bookingHelper';
import { SalonBusinessInfo } from '../data/salonData';

interface FloatingWhatsAppProps {
  salon: SalonBusinessInfo;
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ salon, onOpenBooking }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const url = createWhatsAppBookingUrl({
      phoneDigits: salon.whatsappNumber,
      salonName: salon.name,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-2">
      {/* Discreet dismissible bubble tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#242124] px-3.5 py-2 rounded-lg shadow-xl border border-[#C6A56B]/30 text-xs animate-in fade-in slide-in-from-right-2">
          <span>Book your appointment on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#591C32] hover:bg-[#431425] text-white shadow-xl hover:shadow-2xl border-2 border-[#C6A56B] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Chat with Cut The Crap Unisex Salon on WhatsApp"
        title="WhatsApp Booking Desk"
      >
        <MessageSquare className="w-6 h-6 text-[#C6A56B] group-hover:scale-110 transition-transform" />
        
        {/* Subtle status pulse */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A56B] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C6A56B]"></span>
        </span>
      </button>
    </div>
  );
};
