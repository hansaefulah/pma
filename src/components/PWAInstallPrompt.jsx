import React, { useState, useEffect, useCallback } from 'react';
import { Download, X, Smartphone, Monitor, Share, ChevronRight, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Detect iOS
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }
  }, []);

  // Listen for beforeinstallprompt (Chrome, Edge, Samsung, Opera)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Don't show immediately, wait a bit
      const dismissed = sessionStorage.getItem('pwa_install_dismissed');
      if (!dismissed) {
        setTimeout(() => {
          setShowInstallBanner(true);
        }, 5000); // Show after 5 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log('[PWA] App installed successfully!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for service worker updates
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowUpdateBanner(true);
              }
            });
          }
        });
      });
    }
  }, []);

  // Handle install button click
  const handleInstall = useCallback(async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] Install prompt outcome:', outcome);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } catch (err) {
      console.error('[PWA] Install error:', err);
    }

    setDeferredPrompt(null);
    setShowInstallBanner(false);
  }, [deferredPrompt, isIOS]);

  // Dismiss install banner
  const dismissBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  // Handle app update
  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
      window.location.reload();
    }
    setShowUpdateBanner(false);
  };

  // Don't show if already installed and no updates
  if (isInstalled && !showUpdateBanner) return null;

  return (
    <>
      {/* Offline Indicator Bar */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-amber-500 text-amber-950 text-center py-1.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-in slide-in-from-top duration-300">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Mode Offline — Beberapa fitur mungkin terbatas</span>
        </div>
      )}

      {/* Update Available Banner */}
      {showUpdateBanner && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[90] bg-emerald-800 text-white rounded-2xl p-4 shadow-2xl border border-emerald-600/30 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">Pembaruan Tersedia</p>
              <p className="text-xs text-emerald-200 mt-0.5">Versi terbaru KSPPS PMA telah siap.</p>
            </div>
            <button
              onClick={() => setShowUpdateBanner(false)}
              className="text-white/60 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleUpdate}
            className="w-full mt-3 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Perbarui Sekarang
          </button>
        </div>
      )}

      {/* Install Prompt Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[90] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl shadow-2xl border border-emerald-600/30 overflow-hidden animate-in slide-in-from-bottom duration-500">
          {/* Decorative top glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative p-4">
            {/* Close button */}
            <button
              onClick={dismissBanner}
              className="absolute top-3 right-3 text-white/50 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-3 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-lg shrink-0 flex items-center justify-center">
                <img
                  src="./logo2.jpg"
                  alt="KSPPS PMA"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './Logo.jpeg';
                  }}
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm leading-tight">Install Aplikasi KSPPS PMA</h4>
                <p className="text-[11px] text-emerald-200 mt-1 leading-relaxed">
                  Akses cepat tanpa browser. Simpan di layar utama HP Anda!
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Smartphone, label: 'Seperti Aplikasi' },
                { icon: WifiOff, label: 'Akses Offline' },
                { icon: Download, label: 'Tanpa Play Store' },
              ].map((item, i) => (
                <div key={i} className="py-2 px-1 bg-white/8 rounded-xl">
                  <item.icon className="w-4 h-4 mx-auto text-amber-300 mb-1" />
                  <span className="text-[10px] font-semibold text-emerald-100 block leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Install Button */}
            <button
              onClick={handleInstall}
              className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install Sekarang — Gratis</span>
            </button>

            <p className="text-[10px] text-emerald-300/50 text-center mt-2">
              Tidak perlu unduh dari Play Store / App Store
            </p>
          </div>
        </div>
      )}

      {/* iOS Install Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowIOSGuide(false)}>
          <div
            className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-5 text-center text-white">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 mx-auto mb-3 shadow-lg">
                <img
                  src="./logo2.jpg"
                  alt="KSPPS PMA"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="font-black text-lg">Install di iPhone/iPad</h3>
              <p className="text-xs text-emerald-200 mt-1">Ikuti 3 langkah mudah berikut:</p>
            </div>

            {/* Steps */}
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Tekan tombol Share</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ketuk ikon <Share className="w-3 h-3 inline-block mx-0.5" /> di bagian bawah Safari
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Pilih "Add to Home Screen"</p>
                  <p className="text-xs text-slate-500 mt-0.5">Scroll ke bawah dan ketuk opsi tersebut</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Ketuk "Add"</p>
                  <p className="text-xs text-slate-500 mt-0.5">Aplikasi KSPPS PMA akan muncul di layar utama</p>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold cursor-pointer transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

