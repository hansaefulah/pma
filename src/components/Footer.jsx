import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';

export default function Footer({ onNavClick, openAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-emerald-900/40 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                <img 
                  src="./Logo2.jpg" 
                  alt="KSPPS PMA" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './logo2.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  KSPPS PMA
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Perambabulan Makmur Abadi
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Koperasi Simpan Pinjam dan Pembiayaan Syariah Perambabulan Makmur Abadi berkomitmen memajukan ekonomi umat melalui nilai-nilai syariah, keadilan, transparansi, dan gotong royong berkesinambungan.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Diawasi Dewan Pengawas Syariah</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('products')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Produk Simpanan
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('products')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Pinjaman & Pembiayaan
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Kalkulator Simulasi Pembiayaan
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Tentang & Sejarah
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('news')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Berita & Promo Terkini
                </button>
              </li>
            </ul>
          </div>

          {/* Kantor Cabang */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Jaringan Kantor Cabang
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <strong className="text-white block">1.  Cabang Babadan (Pusat)</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Jl. Ki Gede Mayung No.24 Desa Babadan Kec. Gunung Jati, Kabupaten Cirebon, Jawa Barat 45151• 081111123124
                </p>
              </div>

              <div>
                <strong className="text-white block">2. Cabang Pasar Celancang</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Jl. Raya Celancang No. 45, Pasar Celancang, Kecamatan Gunung Jati, Kabupaten Cirebon, Jawa Barat 45151 • 085322567021
                </p>
              </div>

              <div>
                <strong className="text-white block">3. Cabang Mertapada Kulon</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Jl. Pasar Mundu No. 123, Mertapada Kulon, Astanajapura, Kabupaten Cirebon, Jawa Barat 45181 • 0813-1262-9486
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Syariah Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-200/90 flex items-center gap-2 text-center sm:text-left">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Seluruh transaksi simpanan, pinjaman, dan pembiayaan di KSPPS PMA diselenggarakan dengan akad-akad fiqih syariah (Mudharabah, Wadiah, Murabahah, Musyarakah, Qardh) dan bebas dari unsur riba, maysir, dan gharar.
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} KSPPS Perambabulan Makmur Abadi (KSPPS PMA). Hak Cipta Dilindungi Undang-Undang.</span>
            <span>•</span>
            <button
              onClick={openAdmin}
              className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-[11px] font-semibold flex items-center gap-1"
              title="Khusus Pengelola & Pengurus Koperasi"
            >
              <span>Portal</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
