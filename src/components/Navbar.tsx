import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { SalonBusinessInfo } from '../data/salonData';

interface NavbarProps {
  salon: SalonBusinessInfo;
  onOpenBooking: (serviceName?: string) => void;
  onOpenOwnerSettings: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ salon, onOpenBooking, onOpenOwnerSettings, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border-b border-[#C6A56B]/20 py-3.5'
          : 'bg-[#FAF6F0]/80 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex flex-col group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#591C32] rounded"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#242124] group-hover:text-[#591C32] transition-colors whitespace-nowrap">
              {salon.shortName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A56B] font-medium -mt-0.5">
              Unisex Salon & Academy
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#242124]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-[#591C32] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C6A56B] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#591C32] hover:text-[#591C32]/80 bg-[#EAD7D7]/30 hover:bg-[#EAD7D7]/50 px-2.5 py-1.5 rounded border border-[#C6A56B]/30 transition-colors whitespace-nowrap cursor-pointer"
              title="Access Salon Owner Admin Dashboard"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#591C32]" />
              <span>Owner Portal</span>
            </button>

            <a
              href={`tel:${salon.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-[#242124]/80 hover:text-[#591C32] px-2 py-1.5 transition-colors whitespace-nowrap"
              title="Call Salon Directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A56B]" />
              <span>{salon.phoneDisplay}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#591C32] hover:bg-[#451426] active:scale-[0.98] transition-all rounded shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#C6A56B]" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#242124] hover:text-[#591C32] hover:bg-[#EAD7D7]/30 rounded transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#C6A56B]/30 px-6 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-[#242124] hover:text-[#591C32] py-2 border-b border-[#EAD7D7]/40"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#591C32] bg-[#EAD7D7]/40 border border-[#C6A56B]/40 rounded text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#591C32]" />
                <span>Open Owner Portal (Schedules & Bookings)</span>
              </button>

              <a
                href={`tel:${salon.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#591C32] bg-[#EAD7D7]/30 rounded border border-[#C6A56B]/30"
              >
                <Phone className="w-4 h-4 text-[#C6A56B]" />
                <span>Call {salon.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-[#591C32] hover:bg-[#451426] rounded text-center shadow-sm"
              >
                Book Appointment via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
