import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Info, 
  Sparkles, 
  PiggyBank, 
  HandCoins, 
  Building 
} from 'lucide-react';
import { createWaLink } from '../utils/helpers';

export default function ProductsSection({ 
  products, 
  selectedCategory, 
  setSelectedCategory, 
  onViewDetail, 
  onApplyProduct 
}) {
  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'simpanan', label: 'Produk Simpanan' },
    { id: 'pinjaman', label: 'Produk Pinjaman' },
    { id: 'pembiayaan', label: 'Produk Pembiayaan' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <span>Solusi Finansial Murni Syariah</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Produk dan Layanan KSPPS PMA
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Berbagai produk simpanan, pinjaman, dan pembiayaan syariah untuk memenuhi kebutuhan finansial Anda secara adil, aman, dan berkah.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const waMessage = `Halo KSPPS PMA, saya tertarik dan ingin konsultasi mengenai produk *${prod.name} (${prod.akad})*. Mohon informasinya.`;
          const waUrl = createWaLink(prod.contactPerson.phone, waMessage);

          return (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Container (Modern Minimalist Aspect Ratio) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Badge Category & Status */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                    prod.category === 'simpanan' 
                      ? 'bg-emerald-700/90 text-white' 
                      : prod.category === 'pinjaman'
                      ? 'bg-blue-700/90 text-white'
                      : 'bg-amber-600/90 text-white'
                  }`}>
                    {prod.categoryLabel}
                  </span>
                  {prod.badge && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-900/80 text-amber-300 backdrop-blur-md">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/90 text-slate-800 backdrop-blur-md shadow-xs">
                    Akad: {prod.akad}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-emerald-800 font-medium">
                        {prod.fullName}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {prod.shortDesc}
                  </p>
                </div>

                {/* Contact Person Bar */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Contact Person:</span>
                    <span className="font-semibold text-emerald-800">{prod.contactPerson.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      {prod.contactPerson.phone}
                    </span>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-800 font-semibold text-xs flex items-center gap-1 hover:underline"
                    >
                      Chat WA
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onViewDetail(prod)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer hover:bg-emerald-50/50"
                  >
                    <Info className="w-4 h-4 text-emerald-600" />
                    <span>Lihat Detail</span>
                  </button>

                  <button
                    onClick={() => onApplyProduct(prod)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Daftar / Ajukan</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

