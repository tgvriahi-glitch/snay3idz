import React from 'react';
import { Lock } from './CraftIcon';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenOwnerContact: () => void;
  onNavigateSection: (sectionId: string) => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenOwnerContact,
  onNavigateSection,
  isAdminLoggedIn,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="flex items-center gap-2.5 text-right cursor-pointer group text-slate-900 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
            DZ
          </div>
          <div className="flex flex-col text-right">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 whitespace-nowrap">
              Snay3i DZ
            </span>
            <span className="text-xs font-semibold text-amber-700 whitespace-nowrap -mt-1">
              صْنايعي الجزائر
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onNavigateSection('artisans')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            دليل الحرفيين
          </button>
          <button
            onClick={() => onNavigateSection('crafts')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            خانات المهن
          </button>
          <button
            onClick={() => onNavigateSection('emergency')}
            className="text-red-600 hover:text-red-700 font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            طوارئ وأعطال
          </button>
          <button
            onClick={() => onNavigateSection('about')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            عن التطبيق
          </button>
          <button
            onClick={onOpenOwnerContact}
            className="text-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            تواصل مع صاحب التطبيق
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-xs ${
              isAdminLoggedIn
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isAdminLoggedIn ? 'لوحة تحكم الإدارة (مفعل)' : 'فضاء الإدارة (PIN)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
