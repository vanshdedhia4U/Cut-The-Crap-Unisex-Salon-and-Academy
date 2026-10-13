import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, Send, Check } from 'lucide-react';
import { SalonBusinessInfo, salonServices } from '../data/salonData';
import { createWhatsAppBookingUrl } from '../utils/bookingHelper';

interface ContactSectionProps {
  salon: SalonBusinessInfo;
  onOpenBooking: (serviceName?: string) => void;
  onRecordAppointment?: (apt: {
    clientName: string;
    clientPhone: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  salon,
  onOpenBooking,
  onRecordAppointment,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: salonServices[0].name,
    date: '',
    time: 'Morning (11:00 AM - 1:00 PM)',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRecordAppointment) {
      onRecordAppointment({
        clientName: formData.name.trim(),
        clientPhone: formData.phone.trim() || salon.phoneDisplay,
        serviceName: formData.service,
        date: formData.date || new Date().toISOString().split('T')[0],
        timeSlot: formData.time,
        notes: formData.message.trim(),
      });
    }
    const url = createWhatsAppBookingUrl({
      phoneDigits: salon.whatsappNumber,
      salonName: salon.name,
      serviceName: formData.service,
      clientName: formData.name,
      preferredDate: formData.date,
      preferredTime: formData.time,
      customNotes: formData.message || (formData.phone ? `Contact: ${formData.phone}` : undefined),
    });
    setFormSubmitted(true);
    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickWhatsApp = () => {
    const url = createWhatsAppBookingUrl({
      phoneDigits: salon.whatsappNumber,
      salonName: salon.name,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#591C32]">
              Visit & Connect
            </span>
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242124] mb-4">
            Visit Our Ambernath Salon
          </h2>

          <p className="text-xs sm:text-sm text-[#242124]/75">
            Conveniently located near Dr. Bhise Hospital in Ambernath East. Walk in or reserve your preferred time slot online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Operating Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Business Card */}
            <div className="bg-white p-7 rounded-lg border border-[#C6A56B]/25 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#591C32] mb-1">
                {salon.name}
              </h3>
              <p className="text-xs text-[#C6A56B] uppercase tracking-wider font-semibold mb-6">
                Unisex Salon & Certified Academy
              </p>

              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EAD7D7]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#C6A56B]/30">
                    <MapPin className="w-4 h-4 text-[#591C32]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#242124] block mb-0.5">Salon Address</span>
                    <p className="text-[#242124]/75 leading-relaxed">
                      {salon.address.line1}, {salon.address.line2}, {salon.address.landmark}, {salon.address.locality}, {salon.address.city}, {salon.address.state} {salon.address.pincode}
                    </p>
                    <a
                      href={salon.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#591C32] font-semibold hover:text-[#C6A56B] mt-2 underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Driving Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-[#FAF6F0]">
                  <div className="w-9 h-9 rounded-full bg-[#EAD7D7]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#C6A56B]/30">
                    <Clock className="w-4 h-4 text-[#591C32]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#242124] block mb-0.5">Opening Hours</span>
                    <p className="text-[#242124]/75">{salon.hours.days}</p>
                    <p className="font-semibold text-[#591C32] mt-0.5">{salon.hours.timing}</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-[#FAF6F0]">
                  <div className="w-9 h-9 rounded-full bg-[#EAD7D7]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#C6A56B]/30">
                    <Phone className="w-4 h-4 text-[#591C32]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#242124] block mb-0.5">Direct Phone Call</span>
                    <a
                      href={`tel:${salon.phone}`}
                      className="text-[#591C32] font-bold hover:underline"
                    >
                      {salon.phoneDisplay}
                    </a>
                    <span className="text-xs text-[#242124]/60 block mt-0.5">
                      Available during operational hours
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-[#FAF6F0]">
                  <div className="w-9 h-9 rounded-full bg-[#EAD7D7]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#C6A56B]/30">
                    <MessageSquare className="w-4 h-4 text-[#591C32]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#242124] block mb-0.5">WhatsApp Bookings</span>
                    <span className="text-[#242124]/75 font-semibold block">{salon.whatsappDisplay}</span>
                    <button
                      onClick={handleQuickWhatsApp}
                      className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#C6A56B]" />
                      <span>Start WhatsApp Chat</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Interactive Map Card */}
            <div className="bg-white rounded-lg overflow-hidden border border-[#C6A56B]/25 shadow-sm">
              <div className="p-3 bg-[#FAF6F0] flex items-center justify-between border-b border-[#C6A56B]/20">
                <span className="text-xs font-bold text-[#242124] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#591C32]" />
                  Google Maps Location
                </span>
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#591C32] hover:underline"
                >
                  Open in Maps
                </a>
              </div>
              <div className="aspect-[16/9] w-full bg-[#EAD7D7]/20 relative">
                <iframe
                  title="Cut The Crap Unisex Salon and Academy Map Location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    salon.address.fullFormatted
                  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-lg border border-[#C6A56B]/30 shadow-md">
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-[#591C32] block mb-1">
                Fast WhatsApp Reservation
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#242124]">
                Schedule Your Appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#242124]/70 mt-1">
                Fill in your preferred details below to instantly connect with our salon booking desk on WhatsApp.
              </p>
            </div>

            {formSubmitted && (
              <div className="mb-6 p-4 rounded bg-[#EAD7D7]/40 border border-[#C6A56B]/40 text-xs text-[#591C32] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#591C32] shrink-0" />
                <span>
                  Opening WhatsApp conversation with Cut The Crap desk... If the window did not open, please click the button below.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Priyal Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    placeholder="e.g. 98200XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service-select" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                  Desired Treatment / Service *
                </label>
                <select
                  id="service-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                >
                  {salonServices.map((srv) => (
                    <option key={srv.id} value={srv.name}>
                      {srv.name} ({srv.categoryLabel})
                    </option>
                  ))}
                  <option value="General Consultation & Hair Checkup">
                    General Consultation & Hair Checkup
                  </option>
                  <option value="Academy Diploma Enrollment Inquiry">
                    Academy Diploma Enrollment Inquiry
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="appointment-date" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="appointment-time" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    id="appointment-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                  >
                    <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Night (7:00 PM - 9:30 PM)">Night (7:00 PM - 9:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="client-notes" className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1.5">
                  Special Notes or Hair Inquiries (Optional)
                </label>
                <textarea
                  id="client-notes"
                  rows={3}
                  placeholder="e.g. First time getting Cysteine treatment, want hair checkup first."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:border-[#591C32] focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#591C32] hover:bg-[#431425] active:scale-[0.99] rounded transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C6A56B]" />
                  <span>Send Appointment Request via WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#242124]/60">
                  ⚡ Pre-fills a structured WhatsApp message directly to {salon.whatsappDisplay}. No login or signup required.
                </p>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
