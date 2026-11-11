import React from 'react';
import { 
  Megaphone, 
  Building2, 
  Briefcase, 
  Smartphone, 
  HelpCircle, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Award,
  Layers,
  Calculator,
  MessageCircle,
  Coins
} from 'lucide-react';

export default function QuickActions({ onActionClick }) {
  const actions = [
    {
      id: 'promo',
      title: 'LIHAT PROMO',
      icon: Megaphone,
      action: () => onActionClick('news'),
    },
    {
      id: 'simpanan',
      title: 'SIMPANAN SYARIAH',
      icon: Coins,
      action: () => onActionClick('products', 'simpanan'),
    },
    {
      id: 'pinjaman',
      title: 'PINJAMAN UMKM',
      icon: Briefcase,
      action: () => onActionClick('products', 'pinjaman'),
    },
    {
      id: 'kalkulator',
      title: 'SIMULASI ANGSURAN',
      icon: Calculator,
      action: () => onActionClick('calculator'),
    },
    {
      id: 'cabang',
      title: 'KANTOR CABANG',
      icon: MapPin,
      action: () => onActionClick('branches'),
    },
    {
      id: 'cs',
      title: 'KONSULTASI WA',
      icon: MessageCircle,
      action: () => {
        window.open('https://wa.me/6281312629486?text=Halo%20KSPPS%20PMA,%20saya%20ingin%20konsultasi%20layanan%20koperasi', '_blank');
      },
    },
  ];

  return (
    <div className="space-y-6 pt-2">
      {/* 6 Icons Horizontal Grid (Exact BRI Style) */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.action}
              className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 group-hover:bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-2.5 transition-all group-hover:scale-110 shadow-xs">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight leading-tight group-hover:text-emerald-800">
                {act.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trust & Proof Bar */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-wrap items-center justify-around gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-xl font-black leading-none">5.000+</div>
            <div className="text-xs text-emerald-200 mt-0.5">Anggota Aktif Tersebar di Cirebon</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-xl font-black leading-none">30+ Tahun</div>
            <div className="text-xs text-emerald-200 mt-0.5">Berkhidmat Membangun Ekonomi Umat</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-xl font-black leading-none">100% Syariah</div>
            <div className="text-xs text-emerald-200 mt-0.5">Diawasi DSN-MUI & Bebas Riba</div>
          </div>
        </div>
      </div>
    </div>
  );
}
