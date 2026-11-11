import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import QuickActions from './components/QuickActions';
import ProductsSection from './components/ProductsSection';
import LoanCalculator from './components/LoanCalculator';
import AboutSection from './components/AboutSection';
import NewsPromoSection from './components/NewsPromoSection';
import BranchContactSection from './components/BranchContactSection';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ProductDetailModal from './components/ProductDetailModal';
import ApplyModal from './components/ApplyModal';
import CvModal from './components/CvModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginPage from './components/AdminLoginPage';
import AdminLoginModal from './components/AdminLoginModal';
import PageHeader from './components/PageHeader';
import ScrollReveal from './components/ScrollReveal';
import WebsiteEntrance from './components/WebsiteEntrance';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import FinancialReportSection from './components/FinancialReportSection';
import SpiritualSocialSection from './components/SpiritualSocialSection';
import VisitorStatsWidget from './components/VisitorStatsWidget';
import PaymentServicesSection from './components/PaymentServicesSection';
import LegalitySection from './components/LegalitySection';
import TestimonialsSection from './components/TestimonialsSection';
import { fetchServerData, saveDataToServer } from './utils/helpers';

import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Calculator, 
  Coins, 
  MapPin, 
  Award,
  ChevronRight,
  Phone,
  Lock,
  LogOut,
  Eye,
  TrendingUp,
  Activity
} from 'lucide-react';

import {
  initialBanners,
  initialProducts,
  initialArticles,
  initialTeam,
  initialBranches,
  initialApplications,
  initialContactMessages,
  initialFinancialReports,
  initialSpiritualSocial,
  initialVisitorStats,
  initialLegality,
  initialTestimonials,
} from './data/initialData';

