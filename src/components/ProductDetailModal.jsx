import React from 'react';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { createWaLink } from '../utils/helpers';

export default function ProductDetailModal({ product, onClose, onApply }) {
  if (!product) return null;

  const phone = product.contactPerson?.phone || '0813-1262-9486';
  const waMessage = `Assalamu alaikum KSPPS PMA, saya ingin menanyakan lebih lanjut mengenai produk *${product.name} (${product.akad || 'Syariah'})*.`;
  const waUrl = createWaLink(phone, waMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Header with image */}
        <div className="relative aspect-[16/9] sm:aspect-[2.2/1] overflow-hidden bg-slate-100 shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-600 text-white backdrop-blur-md inline-block mb-1.5">
              {product.categoryLabel} • Akad: {product.akad}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 font-medium">
              {product.fullName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Deskripsi Produk & Penjelasan Syariah
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.fullDesc || product.shortDesc}
            </p>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Keunggulan & Manfaat
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 leading-tight">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {product.requirements && product.requirements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Syarat & Ketentuan Pengajuan
              </h4>
              <div className="space-y-1.5">
                {product.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Person Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block">
                Petugas Layanan Produk:
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {product.contactPerson.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {product.contactPerson.phone}
              </span>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all self-start sm:self-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(product);
            }}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Daftar / Ajukan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

