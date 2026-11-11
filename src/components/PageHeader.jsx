import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, subtitle, breadcrumb, onHomeClick }) {
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Islamic geometric subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 font-medium">
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-amber-300 font-bold">{breadcrumb || title}</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

