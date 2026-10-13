export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  category: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  price?: string;
  assignedStylist?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  source: 'WhatsApp Web' | 'Website Form' | 'Walk-in' | 'Phone Call';
}

export const defaultStylists = [
  'Stylist Rahul (Hair Specialist)',
  'Stylist Pooja (Color & Cysteine)',
  'Stylist Snehal (Bridal & Makeup)',
  'Esthetician Priya (Skin & Facials)',
  'Unassigned',
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-101',
    clientName: 'Aarti Patil',
    clientPhone: '+91 98234 56789',
    serviceName: 'Cysteine & Keratin Smoothing Therapy',
    category: 'Hair Treatments',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '11:00 AM',
    price: '₹3,999',
    assignedStylist: 'Stylist Pooja (Color & Cysteine)',
    status: 'confirmed',
    notes: 'Client has previous colored hair. Requested scalp check.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: 'Website Form',
  },
  {
    id: 'apt-102',
    clientName: 'Rohan Mehra',
    clientPhone: '+91 97654 32100',
    serviceName: 'Precision Haircut & Signature Styling',
    category: 'Haircuts & Styling',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '01:30 PM',
    price: '₹350',
    assignedStylist: 'Stylist Rahul (Hair Specialist)',
    status: 'in-progress',
    notes: 'Low fade with scissor cut on top.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    source: 'WhatsApp Web',
  },
  {
    id: 'apt-103',
    clientName: 'Kavita Joshi',
    clientPhone: '+91 98220 11223',
    serviceName: 'Hydra-Radiance & Detox Skin Facial',
    category: 'Skin Care & Facials',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '04:00 PM',
    price: '₹1,499',
    assignedStylist: 'Esthetician Priya (Skin & Facials)',
    status: 'pending',
    notes: 'First time visit from Kansai Section.',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    source: 'Website Form',
  },
  {
    id: 'apt-104',
    clientName: 'Vikas Sharma',
    clientPhone: '+91 99887 76655',
    serviceName: 'Groom Transformation & Beard Sculpting',
    category: 'Bridal & Grooming',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '06:30 PM',
    price: '₹1,800',
    assignedStylist: 'Stylist Rahul (Hair Specialist)',
    status: 'confirmed',
    notes: 'Engagement ceremony on weekend.',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    source: 'Phone Call',
  },
  {
    id: 'apt-105',
    clientName: 'Meera Deshmukh',
    clientPhone: '+91 98112 34567',
    serviceName: 'Balayage, Highlights & Global Color',
    category: 'Hair Colour',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '12:00 PM',
    price: '₹2,499',
    assignedStylist: 'Stylist Pooja (Color & Cysteine)',
    status: 'confirmed',
    notes: 'Caramel highlights on dark brown hair.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    source: 'WhatsApp Web',
  },
  {
    id: 'apt-106',
    clientName: 'Sanjay Tambe',
    clientPhone: '+91 97660 88990',
    serviceName: 'Precision Haircut & Signature Styling',
    category: 'Haircuts & Styling',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '03:00 PM',
    price: '₹350',
    assignedStylist: 'Unassigned',
    status: 'pending',
    notes: 'Walk-in requested confirmation.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    source: 'Walk-in',
  },
];

const STORAGE_KEY = 'ctc_salon_appointments_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load appointments from localStorage', e);
  }
  // Save initial if empty
  saveAppointments(initialAppointments);
  return initialAppointments;
}

export function saveAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.error('Failed to save appointments to localStorage', e);
  }
}
