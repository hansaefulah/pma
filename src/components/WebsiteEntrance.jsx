import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function WebsiteEntrance({ onFinish }) {
  const [stage, setStage] = useState('entering'); // 'entering' -> 'active' -> 'exiting' -> 'done'

  useEffect(() => {
    // Stage 1: Trigger active scale & progress bar after 50ms
    const timer1 = setTimeout(() => {
      setStage('active');
    }, 50);

    // Stage 2: Begin exit fade and expand after 850ms
    const timer2 = setTimeout(() => {
      setStage('exiting');
    }, 850);

    // Stage 3: Complete and remove from DOM after 1250ms
    const timer3 = setTimeout(() => {
      setStage('done');
      if (onFinish) onFinish();
    }, 1250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  if (stage === 'done') return null;

  const handleDismiss = () => {
    setStage('done');
    if (onFinish) onFinish();
  };

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white select-none transition-all duration-500 ease-out cursor-pointer ${
        stage === 'exiting' 
          ? 'opacity-0 scale-105 pointer-events-none' 
          : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        
        {/* Logo with pulsing ring */}
        <div className="relative mb-5">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-400/30 to-emerald-400/30 blur-md animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 shadow-2xl flex items-center justify-center transform transition-transform duration-500">
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
        </div>

        {/* Brand Name with Islamic Syariah badge */}
        <div className="space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-bold text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>KOPERASI SYARIAH CIREBON</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
            KSPPS PMA
          </h1>

          <p className="text-xs sm:text-sm text-emerald-200 font-semibold tracking-wide">
            Perambabulan Makmur Abadi
          </p>
        </div>

        <p className="text-[11px] sm:text-xs text-emerald-100/70 max-w-xs mb-6">
          Membangun Ekonomi Umat Melalui Prinsip Syariah &amp; Gotong Royong
        </p>

        {/* Elegant Animated Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 bg-white/15 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-700 ease-out"
            style={{
              width: stage === 'entering' ? '10%' : '100%',
            }}
          />
        </div>

        <span className="text-[10px] text-emerald-300/60 mt-3 font-mono tracking-widest uppercase">
          Memuat Sistem...
        </span>
      </div>
    </div>
  );
}

