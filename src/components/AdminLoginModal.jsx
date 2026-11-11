import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, X, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

const KSPPS_CAPTCHA_QUESTIONS = [
  {
    id: 1,
    question: 'Apa nama produk simpanan sukarela syariah unggulan di KSPPS PMA?',
    options: ['TAMASKOP (Tabungan Masyarakat Koperasi)', 'Deposito Bank Konvensional', 'PayLater Pinjaman', 'Pinjol Instan'],
    correctAnswer: 'TAMASKOP (Tabungan Masyarakat Koperasi)'
  },
  {
    id: 2,
    question: 'Program sosial beasiswa santunan anak yatim & duafa KSPPS PMA bernama...',
    options: ['Perambabulan Pintar', 'Kartu Indonesia Pintar', 'BOS Swasta Mandiri', 'BLT Tunai'],
    correctAnswer: 'Perambabulan Pintar'
  },
  {
    id: 3,
    question: 'Prinsip dasar transaksi simpan pinjam di KSPPS PMA berlandaskan pada...',
    options: ['Syariah Bebas Riba & Berkeadilan', 'Bunga Majemuk Berlipat', 'Sistem Rentenir', 'Spekulasi Valas'],
    correctAnswer: 'Syariah Bebas Riba & Berkeadilan'
  },
  {
    id: 4,
    question: 'Akad pembiayaan syariah sistem jual beli dengan margin keuntungan yang disepakati adalah...',
    options: ['Akad Murabahah', 'Akad Riba Jahiliyah', 'Akad Maisir & Gharar', 'Pinjaman Bunga Berjalan'],
    correctAnswer: 'Akad Murabahah'
  },
  {
    id: 5,
    question: 'Berapa jumlah kantor cabang layanan resmi operasional KSPPS PMA di Kabupaten Cirebon?',
    options: ['3 Kantor Cabang (Mertapada, Celancang, Gunung Jati)', '1 Kantor Cabang Saja', '10 Kantor Cabang', 'Belum Memiliki Kantor'],
    correctAnswer: '3 Kantor Cabang (Mertapada, Celancang, Gunung Jati)'
  },
  {
    id: 6,
    question: 'Produk tabungan persiapan ibadah qurban Idul Adha di KSPPS PMA adalah...',
    options: ['Simpanan Kurban / TAHARA', 'Tabungan Bunga Harian', 'Asuransi Konvensional', 'Investasi Saham Gorengan'],
    correctAnswer: 'Simpanan Kurban / TAHARA'
  },
  {
    id: 7,
    question: 'Akad kemitraan bagi hasil antara pemilik modal (shahibul mal) dan pengelola usaha adalah...',
    options: ['Akad Mudharabah', 'Sistem Bunga Bank', 'Akad Ijon', 'Tarif Pinalti Denda'],
    correctAnswer: 'Akad Mudharabah'
  }
];

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Security Captcha states
  const [captchaIndex, setCaptchaIndex] = useState(() => Math.floor(Math.random() * KSPPS_CAPTCHA_QUESTIONS.length));
  const [selectedCaptchaOption, setSelectedCaptchaOption] = useState('');

  if (!isOpen) return null;

  const currentQuestion = KSPPS_CAPTCHA_QUESTIONS[captchaIndex];

  const handleRandomizeCaptcha = () => {
    setSelectedCaptchaOption('');
    setErrorMsg('');
    setCaptchaIndex((prev) => (prev + 1) % KSPPS_CAPTCHA_QUESTIONS.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check CAPTCHA
    if (!selectedCaptchaOption) {
      setErrorMsg('Harap jawab pertanyaan verifikasi keamanan produk koperasi terlebih dahulu.');
      return;
    }

    if (selectedCaptchaOption !== currentQuestion.correctAnswer) {
      setErrorMsg('Jawaban verifikasi keamanan salah! Silakan pilih jawaban yang tepat mengenai produk & layanan KSPPS PMA.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Default credentials: admin / admin123 (or admin / pma2026)
      const validUser = username.trim().toLowerCase() === 'admin';
      const validPass = password === '@#admin2026' || password === 'admin12345' || password === 'pma2026';

      if (validUser && validPass) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Username atau password salah. Silakan coba lagi.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full inline-block">
                Area Terbatas
              </span>
              <h3 className="text-xl font-extrabold mt-1">
                Login Dashboard Admin
              </h3>
              <p className="text-xs text-emerald-100">
                KSPPS Perambabulan Makmur Abadi
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Username Admin
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-emerald-600 focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA Produk & Layanan Koperasi */}
            <div className="p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verifikasi Keamanan Koperasi</span>
                </div>
                <button
                  type="button"
                  onClick={handleRandomizeCaptcha}
                  className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                  title="Ganti Pertanyaan"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Ganti Soal</span>
                </button>
              </div>

              <p className="text-xs font-bold text-slate-800 leading-snug">
                {currentQuestion.question}
              </p>

              <div className="space-y-1.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedCaptchaOption === opt;
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-700 text-white font-bold border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="modalCaptchaOption"
                        value={opt}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedCaptchaOption(opt);
                          setErrorMsg('');
                        }}
                        className="w-3.5 h-3.5 text-emerald-700 cursor-pointer accent-emerald-600"
                      />
                      <span className="flex-1">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sistem Manajemen Konten KSPPS PMA</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

