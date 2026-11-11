import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { formatRupiah, formatNumber } from '../utils/helpers';

export default function LoanCalculator({ onApplyLoan }) {
  const [productType, setProductType] = useState('usaha');
  const [amount, setAmount] = useState(25000000);
  const [tenor, setTenor] = useState(12);

  const productOptions = [
    { id: 'usaha', label: 'Pinjaman Usaha (Murabahah)', marginRate: 0.0085, akad: 'Murabahah Modal Kerja' },
    { id: 'pendidikan', label: 'Pinjaman Pendidikan (Qardh/Murabahah)', marginRate: 0.006, akad: 'Qardh / Murabahah Biaya Studi' },
    { id: 'murabahah', label: 'Pembiayaan Murabahah Barang', marginRate: 0.009, akad: 'Murabahah Pengadaan Barang' },
    { id: 'rumah', label: 'Tabungan & Pembiayaan Rumah', marginRate: 0.0075, akad: 'Mudharabah Muqayyadah' },
    { id: 'musyarakah', label: 'Musyarakah Usaha Bersama', marginRate: 0.008, akad: 'Musyarakah Kongsi Modal' },
  ];

  const currentOption = productOptions.find(p => p.id === productType) || productOptions[0];

  // Syariah Flat Margin calculation:
  // Margin Total = Plafon * Rate * Tenor
  // Angsuran Total = Plafon + Margin Total
  // Angsuran Per Bulan = Angsuran Total / Tenor
  const monthlyPrincipal = Math.round(amount / tenor);
  const totalMargin = Math.round(amount * currentOption.marginRate * tenor);
  const monthlyMargin = Math.round(totalMargin / tenor);
  const monthlyInstallment = monthlyPrincipal + monthlyMargin;
  const totalPayment = amount + totalMargin;

  const tenorOptions = [3, 6, 12, 18, 24, 36, 48, 60];

  const handleApply = () => {
    onApplyLoan({
      productName: currentOption.label,
      productType,
      amount,
      tenor,
      monthlyInstallment,
      totalMargin,
      totalPayment,
      akad: currentOption.akad,
    });
  };

  return (
    <section id="calculator" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-emerald-700/50">
        
        {/* Background decorative circles & pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 mb-2">
                <span>Kalkulator Pembiayaan Syariah</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Simulasi Angsuran Pinjaman
              </h2>
              <p className="text-emerald-100/80 text-xs sm:text-sm mt-1">
                Hitung perkiraan angsuran bulanan yang transparan, tanpa biaya terselubung, dan sesuai prinsip syariah murni.
              </p>
            </div>

            {/* Product Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100 flex items-center justify-between">
                <span>Pilih Jenis Pembiayaan:</span>
                <span className="text-[11px] text-amber-300 font-mono">Akad: {currentOption.akad}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {productOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setProductType(opt.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                      productType === opt.id
                        ? 'bg-white text-emerald-950 border-white shadow-md'
                        : 'bg-emerald-800/40 border-emerald-700/50 text-emerald-100 hover:bg-emerald-800/80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {productType === opt.id && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Slider & Input */}
            <div className="space-y-3 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-700/40">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-emerald-100">
                  Jumlah Plafon Pinjaman:
                </label>
                <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono">
                  {formatRupiah(amount)}
                </span>
              </div>

              <input
                type="range"
                min={2000000}
                max={150000000}
                step={1000000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] text-emerald-300/80 font-mono">
                <span>Rp 2 Juta</span>
                <span>Rp 50 Juta</span>
                <span>Rp 150 Juta</span>
              </div>
            </div>

            {/* Tenor Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-emerald-100">
                  Jangka Waktu (Tenor):
                </label>
                <span className="text-sm font-bold text-amber-300">
                  {tenor} Bulan ({ (tenor / 12).toFixed(1).replace('.0', '') } Tahun)
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {tenorOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenor(t)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tenor === t
                        ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold'
                        : 'bg-emerald-800/40 hover:bg-emerald-800/70 text-emerald-100 border border-emerald-700/40'
                    }`}
                  >
                    {t} Bln
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Calculation Result Card (Finora Style) */}
          <div className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-6 shadow-2xl border border-white/20 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Estimasi Angsuran Bulanan
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-900 tracking-tight">
                  {formatRupiah(monthlyInstallment)}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ bulan</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                *Sudah termasuk porsi pokok dan bagi hasil margin syariah tetap.
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Plafon Pokok</span>
                <span className="font-semibold text-slate-900">{formatRupiah(amount)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Pokok per Bulan</span>
                <span className="font-semibold text-slate-900">{formatRupiah(monthlyPrincipal)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Margin Syariah per Bulan</span>
                <span className="font-semibold text-emerald-700">{formatRupiah(monthlyMargin)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Total Margin Syariah ({tenor} Bln)</span>
                <span className="font-semibold text-emerald-700">{formatRupiah(totalMargin)}</span>
              </div>
              <div className="flex justify-between py-2 text-slate-900 font-bold bg-emerald-50 px-3 rounded-xl border border-emerald-100">
                <span>Total Pengembalian</span>
                <span className="text-emerald-800">{formatRupiah(totalPayment)}</span>
              </div>
            </div>

            {/* Apply CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleApply}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ajukan Pembiayaan Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Data pengajuan tersimpan aman di sistem KSPPS PMA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

