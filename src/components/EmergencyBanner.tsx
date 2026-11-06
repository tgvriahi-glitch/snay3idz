import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, ArrowLeft } from 'lucide-react';

interface EmergencyBannerProps {
  onFilterEmergency: () => void;
  isEmergencyActive: boolean;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onFilterEmergency,
  isEmergencyActive,
}) => {
  return (
    <section id="emergency" className="py-8 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-black bg-white/20 px-2 py-0.5 rounded-sm">
                  خدمة الطوارئ المنزلية (Dépannage Express)
                </span>
                <span className="text-xs font-bold text-amber-200">24/24 و 7/7</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                عندك تسريب ماء مستعجل، انقطاع تيار كهربائي، أو باب مغلق؟
              </h3>
              <p className="text-xs text-red-100 max-w-2xl mt-0.5">
                تصفح قائمة المعلمين المستعدين للتدخل السريع في الأوقات الصعبة والعطلات الأسبوعية.
              </p>
            </div>
          </div>

          <button
            onClick={onFilterEmergency}
            className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer ${
              isEmergencyActive
                ? 'bg-white text-red-700 hover:bg-red-50'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            <span>{isEmergencyActive ? 'عرض جميع المعلمين' : 'عرض معلّمي الطوارئ فقط'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
