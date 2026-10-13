import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Phone, Calendar, Clock, User, Sparkles } from 'lucide-react';
import { SalonBusinessInfo, salonServices } from '../data/salonData';
import { createWhatsAppBookingUrl } from '../utils/bookingHelper';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  salon: SalonBusinessInfo;
  preselectedService?: string;
  onRecordAppointment?: (apt: {
    clientName: string;
    clientPhone: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  salon,
  preselectedService,
  onRecordAppointment,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService || salonServices[0].name
  );
  const [clientName, setClientName] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('Afternoon (1:00 PM - 4:00 PM)');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRecordAppointment) {
      onRecordAppointment({
        clientName: clientName.trim() || 'Website Visitor',
        clientPhone: salon.phoneDisplay,
        serviceName: selectedService,
        date: preferredDate || new Date().toISOString().split('T')[0],
        timeSlot: preferredTime,
        notes: notes.trim(),
      });
    }
    const url = createWhatsAppBookingUrl({
      phoneDigits: salon.whatsappNumber,
      salonName: salon.name,
      serviceName: selectedService,
      clientName: clientName,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      customNotes: notes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#FAF6F0] rounded-xl shadow-2xl border border-[#C6A56B]/30 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-[#591C32] text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C6A56B]" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0]">
                  Reserve Your Appointment
                </h3>
                <p className="text-[11px] text-[#FAF6F0]/75">
                  Direct WhatsApp Booking • Instant Confirmation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#FAF6F0]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleLaunchWhatsApp} className="p-6 space-y-4">
            
            {/* Service Selection */}
            <div>
              <label htmlFor="service-selection" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Select Service / Treatment *
              </label>
              <select
                id="service-selection"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded bg-white border border-[#C6A56B]/30 text-[#242124] focus:outline-none focus:border-[#591C32]"
              >
                {salonServices.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} ({srv.price || 'Consultation'})
                  </option>
                ))}
                <option value="General Consultation & Hair Check">
                  General Consultation & Hair Check
                </option>
                <option value="Bridal Couture Package Inquiry">
                  Bridal Couture Package Inquiry
                </option>
                <option value="Academy Course Admissions">
                  Academy Course Admissions
                </option>
              </select>
            </div>

            {/* Client Name */}
            <div>
              <label htmlFor="client-name-input" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Your Name (Optional)
              </label>
              <div className="relative">
                <input
                  id="client-name-input"
                  type="text"
                  placeholder="e.g. Aishwarya Mehta"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded bg-white border border-[#C6A56B]/30 text-[#242124] focus:outline-none focus:border-[#591C32]"
                />
                <User className="w-4 h-4 text-[#C6A56B] absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-date-input" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    id="modal-date-input"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 text-[#242124] focus:outline-none focus:border-[#591C32]"
                  />
                  <Calendar className="w-3.5 h-3.5 text-[#C6A56B] absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="modal-time-slot" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                  Preferred Slot
                </label>
                <div className="relative">
                  <select
                    id="modal-time-slot"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-8 pr-2 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 text-[#242124] focus:outline-none focus:border-[#591C32]"
                  >
                    <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Night (7:00 PM - 9:30 PM)">Night (7:00 PM - 9:30 PM)</option>
                  </select>
                  <Clock className="w-3.5 h-3.5 text-[#C6A56B] absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="modal-notes" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Special Requests / Hair History
              </label>
              <textarea
                id="modal-notes"
                rows={2}
                placeholder="e.g. Previous chemical treatments, sensitive scalp..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 text-[#242124] focus:outline-none focus:border-[#591C32]"
              />
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#591C32] hover:bg-[#431425] active:scale-[0.99] rounded transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#C6A56B]" />
                <span>Book via WhatsApp ({salon.whatsappDisplay})</span>
              </button>
            </div>

            {/* Or Direct Call alternative */}
            <div className="pt-2 text-center border-t border-[#C6A56B]/20">
              <p className="text-[11px] text-[#242124]/70 mb-2">
                Prefer to talk with our reception now?
              </p>
              <a
                href={`tel:${salon.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#591C32] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Call Directly: {salon.phoneDisplay}</span>
              </a>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
