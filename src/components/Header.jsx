import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  Phone,
  MapPin,
  HelpCircle,
  Megaphone,
  Globe,
  MessageCircle,
  ChevronRight,
  Building2,
  Layers,
  Calculator,
  Sparkles
} from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Building2 },
    { id: 'products', label: 'Produk & Layanan', icon: Layers },
    { id: 'calculator', label: 'Simulasi Pinjaman', icon: Calculator },
    { id: 'about', label: 'Tentang Kami', icon: ShieldCheck },
    { id: 'news', label: 'Berita & Promo', icon: Megaphone },
    { id: 'branches', label: 'Kantor Cabang', icon: MapPin },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State condition: on subpages when not scrolled, background is dark emerald gradient (from PageHeader)
  const isDarkBackground = !isScrolled && activeTab !== 'home';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md'
        : isDarkBackground
          ? 'bg-emerald-950/25 backdrop-blur-xs border-b border-white/10 shadow-none'
          : 'bg-transparent border-transparent shadow-none'
      }`}>

      {/* Top Utility Bar (Desktop only) */}
      <div className={`transition-all duration-300 text-[11px] py-1 px-4 hidden md:block ${isScrolled
          ? 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white'
          : isDarkBackground
            ? 'bg-emerald-950/50 text-emerald-100 border-b border-white/10'
            : 'bg-white/40 text-emerald-950 backdrop-blur-xs font-semibold'
        }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 font-bold ${isScrolled ? 'text-white' : isDarkBackground ? 'text-white' : 'text-emerald-900'
              }`}>
              <ShieldCheck className={`w-3.5 h-3.5 ${isDarkBackground ? 'text-amber-300' : 'text-emerald-700'
                }`} />
              KSPPS Perambabulan Makmur Abadi
            </span>
            <span className="opacity-30">|</span>
            <span className={isScrolled ? 'text-emerald-100' : isDarkBackground ? 'text-emerald-200' : 'text-emerald-950/80'}>
              Koperasi Simpan Pinjam &amp; Pembiayaan Syariah Cirebon
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('news')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${isScrolled ? 'hover:text-amber-300' : isDarkBackground ? 'text-emerald-100 hover:text-white' : 'hover:text-emerald-700'
                }`}
            >
              <Megaphone className="w-3 h-3" />
              <span>Promosi</span>
            </button>
            <span className="opacity-30">|</span>

            <button
              onClick={() => handleNavClick('branches')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${isScrolled ? 'hover:text-amber-300' : isDarkBackground ? 'text-emerald-100 hover:text-white' : 'hover:text-emerald-700'
                }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Lokasi Cabang</span>
            </button>
            <span className="opacity-30">|</span>

            <a
              href="https://wa.me/6281312629486"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 transition-colors ${isScrolled ? 'hover:text-amber-300' : isDarkBackground ? 'text-emerald-100 hover:text-white' : 'hover:text-emerald-700'
                }`}
            >
              <HelpCircle className="w-3 h-3" />
              <span>Bantuan WA</span>
            </a>
            <span className="opacity-30">|</span>

            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] border ${isScrolled
                ? 'bg-white/20 text-white border-white/20'
                : isDarkBackground
                  ? 'bg-white/15 text-white border-white/20'
                  : 'bg-white/60 text-emerald-950 border-emerald-900/10'
              }`}>
              <Globe className={`w-3 h-3 ${isDarkBackground ? 'text-amber-300' : 'text-emerald-700'}`} />
              <span>ID</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0 mr-4"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white shadow-xs border border-emerald-100 p-1 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <img
                src="./Logo2.jpg"
                alt="Logo KSPPS PMA"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = './logo2.jpg';
                }}
              />
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-base sm:text-lg tracking-tight transition-colors ${isScrolled
                    ? 'text-emerald-950'
                    : isDarkBackground
                      ? 'text-white drop-shadow-sm'
                      : 'text-emerald-950'
                  }`}>
                  KSPPS PMA
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isDarkBackground
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/30'
                    : 'bg-emerald-100 text-emerald-800'
                  }`}>
                  SYARIAH
                </span>
              </div>
              <p className={`text-[11px] font-semibold truncate max-w-[160px] sm:max-w-none transition-colors ${isScrolled
                  ? 'text-slate-600'
                  : isDarkBackground
                    ? 'text-emerald-200/90'
                    : 'text-slate-700'
                }`}>
                Perambabulan Makmur Abadi
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                      ? isScrolled
                        ? 'text-white bg-emerald-700 shadow-sm font-extrabold'
                        : isDarkBackground
                          ? 'text-emerald-950 bg-white font-black shadow-md'
                          : 'text-white bg-emerald-700 shadow-sm font-extrabold'
                      : isScrolled
                        ? 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/80'
                        : isDarkBackground
                          ? 'text-white/90 hover:text-white hover:bg-white/15'
                          : 'text-slate-800 hover:text-emerald-950 hover:bg-white/60 bg-white/30 backdrop-blur-2xs'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Clean WhatsApp Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/6281111123124?text=Halo%20KSPPS%20PMA,%20saya%20ingin%20konsultasi%20layanan"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs hover:shadow-md ${isDarkBackground
                  ? 'bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black shadow-md'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white font-bold'
                }`}
            >
              <span>Hubungi Kami</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-xs border ${isDarkBackground
                  ? 'bg-white/20 text-white hover:bg-white/30 border-white/20'
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-emerald-800 border-slate-200/60'
                }`}
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-emerald-100 shadow-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">

          <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100/70 flex items-center justify-between text-xs text-emerald-950 font-bold mb-2">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              KSPPS PMA Syariah Cirebon
            </span>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
              Bebas Riba
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hotline Customer Care:</span>
            <a
              href="tel:081312629486"
              className="text-emerald-700 font-bold font-mono hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              081111123124
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
