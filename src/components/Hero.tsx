import React from 'react';
import { Search, MapPin, Wrench, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';
import { ALGERIA_WILAYAS } from '../data/wilayas';
import { CRAFT_CATEGORIES } from '../data/crafts';

interface HeroProps {
  selectedWilaya: number | 'all';
  onSelectWilaya: (wilayaId: number | 'all') => void;
  selectedCraft: string;
  onSelectCraft: (craftId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  emergencyOnly: boolean;
  onToggleEmergency: () => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedWilaya,
  onSelectWilaya,
  selectedCraft,
  onSelectCraft,
  searchQuery,
  onSearchChange,
  emergencyOnly,
  onToggleEmergency,
  onSearchSubmit,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & Search Box Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-1 w-fit mb-4">
              <span>🇩🇿 منصة الحرفيين الأولى في الجزائر</span>
              <span aria-hidden="true">·</span>
              <span>58 ولاية</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4" style={{ textWrap: 'balance' }}>
              أمهر الصنايعية والمعلمين في ولايتك لتصليح كل أعطالك المنزلية
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
              ابحث عن بلومبيي، كهربائي، فريغوريست، دهان، أو معلم بناء قرب بيتك. تواصل معهم مباشرة بالهاتف أو واتساب بدون وسطاء أو عمولات زائدة.
            </p>

            {/* Main Interactive Search Form */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                {/* Wilaya Filter */}
                <div className="sm:col-span-4 relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الولاية (58 ولاية)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedWilaya}
                      onChange={(e) =>
                        onSelectWilaya(
                          e.target.value === 'all' ? 'all' : Number(e.target.value)
                        )
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer appearance-none pl-8"
                    >
                      <option value="all">كل ولايات الوطن (58)</option>
                      {ALGERIA_WILAYAS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.code} - {w.nameAr} ({w.nameFr})
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Craft Filter */}
                <div className="sm:col-span-4 relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    خانة الحرفة
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCraft}
                      onChange={(e) => onSelectCraft(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer appearance-none pl-8"
                    >
                      <option value="all">جميع الحرف والمهن</option>
                      {CRAFT_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameAr}
                        </option>
                      ))}
                    </select>
                    <Wrench className="w-4 h-4 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Keyword / Name Search */}
                <div className="sm:col-span-4 relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    كلمة البحث أو العطل
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: تسريب مياه، مكيف..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 pl-8"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action row with emergency toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onToggleEmergency}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    emergencyOnly
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 ${emergencyOnly ? 'text-white' : 'text-red-500'}`} />
                  <span>طوارئ 24/7 (أعطال مستعجلة الآن)</span>
                </button>

                <button
                  type="button"
                  onClick={onSearchSubmit}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>ابحث عن صنايعي</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Visual Card Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl group">
              <img
                src="/src/assets/images/hero_artisan_algeria_1793798432205.jpg"
                alt="حرفي وصنايعي جزائري محترف"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white text-right">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>معتمدون ومجربون</span>
                </div>
                <h3 className="text-xl font-black text-white mb-1">
                  صْنايعي DZ · يوصلك بالمعلم الشاطر
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  تواصل هاتفي أو عبر الواتساب مباشرة مع الحرفيين في منطقتك، واطّلع على سنوات خبرتهم وأسعارهم التقديرية.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof & Trust Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-right">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="block text-2xl font-black text-slate-900 font-mono tabular-nums">58</span>
            <span className="text-xs font-bold text-slate-600">ولاية جزائرية مغطاة</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="block text-2xl font-black text-amber-600 font-mono tabular-nums">+10</span>
            <span className="text-xs font-bold text-slate-600">خانات مهن أساسية</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="block text-2xl font-black text-emerald-600">0 دج</span>
            <span className="text-xs font-bold text-slate-600">بدون عمولات أو وسيط</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="block text-2xl font-black text-slate-900">24/7</span>
            <span className="text-xs font-bold text-slate-600">خدمات طوارئ منزلية</span>
          </div>
        </div>
      </div>
    </section>
  );
};
