import React from 'react';
import { CRAFT_CATEGORIES } from '../data/crafts';
import { CraftIcon } from './CraftIcon';
import { ArrowLeft, Check } from 'lucide-react';

interface CraftsGridProps {
  selectedCraft: string;
  onSelectCraft: (craftId: string) => void;
  artisanCountsByCraft: Record<string, number>;
}

export const CraftsGrid: React.FC<CraftsGridProps> = ({
  selectedCraft,
  onSelectCraft,
  artisanCountsByCraft,
}) => {
  return (
    <section id="crafts" className="py-14 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-1 mb-2">
            <span>تخصصات الصيانة والأشغال</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            خانات المهن والحرف (اختر التخصص المطلوب)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            اضغط على أي خانة لعرض جميع المعلمين والحرفيين المتخصصين في هذا المجال داخل ولايتك.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CRAFT_CATEGORIES.map((craft) => {
            const isSelected = selectedCraft === craft.id;
            const count = artisanCountsByCraft[craft.id] || 0;

            return (
              <div
                key={craft.id}
                onClick={() => onSelectCraft(isSelected ? 'all' : craft.id)}
                className={`group text-right p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                      }`}
                    >
                      <CraftIcon name={craft.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono tabular-nums">
                      {count} حرفي
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                    {craft.nameAr}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mb-2">
                    {craft.nameFr}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {craft.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-amber-700">
                    <span>{isSelected ? 'إلغاء التحديد' : 'تصفح الحرفيين'}</span>
                    <ArrowLeft className="w-3.5 h-3.5 -translate-x-0 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset craft filter if one is selected */}
        {selectedCraft !== 'all' && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onSelectCraft('all')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              عرض جميع الحرف (إعادة الضبط)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