export default function App() {
  // Multi-Page State: 'home', 'products', 'calculator', 'about', 'news', 'branches'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMemberCv, setSelectedMemberCv] = useState(null);
  const [applyData, setApplyData] = useState(null); // { product, calculation }
  
  // Admin & Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('pma_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);

  // Persistent States in LocalStorage
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('pma_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pma_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('pma_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('pma_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [branches, setBranches] = useState(() => {
    const saved = localStorage.getItem('pma_branches');
    return saved ? JSON.parse(saved) : initialBranches;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('pma_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('pma_contact_messages');
    return saved ? JSON.parse(saved) : initialContactMessages;
  });

  const [financialReports, setFinancialReports] = useState(() => {
    const saved = localStorage.getItem('pma_financial_reports');
    return saved ? JSON.parse(saved) : initialFinancialReports;
  });

  const [spiritualSocial, setSpiritualSocial] = useState(() => {
    const saved = localStorage.getItem('pma_spiritual_social');
    return saved ? JSON.parse(saved) : initialSpiritualSocial;
  });

  const [visitorStats, setVisitorStats] = useState(() => {
    const saved = localStorage.getItem('pma_visitor_stats');
    return saved ? JSON.parse(saved) : initialVisitorStats;
  });

  const [legality, setLegality] = useState(() => {
    const saved = localStorage.getItem('pma_legality');
    return saved ? JSON.parse(saved) : initialLegality;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('pma_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Check URL routes for /adminkspps, #/adminkspps, or ?admin
  useEffect(() => {
    const handleUrlRoute = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      const s = window.location.search.toLowerCase();
      if (p.includes('adminkspps') || h.includes('adminkspps') || s.includes('adminkspps') || s.includes('admin=')) {
        setCurrentPage('adminkspps');
      }
    };
    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  // Update URL hash when currentPage changes
  useEffect(() => {
    if (currentPage === 'adminkspps') {
      if (!window.location.hash.includes('adminkspps')) {
        window.location.hash = '/adminkspps';
      }
    } else {
      if (window.location.hash.includes('adminkspps')) {
        history.replaceState(null, document.title, window.location.pathname.replace(/\/adminkspps\/?$/, '/') + window.location.search);
      }
    }
  }, [currentPage]);

  // Handle Article View count increment
  const handleArticleView = (articleId) => {
    setArticles((prev) => {
      const updated = prev.map((art) =>
        art.id === articleId ? { ...art, views: (Number(art.views) || 0) + 1 } : art
      );
      localStorage.setItem('pma_articles', JSON.stringify(updated));
      saveDataToServer({ key: 'articles', data: updated });
      return updated;
    });
  };

  // Real-Time Visitor Tracking (Records genuine device, browser, timestamp, and page navigation)
  useEffect(() => {
    const pageLabels = {
      home: 'Beranda Utama',
      products: 'Produk & Layanan',
      calculator: 'Simulasi Pinjaman',
      about: 'Tentang Kami & Pengurus',
      branches: 'Kantor Cabang',
      news: 'Berita & Promo',
      adminkspps: 'Portal Administrator'
    };

    const ua = navigator.userAgent || '';
    let deviceCategory = 'desktop';
    let deviceName = 'Komputer Desktop';

    if (/ipad|tablet|playbook|silk/i.test(ua)) {
      deviceCategory = 'tablet';
      deviceName = 'Tablet';
    } else if (/android/i.test(ua)) {
      deviceCategory = 'mobile';
      deviceName = 'Smartphone Android';
    } else if (/iphone|ipod/i.test(ua)) {
      deviceCategory = 'mobile';
      deviceName = 'iPhone / iOS';
    } else if (/mobile/i.test(ua)) {
      deviceCategory = 'mobile';
      deviceName = 'Mobile Device';
    } else if (/macintosh|mac os x/i.test(ua)) {
      deviceName = 'MacBook / macOS';
    } else if (/windows/i.test(ua)) {
      deviceName = 'Windows PC';
    } else if (/linux/i.test(ua)) {
      deviceName = 'Linux Workstation';
    }

    let browserName = 'Chrome';
    if (/edg/i.test(ua)) browserName = 'Edge';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browserName = 'Safari';
    else if (/firefox/i.test(ua)) browserName = 'Firefox';
    else if (/opr\//i.test(ua)) browserName = 'Opera';

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
    const todayStr = now.toISOString().split('T')[0];

    setVisitorStats((prev) => {
      if (!prev) return prev;
      const isNewDay = prev.todayDate !== todayStr;
      const newToday = isNewDay ? 1 : (Number(prev.today) || 0) + 1;
      const newTotal = (Number(prev.total) || 0) + 1;
      const newMonthly = (Number(prev.monthly) || 0) + 1;

      // Update genuine device count
      const updatedDevices = { ...(prev.devices || { mobile: 68, desktop: 28, tablet: 4 }) };
      updatedDevices[deviceCategory] = (updatedDevices[deviceCategory] || 0) + 1;

      // Update genuine browser count
      const updatedBrowsers = { ...(prev.browsers || { Chrome: 72, Safari: 15, Edge: 8, Firefox: 5 }) };
      updatedBrowsers[browserName] = (updatedBrowsers[browserName] || 0) + 1;

      // Update genuine popular pages
      const updatedPopularPages = { ...(prev.popularPages || {}) };
      updatedPopularPages[currentPage] = (updatedPopularPages[currentPage] || 0) + 1;

      // Genuine real-time log entry
      const newLog = {
        id: Date.now(),
        time: timeFormatted,
        page: pageLabels[currentPage] || currentPage,
        device: `${deviceName} (${browserName})`,
        ip: window.location.hostname === 'localhost' ? '127.0.0.1 (Localhost)' : `Klien Web (${window.location.hostname || 'Online'})`,
        status: 'Aktif'
      };

      const existingLogs = Array.isArray(prev.recentLogs) ? prev.recentLogs : [];
      const updatedLogs = [newLog, ...existingLogs.filter(l => l.id !== newLog.id)].slice(0, 20);

      const updated = {
        ...prev,
        total: newTotal,
        today: newToday,
        todayDate: todayStr,
        monthly: newMonthly,
        online: Math.max(1, Math.min(10, ((newToday % 4) + 3))),
        devices: updatedDevices,
        browsers: updatedBrowsers,
        popularPages: updatedPopularPages,
        recentLogs: updatedLogs
      };

      localStorage.setItem('pma_visitor_stats', JSON.stringify(updated));
      saveDataToServer({ key: 'visitorStats', data: updated });
      return updated;
    });
  }, [currentPage]);

  // Fetch central server database on initial load to synchronize across all browsers and devices
  useEffect(() => {
    fetchServerData().then((serverData) => {
      if (serverData) {
        if (Array.isArray(serverData.banners) && serverData.banners.length > 0) {
          setBanners(serverData.banners);
          localStorage.setItem('pma_banners', JSON.stringify(serverData.banners));
        }
        if (Array.isArray(serverData.products) && serverData.products.length > 0) {
          setProducts(serverData.products);
          localStorage.setItem('pma_products', JSON.stringify(serverData.products));
        }
        if (Array.isArray(serverData.articles) && serverData.articles.length > 0) {
          setArticles(serverData.articles);
          localStorage.setItem('pma_articles', JSON.stringify(serverData.articles));
        }
        if (Array.isArray(serverData.team) && serverData.team.length > 0) {
          setTeam(serverData.team);
          localStorage.setItem('pma_team', JSON.stringify(serverData.team));
        }
        if (Array.isArray(serverData.branches) && serverData.branches.length > 0) {
          setBranches(serverData.branches);
          localStorage.setItem('pma_branches', JSON.stringify(serverData.branches));
        }
        if (Array.isArray(serverData.applications)) {
          setApplications(serverData.applications);
          localStorage.setItem('pma_applications', JSON.stringify(serverData.applications));
        }
        if (Array.isArray(serverData.contactMessages)) {
          setContactMessages(serverData.contactMessages);
          localStorage.setItem('pma_contact_messages', JSON.stringify(serverData.contactMessages));
        }
        if (serverData.financialReports && serverData.financialReports.aktiva) {
          setFinancialReports(serverData.financialReports);
          localStorage.setItem('pma_financial_reports', JSON.stringify(serverData.financialReports));
        }
        if (serverData.spiritualSocial && serverData.spiritualSocial.spiritual) {
          setSpiritualSocial(serverData.spiritualSocial);
          localStorage.setItem('pma_spiritual_social', JSON.stringify(serverData.spiritualSocial));
        }
        if (serverData.visitorStats && serverData.visitorStats.total) {
          setVisitorStats(serverData.visitorStats);
          localStorage.setItem('pma_visitor_stats', JSON.stringify(serverData.visitorStats));
        }
        if (serverData.legality && Array.isArray(serverData.legality)) {
          setLegality(serverData.legality);
          localStorage.setItem('pma_legality', JSON.stringify(serverData.legality));
        }
        if (serverData.testimonials && Array.isArray(serverData.testimonials)) {
          setTestimonials(serverData.testimonials);
          localStorage.setItem('pma_testimonials', JSON.stringify(serverData.testimonials));
        }
      }
    });
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pma_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('pma_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pma_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('pma_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('pma_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('pma_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('pma_contactMessages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('pma_financial_reports', JSON.stringify(financialReports));
  }, [financialReports]);

  useEffect(() => {
    localStorage.setItem('pma_spiritual_social', JSON.stringify(spiritualSocial));
  }, [spiritualSocial]);

  useEffect(() => {
    localStorage.setItem('pma_visitor_stats', JSON.stringify(visitorStats));
  }, [visitorStats]);

  useEffect(() => {
    localStorage.setItem('pma_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pma_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('pma_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('pma_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('pma_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('pma_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('pma_legality', JSON.stringify(legality));
  }, [legality]);

  useEffect(() => {
    localStorage.setItem('pma_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Admin access handler
  const handleOpenAdmin = () => {
    navigateTo('adminkspps');
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('pma_admin_auth', 'true');
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('pma_admin_auth');
    navigateTo('home');
  };

  // Reset to default sample data
  const handleResetData = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua data website ke pengaturan awal?')) {
      setBanners(initialBanners);
      setProducts(initialProducts);
      setArticles(initialArticles);
      setTeam(initialTeam);
      setBranches(initialBranches);
      setApplications(initialApplications);
      setContactMessages(initialContactMessages);
      setFinancialReports(initialFinancialReports);
      setSpiritualSocial(initialSpiritualSocial);
      setVisitorStats(initialVisitorStats);
      setLegality(initialLegality);
      setTestimonials(initialTestimonials);
      localStorage.clear();
      saveDataToServer({
        banners: initialBanners,
        products: initialProducts,
        articles: initialArticles,
        team: initialTeam,
        branches: initialBranches,
        applications: initialApplications,
        contactMessages: initialContactMessages,
        financialReports: initialFinancialReports,
        spiritualSocial: initialSpiritualSocial,
        visitorStats: initialVisitorStats,
        legality: initialLegality,
        testimonials: initialTestimonials,
      });
      alert('Data berhasil di-reset ke awal.');
    }
  };

  // Page Switcher Navigation
  const navigateTo = (page, category = null) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    if (page === 'adminkspps') {
      if (!window.location.hash.includes('adminkspps')) {
        window.location.hash = '/adminkspps';
      }
    } else {
      if (window.location.hash.includes('adminkspps')) {
        history.replaceState(null, document.title, window.location.pathname.replace(/\/adminkspps\/?$/, '/') + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Action from BRI Floating Helper Bar
  const handleQuickSelect = (actionKey) => {
    if (actionKey === 'calc') {
      navigateTo('calculator');
    } else if (actionKey === 'branches') {
      navigateTo('branches');
    } else if (actionKey === 'about') {
      navigateTo('about');
    } else {
      // Find matching product
      const found = products.find(p => p.id === actionKey);
      if (found) {
        navigateTo('products');
        setSelectedProduct(found);
      } else {
        navigateTo('products');
      }
    }
  };

  // Submit loan application
  const handleSubmitApplication = (app) => {
    setApplications([app, ...applications]);
  };

  // Submit contact message
  const handleSendMessage = (msg) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      ...msg,
      status: 'Belum Dibalas',
    };
    setContactMessages([newMsg, ...contactMessages]);
  };

  // Featured products for Home page preview
  const featuredProducts = products.filter(p => p.popular).slice(0, 3);

  // ================= DEDICATED STANDALONE ADMIN ROUTE =================
  // HALAMAN KHUSUS SENDIRI, TIDAK DI ATAS BERANDA
  if (currentPage === 'adminkspps') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            sessionStorage.setItem('pma_admin_auth', 'true');
          }}
          onBackToHome={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminDashboard
        banners={banners}
        setBanners={setBanners}
        articles={articles}
        setArticles={setArticles}
        applications={applications}
        setApplications={setApplications}
        contactMessages={contactMessages}
        setContactMessages={setContactMessages}
        team={team}
        setTeam={setTeam}
        branches={branches}
        setBranches={setBranches}
        products={products}
        setProducts={setProducts}
        financialReports={financialReports}
        setFinancialReports={setFinancialReports}
        spiritualSocial={spiritualSocial}
        setSpiritualSocial={setSpiritualSocial}
        visitorStats={visitorStats}
        setVisitorStats={setVisitorStats}
        legality={legality}
        setLegality={setLegality}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        onClose={() => navigateTo('home')}
        onViewWebsite={() => navigateTo('home')}
        onLogout={handleLogout}
        onResetData={handleResetData}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Sticky Top Admin Preview Mode Bar when Authenticated */}
      {isAdminAuthenticated && (
        <div className="bg-emerald-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-amber-400/40 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold">Mode Pratinjau Web (Sesi Admin Aktif)</span>
            <span className="text-emerald-300 hidden sm:inline">&bull; Rute: /adminkspps</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('adminkspps')}
              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Buka Halaman Admin /adminkspps</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer transition-colors"
              title="Logout Admin"
            >
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar Header */}
      <Header
        activeTab={currentPage}
        setActiveTab={navigateTo}
      />

      {/* MULTI-PAGE ROUTING */}
      <div className="flex-1">
        
        {/* ================= PAGE 1: BERANDA (HOME) ================= */}
        {currentPage === 'home' && (
          <div>
            {/* 1. Full-Width Edge-to-Edge Hero Banner with BRI Floating Helper Bar */}
            <HeroBanner
              banners={banners}
              onCtaClick={(link) => {
                if (link.includes('product')) navigateTo('products');
                else if (link.includes('calc')) navigateTo('calculator');
                else if (link.includes('about')) navigateTo('about');
                else navigateTo('products');
              }}
              onQuickSelect={handleQuickSelect}
            />

            {/* Container for Home Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 pb-20">
              
              {/* 2. Quick Actions 6 Icons (BRI Style) */}
              <QuickActions
                onActionClick={(target, cat) => navigateTo(target, cat)}
              />

              {/* 3. Featured Products Highlight Section */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Pilihan Terpopuler
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                      Produk &amp; Layanan Unggulan
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Beragam simpanan amanah dan pembiayaan syariah tanpa riba untuk kebutuhan finansial Anda.
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('products')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer self-start sm:self-auto"
                  >
                    <span>Lihat Semua 11 Produk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Featured Products Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white shadow-xs">
                              {prod.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-emerald-800 font-semibold">
                            Akad: {prod.akad}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {prod.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          Lihat Detail
                        </button>
                        <button
                          onClick={() => setApplyData({ product: prod, calculation: null })}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          Ajukan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Quick Calculator Teaser Section */}
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 max-w-xl relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/20">
                    <Calculator className="w-3.5 h-3.5" />
                    Kalkulator Pembiayaan Syariah
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black">
                    Hitung Estimasi Angsuran Anda
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Ketahui perkiraan angsuran bulanan, margin tetap tanpa riba, dan tenor fleksibel sesuai kemampuan finansial usaha Anda.
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('calculator')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Buka Halaman Kalkulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 5. Sekilas Sejarah & Profil Koperasi */}
              <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Sejak 1995 di Cirebon
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                      Siapa Kami? KSPPS PMA
                    </h3>
                  </div>

                  <button
                    onClick={() => navigateTo('about')}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                  >
                    <span>Baca Profil Lengkap &amp; Pengurus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/60 space-y-2">
                    <strong className="text-emerald-950 text-base font-extrabold block">Visi Koperasi</strong>
                    <p>Membangun ekonomi umat melalui pemberdayaan sektor riil, edukasi bebas riba, dan gotong royong.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <strong className="text-slate-900 text-base font-extrabold block">Perjalanan 30 Tahun</strong>
                    <p>Bermula dari kelompok penjahit desa Bamabupa 1995 hingga berkembang melayani 5.000+ anggota aktif.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100/60 space-y-2">
                    <strong className="text-teal-950 text-base font-extrabold block">Pengawasan Syariah</strong>
                    <p>Seluruh akad simpanan dan pembiayaan dipantau ketat oleh Dewan Pengawas Syariah resmi DSN-MUI.</p>
                  </div>
                </div>
              </section>

              {/* 6. Laporan Grafik & Tabel Keuangan (2021 - 2025 Sesuai Buku PMA) */}
              <FinancialReportSection data={financialReports} />

              {/* 6.5 Daftar Legalitas Resmi KSPPS PMA */}
              <LegalitySection legality={legality} />

              {/* 7. Bidang Spiritual dan Sosial (Kegiatan Rutin & ZIS/Pendidikan) */}
              <SpiritualSocialSection data={spiritualSocial} />

              {/* 7.5 Layanan Pembayaran, Pembelian & Lainnya */}
              <PaymentServicesSection />

              {/* 8. Statistik Pengunjung Website Resmi */}
              <VisitorStatsWidget stats={visitorStats} />

              {/* 9. Promo & Berita Carousel (BRI Style) */}
              <NewsPromoSection
                articles={articles}
                onArticleView={handleArticleView}
              />

              {/* 10. Testimoni & Ulasan Anggota Resmi */}
              <TestimonialsSection testimonials={testimonials} />

              {/* 11. Kontak Cabang Quick Overview Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Jaringan Layanan Cirebon
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black">
                    Memiliki 3 Kantor Cabang Siap Melayani Anda
                  </h4>
                  <p className="text-xs text-slate-400">
                    Cabang Mertapada Kulon, Pasar Celancang, dan Gunung Jati siap membantu kebutuhan Anda.
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('branches')}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Lihat Lokasi &amp; Kontak Cabang</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= PAGE 2: PRODUK & LAYANAN ================= */}
        {currentPage === 'products' && (
          <div>
            <PageHeader
              title="Produk & Layanan Syariah"
              subtitle="Pilihan lengkap tabungan syariah amanah, pinjaman modal usaha mikro bebas riba, dan pembiayaan kepemilikan rumah impian."
              breadcrumb="Produk & Layanan"
              onHomeClick={() => navigateTo('home')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
              <ProductsSection
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onViewDetail={(prod) => setSelectedProduct(prod)}
                onApplyProduct={(prod) => setApplyData({ product: prod, calculation: null })}
              />
            </div>
          </div>
        )}

        {/* ================= PAGE 3: SIMULASI PINJAMAN (KALKULATOR) ================= */}
        {currentPage === 'calculator' && (
          <div>
            <PageHeader
              title="Kalkulator Pembiayaan Syariah"
              subtitle="Simulasikan perkiraan angsuran bulanan, plafon, dan jangka waktu pembiayaan dengan margin tetap transparan tanpa biaya tersembunyi."
              breadcrumb="Simulasi Pinjaman"
              onHomeClick={() => navigateTo('home')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
              <LoanCalculator
                onApplyLoan={(calc) => setApplyData({ product: null, calculation: calc })}
              />
            </div>
          </div>
        )}

        {/* ================= PAGE 4: TENTANG KAMI ================= */}
        {currentPage === 'about' && (
          <div>
            <PageHeader
              title="Tentang KSPPS PMA"
              subtitle="Sejarah perjalanan 30 tahun membangun ekonomi umat di Cirebon, visi misi keumatan, dan profil lengkap dewan pengurus serta pengawas syariah."
              breadcrumb="Tentang Kami"
              onHomeClick={() => navigateTo('home')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
              <AboutSection
                team={team}
                onOpenCv={(member) => setSelectedMemberCv(member)}
              />
            </div>
          </div>
        )}

        {/* ================= PAGE 5: BERITA & PROMO ================= */}
        {currentPage === 'news' && (
          <div>
            <PageHeader
              title="Berita & Promo Terbaru"
              subtitle="Dapatkan informasi terkini mengenai kegiatan koperasi, program pembiayaan promo margin ringan, dan edukasi literasi keuangan syariah."
              breadcrumb="Berita & Promo"
              onHomeClick={() => navigateTo('home')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
              <NewsPromoSection
                articles={articles}
                onArticleView={handleArticleView}
              />
            </div>
          </div>
        )}

        {/* ================= PAGE 6: KANTOR CABANG ================= */}
        {currentPage === 'branches' && (
          <div>
            <PageHeader
              title="Jaringan Kantor Cabang & Kontak"
              subtitle="Informasi alamat kantor, nomor telepon/WhatsApp resmi, jam operasional, dan lokasi Google Maps 3 kantor cabang KSPPS PMA di Cirebon."
              breadcrumb="Kantor Cabang"
              onHomeClick={() => navigateTo('home')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
              <BranchContactSection
                branches={branches}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <Footer
        onNavClick={navigateTo}
        openAdmin={handleOpenAdmin}
      />

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        activeTab={currentPage}
        setActiveTab={navigateTo}
      />

      {/* MODALS */}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onApply={(prod) => {
            setSelectedProduct(null);
            setApplyData({ product: prod, calculation: null });
          }}
        />
      )}

      {/* Apply Loan / Savings Modal */}
      {applyData && (
        <ApplyModal
          product={applyData.product}
          calculation={applyData.calculation}
          branches={branches}
          onClose={() => setApplyData(null)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* CV Detail Modal for Founders & Board Members */}
      {selectedMemberCv && (
        <CvModal
          member={selectedMemberCv}
          onClose={() => setSelectedMemberCv(null)}
        />
      )}

      {/* PWA Install Prompt & Offline Indicator */}
      <PWAInstallPrompt />

    </div>
  );
}
