import React from 'react';
import { 
  Home, 
  Layers, 
  Calculator, 
  Newspaper, 
  MapPin 
} from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'products', label: 'Produk', icon: Layers },
    { id: 'calculator', label: 'Hitung', icon: Calculator },
    { id: 'news', label: 'Berita', icon: Newspaper },
    { id: 'branches', label: 'Cabang', icon: MapPin },
  ];

  const handleClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 shadow-lg flex items-center justify-around sm:hidden">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = activeTab === it.id;
        return (
          <button
            key={it.id}
            onClick={() => handleClick(it.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${isActive ? 'bg-emerald-50 scale-110' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
