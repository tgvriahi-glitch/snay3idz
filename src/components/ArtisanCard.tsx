import React from 'react';
import { Artisan } from '../types';
import { CRAFT_CATEGORIES } from '../data/crafts';
import { CraftIcon } from './CraftIcon';
import { Phone, MessageCircle, Star, ShieldCheck, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
  onOpenDetails: (artisan: Artisan) => void;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, onOpenDetails }) => {
  const craft = CRAFT_CATEGORIES.find((c) => c.id === artisan.craftId);
  const cleanPhone = artisan.phone.replace(/\s+/g, '');
  const cleanWhatsapp = artisan.whatsapp.replace(/\D/g, '');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all text-right group">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {artisan.avatarUrl ? (
              <img
                src={artisan.avatarUrl}
                alt={artisan.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-base">
                {artisan.name.slice(0, 2)}
              </div>
            )}
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                  {artisan.name}
                </h3>
                {artisan.isVerified && (
                  <span title="حرفي موثوق ومجرب" className="text-emerald-600">
                    <ShieldCheck className="w-4 h-4 inline" />
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-amber-700">
                {craft?.nameAr || 'حرفي مهني'}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-extrabold text-slate-900 font-mono tabular-nums">
              {artisan.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-500 font-mono tabular-nums">
              ({artisan.reviewsCount})
            </span>
          </div>
        </div>

        {/* Clean unboxed metadata with separators - Anti-Slop §1.A */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-slate-700">{artisan.wilayaName}</span>
          <span aria-hidden="true">·</span>
          <span>{artisan.baladiya}</span>
          <span aria-hidden="true">·</span>
          <span>خبرة {artisan.experienceYears} سنوات</span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {artisan.bio}
        </p>

        {/* Price Guide */}
        <div className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <span className="text-slate-500 font-medium">تقدير التكلفة:</span>
          <span className="font-bold text-slate-800">{artisan.priceEstimate}</span>
        </div>

        {/* Emergency service indicator if applicable */}
        {artisan.isEmergency24h && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>خدمة طوارئ وأعطال مستعجلة 24/7</span>
          </div>
        )}
      </div>

      {/* Action Buttons: Phone, WhatsApp, and Details */}
      <div className="pt-3 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Direct Phone Call */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>اتصال هاتفي</span>
          </a>

          {/* Direct WhatsApp Chat */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
              `السلام عليكم، أنا متصل من تطبيق صْنايعي DZ بخصوص عطل/خدمة ${craft?.nameAr || ''}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>مراسلة واتساب</span>
          </a>
        </div>

        <button
          onClick={() => onOpenDetails(artisan)}
          className="w-full py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>عرض كامل التفاصيل والتقييمات</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
