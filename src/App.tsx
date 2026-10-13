import React, { useState, useEffect } from 'react';
import { initialSalonData, salonServices, salonReviews, salonGallery, SalonBusinessInfo } from './data/salonData';
import { getStoredAppointments, saveAppointments, Appointment } from './data/appointmentData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AcademySpotlight } from './components/AcademySpotlight';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { OwnerEditDrawer } from './components/OwnerEditDrawer';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [salon, setSalon] = useState<SalonBusinessInfo>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem('ctc_salon_data');
        if (stored) {
          return { ...initialSalonData, ...JSON.parse(stored) };
        }
      }
    } catch {
      // Fallback
    }
    return initialSalonData;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return getStoredAppointments();
  });

  const [isAdminView, setIsAdminView] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [ownerDrawerOpen, setOwnerDrawerOpen] = useState(false);

  const handleUpdateAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleUpdateSalon = (updated: SalonBusinessInfo) => {
    setSalon(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('ctc_salon_data', JSON.stringify(updated));
      }
    } catch {
      // Ignore
    }
  };

  const handleRecordAppointment = (aptData: {
    clientName: string;
    clientPhone: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => {
    const matchedService = salonServices.find((s) => s.name === aptData.serviceName);
    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      clientName: aptData.clientName || 'Website Client',
      clientPhone: aptData.clientPhone || salon.phoneDisplay,
      serviceName: aptData.serviceName,
      category: matchedService ? matchedService.categoryLabel : 'General Haircare',
      date: aptData.date || new Date().toISOString().split('T')[0],
      timeSlot: aptData.timeSlot || '12:00 PM',
      price: matchedService ? matchedService.price : undefined,
      assignedStylist: 'Unassigned',
      status: 'pending',
      notes: aptData.notes,
      createdAt: new Date().toISOString(),
      source: 'Website Form',
    };

    const updated = [newApt, ...appointments];
    handleUpdateAppointments(updated);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setSelectedService(undefined);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInquireAcademy = () => {
    handleOpenBooking('Diploma in Professional Hair Dressing & Academy Courses');
  };

  // If Owner opened the Admin Portal
  if (isAdminView) {
    return (
      <AdminDashboard
        salon={salon}
        onUpdateSalon={handleUpdateSalon}
        appointments={appointments}
        onUpdateAppointments={handleUpdateAppointments}
        onCloseAdmin={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#242124] flex flex-col font-sans selection:bg-[#591C32] selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar
        salon={salon}
        onOpenBooking={handleOpenBooking}
        onOpenOwnerSettings={() => setOwnerDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminView(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          salon={salon}
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* Promotional / Special Offer Banner */}
        <PromoBanner
          announcement={salon.announcement}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Services & Treatment Offerings */}
        <ServicesSection
          services={salonServices}
          onBookService={(serviceName) => handleOpenBooking(serviceName)}
        />

        {/* About the Salon & Philosophy */}
        <AboutSection
          salon={salon}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Why Choose Us Minimal Feature Cards */}
        <WhyChooseUs />

        {/* Dedicated Academy Feature */}
        <AcademySpotlight
          salon={salon}
          onInquireAcademy={handleInquireAcademy}
        />

        {/* Photo Gallery & Lightbox */}
        <GallerySection gallery={salonGallery} />

        {/* Verified Customer Reviews */}
        <ReviewsSection
          reviews={salonReviews}
          salon={salon}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Contact, Opening Hours, Map & Booking Form */}
        <ContactSection
          salon={salon}
          onOpenBooking={handleOpenBooking}
          onRecordAppointment={handleRecordAppointment}
        />
      </main>

      {/* Footer */}
      <Footer
        salon={salon}
        onOpenBooking={() => handleOpenBooking()}
        onOpenOwnerSettings={() => setOwnerDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminView(true)}
      />

      {/* Interactive Booking Modal via WhatsApp */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        salon={salon}
        preselectedService={selectedService}
        onRecordAppointment={handleRecordAppointment}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        salon={salon}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Scroll To Top Button */}
      <ScrollToTop />

      {/* Business Owner Settings Drawer */}
      <OwnerEditDrawer
        isOpen={ownerDrawerOpen}
        onClose={() => setOwnerDrawerOpen(false)}
        salon={salon}
        onUpdateSalon={handleUpdateSalon}
      />
    </div>
  );
}
