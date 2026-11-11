import React, { useState } from 'react';
import { 
  BarChart3, 
  Table as TableIcon, 
  TrendingUp, 
  Calendar, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import { formatNumber, formatRupiah } from '../utils/helpers';

export default function FinancialReportSection({ data }) {
  const [activeCategory, setActiveCategory] = useState('aktiva');
  const [viewMode, setViewMode] = useState('both'); // 'both', 'chart', 'table'

  if (!data) return null;

  const currentCategoryData = data[activeCategory] || data.aktiva;
  const years = data.years || ['2021', '2022', '2023', '2024', '2025'];
  const items = currentCategoryData.items || [];
  const isCurrency = currentCategoryData.unit === 'Rp';

  // Format cell values
  const formatVal = (val) => {
    if (val === undefined || val === null) return '-';
    if (isCurrency) {
      return formatRupiah(val);
    }
    return formatNumber(val) + (currentCategoryData.unit ? ` ${currentCategoryData.unit}` : '');
  };

  // Format compact for chart tooltips/labels (e.g. 28,5 M atau 32,3 M atau 1.243)
  const formatCompact = (val) => {
    if (!val) return '0';
    if (isCurrency) {
      if (val >= 1000000000) {
        return (val / 1000000000).toFixed(1).replace('.', ',') + ' M';
      }
      if (val >= 1000000) {
        return (val / 1000000).toFixed(0) + ' Jt';
      }
      return formatNumber(val);
    }
    return formatNumber(val);
  };

  // Calculate year totals
  const yearTotals = {};
  years.forEach(yr => {
    yearTotals[yr] = items.reduce((acc, item) => acc + (Number(item.values?.[yr]) || 0), 0);
  });

  // Calculate max value for SVG bar scaling
  let maxItemValue = 1;
  items.forEach(item => {
    years.forEach(yr => {
      const v = Number(item.values?.[yr]) || 0;
      if (v > maxItemValue) maxItemValue = v;
    });
  });

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Data Perkembangan &amp; Laporan Keuangan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Publikasi data perkembangan aset, pasiva, permodalan, usaha pembiayaan, dan pertumbuhan keanggotaan KSPPS PMA tahun buku {years[0]} hingga {years[years.length - 1]}.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start md:self-auto shrink-0 text-xs font-bold">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              viewMode === 'both' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
              viewMode === 'chart' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Grafik</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabel</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
        {[
          { id: 'aktiva', label: '1. Perkembangan Aset (Aktiva)' },
          { id: 'pasiva', label: '2. Pasiva (Kewajiban & Modal)' },
          { id: 'permodalan', label: '3. Permodalan (Simpanan)' },
          { id: 'usahaKeuangan', label: '4. Usaha & Keuangan (Pembiayaan & SHU)' },
          { id: 'keanggotaan', label: '5. Pertumbuhan Anggota Cabang' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === tab.id
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
        <div>
          <h3 className="text-base font-extrabold text-emerald-950">
            {currentCategoryData.title}
          </h3>
          <p className="text-xs text-emerald-800/90 font-medium">
            {currentCategoryData.subtitle}
          </p>
        </div>
        <div className="text-[11px] font-bold text-emerald-900 bg-white/80 px-3 py-1 rounded-full border border-emerald-200/80 self-start sm:self-auto">
          Satuan: {currentCategoryData.unit === 'Rp' ? 'Mata Uang Rupiah (Rp)' : 'Jumlah Anggota (Jiwa)'}
        </div>
      </div>

      {/* 1. CHART VIEW */}
      {(viewMode === 'both' || viewMode === 'chart') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Diagram Batang Perkembangan ({years[0]} - {years[years.length - 1]})</span>
            </h4>
            <span className="text-[11px] text-slate-500 italic">
              *Arahkan kursor / klik batang untuk nilai rinci
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              // Calculate item's own max for balanced relative chart height
              const itemValues = years.map(yr => Number(item.values?.[yr]) || 0);
              const itemMax = Math.max(...itemValues, 1);
              const latestVal = Number(item.values?.[years[years.length - 1]]) || 0;
              const firstVal = Number(item.values?.[years[0]]) || 0;
              const diffPercent = firstVal > 0 ? (((latestVal - firstVal) / firstVal) * 100).toFixed(1) : 0;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-300 transition-all group"
                >
                  <div className="space-y-1 mb-4">
                    {item.group && (
                      <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">
                        {item.group}
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h5>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        Number(diffPercent) >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {Number(diffPercent) >= 0 ? `+${diffPercent}%` : `${diffPercent}%`}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Tahun {years[years.length - 1]}: <strong className="text-slate-900 font-bold">{formatCompact(latestVal)}</strong>
                    </div>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="flex items-end justify-between gap-2 h-36 pt-4 pb-2 px-1">
                      {years.map((year) => {
                        const val = Number(item.values?.[year]) || 0;
                        const heightPercent = Math.max(12, Math.round((val / itemMax) * 100));

                        return (
                          <div
                            key={year}
                            className="flex-1 flex flex-col items-center justify-end h-full group/bar relative"
                          >
                            {/* Value label hover tooltip */}
                            <div className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-md">
                              {year}: {formatVal(val)}
                            </div>

                            {/* Bar Top Compact Label */}
                            <span className="text-[9px] font-semibold text-slate-600 mb-1 tracking-tighter truncate max-w-full">
                              {formatCompact(val)}
                            </span>

                            {/* Animated Color Bar */}
                            <div
                              style={{
                                height: `${heightPercent}%`,
                                backgroundColor: item.color || '#10b981'
                              }}
                              className="w-full max-w-[28px] rounded-t-md transition-all duration-500 group-hover/bar:brightness-110 group-hover/bar:shadow-md"
                            />

                            {/* Year Axis Label */}
                            <span className="text-[10px] font-bold text-slate-500 mt-1.5">
                              {year}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TABLE VIEW */}
      {(viewMode === 'both' || viewMode === 'table') && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <TableIcon className="w-4 h-4 text-emerald-600" />
            <span>Tabel Rincian Data Tahun Buku ({years[0]} - {years[years.length - 1]})</span>
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-3 px-3 font-extrabold w-12 text-center">NO</th>
                  <th className="py-3 px-4 font-extrabold min-w-[180px]">URAIAN</th>
                  {years.map(yr => (
                    <th key={yr} className="py-3 px-3 font-extrabold text-right min-w-[125px]">
                      {yr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color || '#10b981' }}
                        />
                        <div>
                          <span>{item.name}</span>
                          {item.group && (
                            <span className="text-[10px] font-normal text-slate-500 block">
                              ({item.group})
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {years.map(yr => (
                      <td key={yr} className="py-3 px-3 text-right font-mono font-medium">
                        {formatVal(item.values?.[yr])}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-emerald-50/80 font-extrabold text-emerald-950 border-t-2 border-emerald-200">
                  <td className="py-3.5 px-3 text-center">Σ</td>
                  <td className="py-3.5 px-4 font-black">
                    Jumlah Total {currentCategoryData.title}
                  </td>
                  {years.map(yr => (
                    <td key={yr} className="py-3.5 px-3 text-right font-mono font-bold text-emerald-900">
                      {formatVal(yearTotals[yr])}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Disahkan dalam Rapat Anggota Tahunan (RAT) KSPPS Perambabulan Makmur Abadi.</span>
        </div>
        <div className="font-semibold text-slate-600">
          Status Data: Terverifikasi Buku Laporan Resmi
        </div>
      </div>

    </section>
  );
}

