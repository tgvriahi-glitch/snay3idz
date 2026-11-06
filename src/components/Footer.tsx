import React from 'react';
import { AppOwnerConfig } from '../types';
import { Instagram, MessageCircle, Lock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  ownerConfig: AppOwnerConfig;
  onOpenAdmin: () => void;
  onOpenOwnerContact: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  ownerConfig,
  onOpenAdmin,
  onOpenOwnerContact,
  onNavigateSection,
}) => {
  const cleanWhatsapp = ownerConfig.whatsappNumber.replace(/\D/g, '');

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg">
                DZ
              </div>
              <span className="font-extrabold text-xl text-white">
                Snay3i DZ · صْنايعي الجزائر
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              المنصة الجزائرية المستقلة الأولى للعثور على الحرفيين الموثوقين وتصليح جميع الأعطال المنزلية في 58 ولاية جزائرية.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={ownerConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-pink-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="انستاغرام صاحب التطبيق"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="واتساب صاحب التطبيق"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('artisans')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  دليل الحرفيين والمعلمين
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('crafts')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  خانات المهن وتخصصات الصيانة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('emergency')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-red-400"
                >
                  طوارئ وأعطال مستعجلة 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  عن التطبيق والأسئلة الشائعة
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOwnerContact}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-emerald-400"
                >
                  تواصل مع صاحب التطبيق (انستاغرام وواتساب)
                </button>
              </li>
            </ul>
          </div>

          {/* Admin and Trust Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              إدارة المنصة
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              إضافة الحرفيين محصورة بصاحب التطبيق لضمان الجودة بالرمز السري.
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/50 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>دخول فضاء الإدارة (PIN)</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Snay3i DZ (صْنايعي الجزائر). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>تطبيق جزائري 100% لخدمة المواطن والمعلم الحرفي</span>
            <span>🇩🇿</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
