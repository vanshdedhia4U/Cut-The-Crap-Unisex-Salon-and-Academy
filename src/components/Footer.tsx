import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Instagram, Facebook, Settings } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface FooterProps {
  salon: SalonBusinessInfo;
  onOpenBooking: () => void;
  onOpenOwnerSettings: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ salon, onOpenBooking, onOpenOwnerSettings, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#242124] text-[#FAF6F0] pt-16 pb-12 border-t border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block mb-1">
                {salon.name}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A56B] font-semibold block mb-4">
                Unisex Salon & Professional Academy
              </span>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 leading-relaxed max-w-sm mb-6">
                Redefining personal grooming and bridal artistry in Ambernath since {salon.establishedYear}. Dedicated to authentic craft, high-grade hair care, and professional stylist education.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href={salon.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6A56B] hover:text-white underline transition-colors"
              >
                Find Us on Google Maps
              </a>
              <span className="text-white/30">•</span>
              <button
                onClick={onOpenAdmin}
                className="text-[#C6A56B] hover:text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-[#C6A56B]/30"
                title="Open Owner Scheduling & Appointment Portal"
              >
                <Settings className="w-3 h-3 text-[#C6A56B]" />
                <span>Owner Portal (Schedules)</span>
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C6A56B]/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF6F0]/70">
              <li>
                <a href="#services" className="hover:text-[#C6A56B] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C6A56B] transition-colors">
                  About the Salon
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#C6A56B] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C6A56B] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C6A56B] transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C6A56B] transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C6A56B]/30 pb-2">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF6F0]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">{salon.hours.days}</span>
                  <span className="text-[#C6A56B] font-bold block mt-0.5">{salon.hours.timing}</span>
                  <span className="text-[11px] text-[#FAF6F0]/60 block mt-1">
                    Appointments & Walk-ins Welcome
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Booking Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C6A56B]/30 pb-2">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF6F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF6F0]/70 leading-relaxed">
                  {salon.address.line1}, {salon.address.locality}, Ambernath East - {salon.address.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <a href={`tel:${salon.phone}`} className="hover:text-[#C6A56B] transition-colors font-medium">
                  {salon.phoneDisplay}
                </a>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/50 gap-4">
          <p>
            © {currentYear} {salon.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Ambernath East, Maharashtra</span>
            <span className="text-[#C6A56B]">•</span>
            <span>Unisex Salon & Academy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
