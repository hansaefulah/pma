import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PaymentServicesSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 px-2 sm:px-4">
        
        {/* Minimalist Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pembayaran &amp; Pembelian
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Nikmati kemudahan transaksi lengkap dalam satu tempat
          </p>
        </div>

        {/* Gambar Layanan Utama (3 Card Langsung Sesuai Gambar) */}
        <div 
          onClick={() => setSelectedImage('images/services/layanan-pembayaran-pembelian.jpg')}
          className="w-full flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
        >
          <img
            src="images/services/layanan-pembayaran-pembelian.jpg"
            alt="Layanan Pembayaran, Transfer & Pembelian KSPPS PMA"
            loading="lazy"
            className="w-full max-w-5xl h-auto object-contain drop-shadow-sm group-hover:drop-shadow-md rounded-2xl transition-all duration-300"
          />
        </div>

        {/* Card Khusus Mitra Resmi - Gaya GoPay (Rekan Usaha Kami) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-4 sm:space-y-6 text-center">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mitra Resmi Kami
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Terhubung langsung dengan jaringan perbankan nasional, e-wallet, dan penyedia tagihan resmi untuk transaksi yang cepat, aman, dan mudah.
            </p>
          </div>

          <div 
            onClick={() => setSelectedImage('images/services/mitra-pembayaran.png')}
            className="flex items-center justify-center pt-2 sm:pt-4 cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
          >
            <img
              src="images/services/mitra-pembayaran.png"
              alt="Mitra Resmi Pembayaran KSPPS PMA"
              loading="lazy"
              className="w-full max-w-4xl h-auto object-contain"
            />
          </div>
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Detail Layanan"
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
