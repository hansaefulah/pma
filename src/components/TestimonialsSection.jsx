import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquareHeart
} from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  const [filterRating, setFilterRating] = useState('all');

  const activeTestimonials = (testimonials || []).filter(t => t.active !== false);

  const filteredTestimonials = activeTestimonials.filter(t => {
    if (filterRating === 'all') return true;
    return t.rating === Number(filterRating);
  });

  // Calculate stats
  const totalReviews = activeTestimonials.length;
  const avgRating = totalReviews > 0
    ? (activeTestimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Apa Kata Anggota KSPPS PMA?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Pengalaman nyata para pelaku usaha mikro, penabung syariah, dan masyarakat Cirebon yang bertumbuh bersama KSPPS Perambabulan Makmur Abadi.
          </p>
        </div>

        {/* Rating Summary Pill */}
        <div className="flex items-center gap-4 p-3 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 shrink-0 self-start md:self-auto">
          <div className="text-center pr-3 border-r border-amber-200">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none block">
              {avgRating}
            </span>
            <div className="flex items-center gap-0.5 justify-center mt-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-extrabold text-slate-900 block">
              98% Kepuasan Anggota
            </span>
            <span className="text-[11px] text-slate-600">
              Berdasarkan {totalReviews} ulasan terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all', label: `Semua Ulasan (${totalReviews})` },
          { id: '5', label: '⭐ 5 Bintang' },
          { id: '4', label: '⭐ 4 Bintang' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterRating(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              filterRating === tab.id
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="group p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Member Profile Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
                      }}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                    />
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 bg-white rounded-full absolute -bottom-1 -right-1" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-emerald-200/80 group-hover:text-emerald-300 shrink-0 transition-colors" />
              </div>

              {/* Star Rating & Badge */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (item.rating || 5)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">
                    {item.rating || 5}.0
                  </span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Testimonial Quote Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{item.content}"
              </p>
            </div>

            {/* Footer Tag */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
              <span className="font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-slate-200/70 truncate max-w-[170px]">
                {item.productUsed || 'Layanan Syariah'}
              </span>
              <span>{item.date || item.branch || 'Anggota Aktif'}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
          Belum ada ulasan untuk filter rating ini.
        </div>
      )}

      {/* Footer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <MessageSquareHeart className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold">
              Ingin Berbagi Pengalaman Anda Bersama KSPPS PMA?
            </h4>
            <p className="text-xs text-emerald-200">
              Kritik, saran, dan testimoni Anda sangat berharga bagi peningkatan mutu layanan kami.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/6281312629486?text=Halo%20KSPPS%20PMA,%20saya%20ingin%20memberikan%20ulasan/testimoni%20sebagai%20anggota"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-all shadow-sm shrink-0 whitespace-nowrap"
        >
          Kirim Ulasan via WhatsApp
        </a>
      </div>

    </section>
  );
}

