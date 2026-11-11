import React from 'react';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  FileCheck, 
  Quote, 
  Printer 
} from 'lucide-react';

export default function CvModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/30 shrink-0 shadow-lg">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-400 text-emerald-950 inline-block mb-1">
                {member.role}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                {member.title}
              </p>
              {member.cv?.birthPlace && (
                <p className="text-xs text-emerald-100/80 pt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{member.cv.birthPlace}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Body CV Details */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 text-slate-800">
          
          {/* Quote */}
          {member.quote && (
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-2xl italic text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
              <Quote className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{member.quote}</span>
            </div>
          )}

          {/* Bio Overview */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Profil Ringkas
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Pendidikan */}
          {member.cv?.pendidikan && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Riwayat Pendidikan</span>
              </h4>
              <div className="space-y-2">
                {member.cv.pendidikan.map((pen, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="text-slate-700">{pen}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pengalaman & Karir */}
          {member.cv?.pengalaman && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Riwayat Karir & Pengalaman</span>
              </h4>
              <div className="space-y-2">
                {member.cv.pengalaman.map((peng, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span className="text-slate-700">{peng}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sertifikasi */}
          {member.cv?.sertifikasi && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Sertifikasi Kompetensi & Keahlian</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {member.cv.sertifikasi.map((sert, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl text-xs text-slate-800 font-medium">
                    ✓ {sert}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Penghargaan */}
          {member.cv?.penghargaan && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Penghargaan & Kontribusi Keumatan</span>
              </h4>
              <div className="space-y-2">
                {member.cv.penghargaan.map((pengh, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{pengh}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            KSPPS Perambabulan Makmur Abadi
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}

