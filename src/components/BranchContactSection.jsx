import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquare, 
  Building, 
  Sparkles 
} from 'lucide-react';
import { createWaLink } from '../utils/helpers';

export default function BranchContactSection({ branches, onSendMessage }) {
  const [activeBranch, setActiveBranch] = useState(branches[0]?.id || 'cabang-mertapada');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: branches[0]?.name || 'KSPPS PMA Cabang Mertapada Kulon',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const currentBranch = branches.find(b => b.id === activeBranch) || branches[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Mohon isi nama, nomor telepon/WhatsApp, dan pesan Anda.');
      return;
    }

    onSendMessage({
      ...formData,
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        branch: currentBranch.name,
        subject: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="branches" className="scroll-mt-24 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <MapPin className="w-3.5 h-3.5" />
          <span>Jaringan Kantor & Layanan</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Kontak & Lokasi Kantor Cabang
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Kunjungi kantor cabang terdekat atau hubungi tim customer service kami untuk layanan cepat, ramah, dan solutif.
        </p>
      </div>

      {/* 3 Branches Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {branches.map((branch) => {
          const isSelected = activeBranch === branch.id;
          return (
            <div
              key={branch.id}
              onClick={() => {
                setActiveBranch(branch.id);
                setFormData(prev => ({ ...prev, branch: branch.name }));
              }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected 
                  ? 'bg-gradient-to-br from-emerald-800 to-teal-900 text-white border-emerald-700 shadow-xl scale-[1.02]' 
                  : 'bg-white border-slate-200/90 text-slate-800 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {branch.isPusat ? 'Kantor Layanan Utama' : 'Kantor Cabang'}
                  </span>
                  <Building className={`w-4 h-4 ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`} />
                </div>
                
                <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {branch.name}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {branch.address}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                isSelected ? 'border-emerald-700 text-amber-300' : 'border-slate-100 text-emerald-700'
              }`}>
                <span>Pilih Cabang Ini</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Active Branch & Direct Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Active Branch Detailed Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Detail Kantor Terpilih
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {currentBranch.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentBranch.tagline || 'Layanan Keuangan Syariah KSPPS PMA'}
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-4 text-xs sm:text-sm">
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Alamat Kantor</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {currentBranch.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Telepon / WhatsApp</span>
                <a 
                  href={`tel:${currentBranch.phone}`} 
                  className="text-emerald-700 hover:underline font-mono font-bold"
                >
                  {currentBranch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Email Resmi</span>
                <a 
                  href={`mailto:${currentBranch.email}`} 
                  className="text-slate-600 hover:text-emerald-700"
                >
                  {currentBranch.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Jam Operasional</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {currentBranch.operationalHours}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Direct Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={createWaLink(currentBranch.phone, `Halo ${currentBranch.name}, saya ingin konsultasi layanan syariah KSPPS PMA.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat WhatsApp</span>
            </a>

            <a
              href={currentBranch.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center hover:bg-slate-50"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka di Google Maps</span>
            </a>
          </div>

        </div>

        {/* Right Column: Direct Contact & Inquiry Form (Saved to Admin Dashboard) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tersimpan Otomatis ke Dashboard Admin</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Kirim Pesan / Konsultasi Online
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Data Anda akan langsung diteruskan ke kantor cabang tujuan dan tim pengurus kami.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-emerald-950">
                Pesan Berhasil Dikirim!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Terima kasih. Pesan Anda telah dicatat di sistem KSPPS PMA ({formData.branch}) dan petugas kami akan segera menghubungi Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Baihaqi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    No. WhatsApp / Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Tujuan Kantor Cabang
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => {
                      setFormData({ ...formData, branch: e.target.value });
                      const matched = branches.find(b => b.name === e.target.value);
                      if (matched) setActiveBranch(matched.id);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-emerald-600 focus:border-emerald-600"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Subjek Keperluan
                </label>
                <input
                  type="text"
                  placeholder="Misal: Minat Tabungan TAMASKOP / Pengajuan Modal Usaha"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Isi Pesan / Pertanyaan *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pertanyaan atau kebutuhan pembiayaan / simpanan Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Admin KSPPS</span>
                </button>

                <span className="text-[11px] text-slate-500 text-center sm:text-left">
                  Data otomatis masuk ke tab pesan admin koperasi.
                </span>
              </div>

            </form>
          )}

        </div>

      </div>

    </section>
  );
}

