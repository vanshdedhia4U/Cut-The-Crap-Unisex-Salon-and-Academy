import React, { useState } from 'react';
import { X, Save, RotateCcw, Edit3, CheckCircle2 } from 'lucide-react';
import { SalonBusinessInfo, initialSalonData } from '../data/salonData';

interface OwnerEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  salon: SalonBusinessInfo;
  onUpdateSalon: (updated: SalonBusinessInfo) => void;
}

export const OwnerEditDrawer: React.FC<OwnerEditDrawerProps> = ({
  isOpen,
  onClose,
  salon,
  onUpdateSalon,
}) => {
  const [formData, setFormData] = useState<SalonBusinessInfo>({ ...salon });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSalon(formData);
    localStorage.setItem('ctc_salon_data', JSON.stringify(formData));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ ...initialSalonData });
    onUpdateSalon({ ...initialSalonData });
    localStorage.removeItem('ctc_salon_data');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col border-l border-[#C6A56B]/30 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 bg-[#591C32] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#C6A56B]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Salon Owner Customizer</h3>
              <p className="text-[11px] text-[#FAF6F0]/75">
                Edit numbers, hours & promo banner in real-time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Settings updated and stored successfully!</span>
            </div>
          )}

          {/* Contact Numbers */}
          <div className="space-y-3 p-4 bg-white rounded-lg border border-[#C6A56B]/25">
            <h4 className="font-serif font-bold text-[#591C32] text-sm">
              Contact & WhatsApp Settings
            </h4>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                WhatsApp Digits (for wa.me links)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                placeholder="e.g. 918237734777"
              />
              <span className="text-[10px] text-gray-500">Must include country code without +</span>
            </div>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Phone Display Number
              </label>
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
                placeholder="e.g. +91 82377 34777"
              />
            </div>
          </div>

          {/* Promotional Banner Controls */}
          <div className="space-y-3 p-4 bg-white rounded-lg border border-[#C6A56B]/25">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-[#591C32] text-sm">
                Promotional Banner
              </h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={formData.announcement.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, enabled: e.target.checked },
                    })
                  }
                  className="rounded text-[#591C32] focus:ring-[#591C32]"
                />
                <span className="font-semibold text-xs">Enable Banner</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Headline
              </label>
              <input
                type="text"
                value={formData.announcement.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: { ...formData.announcement, headline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.announcement.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: { ...formData.announcement, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={formData.announcement.ctaText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: { ...formData.announcement, ctaText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
              />
            </div>
          </div>

          {/* Operating Hours & Address */}
          <div className="space-y-3 p-4 bg-white rounded-lg border border-[#C6A56B]/25">
            <h4 className="font-serif font-bold text-[#591C32] text-sm">
              Hours & Location
            </h4>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formData.hours.timing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hours: { ...formData.hours, timing: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#242124] text-xs mb-1">
                Days Open
              </label>
              <input
                type="text"
                value={formData.hours.days}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hours: { ...formData.hours, days: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded bg-[#FAF6F0] border border-[#C6A56B]/30"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-xs text-gray-600 hover:text-red-700 hover:bg-gray-100 rounded flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#591C32] hover:bg-[#431425] rounded shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#C6A56B]" />
              <span>Save & Apply</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
