import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Tag, DollarSign, FileText } from 'lucide-react';
import { Appointment, defaultStylists } from '../../data/appointmentData';
import { salonServices } from '../../data/salonData';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+91 ');
  const [serviceName, setServiceName] = useState(salonServices[0].name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [price, setPrice] = useState(salonServices[0].price || '₹500');
  const [assignedStylist, setAssignedStylist] = useState(defaultStylists[0]);
  const [source, setSource] = useState<'Walk-in' | 'Phone Call' | 'WhatsApp Web'>('Walk-in');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleServiceChange = (name: string) => {
    setServiceName(name);
    const matched = salonServices.find((s) => s.name === name);
    if (matched && matched.price) {
      setPrice(matched.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const matchedService = salonServices.find((s) => s.name === serviceName);
    const category = matchedService ? matchedService.categoryLabel : 'General Haircare';

    onAddAppointment({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      serviceName,
      category,
      date,
      timeSlot,
      price,
      assignedStylist,
      status: 'confirmed',
      source,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-xl shadow-2xl border border-[#C6A56B]/30 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#591C32] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold">New Salon Appointment</h3>
            <p className="text-xs text-[#FAF6F0]/70">Schedule a walk-in, phone booking, or consultation</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Client Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kadam"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                />
                <User className="w-4 h-4 text-[#C6A56B] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+91 98200XXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                />
                <Phone className="w-4 h-4 text-[#C6A56B] absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
              Service / Treatment *
            </label>
            <div className="relative">
              <select
                value={serviceName}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
              >
                {salonServices.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} ({srv.price || 'Consultation'})
                  </option>
                ))}
                <option value="Beard Styling & Shave">Beard Styling & Shave</option>
                <option value="Hair Spa & Deep Conditioning">Hair Spa & Deep Conditioning</option>
                <option value="Academy Masterclass Session">Academy Masterclass Session</option>
              </select>
              <Tag className="w-4 h-4 text-[#C6A56B] absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                />
                <Calendar className="w-3.5 h-3.5 text-[#C6A56B] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Time Slot *
              </label>
              <div className="relative">
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                >
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="07:30 PM">07:30 PM</option>
                  <option value="08:30 PM">08:30 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                </select>
                <Clock className="w-3.5 h-3.5 text-[#C6A56B] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Expected Price
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                />
                <DollarSign className="w-3.5 h-3.5 text-[#C6A56B] absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Assign Stylist
              </label>
              <select
                value={assignedStylist}
                onChange={(e) => setAssignedStylist(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
              >
                {defaultStylists.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
                Booking Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
              >
                <option value="Walk-in">Walk-in Client</option>
                <option value="Phone Call">Direct Phone Call</option>
                <option value="WhatsApp Web">WhatsApp Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#242124] uppercase tracking-wider mb-1">
              Internal Stylist Notes / Client Request
            </label>
            <div className="relative">
              <textarea
                rows={2}
                placeholder="e.g. Patch test done, prefer warm water wash..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded bg-white border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
              />
              <FileText className="w-4 h-4 text-[#C6A56B] absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#C6A56B]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-all shadow-sm cursor-pointer"
            >
              Add to Schedule
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
