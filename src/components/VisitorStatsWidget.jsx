import React from 'react';
import { Users, Eye, TrendingUp, Activity, Globe } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

export default function VisitorStatsWidget({ stats }) {
  if (!stats) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 relative overflow-hidden">
      
      {/* Background Islamic Geometric Pattern Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Title & Online Pulse */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3.5" />
            <span>Statistik Pengunjung Website Resmi</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Terhubung &amp; Melayani Ribuan Anggota
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Data statistik kunjungan portal digital KSPPS Perambabulan Makmur Abadi yang dipantau secara langsung dan transparan.
          </p>
        </div>

        {/* 4 Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          
          {/* 1. Pengunjung Hari Ini */}
          <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 text-center transition-all">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Eye className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-2xl font-black font-mono text-white">
              {formatNumber(stats.today || 0)}
            </div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Hari Ini
            </div>
          </div>

          {/* 2. Pengunjung Bulan Ini */}
          <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 text-center transition-all">
            <div className="flex items-center justify-center text-teal-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-2xl font-black font-mono text-white">
              {formatNumber(stats.monthly || 0)}
            </div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Bulan Ini
            </div>
          </div>

          {/* 3. Total Kunjungan */}
          <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 text-center transition-all">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Globe className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-2xl font-black font-mono text-white">
              {formatNumber(stats.total || 0)}
            </div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Total Kunjungan
            </div>
          </div>

          {/* 4. Pengunjung Online */}
          <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 text-center transition-all ring-1 ring-emerald-500/30">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-lg sm:text-2xl font-black font-mono text-emerald-300">
              {formatNumber(stats.online || 6)}
            </div>
            <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider mt-0.5">
              Online Sekarang
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

