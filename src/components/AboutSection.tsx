import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  MapPin,
  ChevronDown,
  CheckCircle2,
  HeartHandshake,
  Award,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ما هو تطبيق صْنايعي DZ (Snay3i DZ)؟',
      a: 'هو منصة جزائرية متخصصة تهدف لتسهيل حياة المواطنين عبر ربطهم بأمهر الحرفيين والمهنيين (بلومبيي، تريسيان، فريغوريست، دهان، معلم بناء، حداد...) في جميع الولايات الـ 58 لإصلاح الأعطال المنزلية والمهنية بسرعة وجودة عالية.'
    },
    {
      q: 'هل التطبيق مجاني أم يأخذ عمولة على الخدمات؟',
      a: 'التطبيق مجاني 100% للمواطنين. لا توجد أي عمولات أو رسوم وساطة مخفية؛ التواصل يتم مباشرة بينك وبين الحرفي عبر الاتصال الهاتفي أو الواتساب، والاتفاق على السعر يتم بينكما بكل شفافية.'
    },
    {
      q: 'كيف يتم إضافة الحرفيين المعتمدين في المنصة؟',
      a: 'حرصاً على جودة ومصداقية المنصة، يتم تدقيق وإضافة الحرفيين حصرياً من قِبل صاحب التطبيق عبر فضاء الإدارة الخاص والمحمي برمز سري، بعد التأكد من خبرتهم الحرفية وسمعتهم الطيبة.'
    },
    {
      q: 'ماذا أفعل في حالات الطوارئ المنزلية (تسريب ماء كبير أو انقطاع كهرباء)؟',
      a: 'يمكنك تفعيل فلتر "طوارئ وأعطال 24/7" في الصفحة الرئيسية لتظهر لك قائمة الحرفيين المتاحين فوراً للتدخل السريع في أي وقت ليلاً أو نهاراً.'
    },
    {
      q: 'أنا حرفي، كيف يمكنني الانضمام إلى قائمة المعلمين في ولايتي؟',
      a: 'يمكنك التواصل مباشرة مع صاحب ومؤسس التطبيق عبر خانة "تواصل مع صاحب التطبيق" المتاحة في الأعلى أو عبر واتساب وانستغرام، وإرسال بياناتك وصورك ليتم إدراجك في التطبيق.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-neutral-100/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-1 mb-3">
            <span>عن المنصة ورؤيتها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            تعريف بتطبيق صْنايعي DZ (Snay3i DZ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            جسر الثقة بين البيت الجزائري وأمهر الحرفيين واليد العاملة الوطنية. فكرة جزائرية أصيلة لحل مشاكل الصيانة والبحث عن "المعلم الشاطر".
          </p>
        </div>

        {/* 3 Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-amber-500 font-mono mb-3 block">01.</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              اختر ولايتك وحرفة العطل
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              حدد ولايتك من بين الـ 58 ولاية واختر خانة المهنة (سباكة، كهرباء، تكييف، صباغة...) لتحصل فوراً على قائمة المعلمين المتاحين في محيطك.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-amber-500 font-mono mb-3 block">02.</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              تواصل مباشر دون وسيط
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              اطّلع على سنوات خبرة الحرفي وتقييمات الزبائن السابقين، ثم اتصل به هاتفياً أو تواصل معه فوراً عبر تطبيق واتساب بضغطة زر واحدة.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-amber-500 font-mono mb-3 block">03.</span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              إصلاح العطل وتقييم الخدمة
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              يقوم الحرفي بمعاينة العطل وإنجاز الأشغال، وبعد الانتهاء يمكنك إضافة تقييمك لمساعدة باقي أبناء منطقتك في اختيار المعلم الأنسب.
            </p>
          </div>
        </div>

        {/* Values / Highlights Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                دعم الشباب والحرفيين الجزائريين
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                نهدف في صْنايعي DZ إلى خلق فرص عمل حقيقية ودعم أصحاب المهن الحرة وخريجي مراكز التكوين المهني من خلال إبراز كفاءاتهم وتسهيل وصول الزبائن إليهم في كل بلديات الجزائر.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-amber-400 font-bold">
              ✓ فكرة جزائرية بأيدي وطنية
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                ميثاق الجودة والمصداقية في Snay3i DZ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">شفافية الأسعار</h4>
                    <p className="text-[11px] text-slate-600">تقديرات مسبقة للتكلفة وتحديد تسعيرة المعاينة بوضوح.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">تغطية لكافة الولايات</h4>
                    <p className="text-[11px] text-slate-600">من العاصمة ووهران إلى أدرار وتمنراست وتيميمون.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">أعطال الطوارئ 24/7</h4>
                    <p className="text-[11px] text-slate-600">حلول سريعة للأبواب المغلقة وتسريبات المياه في أوقات متأخرة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">إشراف وتدقيق مستمر</h4>
                    <p className="text-[11px] text-slate-600">إشراف مباشر من إدارة المنصة ومراجعة دورية لتقييمات الزبائن.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Snay3i DZ · المنصة الحرفية الجزائرية</span>
              <span className="font-mono text-slate-700">نسخة 2026</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-black text-slate-900 mb-4 text-center">
            الأسئلة الشائعة حول المنصة
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right cursor-pointer"
                  >
                    <span className="font-bold text-sm text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
