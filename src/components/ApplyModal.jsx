import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Building, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatRupiah, createWaLink } from '../utils/helpers';

export default function ApplyModal({ product, calculation, branches, onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    branch: branches[0]?.name || 'KSPPS PMA Cabang Mertapada Kulon',
    amount: calculation?.amount || (product?.category === 'simpanan' ? 50000 : 10000000),
    tenor: calculation?.tenor || 12,
    purpose: '',
    productType: product ? `${product.name} (${product.akad})` : (calculation?.productName || 'Pembiayaan Syariah'),
  });

  const [submittedApp, setSubmittedApp] = useState(null);

  const isFinancing = product?.category === 'pinjaman' || product?.category === 'pembiayaan' || calculation;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.phone) {
      alert('Mohon isi nama lengkap dan nomor telepon / WhatsApp Anda.');
      return;
    }

    const newApp = {
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      monthlyInstallment: calculation?.monthlyInstallment || Math.round(formData.amount / formData.tenor * 1.008),
      status: 'Baru',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      notes: `Pengajuan melalui website PMA (${formData.productType})`,
    };

    onSubmitApplication(newApp);
    setSubmittedApp(newApp);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const selectedBranchObj = branches.find(b => b.name === formData.branch) || branches[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Formulir Pengajuan Online
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {submittedApp ? 'Pengajuan Terkirim!' : 'Daftar & Ajukan Layanan'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">
          {submittedApp ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
                  ID: {submittedApp.id}
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-2">
                  Alhamdulillah, Data Telah Kami Terima!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Terima kasih <strong className="text-slate-900">{submittedApp.applicantName}</strong>. Pengajuan <strong className="text-emerald-800">{submittedApp.productType}</strong> telah masuk ke Dashboard Admin KSPPS PMA ({submittedApp.branch}).
                </p>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Nominal / Plafon:</span>
                  <span className="font-bold text-slate-900">{formatRupiah(submittedApp.amount)}</span>
                </div>
                {isFinancing && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Jangka Waktu:</span>
                    <span className="font-bold text-slate-900">{submittedApp.tenor} Bulan</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Status Awal:</span>
                  <span className="font-bold text-emerald-700">Menunggu Verifikasi Admin</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={createWaLink(
                    selectedBranchObj?.phone || '0813-1262-9486',
                    `Assalamu alaikum KSPPS PMA, saya baru saja mengajukan ${submittedApp.productType} di website dengan ID ${submittedApp.id} atas nama ${submittedApp.applicantName}. Mohon bantu konfirmasi.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konfirmasi Cepat via WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Badge / Notice */}
              <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                    Produk Yang Dipilih
                  </span>
                  <span className="text-sm font-extrabold text-emerald-950">
                    {formData.productType}
                  </span>
                </div>
                {calculation && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Est. Angsuran</span>
                    <span className="text-xs font-bold text-emerald-800">
                      {formatRupiah(calculation.monthlyInstallment)}/bln
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Nama Lengkap Pemohon *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sesuai KTP"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    No. WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@anda.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Pilih Kantor Cabang Terdekat
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-emerald-600 focus:border-emerald-600"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {isFinancing ? 'Plafon / Jumlah Pengajuan (Rp)' : 'Estimasi Setoran Awal (Rp)'}
                  </label>
                  <input
                    type="number"
                    min={10000}
                    step={50000}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>

                {isFinancing && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Tenor (Bulan)
                    </label>
                    <select
                      value={formData.tenor}
                      onChange={(e) => setFormData({ ...formData, tenor: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-emerald-600 focus:border-emerald-600"
                    >
                      {[3, 6, 12, 18, 24, 36, 48, 60].map(t => (
                        <option key={t} value={t}>{t} Bulan</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Tujuan / Keterangan Usaha (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Misal: Tambah modal kain jahit, renovasi rumah, atau dana sekolah"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pengajuan Sekarang</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Proses cepat, aman, dan data tersimpan di sistem KSPPS PMA</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

