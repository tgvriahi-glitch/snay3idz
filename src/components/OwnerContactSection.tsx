import React, { useState } from 'react';
import { AppOwnerConfig } from '../types';
import { Instagram, MessageCircle, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface OwnerContactSectionProps {
  ownerConfig: AppOwnerConfig;
}

export const OwnerContactSection: React.FC<OwnerContactSectionProps> = ({ ownerConfig }) => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderWilaya, setSenderWilaya] = useState('');
  const [messageType, setMessageType] = useState<'craftsman_join' | 'general_feedback' | 'business'>('craftsman_join');
  const [messageText, setMessageText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWhatsapp = ownerConfig.whatsappNumber.replace(/\D/g, '');

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !messageText.trim()) return;

    const topicLabel =
      messageType === 'craftsman_join'
        ? 'طلب تسجيل كحرفي في التطبيق'
        : messageType === 'business'
        ? 'شراكة أو استفسار تجاري'
        : 'اقتراح أو ملاحظة';

    const fullMessage = `السلام عليكم ورحمة الله،
أنا: ${senderName}
من ولاية: ${senderWilaya || 'الجزائر'}
رقم الهاتف: ${senderPhone || 'غير محدد'}
الموضوع: ${topicLabel}

نص الرسالة:
${messageText}

(مُرسل من خلال تطبيق صْنايعي DZ)`;

    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="owner-contact" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800 rounded-md px-3 py-1 mb-3">
            <span>تواصل مباشر مع مؤسس المنصة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            تواصل معي أنا صاحب التطبيق (انستاغرام و واتساب)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            أهلاً بكم! أنا صاحب ومطور منصة <strong>Snay3i DZ</strong>. يسعدني التواصل المباشر معكم عبر واتساب أو انستاغرام للاستفسارات، طلبات إضافة الحرفيين المعتمدين، أو أي اقتراحات لتطوير الخدمة في ولايتك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Social Channels Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                'السلام عليكم، أتواصل معك من خلال منصة صْنايعي DZ...'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md">
                  دردشة سريعة
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                تواصل عبر واتساب (WhatsApp)
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-3">
                اضغط هنا لبدء محادثة فورية مباشرة مع صاحب التطبيق على الرقم:
              </p>
              <div className="font-mono text-base font-bold text-[#07ffb6]" style={{ color: '#07ffb6' }}>
                {ownerConfig.whatsappDisplay}
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={ownerConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-pink-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-pink-400 bg-pink-950/80 px-2.5 py-1 rounded-md">
                  متابعة وتواصل
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                تواصل عبر انستاغرام (Instagram)
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-3">
                تابع جديد الحرفيين وشاهد تجارب العمل أو أرسل رسالة خاصة DM على:
              </p>
              <div className="font-mono text-base font-bold text-pink-400">
                @{ownerConfig.instagramHandle}
              </div>
            </a>

            {/* Trust box */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block font-bold mb-0.5">
                  أنت حرفي وتريد الانضمام للتطبيق؟
                </strong>
                يمكنك مراسلتي على واتساب أو إرسال بياناتك عبر الاستمارة وسأقوم بإضافتك شخصياً عبر لوحة الإدارة بعد التحقق من خبرتك وجودة عملك.
              </div>
            </div>
          </div>

          {/* Quick Contact / Join Form */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2">
              أرسل رسالتك مباشرة لصاحب التطبيق
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              املأ البيانات التالية وسيتم تحويلك فوراً إلى محادثة واتساب جاهزة بالإرسال:
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white mb-1">
                  تم فتح محادثة الواتساب بنجاح!
                </h4>
                <p className="text-xs text-slate-300 mb-4">
                  شكراً لتواصلك، سأرد عليك في أقرب وقت ممكن بإذن الله.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded-lg text-white transition-colors cursor-pointer"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: حمزة الجزائري"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      placeholder="05 / 06 / 07 ..."
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      الولاية
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: وهران، قسنطينة، سطيف..."
                      value={senderWilaya}
                      onChange={(e) => setSenderWilaya(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      نوع الرسالة
                    </label>
                    <select
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="craftsman_join">أنا حرفي وأريد الانضمام للتطبيق</option>
                      <option value="general_feedback">اقتراح أو ملاحظة حول التطبيق</option>
                      <option value="business">شراكة أو استفسار تجاري</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    نص الرسالة أو تفاصيل مهنتك *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب تفاصيل استفسارك، أو مهنتك وسنوات خبرتك ومناطق عملك..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>إرسال مباشرة لصاحب التطبيق عبر واتساب</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
