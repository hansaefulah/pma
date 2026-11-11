import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles,
  Video,
  Play
} from 'lucide-react';

export default function HeroBanner({ banners, onCtaClick, onQuickSelect }) {
  // Filter active and deduplicate identical banners to prevent lag and duplicate slides
  const activeBanners = useMemo(() => {
    const active = banners.filter(b => b.active !== false);
    const seen = new Set();
    return active.filter(b => {
      const key = `${b.videoUrl ? 'vid' : 'img'}-${b.imageUrl || ''}-${b.title || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [banners]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState('calc');

  // Auto slide every 7 seconds
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    if (onQuickSelect) {
      onQuickSelect(selectedAction);
    }
  };

  if (!activeBanners.length) return null;

  return (
    <div className="relative w-full mb-8 sm:mb-14 animate-page">
      
      {/* 1. Full-Width Edge-to-Edge Hero Banner Container */}
      <div className="relative w-full overflow-hidden bg-slate-100 group pt-14 sm:pt-18 md:pt-0">
        
        {/* Aspect ratio: 16/10 on mobile, 1983/793 on desktop */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[2.1/1] md:aspect-[1983/793] min-h-[220px] sm:min-h-[360px] md:min-h-[460px] max-h-[85vh]">
          {activeBanners.map((banner, idx) => {
            const isVideo = banner.mediaType === 'video' || 
                            banner.videoUrl || 
                            banner.imageUrl?.endsWith('.mp4') || 
                            banner.imageUrl?.endsWith('.webm') ||
                            banner.imageUrl?.includes('video');

            return (
              <div
                key={banner.id || idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                onClick={() => onCtaClick(banner.link || '#products')}
              >
                {isVideo ? (
                  <video
                    src={banner.videoUrl || banner.imageUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={idx === 0 ? "high" : "low"}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = idx === 0 ? './banner1.png' : idx === 1 ? './banner2.png' : './banner3.png';
                    }}
                  />
                )}

                {/* Video Tag badge if banner is a video */}
                {isVideo && (
                  <div className="absolute top-4 left-4 z-20 bg-slate-900/60 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
               
                  </div>
                )}
              </div>
            );
          })}

          {/* Left Arrow (Desktop only to prevent blocking mobile view) */}
          {activeBanners.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Banner Sebelumnya"
              className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/40 hover:bg-emerald-600 text-white backdrop-blur-md items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow (Desktop only to prevent blocking mobile view) */}
          {activeBanners.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Banner Selanjutnya"
              className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/40 hover:bg-emerald-600 text-white backdrop-blur-md items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Dots Indicator */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-2.5 sm:px-3.5 py-1 rounded-full">
              {activeBanners.map((b, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex 
                      ? 'w-5 sm:w-7 h-1.5 sm:h-2 bg-amber-400' 
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Floating Action Bar (BRI Style) */}
      <div className="relative -mt-4 sm:-mt-8 z-30 max-w-4xl mx-auto px-3 sm:px-4">
        <form
          onSubmit={handleHelpSubmit}
          className="bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-2.5 shadow-xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-2.5 ring-1 ring-black/5"
        >
          {/* Label */}
          <div className="flex items-center gap-2 px-2 pt-0.5 sm:pt-0 shrink-0 text-slate-700 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            <span className="text-[11px] sm:text-sm font-extrabold tracking-wider text-emerald-950 font-sans">
              I WANT :
            </span>
          </div>

          {/* Dropdown Options */}
          <div className="w-full sm:flex-1">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full py-2 px-3 sm:px-4 rounded-xl sm:rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-emerald-600 focus:bg-white cursor-pointer"
            >
              <option value="calc">Simulasi Pinjaman & Angsuran Syariah</option>
              <option value="tamaskop">Buka Tabungan Anggota (TAMASKOP)</option>
              <option value="pinjaman-usaha">Ajukan Pinjaman Modal Usaha Mikro</option>
              <option value="takopnas">Tabungan Koperasi Anak Sekolah (TAKOPNAS)</option>
              <option value="tahara">Tabungan Hari Raya Idul Fitri (TAHARA)</option>
              <option value="tabungan-rumah">Rencana Pemilikan Rumah Syariah</option>
              <option value="branches">Cari Lokasi Kantor Cabang Terdekat</option>
              <option value="about">Pelajari Profil & Sejarah KSPPS PMA</option>
            </select>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>LET US HELP YOU</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </form>
      </div>

    </div>
  );
}
