import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  X, 
  Sparkles,
  ExternalLink,
  Eye,
  Share2,
  Copy,
  Check
} from 'lucide-react';

export default function NewsPromoSection({ articles = [], onArticleView }) {
  const [activeTab, setActiveTab] = useState('berita'); // 'berita', 'promo', 'pengumuman', 'literasi'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollContainerRef = useRef(null);

  // LOGIKA TAMBAHAN: Otomatis buka modal berita/promo dari link share (Hash URL)
  useEffect(() => {
    if (typeof window !== 'undefined' && articles.length > 0) {
      const hash = window.location.hash; // Mengambil string hash seperti "#article-123"
      if (hash && hash.startsWith('#article-')) {
        const articleId = hash.replace('#article-', '');
        const targetArticle = articles.find(art => String(art.id) === String(articleId));
        if (targetArticle) {
          handleOpenArticle(targetArticle);
        }
      }
    }
  }, [articles]);

  const tabs = [
    { id: 'berita', label: 'BERITA' },
    { id: 'promo', label: 'PROMOSI' },
    { id: 'pengumuman', label: 'PENGUMUMAN' },
    { id: 'literasi', label: 'LITERASI SYARIAH' },
  ];

  // Filter based on active tab
  const filteredArticles = articles.filter(art => {
    if (art.active === false) return false;
    if (activeTab === 'berita') return art.type === 'berita';
    if (activeTab === 'promo') return art.type === 'promo';
    if (activeTab === 'pengumuman') return art.type === 'pengumuman' || art.badge?.toLowerCase().includes('pengumuman');
    if (activeTab === 'literasi') return art.type === 'literasi' || art.badge?.toLowerCase().includes('edukasi') || art.badge?.toLowerCase().includes('literasi');
    return true;
  });

  // Fallback to show items if a tab has few
  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles.filter(a => a.active !== false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleOpenArticle = (art) => {
    const newViews = (Number(art.views) || 0) + 1;
    setSelectedArticle({ ...art, views: newViews });
    
    // UPDATE URL HASH saat modal dibuka agar link di browser ter-update
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#article-${art.id}`);
    }

    if (onArticleView) {
      onArticleView(art.id);
    }
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    // HAPUS HASH dari URL saat modal ditutup
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="news" className="scroll-mt-24 space-y-6 pt-4">
      
      {/* BRI Layout: Split Left (Heading, Tabs, Arrows) & Right (Card Slider) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (BRI Style) */}
        <div className="lg:col-span-4 space-y-6">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Temukan berita &amp; promosi terbaru kami
          </h2>

          {/* Underlined Category Tabs (BRI Style) */}
          <div className="flex items-center gap-5 sm:gap-6 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-extrabold pb-2 tracking-wide transition-all cursor-pointer whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-emerald-700 font-black'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Lihat berita dan promosi terbaru kami
          </p>

          <div>
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group cursor-pointer"
            >
              <span>LIHAT LEBIH</span>
              <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
            </button>
          </div>

          {/* Carousel Arrow Buttons (BRI Square/Rounded Buttons) */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={scrollLeft}
              aria-label="Geser ke kiri"
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Geser ke kanan"
              className="w-10 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Right Column: Cards Slider (BRI Style) */}
        <div className="lg:col-span-8 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none snap-x snap-mandatory"
          >
            {displayArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleOpenArticle(art)}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group snap-start"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Badge top right (BRI Style badge) */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-emerald-950 backdrop-blur-md shadow-xs">
                        {art.badge || (art.type === 'promo' ? 'Promo Spesial' : 'Berita')}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer with date range & view counter */}
                <div className="px-5 pb-5 pt-2 text-[11px] font-mono font-medium text-slate-400 flex items-center justify-between border-t border-slate-50">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>
                      {art.type === 'promo' 
                        ? `${art.date} - 2026-12-31`
                        : art.date
                      }
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      <span>{art.views || 0} dilihat</span>
                    </span>
                  </div>
                  <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${
                  selectedArticle.type === 'promo' ? 'bg-amber-600' : 'bg-emerald-700'
                }`}>
                  {selectedArticle.badge || (selectedArticle.type === 'promo' ? 'Promo Spesial' : 'Berita Koperasi')}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 flex-wrap">
                  <span>Oleh: {selectedArticle.author || 'Admin KSPPS PMA'}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dilihat {selectedArticle.views || 1} kali</span>
                  </span>
                </div>
              </div>
              <button
                onClick={handleCloseArticle}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-100">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-slate-700 text-sm leading-relaxed space-y-3 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            {/* Social Media Share Bar */}
            {(() => {
              const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#article-${selectedArticle.id}` : '';
              const shareText = `${selectedArticle.title} - KSPPS Perambabulan Makmur Abadi`;

              return (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-emerald-700" />
                      <span>Bagikan Berita &amp; Promo ke Media Sosial:</span>
                    </span>
                    {copiedLink && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100 px-2.5 py-0.5 rounded-full animate-in fade-in">
                        <Check className="w-3 h-3" />
                        <span>Tautan Tersalin!</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {/* Meta / Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-xs"
                      title="Bagikan ke Facebook / Meta"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Meta / FB</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n\n' + currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-xs"
                      title="Bagikan ke WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    {/* Twitter / X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
                      title="Bagikan ke Twitter / X"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X (Twitter)</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white text-xs font-bold transition-all shadow-xs"
                      title="Bagikan ke Telegram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.3-.675.3l.2-3.048 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.931z"/>
                      </svg>
                      <span>Telegram</span>
                    </a>

                    {/* Salin Tautan (Copy Link) */}
                    <button
                      type="button"
                      onClick={() => handleCopyLink(currentUrl)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
                      title="Salin Tautan Artikel"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                KSPPS Perambabulan Makmur Abadi
              </span>
              <button
                onClick={handleCloseArticle}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}