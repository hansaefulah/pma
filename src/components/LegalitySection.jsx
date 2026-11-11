import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Copy, 
  Check, 
  Building, 
  Calendar,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  FileText
} from 'lucide-react';

export default function LegalitySection({ legality = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyNumber = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeItems = (legality || []).filter(item => item.active !== false);

  // Dokumen terbaru & paling utama untuk tampilan ringkas (default 4 dokumen)
  // Mencakup: AHU Kemenkumham 2022, NIB OSS, Izin Simpan Pinjam, dan Sertifikasi Kompetensi 2025
  const defaultLatestIds = ['leg-4', 'leg-8', 'leg-5', 'leg-10'];
  
  // Prioritaskan yang terbaru atau ambil 4 item pertama/paling relevan
  const latestItems = activeItems.filter(item => 
    defaultLatestIds.includes(item.id) || 
    item.number?.includes('2022') || 
    item.number?.includes('2025') ||
    item.category?.toLowerCase().includes('nib') ||
    item.category?.toLowerCase().includes('kemenkumham')
  );

  const displayLatest = latestItems.length >= 3 ? latestItems.slice(0, 4) : activeItems.slice(0, 4);
  const displayedItems = isExpanded ? activeItems : displayLatest;

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-6 sm:space-y-8">
      
      {/* Gambar 3D & Header Modern */}
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Gambar 3D Legalitas */}
        <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
          <img
            src="images/legalitas-3d.png"
            alt="Legalitas Resmi KSPPS PMA"
            loading="lazy"
            className="w-36 sm:w-44 md:w-52 h-auto object-contain drop-shadow-md"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Legalitas &amp; Izin Resmi Koperasi
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          KSPPS PMA berbadan hukum sah sejak 2001, terdaftar di Kemenkumham RI, mengantongi NIB OSS Berbasis Risiko, serta berizin resmi simpan pinjam syariah.
        </p>
      </div>

      {/* Grid Dokumen Legalitas (Ringkas Default 4 Dokumen Terbaru) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {displayedItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              {/* Header Card: Huruf & Kategori */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-black text-[11px] flex items-center justify-center uppercase shadow-xs">
                    {item.letter || String.fromCharCode(97 + idx)}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {item.category || item.badge || 'Legalitas'}
                  </span>
                </div>
                {item.date && (
                  <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date}</span>
                  </span>
                )}
              </div>

              {/* Judul Dokumen */}
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Kotak Nomor SK dengan Tombol Salin */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="overflow-hidden">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Nomor SK / Registrasi
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 truncate block select-all">
                    {item.number}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyNumber(item.id, item.number)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold ${
                    copiedId === item.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Salin nomor legalitas"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Deskripsi Singkat */}
              {item.description && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {/* Penerbit & Status */}
            {item.issuer && (
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-600 flex items-center gap-1 truncate max-w-[200px]">
                  <Building className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.issuer}</span>
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-0.5 shrink-0">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Sah &amp; Terverifikasi</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tombol Lihat Selengkapnya / Tampilkan Lebih Sedikit */}
      {activeItems.length > 4 && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs sm:text-sm border border-emerald-200 transition-all shadow-xs cursor-pointer hover:shadow-sm"
          >
            <span>
              {isExpanded 
                ? 'Tampilkan Lebih Ringkas' 
                : `Lihat Selengkapnya (${activeItems.length} Dokumen Lengkap)`
              }
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-emerald-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-700" />
            )}
          </button>
        </div>
      )}

      {/* Footer Catatan Kepatuhan */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Seluruh perizinan terdaftar resmi di instansi pemerintah dan dapat diverifikasi secara publik.</span>
        </div>
        <div className="font-semibold text-slate-700">
          Status: Berbadan Hukum &amp; Aktif Beroperasi
        </div>
      </div>

    </section>
  );
}
