import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, ArrowLeft, Building2, RefreshCw, CheckCircle2 } from 'lucide-react';

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

export default function AdminLoginPage({ onLoginSuccess, onBackToHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Security Captcha states
  const [captchaIndex, setCaptchaIndex] = useState(() => Math.floor(Math.random() * KSPPS_CAPTCHA_QUESTIONS.length));
  const [selectedCaptchaOption, setSelectedCaptchaOption] = useState('');

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
      // Default credentials: admin / admin123 or admin / pma2026
      const validUser = username.trim().toLowerCase() === 'admin';
      const validPass = password === 'admin123' || password === 'admin' || password === 'pma2026';

      if (validUser && validPass) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Username atau password salah. Silakan periksa kembali kredensial Anda.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex flex-col justify-between p-4 sm:p-6 text-white relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Back to Public Website */}
      <div className="relative z-10 max-w-md w-full mx-auto flex items-center justify-between pt-2">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-200 transition-all cursor-pointer backdrop-blur-md border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Utama</span>
        </button>

      </div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-md">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-emerald-950 px-3 py-1 rounded-full inline-block mb-2">
              PORTAL ADMINISTRATOR
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Login Admin KSPPS PMA
            </h1>
            <p className="text-xs text-emerald-200/90 mt-1">
              Koperasi Simpan Pinjam &amp; Pembiayaan Syariah Perambabulan Makmur Abadi
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-2xl flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Username Administrator:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Masukkan username admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-emerald-600 focus:border-emerald-600 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Kata Sandi (Password):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-emerald-600 focus:border-emerald-600 bg-slate-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA Produk & Layanan Koperasi */}
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl space-y-2.5">
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
                          name="captchaOption"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span>Memverifikasi akun...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 text-center space-y-1 text-slate-500 text-[11px]">
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Koneksi Aman &amp; Terenkripsi</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Akses khusus pengurus dan staf pengelola KSPPS PMA.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-emerald-200/60 pb-2">
        &copy; {new Date().getFullYear()} KSPPS Perambabulan Makmur Abadi. Hak cipta dilindungi undang-undang.
      </div>

    </div>
  );
}

