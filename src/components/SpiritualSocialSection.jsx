import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Moon, 
  ShieldCheck, 
  Users, 
  Coins, 
  GraduationCap, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function SpiritualSocialSection({ data }) {
  const [copiedRek, setCopiedRek] = useState(false);

  if (!data) return null;
  const { spiritual, sosial } = data;

  const handleCopyRekening = (rek) => {
    navigator.clipboard.writeText(rek);
    setCopiedRek(true);
    setTimeout(() => setCopiedRek(false), 3000);
  };

  return (
    <section className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl border border-emerald-100 p-5 sm:p-8 md:p-10 shadow-xs space-y-10">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Bidang Spiritual &amp; Sosial
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          KSPPS PMA tidak semata mengejar pertumbuhan ekonomi finansial, melainkan senantiasa memperkokoh pembinaan ruhiyah keislaman dan filantropi sosial untuk sesama.
        </p>
      </div>

      {/* 1. BAGIAN SPIRITUAL (KEAGAMAAN) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              1. Spiritual (Keagamaan)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Pembinaan Spiritual Pengurus, Pengelola &amp; Anggota
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 self-start sm:self-auto">
            6 Agenda Rutin
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {spiritual?.desc || 'Pembinaan spiritual pengurus, pengelola, anggota, serta masyarakat melalui kegiatan-kegiatan:'}
        </p>

        {/* 6 Kegiatan Spiritual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
          {spiritual?.activities?.map((act, idx) => (
            <div
              key={act.id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/60 hover:border-emerald-200 transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {act.name}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BAGIAN SOSIAL DAN PENDIDIKAN */}
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            2. Sosial &amp; Pendidikan
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Pemberdayaan Umat, Santunan Dhuafa &amp; Beasiswa Pendidikan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sosial?.programs?.map((prog) => {
            const isBaitulmal = prog.id === 'baitulmal';
            const isSantunan = prog.id === 'santunan';
            const isPintar = prog.id === 'perambabulan-pintar';

            return (
              <div
                key={prog.id}
                className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between border transition-all ${
                  isPintar
                    ? 'bg-gradient-to-br from-emerald-900 to-teal-950 text-white border-emerald-800 shadow-lg'
                    : 'bg-white border-slate-200/90 text-slate-800 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isPintar ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {prog.badge}
                    </span>

                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isPintar ? 'bg-white/10 text-amber-300' : 'bg-emerald-700 text-white'
                    }`}>
                      {isBaitulmal && <Coins className="w-4 h-4" />}
                      {isSantunan && <HeartHandshake className="w-4 h-4" />}
                      {isPintar && <GraduationCap className="w-4 h-4" />}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-black ${isPintar ? 'text-white' : 'text-slate-900'}`}>
                      {prog.name}
                    </h4>
                    {prog.desc && (
                      <p className={`text-xs mt-1 leading-relaxed ${isPintar ? 'text-emerald-100/80' : 'text-slate-500'}`}>
                        {prog.desc}
                      </p>
                    )}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-xs">
                    {prog.points?.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          isPintar ? 'bg-amber-400' : 'bg-emerald-600'
                        }`} />
                        <span className={isPintar ? 'text-emerald-50' : 'text-slate-700'}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perambabulan Pintar Donation Card */}
                {isPintar && prog.rekening && (
                  <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
                    <span className="text-[11px] text-amber-300 font-bold block">
                      Rekening Resmi Donasi Santunan:
                    </span>
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs text-emerald-200 font-medium">
                          {prog.atasNama || 'Perambabulan Pintar'}
                        </div>
                        <div className="text-base font-black font-mono tracking-wider text-white">
                          {prog.rekening}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyRekening(prog.rekening)}
                        className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        {copiedRek ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRek ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

