import React from 'react';
import { Artisan } from '../types';
import { ArtisanCard } from './ArtisanCard';
import { CRAFT_CATEGORIES } from '../data/crafts';
import { ALGERIA_WILAYAS } from '../data/wilayas';
import { SlidersHorizontal, AlertCircle, Wrench } from 'lucide-react';

interface ArtisanListProps {
  artisans: Artisan[];
  selectedWilaya: number | 'all';
  selectedCraft: string;
  emergencyOnly: boolean;
  searchQuery: string;
  onSelectWilaya: (id: number | 'all') => void;
  onSelectCraft: (id: string) => void;
  onToggleEmergency: () => void;
  onResetFilters: () => void;
  onOpenDetails: (artisan: Artisan) => void;
  onOpenAdmin: () => void;
}

export const ArtisanList: React.FC<ArtisanListProps> = ({
  artisans,
  selectedWilaya,
  selectedCraft,
  emergencyOnly,
  searchQuery,
  onSelectWilaya,
  onSelectCraft,
  onToggleEmergency,
  onResetFilters,
  onOpenDetails,
  onOpenAdmin,
}) => {
  const currentCraft = CRAFT_CATEGORIES.find((c) => c.id === selectedCraft);
  const currentWilaya = ALGERIA_WILAYAS.find((w) => w.id === selectedWilaya);

  return (
    <section id="artisans" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-right">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
              <span>دليل الحرفيين المعتمدين</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{artisans.length} حرفي متوفر</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentCraft
                ? `معلمو ${currentCraft.nameAr}`
                : 'الحرفيون المتوفرون في ولايتك'}
            </h2>
            {currentWilaya && (
              <p className="text-sm font-semibold text-amber-700 mt-1">
                تصفية حسب: ولاية {currentWilaya.nameAr} ({currentWilaya.code})
              </p>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onToggleEmergency}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                emergencyOnly
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>خدمة طوارئ 24/7</span>
            </button>

            {(selectedWilaya !== 'all' ||
              selectedCraft !== 'all' ||
              emergencyOnly ||
              searchQuery.trim().length > 0) && (
              <button
                onClick={onResetFilters}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                إلغاء كل الفلاتر
              </button>
            )}
          </div>
        </div>

        {/* Artisans Grid or Empty State */}
        {artisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 sm:p-14 text-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              لم نجد حرفيين يطابقون خيارات البحث الحالية
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              جرب تغيير الولاية، أو اختيار حرفة أخرى، أو إلغاء فلاتر البحث.
              كما يمكن لمدير المنصة إضافة حرفيين جدد لهذه المنطقة عبر فضاء الإدارة بالرمز السري.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onResetFilters}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                إظهار جميع الحرفيين
              </button>
              <button
                onClick={onOpenAdmin}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                إضافة عامل جديد (خاص بالمدير)
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
