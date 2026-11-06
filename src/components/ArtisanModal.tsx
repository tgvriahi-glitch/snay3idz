import React, { useState } from 'react';
import { Artisan, ClientReview } from '../types';
import { CRAFT_CATEGORIES } from '../data/crafts';
import {
  X,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Wrench,
  AlertCircle,
  Send,
  Check
} from 'lucide-react';

interface ArtisanModalProps {
  artisan: Artisan;
  reviews: ClientReview[];
  onClose: () => void;
  onAddReview: (artisanId: string, authorName: string, rating: number, comment: string) => void;
}

export const ArtisanModal: React.FC<ArtisanModalProps> = ({
  artisan,
  reviews,
  onClose,
  onAddReview,
}) => {
  const craft = CRAFT_CATEGORIES.find((c) => c.id === artisan.craftId);
  const cleanPhone = artisan.phone.replace(/\s+/g, '');
  const cleanWhatsapp = artisan.whatsapp.replace(/\D/g, '');

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    onAddReview(artisan.id, authorName.trim(), rating, comment.trim());
    setReviewSubmitted(true);
    setAuthorName('');
    setComment('');
  };

  const artisanReviews = reviews.filter((r) => r.artisanId === artisan.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 text-right">
        {/* Modal Header */}
        <div className="relative bg-slate-900 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {artisan.avatarUrl ? (
              <img
                src={artisan.avatarUrl}
                alt={artisan.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
                {artisan.name.slice(0, 2)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {artisan.name}
                </h3>
                {artisan.isVerified && (
                  <span className="text-emerald-400" title="حرفي معتمد">
                    <ShieldCheck className="w-5 h-5 inline" />
                  </span>
                )}
              </div>

              <p className="text-amber-400 font-bold text-sm mb-2">
                {craft?.nameAr || 'حرفي مهني'} ({craft?.nameFr})
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {artisan.wilayaName} - {artisan.baladiya}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  خبرة {artisan.experienceYears} سنة
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {artisan.rating.toFixed(1)} ({artisan.reviewsCount} تقييم)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>اتصال مباشر: {artisan.phone}</span>
            </a>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                `السلام عليكم أخ ${artisan.name}، أنا متصل من تطبيق صْنايعي DZ.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>

          {/* Emergency Alert */}
          {artisan.isEmergency24h && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center gap-3 text-red-900 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <strong className="block font-bold">متاح لخدمات الطوارئ 24/7</strong>
                يمكنك الاتصال في أي وقت للحالات المستعجلة وتسريبات المياه وانقطاع الكهرباء.
              </div>
            </div>
          )}

          {/* Bio & Details */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">نبذة عن الحرفي والخدمات المقدمة:</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {artisan.bio}
            </p>
          </div>

          {/* Pricing and Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-500 mb-1">الأسعار التقديرية</span>
              <span className="text-sm font-bold text-slate-900">{artisan.priceEstimate}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-500 mb-1">مناطق التنقل والعمل</span>
              <span className="text-sm font-bold text-slate-900">
                {artisan.workZone || `${artisan.wilayaName} وضواحيها`}
              </span>
            </div>
          </div>

          {/* Common jobs for this craft */}
          {craft && craft.popularJobs && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">أمثلة الأعطال والأشغال المعتادة:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {craft.popularJobs.map((job, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-amber-50/70 border border-amber-100 p-2 rounded-lg">
                    <Wrench className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{job}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900">
                آراء وتقييمات الزبائن ({artisanReviews.length})
              </h4>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 font-mono">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{artisan.rating.toFixed(1)} / 5</span>
              </div>
            </div>

            {/* List of reviews */}
            <div className="space-y-3 mb-6">
              {artisanReviews.length > 0 ? (
                artisanReviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-right">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900">{rev.authorName}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <span className="block text-[10px] text-slate-400 mt-1">{rev.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg text-center">
                  لا توجد تقييمات مكتوبة بعد لهذا الحرفي. كن أول من يقيّم تجربته!
                </p>
              )}
            </div>

            {/* Add Review Form */}
            <div className="bg-slate-100 p-4 rounded-2xl">
              <h5 className="text-xs font-bold text-slate-800 mb-2">أضف تقييمك بعد تجربة الخدمة</h5>
              {reviewSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>شكراً لك! تم إضافة تقييمك بنجاح.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="اسمك أو ولايتك (مثلاً: أمين - الجزائر)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex items-center justify-between bg-white border border-slate-300 rounded-xl px-3 py-2">
                      <span className="text-xs text-slate-600">التقييم:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-0.5 cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="اكتب تعليقك حول دقة الموعد، جودة العمل، والسعر..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>نشر التقييم</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            رقم الحرفي: <strong className="font-mono text-slate-800">{artisan.phone}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
