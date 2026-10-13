import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Search,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock4,
  AlertCircle,
  Download,
  Printer,
  Trash2,
  Settings,
  Sparkles,
  Scissors
} from 'lucide-react';
import { Appointment, AppointmentStatus, defaultStylists } from '../../data/appointmentData';
import { SalonBusinessInfo } from '../../data/salonData';
import { NewAppointmentModal } from './NewAppointmentModal';

interface AdminDashboardProps {
  salon: SalonBusinessInfo;
  onUpdateSalon: (updated: SalonBusinessInfo) => void;
  appointments: Appointment[];
  onUpdateAppointments: (updated: Appointment[]) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  salon,
  onUpdateSalon,
  appointments,
  onUpdateAppointments,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'table' | 'settings'>('table');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // Date filter
      if (selectedDate && apt.date !== selectedDate && selectedDate !== 'all') {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && apt.status !== statusFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = apt.clientName.toLowerCase().includes(query);
        const matchesPhone = apt.clientPhone.toLowerCase().includes(query);
        const matchesService = apt.serviceName.toLowerCase().includes(query);
        const matchesStylist = (apt.assignedStylist || '').toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesService && !matchesStylist) {
          return false;
        }
      }
      return true;
    });
  }, [appointments, selectedDate, statusFilter, searchQuery]);

  // KPIs for selected date or total
  const stats = useMemo(() => {
    const list = selectedDate === 'all'
      ? appointments
      : appointments.filter((a) => a.date === selectedDate);

    const total = list.length;
    const confirmed = list.filter((a) => a.status === 'confirmed' || a.status === 'in-progress').length;
    const pending = list.filter((a) => a.status === 'pending').length;
    const completed = list.filter((a) => a.status === 'completed').length;
    
    // Revenue sum estimation
    const revenue = list
      .filter((a) => a.status !== 'cancelled')
      .reduce((sum, item) => {
        if (!item.price) return sum;
        const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

    return { total, confirmed, pending, completed, revenue };
  }, [appointments, selectedDate]);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Status Updater
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    onUpdateAppointments(updated);
    showNotice(`Appointment status changed to "${newStatus}"`);
  };

  // Stylist Assigner
  const handleStylistChange = (id: string, stylist: string) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, assignedStylist: stylist } : apt
    );
    onUpdateAppointments(updated);
    showNotice(`Assigned to ${stylist}`);
  };

  // Delete
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove appointment for ${name}?`)) {
      const updated = appointments.filter((apt) => apt.id !== id);
      onUpdateAppointments(updated);
      showNotice(`Appointment removed`);
    }
  };

  // Add Appointment
  const handleAddAppointment = (newAptData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newApt: Appointment = {
      ...newAptData,
      id: `apt-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newApt, ...appointments];
    onUpdateAppointments(updated);
    showNotice(`New appointment scheduled for ${newApt.clientName}`);
  };

  // Send WhatsApp confirmation to client
  const handleSendWhatsAppToClient = (apt: Appointment) => {
    const cleanDigits = apt.clientPhone.replace(/[^0-9]/g, '');
    const targetPhone = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;

    const message = `Hi ${apt.clientName}! Greetings from ${salon.shortName} (Ambernath East).\n\nYour appointment is confirmed:\n• Service: ${apt.serviceName}\n• Date: ${apt.date}\n• Time: ${apt.timeSlot}\n• Stylist: ${apt.assignedStylist || 'Senior Stylist'}\n\nLocation: Shop No. 2, Suryoday CHS, near Dr. Bhise Hospital.\nPlease reach 5 minutes prior. If you need to reschedule, reply here or call ${salon.phoneDisplay}. Thank you!`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showNotice(`WhatsApp confirmation link opened`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Client Name', 'Phone', 'Service', 'Date', 'Time', 'Stylist', 'Status', 'Price', 'Source', 'Notes'];
    const rows = filteredAppointments.map((a) => [
      a.id,
      `"${a.clientName}"`,
      `"${a.clientPhone}"`,
      `"${a.serviceName}"`,
      a.date,
      a.timeSlot,
      `"${a.assignedStylist || ''}"`,
      a.status,
      `"${a.price || ''}"`,
      a.source,
      `"${a.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ctc_salon_schedule_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice(`Schedule exported as CSV`);
  };

  // Print run sheet
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB] text-[#242124] flex flex-col font-sans">
      
      {/* Top Bar for Admin */}
      <header className="bg-[#242124] text-white px-4 sm:px-8 py-3.5 border-b border-[#C6A56B]/30 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#C6A56B] bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Website</span>
          </button>

          <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                {salon.name}
              </span>
              <span className="text-[10px] uppercase font-bold bg-[#591C32] text-[#C6A56B] px-2 py-0.5 rounded border border-[#C6A56B]/30">
                Owner Portal
              </span>
            </div>
            <p className="text-[11px] text-white/60 hidden sm:block">
              Appointment Scheduling & Daily Floor Management • Ambernath East
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded flex items-center gap-1.5 cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded flex items-center gap-1.5 cursor-pointer"
            title="Print Schedule"
          >
            <Printer className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="hidden sm:inline">Print Schedule</span>
          </button>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C6A56B]" />
            <span>New Appointment</span>
          </button>
        </div>
      </header>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="fixed top-16 right-6 z-50 bg-[#242124] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#C6A56B]/40 text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#C6A56B]" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 bg-white rounded-lg border border-[#C6A56B]/25 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
              Total Appointments
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] tabular-nums">
                {stats.total}
              </span>
              <Calendar className="w-4 h-4 text-[#C6A56B]" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              {selectedDate === 'all' ? 'All recorded' : `On ${selectedDate}`}
            </span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#C6A56B]/25 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 block mb-1">
              Confirmed / Active
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800 tabular-nums">
                {stats.confirmed}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">Ready for service</span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#C6A56B]/25 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700 block mb-1">
              Pending Confirmation
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-800 tabular-nums">
                {stats.pending}
              </span>
              <Clock4 className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">Requires stylist call/reply</span>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#C6A56B]/25 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-blue-700 block mb-1">
              Completed
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-blue-800 tabular-nums">
                {stats.completed}
              </span>
              <Scissors className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">Finished visits</span>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 bg-[#591C32] text-white rounded-lg border border-[#C6A56B]/30 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#C6A56B] block mb-1">
              Est. Day Revenue
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6F0] tabular-nums">
                ₹{stats.revenue.toLocaleString('en-IN')}
              </span>
              <Sparkles className="w-4 h-4 text-[#C6A56B]" />
            </div>
            <span className="text-[10px] text-white/60 mt-1 block">Expected floor total</span>
          </div>
        </div>

        {/* Navigation Tabs & Search / Filter Controls */}
        <div className="bg-white p-4 rounded-lg border border-[#C6A56B]/25 shadow-xs space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-3">
            {/* View Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#FAF6F0] rounded-lg border border-[#C6A56B]/20">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-[#591C32] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#591C32]'
                }`}
              >
                Appointments List ({filteredAppointments.length})
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-[#591C32] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#591C32]'
                }`}
              >
                Schedule Timeline
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#591C32] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#591C32]'
                }`}
              >
                Salon Settings
              </button>
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
                Date:
              </span>
              <button
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                className={`px-2.5 py-1 text-xs rounded font-medium border cursor-pointer ${
                  selectedDate === new Date().toISOString().split('T')[0]
                    ? 'bg-[#591C32] text-white border-[#591C32]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Today
              </button>
              <button
                onClick={() =>
                  setSelectedDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])
                }
                className={`px-2.5 py-1 text-xs rounded font-medium border cursor-pointer ${
                  selectedDate === new Date(Date.now() + 86400000).toISOString().split('T')[0]
                    ? 'bg-[#591C32] text-white border-[#591C32]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Tomorrow
              </button>
              <button
                onClick={() => setSelectedDate('all')}
                className={`px-2.5 py-1 text-xs rounded font-medium border cursor-pointer ${
                  selectedDate === 'all'
                    ? 'bg-[#591C32] text-white border-[#591C32]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <input
                type="date"
                value={selectedDate === 'all' ? '' : selectedDate}
                onChange={(e) => setSelectedDate(e.target.value || 'all')}
                className="px-2 py-1 text-xs rounded bg-gray-50 border border-gray-300 text-gray-700"
              />
            </div>
          </div>

          {/* Search & Status Filter Row */}
          {activeTab !== 'settings' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <input
                  type="text"
                  placeholder="Search by client, phone, service, or stylist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30 focus:outline-none focus:border-[#591C32]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-500 mr-1">Status:</span>
                {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded capitalize cursor-pointer ${
                        statusFilter === status
                          ? 'bg-[#242124] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tab 1: Detailed Table View */}
        {activeTab === 'table' && (
          <div className="bg-white rounded-lg border border-[#C6A56B]/25 shadow-sm overflow-hidden">
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-[#C6A56B] mx-auto mb-2 opacity-60" />
                <h4 className="font-serif font-bold text-base text-[#242124]">
                  No appointments found for this filter
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try clearing the search query or date filter, or schedule a new client appointment.
                </p>
                <button
                  onClick={() => setIsNewModalOpen(true)}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#591C32] rounded shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] text-[#242124] border-b border-[#C6A56B]/20 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Time & Date</th>
                      <th className="py-3 px-4">Client Details</th>
                      <th className="py-3 px-4">Service & Price</th>
                      <th className="py-3 px-4">Assigned Stylist</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-amber-50/20 transition-colors">
                        
                        {/* Time & Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-[#591C32] block text-sm tabular-nums">
                            {apt.timeSlot}
                          </span>
                          <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3 text-[#C6A56B]" />
                            {apt.date}
                          </span>
                        </td>

                        {/* Client Details */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#242124] block">{apt.clientName}</span>
                          <span className="text-gray-500 text-[11px] block">{apt.clientPhone}</span>
                          {apt.notes && (
                            <span className="text-[10px] text-gray-400 italic block mt-0.5 line-clamp-1" title={apt.notes}>
                              Note: {apt.notes}
                            </span>
                          )}
                        </td>

                        {/* Service & Price */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#242124] block">{apt.serviceName}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500 uppercase">{apt.category}</span>
                            <span className="text-[#591C32] font-bold tabular-nums">{apt.price || '—'}</span>
                          </div>
                        </td>

                        {/* Assigned Stylist */}
                        <td className="py-3.5 px-4">
                          <select
                            value={apt.assignedStylist || 'Unassigned'}
                            onChange={(e) => handleStylistChange(apt.id, e.target.value)}
                            className="text-xs py-1 px-2 rounded bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#591C32]"
                          >
                            {defaultStylists.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                            className={`text-xs py-1 px-2 rounded font-semibold border ${
                              apt.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : apt.status === 'in-progress'
                                ? 'bg-purple-50 text-purple-800 border-purple-300'
                                : apt.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : apt.status === 'completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-medium">
                            {apt.source}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* WhatsApp Notification */}
                            <button
                              onClick={() => handleSendWhatsAppToClient(apt)}
                              className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                              title="Send WhatsApp confirmation to client"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>

                            {/* Direct Call */}
                            <a
                              href={`tel:${apt.clientPhone}`}
                              className="p-1.5 text-[#591C32] hover:bg-[#EAD7D7]/30 rounded transition-colors"
                              title="Call client directly"
                            >
                              <Phone className="w-4 h-4" />
                            </a>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(apt.id, apt.clientName)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Remove appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Visual Timeline Schedule View */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg border border-[#C6A56B]/25 shadow-sm p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#242124]">
                  Floor Schedule for {selectedDate === 'all' ? 'Today' : selectedDate}
                </h3>
                <p className="text-xs text-gray-500">
                  Salon operational hours: 10:30 AM to 10:00 PM (Shop No. 2, Ambernath East)
                </p>
              </div>

              <button
                onClick={() => setIsNewModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#591C32] rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slot</span>
              </button>
            </div>

            {/* Time Slot Grid */}
            <div className="space-y-3 pt-2">
              {[
                '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
                '01:30 PM', '02:30 PM', '03:30 PM', '04:00 PM', '05:00 PM',
                '06:00 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:00 PM'
              ].map((slot) => {
                const slotAppointments = filteredAppointments.filter((a) => a.timeSlot === slot);
                const hasApt = slotAppointments.length > 0;

                return (
                  <div
                    key={slot}
                    className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      hasApt
                        ? 'bg-[#FAF6F0] border-[#C6A56B]/40 shadow-2xs'
                        : 'bg-white border-dashed border-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-32 shrink-0">
                      <Clock className="w-4 h-4 text-[#C6A56B]" />
                      <span className="font-bold text-sm text-[#242124] tabular-nums">{slot}</span>
                    </div>

                    <div className="flex-1">
                      {hasApt ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {slotAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              className="bg-white p-2.5 rounded border border-[#C6A56B]/30 shadow-xs flex items-center gap-3 text-xs"
                            >
                              <div>
                                <span className="font-bold text-[#242124]">{apt.clientName}</span>
                                <span className="text-[11px] text-gray-500 block">
                                  {apt.serviceName} ({apt.price || '—'})
                                </span>
                              </div>

                              <span className="text-[10px] text-[#591C32] bg-[#EAD7D7]/30 px-2 py-0.5 rounded font-medium">
                                {apt.assignedStylist || 'Stylist'}
                              </span>

                              <button
                                onClick={() => handleSendWhatsAppToClient(apt)}
                                className="text-emerald-700 hover:text-emerald-800 p-1"
                                title="WhatsApp client"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Styling chair open / Available for walk-in
                        </span>
                      )}
                    </div>

                    {!hasApt && (
                      <button
                        onClick={() => {
                          setIsNewModalOpen(true);
                        }}
                        className="text-[11px] font-semibold text-[#591C32] hover:underline self-start sm:self-auto cursor-pointer"
                      >
                        + Book Slot
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 3: Quick Salon Settings & Hours */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg border border-[#C6A56B]/25 shadow-sm p-6 max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#242124]">
                Salon Business Configuration
              </h3>
              <p className="text-xs text-gray-500">
                These settings directly update the live public website and booking phone links.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                  Salon Display Name
                </label>
                <input
                  type="text"
                  value={salon.name}
                  onChange={(e) => onUpdateSalon({ ...salon, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                    WhatsApp Digits (for wa.me)
                  </label>
                  <input
                    type="text"
                    value={salon.whatsappNumber}
                    onChange={(e) => onUpdateSalon({ ...salon, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                    Phone Display
                  </label>
                  <input
                    type="text"
                    value={salon.phoneDisplay}
                    onChange={(e) => onUpdateSalon({ ...salon, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={salon.hours.timing}
                    onChange={(e) =>
                      onUpdateSalon({
                        ...salon,
                        hours: { ...salon.hours, timing: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                    Days Open
                  </label>
                  <input
                    type="text"
                    value={salon.hours.days}
                    onChange={(e) =>
                      onUpdateSalon({
                        ...salon,
                        hours: { ...salon.hours, days: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242124] uppercase mb-1">
                  Full Formatted Address
                </label>
                <textarea
                  rows={2}
                  value={salon.address.fullFormatted}
                  onChange={(e) =>
                    onUpdateSalon({
                      ...salon,
                      address: { ...salon.address, fullFormatted: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => showNotice('Salon settings updated and synced')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#591C32] rounded shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddAppointment={handleAddAppointment}
      />

    </div>
  );
};
