import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  Image as ImageIcon, 
  Newspaper, 
  FileText, 
  MessageSquare, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  X, 
  Phone, 
  ExternalLink, 
  RefreshCw, 
  ArrowLeft, 
  Eye, 
  Save, 
  DollarSign,
  Building2,
  Video,
  Upload,
  Layers,
  Search,
  Check,
  AlertCircle,
  Smartphone,
  Menu,
  ChevronRight,
  Filter,
  Send,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  LogOut,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  BarChart3,
  Moon,
  Globe,
  Activity,
  Copy,
  Laptop,
  Compass,
  FileCheck,
  Briefcase,
  GraduationCap,
  Award,
  HeartHandshake,
  Coins,
  Scale,
  BadgeCheck,
  Star,
  MessageSquareHeart
} from 'lucide-react';
import { formatRupiah, formatNumber, createWaLink, uploadFileToServer, saveDataToServer } from '../utils/helpers';

export default function AdminDashboard({
  banners,
  setBanners,
  articles,
  setArticles,
  applications,
  setApplications,
  contactMessages,
  setContactMessages,
  team,
  setTeam,
  branches,
  setBranches,
  products,
  setProducts,
  financialReports,
  setFinancialReports,
  spiritualSocial,
  setSpiritualSocial,
  visitorStats,
  setVisitorStats,
  legality = [],
  setLegality,
  testimonials = [],
  setTestimonials,
  onClose,
  onViewWebsite,
  onLogout,
  onResetData
}) {
  // Tabs: 'visitorStats', 'financial', 'spiritualSocial', 'products', 'team', 'applications', 'messages', 'banners', 'articles', 'branches'
  const [activeTab, setActiveTab] = useState('visitorStats');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [articleTypeFilter, setArticleTypeFilter] = useState('all');
  const [messageStatusFilter, setMessageStatusFilter] = useState('all');
  const [activeFinCategory, setActiveFinCategory] = useState('aktiva');

  // Dynamic years from financial data
  const years = financialReports?.years || ['2021', '2022', '2023', '2024', '2025'];

  // File Upload states (saves to folder /uploads/)
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // 1. BANNER FORM STATE
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    tagline: '',
    mediaType: 'image', // 'image' or 'video'
    imageUrl: './banner1.png',
    videoUrl: '',
    link: '#products',
    ctaText: 'Pelajari Selengkapnya',
    active: true,
  });

  // 2. PRODUCT FORM STATE (COMPLETE WITH ALL FIELDS)
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    fullName: '',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    akad: 'Mudharabah Muthlaqah',
    shortDesc: '',
    fullDesc: '',
    badge: 'Terpopuler',
    popular: true,
    minDeposit: 'Rp 20.000',
    margin: '1.2% / bln',
    tenor: '12 - 36 Bulan',
    maxLoan: 'Rp 50.000.000',
    benefits: ['Bagi hasil kompetitif sesuai syariah', 'Bebas biaya administrasi', 'Penarikan mudah di semua kantor cabang'],
    requirements: ['Fotokopi KTP / Identitas', 'Mengisi formulir pembukaan rekening', 'Menjadi anggota aktif KSPPS PMA'],
    contactPerson: {
      name: 'Layanan Nasabah PMA',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
  });

  // 3. ARTICLE / PROMO FORM STATE
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    type: 'promo',
    badge: 'Promo Baru',
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    date: new Date().toISOString().split('T')[0],
    author: 'Admin PMA',
    active: true,
  });

  // 4. BRANCH FORM STATE
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({
    name: '',
    tagline: 'Kantor Cabang Layanan',
    address: '',
    phone: '0813-1262-9486',
    email: 'cabang@ksppspma.co.id',
    operationalHours: 'Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 14.00 WIB',
    mapsUrl: 'https://maps.google.com',
    isPusat: false,
  });

  // 5. TEAM & CV FORM STATE (COMPLETE WITH ALL CV DETAILS)
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: 'Pengurus Koperasi',
    title: 'Jabatan & Spesialisasi',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: '',
    quote: '',
    cv: {
      birthPlace: 'Cirebon',
      pendidikan: ['S1 Ekonomi Syariah'],
      pengalaman: ['Pengurus Koperasi PMA'],
      sertifikasi: ['Sertifikasi Pengelola Koperasi Syariah'],
      penghargaan: ['Tokoh Penggerak Koperasi']
    }
  });

  // 6. FINANCIAL REPORT ITEM EDIT STATE
  const [editingFinItem, setEditingFinItem] = useState(null);
  const [finForm, setFinForm] = useState({
    name: '',
    group: '',
    color: '#10b981',
    values: {}
  });

  // 7. LEGALITY FORM & EDIT STATE
  const [editingLegality, setEditingLegality] = useState(null);
  const [legalityForm, setLegalityForm] = useState({
    letter: '',
    title: '',
    number: '',
    category: '',
    issuer: '',
    date: '',
    description: '',
    badge: '',
    active: true
  });

  // 8. TESTIMONIAL FORM & EDIT STATE
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    avatar: '',
    rating: 5,
    date: '',
    branch: '',
    badge: 'Anggota Aktif',
    content: '',
    productUsed: '',
    active: true
  });

  // Direct File Uploader to /uploads/ folder
// Direct File Uploader to /uploads/ folder
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('Ukuran file maksimal 25MB.');
      e.target.value = '';
      return;
    }

    setIsUploading(true);
    setUploadNotice({ type: 'info', text: `Sedang mengunggah ${file.name} ke folder uploads...` });

    try {
      const result = await uploadFileToServer(file);
      callback(result.url);
      setUploadNotice({
        type: 'success',
        text: `✓ File ${result.filename} berhasil disimpan ke folder uploads! (${result.url})`
      });
      setTimeout(() => setUploadNotice(null), 5000);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadNotice({
        type: 'error',
        text: 'Gagal mengunggah file: ' + err.message
      });
      setTimeout(() => setUploadNotice(null), 5000);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Copy direct admin link
  const handleCopyAdminLink = () => {
    const link = `${window.location.origin}${window.location.pathname.replace(/\/dist\/?$/, '')}/adminkspps`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // ================= BANNER CRUD =================
  const handleSaveBanner = (bData) => {
    let updated;
    if (editingBanner && editingBanner.id) {
      updated = banners.map(b => b.id === editingBanner.id ? { ...bData, id: editingBanner.id } : b);
    } else {
      updated = [...banners, { ...bData, id: 'banner-' + Date.now() }];
    }
    setBanners(updated);
    saveDataToServer({ key: 'banners', data: updated });
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id) => {
    if (confirm('Hapus banner ini?')) {
      const updated = banners.filter(b => b.id !== id);
      setBanners(updated);
      saveDataToServer({ key: 'banners', data: updated });
    }
  };

  const handleToggleBanner = (id) => {
    const updated = banners.map(b => b.id === id ? { ...b, active: !b.active } : b);
    setBanners(updated);
    saveDataToServer({ key: 'banners', data: updated });
  };

  // ================= PRODUCT CRUD (COMPLETE) =================
  const handleSaveProduct = (pData) => {
    const catLabel = pData.category === 'simpanan' 
      ? 'Produk Simpanan' 
      : pData.category === 'pinjaman' 
      ? 'Produk Pinjaman' 
      : 'Produk Pembiayaan';

    const cleanData = { 
      ...pData, 
      categoryLabel: catLabel,
      contactPerson: {
        ...pData.contactPerson,
        waNumber: (pData.contactPerson?.phone || '').replace(/[^0-9]/g, '')
      }
    };

    let updated;
    if (editingProduct && editingProduct.id) {
      updated = products.map(p => p.id === editingProduct.id ? { ...cleanData, id: editingProduct.id } : p);
    } else {
      updated = [...products, { ...cleanData, id: 'prod-' + Date.now() }];
    }
    setProducts(updated);
    saveDataToServer({ key: 'products', data: updated });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Hapus produk ini dari katalog?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveDataToServer({ key: 'products', data: updated });
    }
  };

  // ================= ARTICLE CRUD =================
  const handleSaveArticle = (aData) => {
    let updated;
    if (editingArticle && editingArticle.id) {
      updated = articles.map(a => a.id === editingArticle.id ? { ...aData, id: editingArticle.id } : a);
    } else {
      updated = [{ ...aData, id: 'art-' + Date.now(), views: 1 }, ...articles];
    }
    setArticles(updated);
    saveDataToServer({ key: 'articles', data: updated });
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id) => {
    if (confirm('Hapus berita/promo ini?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveDataToServer({ key: 'articles', data: updated });
    }
  };

  // ================= BRANCH CRUD =================
  const handleSaveBranch = (bData) => {
    let updated;
    if (editingBranch && editingBranch.id) {
      updated = branches.map(b => b.id === editingBranch.id ? { ...bData, id: editingBranch.id } : b);
    } else {
      updated = [...branches, { ...bData, id: 'branch-' + Date.now() }];
    }
    setBranches(updated);
    saveDataToServer({ key: 'branches', data: updated });
    setEditingBranch(null);
  };

  const handleDeleteBranch = (id) => {
    if (confirm('Hapus kantor cabang ini?')) {
      const updated = branches.filter(b => b.id !== id);
      setBranches(updated);
      saveDataToServer({ key: 'branches', data: updated });
    }
  };

  // ================= TEAM & CV CRUD (COMPLETE) =================
  const handleSaveTeam = (tData) => {
    let updated;
    if (editingTeamMember && editingTeamMember.id) {
      updated = team.map(m => m.id === editingTeamMember.id ? { ...tData, id: editingTeamMember.id } : m);
    } else {
      updated = [...team, { ...tData, id: 'team-' + Date.now() }];
    }
    setTeam(updated);
    saveDataToServer({ key: 'team', data: updated });
    setEditingTeamMember(null);
  };

  const handleDeleteTeam = (id) => {
    if (confirm('Hapus data pengurus/CV ini?')) {
      const updated = team.filter(m => m.id !== id);
      setTeam(updated);
      saveDataToServer({ key: 'team', data: updated });
    }
  };

  // ================= FINANCIAL REPORT CRUD =================
  const handleSaveFinItem = (categoryKey, itemData) => {
    if (!financialReports) return;
    const catData = financialReports[categoryKey] || { items: [] };
    let updatedItems;

    if (editingFinItem && editingFinItem.id) {
      updatedItems = catData.items.map(it => it.id === editingFinItem.id ? { ...itemData, id: editingFinItem.id } : it);
    } else {
      updatedItems = [...catData.items, { ...itemData, id: `${categoryKey}-${Date.now()}` }];
    }

    const updatedFinReports = {
      ...financialReports,
      [categoryKey]: {
        ...catData,
        items: updatedItems
      }
    };

    setFinancialReports(updatedFinReports);
    saveDataToServer({ key: 'financialReports', data: updatedFinReports });
    setEditingFinItem(null);
  };

  const handleDeleteFinItem = (categoryKey, itemId) => {
    if (confirm('Hapus baris data keuangan ini?')) {
      const catData = financialReports[categoryKey] || { items: [] };
      const updatedItems = catData.items.filter(it => it.id !== itemId);
      const updatedFinReports = {
        ...financialReports,
        [categoryKey]: {
          ...catData,
          items: updatedItems
        }
      };
      setFinancialReports(updatedFinReports);
      saveDataToServer({ key: 'financialReports', data: updatedFinReports });
    }
  };

  // ================= ADD / DELETE YEAR =================
  const handleAddYear = () => {
    if (!financialReports) return;
    const nextYear = String(Number(years[years.length - 1]) + 1);
    if (years.includes(nextYear)) {
      alert(`Tahun ${nextYear} sudah ada.`);
      return;
    }
    if (!confirm(`Tambahkan tahun buku ${nextYear}?`)) return;

    const updatedYears = [...years, nextYear];
    const updatedFinReports = { ...financialReports, years: updatedYears };

    const categories = ['aktiva', 'pasiva', 'permodalan', 'usahaKeuangan', 'keanggotaan'];
    categories.forEach(catKey => {
      if (updatedFinReports[catKey] && updatedFinReports[catKey].items) {
        updatedFinReports[catKey] = {
          ...updatedFinReports[catKey],
          items: updatedFinReports[catKey].items.map(item => ({
            ...item,
            values: { ...item.values, [nextYear]: 0 }
          }))
        };
      }
    });

    setFinancialReports(updatedFinReports);
    saveDataToServer({ key: 'financialReports', data: updatedFinReports });
    alert(`✓ Tahun buku ${nextYear} berhasil ditambahkan!`);
  };

  const handleDeleteYear = () => {
    if (!financialReports || years.length <= 1) return;
    const lastYear = years[years.length - 1];
    if (!confirm(`Hapus tahun buku ${lastYear} beserta semua datanya? Aksi ini tidak bisa dikembalikan.`)) return;

    const updatedYears = years.slice(0, -1);
    const updatedFinReports = { ...financialReports, years: updatedYears };

    const categories = ['aktiva', 'pasiva', 'permodalan', 'usahaKeuangan', 'keanggotaan'];
    categories.forEach(catKey => {
      if (updatedFinReports[catKey] && updatedFinReports[catKey].items) {
        updatedFinReports[catKey] = {
          ...updatedFinReports[catKey],
          items: updatedFinReports[catKey].items.map(item => {
            const newValues = { ...item.values };
            delete newValues[lastYear];
            return { ...item, values: newValues };
          })
        };
      }
    });

    setFinancialReports(updatedFinReports);
    saveDataToServer({ key: 'financialReports', data: updatedFinReports });
    alert(`✓ Tahun buku ${lastYear} berhasil dihapus.`);
  };

  // ================= SPIRITUAL & SOCIAL UPDATE =================
  const handleSaveSpiritualSocial = (updatedData) => {
    setSpiritualSocial(updatedData);
    saveDataToServer({ key: 'spiritualSocial', data: updatedData });
    alert('✓ Data Bidang Spiritual dan Sosial berhasil diperbarui!');
  };

  // ================= LEGALITY CRUD =================
  const handleSaveLegality = (itemData) => {
    let updated;
    if (editingLegality && editingLegality.id) {
      updated = (legality || []).map(l => l.id === editingLegality.id ? { ...itemData, id: editingLegality.id } : l);
    } else {
      const nextLetter = String.fromCharCode(97 + (legality?.length || 0));
      const newItem = {
        ...itemData,
        id: `leg-${Date.now()}`,
        letter: itemData.letter || nextLetter,
        active: itemData.active !== false
      };
      updated = [...(legality || []), newItem];
    }
    setLegality(updated);
    saveDataToServer({ key: 'legality', data: updated });
    setEditingLegality(null);
  };

  const handleDeleteLegality = (id) => {
    if (confirm('Hapus dokumen legalitas ini?')) {
      const updated = (legality || []).filter(l => l.id !== id);
      setLegality(updated);
      saveDataToServer({ key: 'legality', data: updated });
    }
  };

  const handleToggleLegalityActive = (id) => {
    const updated = (legality || []).map(l => l.id === id ? { ...l, active: !l.active } : l);
    setLegality(updated);
    saveDataToServer({ key: 'legality', data: updated });
  };

  // ================= TESTIMONIAL CRUD =================
  const handleSaveTestimonial = (itemData) => {
    let updated;
    if (editingTestimonial && editingTestimonial.id) {
      updated = (testimonials || []).map(t => t.id === editingTestimonial.id ? { ...itemData, id: editingTestimonial.id } : t);
    } else {
      const newItem = {
        ...itemData,
        id: `testi-${Date.now()}`,
        active: itemData.active !== false
      };
      updated = [newItem, ...(testimonials || [])];
    }
    setTestimonials(updated);
    saveDataToServer({ key: 'testimonials', data: updated });
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm('Hapus testimoni anggota ini?')) {
      const updated = (testimonials || []).filter(t => t.id !== id);
      setTestimonials(updated);
      saveDataToServer({ key: 'testimonials', data: updated });
    }
  };

  const handleToggleTestimonialActive = (id) => {
    const updated = (testimonials || []).map(t => t.id === id ? { ...t, active: !t.active } : t);
    setTestimonials(updated);
    saveDataToServer({ key: 'testimonials', data: updated });
  };

  // ================= VISITOR STATS ACTIONS =================
  const handleSimulateVisitor = () => {
    if (!visitorStats) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const updated = {
      ...visitorStats,
      total: (Number(visitorStats.total) || 0) + 15,
      today: (Number(visitorStats.today) || 0) + 15,
      monthly: (Number(visitorStats.monthly) || 0) + 15,
      online: Math.floor(Math.random() * 8 + 8),
      recentLogs: [
        {
          id: Date.now(),
          time: 'Baru saja',
          page: 'Beranda (Home)',
          device: 'Mobile Android',
          ip: `180.${Math.floor(Math.random()*150+100)}.***.***`,
          status: 'Aktif'
        },
        ...(visitorStats.recentLogs || []).slice(0, 9)
      ]
    };
    setVisitorStats(updated);
    saveDataToServer({ key: 'visitorStats', data: updated });
  };

  const handleResetVisitorStats = () => {
    if (confirm('Reset log statistik pengunjung ke nilai awal?')) {
      const reset = {
        ...visitorStats,
        today: 1,
        recentLogs: [
          { id: 1, time: 'Baru saja', page: 'Portal Admin', device: 'Desktop Admin', ip: '127.0.0.1', status: 'Aktif' }
        ]
      };
      setVisitorStats(reset);
      saveDataToServer({ key: 'visitorStats', data: reset });
    }
  };

  // ================= APPLICATION CRUD =================
  const handleUpdateAppStatus = (id, newStatus) => {
    const updated = applications.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setApplications(updated);
    saveDataToServer({ key: 'applications', data: updated });
  };

  const handleDeleteApp = (id) => {
    if (confirm('Hapus berkas pengajuan ini?')) {
      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      saveDataToServer({ key: 'applications', data: updated });
    }
  };

  // ================= MESSAGE CRUD =================
  const handleUpdateMsgStatus = (id, newStatus) => {
    const updated = contactMessages.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg);
    setContactMessages(updated);
    saveDataToServer({ key: 'contactMessages', data: updated });
  };

  const handleDeleteMsg = (id) => {
    if (confirm('Hapus pesan kontak ini?')) {
      const updated = contactMessages.filter(msg => msg.id !== id);
      setContactMessages(updated);
      saveDataToServer({ key: 'contactMessages', data: updated });
    }
  };

  const newAppsCount = applications.filter(a => a.status === 'Baru').length;
  const unreadMsgCount = contactMessages.filter(m => m.status === 'Belum Dibalas').length;

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col text-slate-800 antialiased">
      
      {/* RESPONSIVE FULL ADMIN DASHBOARD CONTAINER */}
      <div className="w-full flex-1 flex flex-col mx-auto bg-slate-100 relative">
        
        {/* ================= TOP NAVBAR HEADER ================= */}
        <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shrink-0 p-3 sm:px-6 shadow-md z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center text-amber-300 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg text-white tracking-tight">
                  Admin KSPPS PMA
                </h1>
                <span className="text-[10px] font-black bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                  PORTAL
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
            <button
              onClick={onViewWebsite || onClose}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Kembali ke Website Utama KSPPS PMA"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Ke Website Utama</span>
            </button>

            <button
              onClick={() => {
                saveDataToServer({
                  banners,
                  products,
                  articles,
                  team,
                  branches,
                  applications,
                  contactMessages,
                  financialReports,
                  spiritualSocial,
                  visitorStats
                });
                alert('✓ Semua data berhasil disinkronkan ke database server!');
              }}
              title="Paksa Sinkronisasi Server"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Keluar dari Admin"
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
          </div>
        </header>

        {/* ================= TABS HORIZONTAL SCROLLER ================= */}
        <div className="bg-slate-900 text-white px-3 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none border-b border-slate-800 shrink-0 text-xs font-bold">
          {[
            { id: 'visitorStats', label: 'Statistik Pengunjung', icon: Activity, count: visitorStats?.today },
            { id: 'financial', label: 'Laporan Grafik & Keuangan', icon: BarChart3 },
            { id: 'spiritualSocial', label: 'Bidang Spiritual & Sosial', icon: Moon },
            { id: 'legality', label: 'Daftar Legalitas (CRUD)', icon: Scale, count: legality?.length },
            { id: 'testimonials', label: 'Testimoni Anggota (CRUD)', icon: Star, count: testimonials?.length },
            { id: 'products', label: 'Produk & Layanan (CRUD)', icon: DollarSign, count: products.length },
            { id: 'team', label: 'Dewan Pengurus & CV (CRUD)', icon: Users, count: team.length },
            { id: 'applications', label: 'Pengajuan Masuk', icon: FileText, count: newAppsCount, alert: newAppsCount > 0 },
            { id: 'messages', label: 'Pesan Masuk', icon: MessageSquare, count: unreadMsgCount, alert: unreadMsgCount > 0 },
            { id: 'banners', label: 'Banner & Video', icon: ImageIcon, count: banners.length },
            { id: 'articles', label: 'Berita & Promo (CRUD)', icon: Newspaper, count: articles.length },
            { id: 'branches', label: 'Kantor Cabang (CRUD)', icon: Building2, count: branches.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-amber-300' : tab.alert ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {uploadNotice && (
          <div className={`p-2.5 px-4 text-xs font-bold flex items-center gap-2 shrink-0 ${
            uploadNotice.type === 'success' ? 'bg-emerald-600 text-white' : uploadNotice.type === 'error' ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate flex-1">{uploadNotice.text}</span>
          </div>
        )}

        {/* ================= TAB CONTENTS AREA ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* 1. TAB: STATISTIK PENGUNJUNG */}
          {activeTab === 'visitorStats' && visitorStats && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Statistik Live Pengunjung</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Laporan Kunjungan Portal KSPPS PMA
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Memantau statistik pengunjung beranda, total hits, pembagian perangkat, dan aktivitas real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateVisitor}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Simulasi Kunjungan</span>
                  </button>
                  <button
                    onClick={handleResetVisitorStats}
                    className="p-2 rounded-xl border border-slate-300 text-slate-600 hover:text-rose-600 text-xs transition-colors cursor-pointer"
                    title="Reset statistik"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Hari Ini</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-1">
                    {formatNumber(visitorStats.today || 0)}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Kunjungan per hari ini</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Bulan Ini</span>
                  <div className="text-2xl sm:text-3xl font-black text-teal-700 font-mono mt-1">
                    {formatNumber(visitorStats.monthly || 0)}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Total bulan berjalan</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Kunjungan</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
                    {formatNumber(visitorStats.total || 0)}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Akumulasi seluruh waktu</span>
                </div>

                <div className="bg-emerald-900 text-white p-5 rounded-2xl border border-emerald-800 shadow-md">
                  <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Sedang Online</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1">
                    {visitorStats.online || 6} Sesi
                  </div>
                  <span className="text-[11px] text-emerald-200 mt-1 block">Aktif di website saat ini</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Grafik Kunjungan 7 Hari Terakhir</span>
                  </h4>

                  <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
                    {(visitorStats.dailyHistory || []).map((day, idx) => {
                      const maxV = Math.max(...(visitorStats.dailyHistory || []).map(d => d.visits), 10);
                      const h = Math.round((day.visits / maxV) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                          <span className="text-[10px] font-bold text-slate-600 mb-1 group-hover:text-emerald-700">
                            {day.visits}
                          </span>
                          <div
                            style={{ height: `${Math.max(12, h)}%` }}
                            className="w-full max-w-[32px] bg-emerald-600 hover:bg-emerald-500 rounded-t-md transition-all duration-300"
                          />
                          <span className="text-[10px] font-semibold text-slate-500 mt-1.5">
                            {day.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-teal-600" />
                    <span>Distribusi Perangkat &amp; Browser</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Smartphone / Mobile</span>
                        <span>{visitorStats.devices?.mobile || 68}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${visitorStats.devices?.mobile || 68}%` }} className="h-full bg-emerald-600 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Laptop / Komputer Desktop</span>
                        <span>{visitorStats.devices?.desktop || 28}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${visitorStats.devices?.desktop || 28}%` }} className="h-full bg-blue-600 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Tablet</span>
                        <span>{visitorStats.devices?.tablet || 4}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${visitorStats.devices?.tablet || 4}%` }} className="h-full bg-amber-500 rounded-full" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600">
                      <span>Browser Teratas:</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100">Chrome (72%)</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100">Safari (15%)</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100">Edge (8%)</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100">Firefox (5%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span>Log Aktivitas Kunjungan Terbaru</span>
                </h4>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 font-bold">Waktu</th>
                        <th className="py-2.5 px-3 font-bold">Halaman Diakses</th>
                        <th className="py-2.5 px-3 font-bold">Perangkat</th>
                        <th className="py-2.5 px-3 font-bold">IP Samaran</th>
                        <th className="py-2.5 px-3 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(visitorStats.recentLogs || []).map((log, idx) => (
                        <tr key={log.id || idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-semibold text-slate-500">{log.time}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{log.page}</td>
                          <td className="py-2.5 px-3 text-slate-600">{log.device}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{log.ip}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. TAB: LAPORAN KEUANGAN */}
          {activeTab === 'financial' && financialReports && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kelola Data Grafik &amp; Laporan Keuangan</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Buku Laporan Kinerja ({years[0]} - {years[years.length - 1]})
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ubah angka tahun buku, tambah pos keuangan baru, dan simpan langsung ke website publik.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handleAddYear}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    title={`Tambah tahun ${Number(years[years.length - 1]) + 1}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>+ Tahun {Number(years[years.length - 1]) + 1}</span>
                  </button>
                  {years.length > 1 && (
                    <button
                      onClick={handleDeleteYear}
                      className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                      title={`Hapus tahun ${years[years.length - 1]}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus {years[years.length - 1]}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const emptyValues = {};
                      years.forEach(yr => { emptyValues[yr] = 0; });
                      setFinForm({
                        name: '',
                        group: '',
                        color: '#10b981',
                        values: emptyValues
                      });
                      setEditingFinItem({ isNew: true });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Baris Data</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
                {[
                  { id: 'aktiva', label: '1. Aktiva (Aset)' },
                  { id: 'pasiva', label: '2. Pasiva' },
                  { id: 'permodalan', label: '3. Permodalan' },
                  { id: 'usahaKeuangan', label: '4. Usaha & Keuangan' },
                  { id: 'keanggotaan', label: '5. Keanggotaan' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveFinCategory(c.id)}
                    className={`px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                      activeFinCategory === c.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {financialReports[activeFinCategory] && (
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        {financialReports[activeFinCategory].title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {financialReports[activeFinCategory].subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
                      Satuan: {financialReports[activeFinCategory].unit}
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3 font-bold w-10 text-center">NO</th>
                          <th className="py-2.5 px-4 font-bold min-w-[160px]">URAIAN POS</th>
                          {years.map(yr => (
                            <th key={yr} className="py-2.5 px-3 font-bold text-right">{yr}</th>
                          ))}
                          <th className="py-2.5 px-3 font-bold text-center w-24">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(financialReports[activeFinCategory].items || []).map((it, idx) => (
                          <tr key={it.id} className="hover:bg-slate-50">
                            <td className="py-3 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: it.color || '#10b981' }} />
                                <div>
                                  <span>{it.name}</span>
                                  {it.group && <span className="text-[10px] text-slate-500 block">({it.group})</span>}
                                </div>
                              </div>
                            </td>
                            {years.map(yr => (
                              <td key={yr} className="py-3 px-3 text-right font-mono font-medium">
                                {financialReports[activeFinCategory].unit === 'Rp' ? formatRupiah(it.values?.[yr]) : formatNumber(it.values?.[yr])}
                              </td>
                            ))}
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingFinItem(it);
                                    setFinForm({
                                      name: it.name || '',
                                      group: it.group || '',
                                      color: it.color || '#10b981',
                                      values: { ...(it.values || {}) }
                                    });
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                  title="Edit Nilai"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteFinItem(activeFinCategory, it.id)}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. TAB: SPIRITUAL & SOSIAL */}
          {activeTab === 'spiritualSocial' && spiritualSocial && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <Moon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kelola Konten Syariah &amp; Keumatan</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Bidang Spiritual Dan Sosial
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ubah deskripsi kegiatan spiritual keagamaan dan program santunan, zakat, serta rekening Perambabulan Pintar.
                  </p>
                </div>

                <button
                  onClick={() => handleSaveSpiritualSocial(spiritualSocial)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-emerald-700" />
                  <span>1. Spiritual (Keagamaan)</span>
                </h4>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Pembinaan Spiritual:</label>
                  <textarea
                    rows={2}
                    value={spiritualSocial.spiritual?.desc || ''}
                    onChange={(e) => setSpiritualSocial({
                      ...spiritualSocial,
                      spiritual: { ...spiritualSocial.spiritual, desc: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Daftar Kegiatan Rutin:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(spiritualSocial.spiritual?.activities || []).map((act, idx) => (
                      <div key={act.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={act.name}
                            onChange={(e) => {
                              const updatedActs = [...spiritualSocial.spiritual.activities];
                              updatedActs[idx].name = e.target.value;
                              setSpiritualSocial({
                                ...spiritualSocial,
                                spiritual: { ...spiritualSocial.spiritual, activities: updatedActs }
                              });
                            }}
                            className="flex-1 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={act.desc}
                          onChange={(e) => {
                            const updatedActs = [...spiritualSocial.spiritual.activities];
                            updatedActs[idx].desc = e.target.value;
                            setSpiritualSocial({
                              ...spiritualSocial,
                              spiritual: { ...spiritualSocial.spiritual, activities: updatedActs }
                            });
                          }}
                          className="w-full px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] bg-white text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  <span>2. Sosial Dan Pendidikan</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(spiritualSocial.sosial?.programs || []).map((prog, pIdx) => (
                    <div key={prog.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <input
                            type="text"
                            value={prog.name}
                            onChange={(e) => {
                              const updatedProgs = [...spiritualSocial.sosial.programs];
                              updatedProgs[pIdx].name = e.target.value;
                              setSpiritualSocial({
                                ...spiritualSocial,
                                sosial: { ...spiritualSocial.sosial, programs: updatedProgs }
                              });
                            }}
                            className="font-black text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 w-full"
                          />
                        </div>

                        <input
                          type="text"
                          value={prog.badge || ''}
                          placeholder="Badge label"
                          onChange={(e) => {
                            const updatedProgs = [...spiritualSocial.sosial.programs];
                            updatedProgs[pIdx].badge = e.target.value;
                            setSpiritualSocial({
                              ...spiritualSocial,
                              sosial: { ...spiritualSocial.sosial, programs: updatedProgs }
                            });
                          }}
                          className="text-[11px] text-emerald-800 font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200 w-full"
                        />

                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Poin Program:</span>
                          {(prog.points || []).map((pt, ptIdx) => (
                            <textarea
                              key={ptIdx}
                              rows={2}
                              value={pt}
                              onChange={(e) => {
                                const updatedProgs = [...spiritualSocial.sosial.programs];
                                updatedProgs[pIdx].points[ptIdx] = e.target.value;
                                setSpiritualSocial({
                                  ...spiritualSocial,
                                  sosial: { ...spiritualSocial.sosial, programs: updatedProgs }
                                });
                              }}
                              className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>

                      {prog.rekening !== undefined && (
                        <div className="pt-2 border-t border-slate-200 space-y-1">
                          <label className="text-[10px] font-bold text-emerald-900 block">Nomor Rekening Donasi:</label>
                          <input
                            type="text"
                            value={prog.rekening}
                            onChange={(e) => {
                              const updatedProgs = [...spiritualSocial.sosial.programs];
                              updatedProgs[pIdx].rekening = e.target.value;
                              setSpiritualSocial({
                                ...spiritualSocial,
                                sosial: { ...spiritualSocial.sosial, programs: updatedProgs }
                              });
                            }}
                            className="w-full px-2 py-1 bg-white font-mono font-bold text-xs rounded-lg border border-slate-200 text-emerald-950"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. TAB: LEGALITAS */}
          {activeTab === 'legality' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <Scale className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Regulasi &amp; Izin Usaha Koperasi</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Kelola Daftar Legalitas Resmi ({legality?.length || 0} Dokumen)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ubah nomor SK/akta, tambah dokumen legalitas baru, nonaktifkan, atau hapus dokumen.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const nextLetter = String.fromCharCode(97 + (legality?.length || 0));
                    setLegalityForm({
                      letter: nextLetter,
                      title: '',
                      number: '',
                      category: 'Badan Hukum',
                      issuer: '',
                      date: '',
                      description: '',
                      badge: '',
                      active: true
                    });
                    setEditingLegality({ isNew: true });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Dokumen Legalitas</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-700">
                    Daftar Dokumen Legalitas &amp; Sertifikasi
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari akta / nomor SK..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3 font-bold w-12 text-center">HURUF</th>
                        <th className="py-3 px-4 font-bold min-w-[200px]">JUDUL DOKUMEN</th>
                        <th className="py-3 px-4 font-bold min-w-[220px]">NOMOR REGISTRASI / SK</th>
                        <th className="py-3 px-3 font-bold">KATEGORI</th>
                        <th className="py-3 px-3 font-bold">PENERBIT &amp; TANGGAL</th>
                        <th className="py-3 px-3 font-bold text-center w-20">STATUS</th>
                        <th className="py-3 px-3 font-bold text-center w-24">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(legality || [])
                        .filter(l => {
                          if (!searchQuery.trim()) return true;
                          const q = searchQuery.toLowerCase();
                          return (
                            l.title?.toLowerCase().includes(q) ||
                            l.number?.toLowerCase().includes(q) ||
                            l.category?.toLowerCase().includes(q) ||
                            l.issuer?.toLowerCase().includes(q)
                          );
                        })
                        .map((l, idx) => (
                          <tr key={l.id || idx} className="hover:bg-slate-50">
                            <td className="py-3 px-3 text-center">
                              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs inline-flex items-center justify-center uppercase">
                                {l.letter || String.fromCharCode(97 + idx)}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-slate-900 block">{l.title}</span>
                              {l.description && (
                                <span className="text-[11px] text-slate-500 block line-clamp-1">{l.description}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-slate-800">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate max-w-[260px]">{l.number}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(l.number);
                                    alert(`✓ Nomor ${l.number} berhasil disalin!`);
                                  }}
                                  className="p-1 rounded text-slate-400 hover:text-emerald-700"
                                  title="Salin nomor"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                                {l.category || l.badge || 'Legalitas'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-600">
                              <span className="font-semibold block">{l.issuer || '-'}</span>
                              <span className="text-[10px] text-slate-400 block">{l.date || '-'}</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleLegalityActive(l.id)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                                  l.active !== false
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {l.active !== false ? 'Aktif' : 'Nonaktif'}
                              </button>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingLegality(l);
                                    setLegalityForm({
                                      letter: l.letter || '',
                                      title: l.title || '',
                                      number: l.number || '',
                                      category: l.category || '',
                                      issuer: l.issuer || '',
                                      date: l.date || '',
                                      description: l.description || '',
                                      badge: l.badge || '',
                                      active: l.active !== false
                                    });
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                  title="Edit Dokumen"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLegality(l.id)}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="Hapus Dokumen"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. TAB: TESTIMONI */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Ulasan &amp; Kepuasan Anggota</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Kelola Testimoni &amp; Ulasan Anggota ({testimonials?.length || 0})
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tambah ulasan anggota baru, atur foto pemberi rating, bintang ulasan, produk yang digunakan, dan kelola status tampil.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setTestimonialForm({
                      name: '',
                      role: '',
                      avatar: '',
                      rating: 5,
                      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                      branch: 'Cabang Celancang',
                      badge: 'Anggota Aktif',
                      content: '',
                      productUsed: 'Pembiayaan Modal Kerja Syariah',
                      active: true
                    });
                    setEditingTestimonial({ isNew: true });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Testimoni Baru</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-700">
                    Daftar Ulasan &amp; Rating Anggota
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari nama anggota / ulasan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3 font-bold w-12 text-center">FOTO</th>
                        <th className="py-3 px-4 font-bold min-w-[180px]">ANGGOTA &amp; USAHA</th>
                        <th className="py-3 px-3 font-bold w-28 text-center">RATING</th>
                        <th className="py-3 px-4 font-bold min-w-[240px]">ISI ULASAN / TESTIMONI</th>
                        <th className="py-3 px-3 font-bold">PRODUK &amp; CABANG</th>
                        <th className="py-3 px-3 font-bold text-center w-20">STATUS</th>
                        <th className="py-3 px-3 font-bold text-center w-24">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(testimonials || [])
                        .filter(t => {
                          if (!searchQuery.trim()) return true;
                          const q = searchQuery.toLowerCase();
                          return (
                            t.name?.toLowerCase().includes(q) ||
                            t.role?.toLowerCase().includes(q) ||
                            t.content?.toLowerCase().includes(q) ||
                            t.productUsed?.toLowerCase().includes(q)
                          );
                        })
                        .map((t, idx) => (
                          <tr key={t.id || idx} className="hover:bg-slate-50">
                            <td className="py-3 px-3 text-center">
                              <img
                                src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                                alt={t.name}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
                                }}
                                className="w-10 h-10 rounded-full object-cover border border-emerald-400 mx-auto"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-slate-900 block">{t.name}</span>
                              <span className="text-[11px] text-slate-500 block leading-tight">{t.role}</span>
                              {t.badge && (
                                <span className="inline-block text-[9px] font-bold px-2 py-0.2 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 mt-1">
                                  {t.badge}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < (t.rating || 5)
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'fill-slate-200 text-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-600 block mt-0.5">
                                {t.rating || 5}.0 / 5
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-700 italic">
                              <p className="line-clamp-2 text-xs">"{t.content}"</p>
                              <span className="text-[10px] text-slate-400 not-italic block mt-1">
                                {t.date || '-'}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-semibold text-emerald-900 block">{t.productUsed || 'Layanan Syariah'}</span>
                              <span className="text-[11px] text-slate-500 block">{t.branch || '-'}</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleTestimonialActive(t.id)}
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                                  t.active !== false
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {t.active !== false ? 'Aktif' : 'Nonaktif'}
                              </button>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingTestimonial(t);
                                    setTestimonialForm({
                                      name: t.name || '',
                                      role: t.role || '',
                                      avatar: t.avatar || '',
                                      rating: t.rating || 5,
                                      date: t.date || '',
                                      branch: t.branch || '',
                                      badge: t.badge || 'Anggota Aktif',
                                      content: t.content || '',
                                      productUsed: t.productUsed || '',
                                      active: t.active !== false
                                    });
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                  title="Edit Testimoni"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTestimonial(t.id)}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="Hapus Testimoni"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 6. TAB: PRODUK & LAYANAN */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Katalog Produk Syariah</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Kelola Produk Simpanan &amp; Pembiayaan
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tambah produk baru, edit akad, fitur keunggulan, syarat pengajuan, foto produk, dan tampilkan di Beranda.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setProductForm({
                      name: '',
                      fullName: '',
                      category: 'simpanan',
                      categoryLabel: 'Produk Simpanan',
                      akad: 'Mudharabah Muthlaqah',
                      shortDesc: '',
                      fullDesc: '',
                      badge: 'Produk Baru',
                      popular: true,
                      minDeposit: 'Rp 20.000',
                      margin: '1.2% / bln',
                      tenor: '12 - 36 Bulan',
                      maxLoan: 'Rp 50.000.000',
                      benefits: ['Bagi hasil kompetitif', 'Bebas biaya admin', 'Sesuai prinsip syariah murni'],
                      requirements: ['Fotokopi KTP / Identitas', 'Mengisi formulir pembukaan rekening'],
                      contactPerson: {
                        name: 'Layanan Nasabah PMA',
                        phone: '0813-1262-9486',
                        waNumber: '6281312629486'
                      },
                      imageUrl: './banner2.png',
                    });
                    setEditingProduct({ isNew: true });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Produk Baru</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto font-bold">
                  {['all', 'simpanan', 'pinjaman', 'pembiayaan'].map(c => (
                    <button
                      key={c}
                      onClick={() => setProductCategoryFilter(c)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                        productCategoryFilter === c ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {c === 'all' ? 'Semua Kategori' : c}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama produk / akad..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter(p => productCategoryFilter === 'all' || p.category === productCategoryFilter)
                  .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-700 text-white shadow-xs">
                              {prod.categoryLabel || prod.category}
                            </span>
                            {prod.popular && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950 shadow-xs">
                                Unggulan
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-4 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-sm text-slate-900">
                              {prod.name}
                            </h4>
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              Akad: {prod.akad}
                            </span>
                          </div>
                          {prod.fullName && (
                            <p className="text-[11px] font-semibold text-slate-700">
                              {prod.fullName}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {prod.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-3 pt-3">
                        <div className="text-[11px] text-slate-500 font-mono">
                          CS: {prod.contactPerson?.phone || '-'}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setProductForm({
                                name: prod.name || '',
                                fullName: prod.fullName || '',
                                category: prod.category || 'simpanan',
                                categoryLabel: prod.categoryLabel || 'Produk Simpanan',
                                akad: prod.akad || '',
                                shortDesc: prod.shortDesc || '',
                                fullDesc: prod.fullDesc || '',
                                badge: prod.badge || '',
                                popular: prod.popular ?? true,
                                minDeposit: prod.minDeposit || '',
                                margin: prod.margin || '',
                                tenor: prod.tenor || '',
                                maxLoan: prod.maxLoan || '',
                                benefits: prod.benefits ? [...prod.benefits] : [],
                                requirements: prod.requirements ? [...prod.requirements] : [],
                                contactPerson: { ...(prod.contactPerson || {}) },
                                imageUrl: prod.imageUrl || '',
                              });
                            }}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                            title="Edit Produk Lengkap"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 7. TAB: DEWAN PENGURUS & CV */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Profil Pengurus &amp; Dewan Pengawas</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Kelola Pengurus Koperasi &amp; Curriculum Vitae (CV)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ubah biodata, foto, motto kutipan, serta rincian riwayat pendidikan, pengalaman kerja, dan sertifikasi dewan pengurus.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setTeamForm({
                      name: '',
                      role: 'Pengurus Koperasi',
                      title: 'Jabatan & Gelar',
                      photoUrl: './logo2.jpg',
                      bio: '',
                      quote: '',
                      cv: {
                        birthPlace: 'Cirebon',
                        pendidikan: ['S1 Ekonomi Syariah'],
                        pengalaman: ['Pengurus Koperasi PMA'],
                        sertifikasi: ['Sertifikasi Pengelola Koperasi Syariah'],
                        penghargaan: ['Tokoh Penggerak Koperasi']
                      }
                    });
                    setEditingTeamMember({ isNew: true });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Tokoh / Pengurus</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((m) => (
                  <div
                    key={m.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <img src={m.photoUrl} alt={m.name} className="w-16 h-16 rounded-xl object-cover object-top border border-slate-200 shrink-0" />
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {m.role}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {m.name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {m.title}
                        </p>
                      </div>
                    </div>

                    {m.quote && (
                      <p className="text-xs italic text-slate-600 bg-slate-50 p-2.5 rounded-xl my-3 border border-slate-100">
                        "{m.quote}"
                      </p>
                    )}

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{m.cv?.pendidikan?.length || 0} Pendidikan | {m.cv?.pengalaman?.length || 0} Karir</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingTeamMember(m);
                            setTeamForm({
                              name: m.name || '',
                              role: m.role || '',
                              title: m.title || '',
                              photoUrl: m.photoUrl || '',
                              bio: m.bio || '',
                              quote: m.quote || '',
                              cv: {
                                birthPlace: m.cv?.birthPlace || '',
                                pendidikan: m.cv?.pendidikan ? [...m.cv.pendidikan] : [],
                                pengalaman: m.cv?.pengalaman ? [...m.cv.pengalaman] : [],
                                sertifikasi: m.cv?.sertifikasi ? [...m.cv.sertifikasi] : [],
                                penghargaan: m.cv?.penghargaan ? [...m.cv.penghargaan] : [],
                              }
                            });
                          }}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                          title="Edit Biodata & CV"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(m.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                          title="Hapus Tokoh"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. TAB: PENGAJUAN MASUK */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Pengajuan Pinjaman &amp; Tabungan Masuk</h3>
                  <p className="text-xs text-slate-500">Daftar calon nasabah yang mengajukan pembiayaan syariah atau pembukaan rekening.</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {['all', 'Baru', 'Dihubungi', 'Disetujui', 'Ditolak'].map(st => (
                    <button
                      key={st}
                      onClick={() => setAppStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                        appStatusFilter === st ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {applications
                  .filter(a => appStatusFilter === 'all' || a.status === appStatusFilter)
                  .map((app) => (
                    <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900">{app.applicantName}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            app.status === 'Baru' ? 'bg-amber-100 text-amber-800' : app.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {app.productType} &bull; Plafon: <strong>{formatRupiah(app.amount)}</strong> &bull; Tenor: <strong>{app.tenor} Bulan</strong>
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          HP/WA: {app.phone} &bull; Cabang: {app.branch}
                        </div>
                        {app.purpose && <p className="text-[11px] text-slate-500 italic mt-1">Keperluan: {app.purpose}</p>}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <a
                          href={createWaLink(app.phone, `Halo Bapak/Ibu ${app.applicantName}, kami dari KSPPS PMA mengenai pengajuan ${app.productType} Anda.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Hubungi WA</span>
                        </a>

                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                        >
                          <option value="Baru">Baru</option>
                          <option value="Dihubungi">Dihubungi</option>
                          <option value="Disetujui">Disetujui</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>

                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 9. TAB: PESAN MASUK */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h3 className="font-extrabold text-base text-slate-900">Pesan Konsultasi &amp; Kontak Masuk</h3>
                <p className="text-xs text-slate-500">Pesan dari formulir hubungi kami di halaman kantor cabang.</p>
              </div>

              <div className="space-y-3">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{msg.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          msg.status === 'Belum Dibalas' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{msg.createdAt}</span>
                    </div>

                    <div className="text-xs font-bold text-emerald-800">
                      Subjek: {msg.subject} &bull; Ditujukan ke: {msg.branch}
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      "{msg.message}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500 font-mono">WA: {msg.phone}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={createWaLink(msg.phone, `Halo ${msg.name}, kami dari KSPPS PMA membalas pesan Anda mengenai: ${msg.subject}`)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Balas di WA</span>
                        </a>

                        <button
                          onClick={() => handleUpdateMsgStatus(msg.id, msg.status === 'Sudah Dibalas' ? 'Belum Dibalas' : 'Sudah Dibalas')}
                          className="px-2 py-1 rounded-xl border border-slate-200 text-xs font-semibold"
                        >
                          Tandai {msg.status === 'Sudah Dibalas' ? 'Belum' : 'Selesai'}
                        </button>

                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="p-1 rounded-xl text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. TAB: BANNER & VIDEO */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Kelola Banner Beranda (Foto &amp; Video)</h3>
                  <p className="text-xs text-slate-500">Pastikan banner tidak duplikat untuk menjaga kecepatan loading web.</p>
                </div>
                <button
                  onClick={() => {
                    setBannerForm({
                      title: '',
                      subtitle: '',
                      tagline: '',
                      mediaType: 'image',
                      imageUrl: './banner1.png',
                      videoUrl: '',
                      link: '#about',
                      ctaText: 'Pelajari Selengkapnya',
                      active: true
                    });
                    setEditingBanner({ isNew: true });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Banner</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((b) => (
                  <div key={b.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/8] bg-slate-100 overflow-hidden">
                        {b.videoUrl ? (
                          <video src={b.videoUrl} className="w-full h-full object-cover" muted />
                        ) : (
                          <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                        )}
                        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md text-white ${
                          b.active ? 'bg-emerald-600' : 'bg-slate-600'
                        }`}>
                          {b.active ? 'Aktif Tayang' : 'Nonaktif'}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">{b.tagline}</span>
                        <h4 className="font-extrabold text-sm text-slate-900">{b.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{b.subtitle}</p>
                      </div>
                    </div>

                    <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleBanner(b.id)}
                        className="font-bold text-slate-700 hover:text-emerald-700 cursor-pointer"
                      >
                        {b.active ? 'Matikan' : 'Aktifkan'}
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingBanner(b);
                            setBannerForm({ ...b });
                          }}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(b.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. TAB: BERITA & PROMO */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Kelola Berita &amp; Promo Koperasi</h3>
                  <p className="text-xs text-slate-500">Artikel kegiatan, promo pembiayaan, dan tips literasi syariah.</p>
                </div>
                <button
                  onClick={() => {
                    setArticleForm({
                      title: '',
                      type: 'promo',
                      badge: 'Promo Baru',
                      summary: '',
                      content: '',
                      imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
                      date: new Date().toISOString().split('T')[0],
                      author: 'Admin PMA',
                      active: true
                    });
                    setEditingArticle({ isNew: true });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Berita</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((art) => (
                  <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
                    <img src={art.imageUrl} alt={art.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="space-y-1 min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">{art.type}</span>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{art.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                        <span>{art.date}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setArticleForm({ ...art });
                            }}
                            className="p-1 rounded bg-emerald-50 text-emerald-700 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1 rounded bg-rose-50 text-rose-700 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 12. TAB: KANTOR CABANG */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Kelola Jaringan Kantor Cabang</h3>
                  <p className="text-xs text-slate-500">Alamat, nomor kontak CS, dan jam operasional cabang.</p>
                </div>
                <button
                  onClick={() => {
                    setBranchForm({
                      name: '',
                      tagline: 'Kantor Cabang Layanan',
                      address: '',
                      phone: '0813-1262-9486',
                      email: 'cabang@ksppspma.co.id',
                      operationalHours: 'Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 14.00 WIB',
                      mapsUrl: 'https://maps.google.com',
                      isPusat: false
                    });
                    setEditingBranch({ isNew: true });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Cabang</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {branches.map((b) => (
                  <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">{b.tagline}</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{b.name}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{b.address}</p>
                      <p className="text-xs font-mono font-bold text-emerald-800">WA: {b.phone}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditingBranch(b);
                          setBranchForm({ ...b });
                        }}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBranch(b.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ================= MODAL FORMS ================= */}

        {/* 1. PRODUCT CRUD MODAL */}
        {editingProduct && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <h4 className="font-black text-slate-900 text-sm sm:text-base">
                  {editingProduct.id ? `Edit Produk: ${editingProduct.name}` : 'Tambah Produk Syariah Baru'}
                </h4>
                <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kode / Nama Singkat:</label>
                    <input
                      type="text"
                      placeholder="Contoh: TAMASKOP"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori Produk:</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="simpanan">Simpanan</option>
                      <option value="pinjaman">Pinjaman</option>
                      <option value="pembiayaan">Pembiayaan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Produk:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Tabungan Anggota Masyarakat Koperasi"
                    value={productForm.fullName || ''}
                    onChange={(e) => setProductForm({ ...productForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Akad Fiqih Syariah:</label>
                    <input
                      type="text"
                      placeholder="Mudharabah Muthlaqah, Murabahah, dll"
                      value={productForm.akad}
                      onChange={(e) => setProductForm({ ...productForm, akad: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Badge / Label:</label>
                    <input
                      type="text"
                      placeholder="Terpopuler, Bebas Riba, dll"
                      value={productForm.badge || ''}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={productForm.popular}
                    onChange={(e) => setProductForm({ ...productForm, popular: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="isPopular" className="text-xs font-bold text-emerald-950 cursor-pointer">
                    Tampilkan sebagai Produk Unggulan di Halaman Utama (Beranda)
                  </label>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat (Tampil di Kartu):</label>
                  <textarea
                    rows={2}
                    value={productForm.shortDesc}
                    onChange={(e) => setProductForm({ ...productForm, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deskripsi Lengkap (Tampil di Modal Detail):</label>
                  <textarea
                    rows={3}
                    value={productForm.fullDesc || ''}
                    onChange={(e) => setProductForm({ ...productForm, fullDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">Daftar Keunggulan Produk:</label>
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, benefits: [...(productForm.benefits || []), ''] })}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Poin</span>
                    </button>
                  </div>
                  {(productForm.benefits || []).map((ben, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={ben}
                        onChange={(e) => {
                          const updated = [...productForm.benefits];
                          updated[idx] = e.target.value;
                          setProductForm({ ...productForm, benefits: updated });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                        placeholder="Contoh: Bagi hasil kompetitif setiap bulan"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = productForm.benefits.filter((_, i) => i !== idx);
                          setProductForm({ ...productForm, benefits: updated });
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">Daftar Syarat Pengajuan:</label>
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, requirements: [...(productForm.requirements || []), ''] })}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Syarat</span>
                    </button>
                  </div>
                  {(productForm.requirements || []).map((req, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const updated = [...productForm.requirements];
                          updated[idx] = e.target.value;
                          setProductForm({ ...productForm, requirements: updated });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                        placeholder="Contoh: Fotokopi KTP & KK"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = productForm.requirements.filter((_, i) => i !== idx);
                          setProductForm({ ...productForm, requirements: updated });
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Petugas CS:</label>
                    <input
                      type="text"
                      value={productForm.contactPerson?.name || ''}
                      onChange={(e) => setProductForm({
                        ...productForm,
                        contactPerson: { ...productForm.contactPerson, name: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">No. WhatsApp Petugas:</label>
                    <input
                      type="text"
                      value={productForm.contactPerson?.phone || ''}
                      onChange={(e) => setProductForm({
                        ...productForm,
                        contactPerson: { ...productForm.contactPerson, phone: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Foto / Gambar Produk:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                      placeholder="URL / Path file..."
                    />
                    <label className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Upload...' : 'Upload Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setProductForm({ ...productForm, imageUrl: url }))}
                      />
                    </label>
                  </div>
                  {productForm.imageUrl && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                      <img src={productForm.imageUrl} alt="Pratinjau" className="w-12 h-12 object-cover rounded-lg" />
                      <div className="text-[11px] text-emerald-800 truncate">
                        Lokasi file: <strong>{productForm.imageUrl}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 shrink-0">
                <button onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveProduct(productForm)}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Produk</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. TEAM & CV CRUD MODAL */}
        {editingTeamMember && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <h4 className="font-black text-slate-900 text-sm sm:text-base">
                  {editingTeamMember.id ? `Edit CV Pengurus: ${editingTeamMember.name}` : 'Tambah Tokoh / Pengurus & CV Baru'}
                </h4>
                <button onClick={() => setEditingTeamMember(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Lengkap &amp; Gelar:</label>
                    <input
                      type="text"
                      placeholder="Contoh: H. Ahmad Subandi, S.E., M.Sy."
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jabatan / Peran di Koperasi:</label>
                    <input
                      type="text"
                      placeholder="Ketua Pengurus, Bendahara, Dewan Pengawas..."
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Spesialisasi / Gelar Resmi:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Praktisi Ekonomi Syariah Cirebon"
                      value={teamForm.title}
                      onChange={(e) => setTeamForm({ ...teamForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tempat &amp; Tanggal Lahir (CV):</label>
                    <input
                      type="text"
                      placeholder="Cirebon, 12 Mei 1978"
                      value={teamForm.cv?.birthPlace || ''}
                      onChange={(e) => setTeamForm({
                        ...teamForm,
                        cv: { ...teamForm.cv, birthPlace: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Foto Profil Tokoh:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={teamForm.photoUrl}
                      onChange={(e) => setTeamForm({ ...teamForm, photoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Upload...' : 'Upload Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setTeamForm({ ...teamForm, photoUrl: url }))}
                      />
                    </label>
                  </div>
                  {teamForm.photoUrl && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                      <img src={teamForm.photoUrl} alt="Pratinjau" className="w-12 h-12 object-cover object-top rounded-lg" />
                      <div className="text-[11px] text-emerald-800 truncate">
                        ✓ Foto tersimpan: <strong>{teamForm.photoUrl}</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Motto / Kutipan Inspiratif (Quote):</label>
                  <input
                    type="text"
                    placeholder="Membangun ekonomi umat dengan amanah, transparan, dan bebas riba."
                    value={teamForm.quote || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, quote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs italic"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Biodata Ringkas Profil:</label>
                  <textarea
                    rows={2}
                    value={teamForm.bio || ''}
                    onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>Riwayat Pendidikan (CV):</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setTeamForm({
                        ...teamForm,
                        cv: { ...teamForm.cv, pendidikan: [...(teamForm.cv?.pendidikan || []), ''] }
                      })}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Pendidikan</span>
                    </button>
                  </div>
                  {(teamForm.cv?.pendidikan || []).map((pen, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={pen}
                        onChange={(e) => {
                          const updated = [...teamForm.cv.pendidikan];
                          updated[idx] = e.target.value;
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, pendidikan: updated } });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                        placeholder="Contoh: S1 Perbankan Syariah - IAIN Syekh Nurjati Cirebon (2000 - 2004)"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = teamForm.cv.pendidikan.filter((_, i) => i !== idx);
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, pendidikan: updated } });
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      <span>Pengalaman Karir &amp; Organisasi (CV):</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setTeamForm({
                        ...teamForm,
                        cv: { ...teamForm.cv, pengalaman: [...(teamForm.cv?.pengalaman || []), ''] }
                      })}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Pengalaman</span>
                    </button>
                  </div>
                  {(teamForm.cv?.pengalaman || []).map((peng, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={peng}
                        onChange={(e) => {
                          const updated = [...teamForm.cv.pengalaman];
                          updated[idx] = e.target.value;
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, pengalaman: updated } });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                        placeholder="Contoh: Ketua Pengurus KSPPS PMA (2018 - Sekarang)"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = teamForm.cv.pengalaman.filter((_, i) => i !== idx);
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, pengalaman: updated } });
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Sertifikasi &amp; Pelatihan Kompetensi:</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setTeamForm({
                        ...teamForm,
                        cv: { ...teamForm.cv, sertifikasi: [...(teamForm.cv?.sertifikasi || []), ''] }
                      })}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Sertifikasi</span>
                    </button>
                  </div>
                  {(teamForm.cv?.sertifikasi || []).map((sert, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={sert}
                        onChange={(e) => {
                          const updated = [...teamForm.cv.sertifikasi];
                          updated[idx] = e.target.value;
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, sertifikasi: updated } });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                        placeholder="Contoh: Sertifikasi BNSP Pengelola Koperasi Jasa Keuangan Syariah"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = teamForm.cv.sertifikasi.filter((_, i) => i !== idx);
                          setTeamForm({ ...teamForm, cv: { ...teamForm.cv, sertifikasi: updated } });
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 shrink-0">
                <button onClick={() => setEditingTeamMember(null)} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveTeam(teamForm)}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data CV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. FINANCIAL ITEM MODAL */}
        {editingFinItem && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h4 className="font-black text-slate-900 text-sm">
                  {editingFinItem.id ? `Edit Data: ${editingFinItem.name}` : `Tambah Baris: ${financialReports[activeFinCategory]?.title}`}
                </h4>
                <button onClick={() => setEditingFinItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Uraian Pos Keuangan:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Aktiva Tetap / Simpanan Pokok..."
                    value={finForm.name}
                    onChange={(e) => setFinForm({ ...finForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kelompok (Opsional):</label>
                    <input
                      type="text"
                      placeholder="Simpanan Anggota / Lancar"
                      value={finForm.group || ''}
                      onChange={(e) => setFinForm({ ...finForm, group: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Warna Grafik:</label>
                    <input
                      type="color"
                      value={finForm.color || '#10b981'}
                      onChange={(e) => setFinForm({ ...finForm, color: e.target.value })}
                      className="w-full h-9 rounded-xl border border-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="font-bold text-slate-900 block">Nilai per Tahun Buku (Dalam Angka murni tanpa titik):</label>
                  {years.map(yr => (
                    <div key={yr} className="flex items-center gap-2">
                      <span className="w-12 font-bold text-slate-700">{yr}:</span>
                      <input
                        type="number"
                        value={finForm.values?.[yr] ?? 0}
                        onChange={(e) => setFinForm({
                          ...finForm,
                          values: { ...finForm.values, [yr]: Number(e.target.value) }
                        })}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button onClick={() => setEditingFinItem(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveFinItem(activeFinCategory, finForm)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. BANNER MODAL */}
        {editingBanner && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h4 className="font-black text-slate-900 text-sm">
                  {editingBanner.id ? 'Edit Banner Beranda' : 'Tambah Banner Baru'}
                </h4>
                <button onClick={() => setEditingBanner(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Utama Banner:</label>
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline Kecil:</label>
                  <input
                    type="text"
                    value={bannerForm.tagline || ''}
                    onChange={(e) => setBannerForm({ ...bannerForm, tagline: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subjudul / Deskripsi Banner:</label>
                  <textarea
                    rows={2}
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Media:</label>
                  <select
                    value={bannerForm.mediaType || 'image'}
                    onChange={(e) => setBannerForm({ ...bannerForm, mediaType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  >
                    <option value="image">Gambar / Foto</option>
                    <option value="video">Video (MP4 / WebM)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">File Gambar Banner:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bannerForm.imageUrl}
                      onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setBannerForm({ ...bannerForm, imageUrl: url }))}
                      />
                    </label>
                  </div>
                </div>

                {bannerForm.mediaType === 'video' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">File Video Banner (MP4):</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={bannerForm.videoUrl || ''}
                        onChange={(e) => setBannerForm({ ...bannerForm, videoUrl: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                        placeholder="./uploads/video.mp4"
                      />
                      <label className="px-3 py-1.5 rounded-xl bg-teal-700 text-white font-bold flex items-center gap-1 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Video</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setBannerForm({ ...bannerForm, videoUrl: url }))}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button onClick={() => setEditingBanner(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveBanner(bannerForm)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Banner</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. ARTICLE / PROMO CRUD MODAL (TAMBAHAN YANG SEBELUMNYA HILANG) */}
        {editingArticle && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h4 className="font-black text-slate-900 text-sm">
                  {editingArticle.id ? 'Edit Berita / Promo' : 'Tambah Berita / Promo Baru'}
                </h4>
                <button onClick={() => setEditingArticle(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Berita / Promo:</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori Tipe:</label>
                    <select
                      value={articleForm.type}
                      onChange={(e) => setArticleForm({ ...articleForm, type: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                    >
                      <option value="promo">Promo</option>
                      <option value="berita">Berita</option>
                      <option value="kegiatan">Kegiatan</option>
                      <option value="tips">Tips Syariah</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Badge Label:</label>
                    <input
                      type="text"
                      value={articleForm.badge || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, badge: e.target.value })}
                      placeholder="Promo Baru, Event..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ringkasan Singkat:</label>
                  <textarea
                    rows={2}
                    value={articleForm.summary}
                    onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Isi Konten Lengkap:</label>
                  <textarea
                    rows={4}
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gambar Berita / Promo:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={articleForm.imageUrl}
                      onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setArticleForm({ ...articleForm, imageUrl: url }))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button onClick={() => setEditingArticle(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveArticle(articleForm)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Berita</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. BRANCH CRUD MODAL (TAMBAHAN YANG SEBELUMNYA HILANG) */}
        {editingBranch && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h4 className="font-black text-slate-900 text-sm">
                  {editingBranch.id ? 'Edit Kantor Cabang' : 'Tambah Cabang Baru'}
                </h4>
                <button onClick={() => setEditingBranch(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Cabang:</label>
                  <input
                    type="text"
                    value={branchForm.name}
                    onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                    placeholder="Cabang Celancang"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline Cabang:</label>
                  <input
                    type="text"
                    value={branchForm.tagline}
                    onChange={(e) => setBranchForm({ ...branchForm, tagline: e.target.value })}
                    placeholder="Kantor Cabang Layanan"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Alamat Lengkap:</label>
                  <textarea
                    rows={2}
                    value={branchForm.address}
                    onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">No. Telp / WA CS:</label>
                    <input
                      type="text"
                      value={branchForm.phone}
                      onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Cabang:</label>
                    <input
                      type="email"
                      value={branchForm.email}
                      onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Operasional:</label>
                  <input
                    type="text"
                    value={branchForm.operationalHours}
                    onChange={(e) => setBranchForm({ ...branchForm, operationalHours: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button onClick={() => setEditingBranch(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveBranch(branchForm)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Cabang</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. MODAL EDIT / TAMBAH LEGALITAS */}
        {editingLegality && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {editingLegality.id ? 'Edit Dokumen Legalitas' : 'Tambah Dokumen Legalitas Baru'}
                  </h4>
                </div>
                <button onClick={() => setEditingLegality(null)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Huruf Urutan:</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={legalityForm.letter}
                      onChange={(e) => setLegalityForm({ ...legalityForm, letter: e.target.value })}
                      placeholder="a, b, c..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-center uppercase"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Kategori / Badge:</label>
                    <input
                      type="text"
                      value={legalityForm.category}
                      onChange={(e) => setLegalityForm({ ...legalityForm, category: e.target.value })}
                      placeholder="Badan Hukum, SIUP, NIB..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Dokumen Legalitas:</label>
                  <input
                    type="text"
                    value={legalityForm.title}
                    onChange={(e) => setLegalityForm({ ...legalityForm, title: e.target.value })}
                    placeholder="Contoh: Akta Pendirian Badan Hukum"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor Registrasi / SK Dokumen:</label>
                  <input
                    type="text"
                    value={legalityForm.number}
                    onChange={(e) => setLegalityForm({ ...legalityForm, number: e.target.value })}
                    placeholder="Contoh: No. 06/BH/DIS-KOP/V/2001"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Instansi Penerbit:</label>
                    <input
                      type="text"
                      value={legalityForm.issuer}
                      onChange={(e) => setLegalityForm({ ...legalityForm, issuer: e.target.value })}
                      placeholder="Dinas Koperasi / Kemenkumham"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal / Tahun:</label>
                    <input
                      type="text"
                      value={legalityForm.date}
                      onChange={(e) => setLegalityForm({ ...legalityForm, date: e.target.value })}
                      placeholder="Contoh: Mei 2001 / Tahun 2025"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Keterangan / Deskripsi Singkat:</label>
                  <textarea
                    rows={2}
                    value={legalityForm.description}
                    onChange={(e) => setLegalityForm({ ...legalityForm, description: e.target.value })}
                    placeholder="Uraian atau catatan legalitas..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="checkbox"
                    id="legalityActive"
                    checked={legalityForm.active !== false}
                    onChange={(e) => setLegalityForm({ ...legalityForm, active: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-700 cursor-pointer"
                  />
                  <label htmlFor="legalityActive" className="font-bold text-slate-700 cursor-pointer">
                    Tampilkan dokumen ini di Beranda Website
                  </label>
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button onClick={() => setEditingLegality(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer">
                  Batal
                </button>
                <button
                  onClick={() => handleSaveLegality(legalityForm)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Dokumen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. TESTIMONIAL CRUD MODAL */}
{editingTestimonial && (
  <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
    <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
        <h4 className="font-black text-slate-900 text-sm sm:text-base">
          {editingTestimonial.id ? `Edit Testimoni: ${editingTestimonial.name}` : 'Tambah Testimoni Anggota Baru'}
        </h4>
        <button onClick={() => setEditingTestimonial(null)} className="p-1 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-3 text-xs overflow-y-auto flex-1 max-h-[80vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Anggota:</label>
            <input
              type="text"
              placeholder="Contoh: H. Ahmad"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Pekerjaan / Usaha:</label>
            <input
              type="text"
              placeholder="Contoh: Pemilik Toko Sembako"
              value={testimonialForm.role}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Rating (Bintang 1-5):</label>
            <select
              value={testimonialForm.rating}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white"
            >
              <option value={5}>5 Bintang (Sangat Puas)</option>
              <option value={4}>4 Bintang (Puas)</option>
              <option value={3}>3 Bintang (Cukup)</option>
              <option value={2}>2 Bintang (Kurang)</option>
              <option value={1}>1 Bintang (Sangat Kurang)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Badge Status:</label>
            <input
              type="text"
              placeholder="Anggota Aktif, Nasabah Unggulan..."
              value={testimonialForm.badge}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, badge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Produk yang Digunakan:</label>
            <input
              type="text"
              placeholder="Pembiayaan Modal Kerja Syariah"
              value={testimonialForm.productUsed}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, productUsed: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kantor Cabang:</label>
            <input
              type="text"
              placeholder="Cabang Celancang"
              value={testimonialForm.branch}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, branch: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Isi Ulasan / Testimoni:</label>
          <textarea
            rows={3}
            value={testimonialForm.content}
            onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
            placeholder="Tulis ulasan pengaman menggunakan layanan koperasi..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Foto Avatar Anggota:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={testimonialForm.avatar}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
              placeholder="URL Foto..."
            />
            <label className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Upload...' : 'Upload Foto'}</span>
              <input
                type="file"
                accept="image/*"
                disabled={isUploading}
                className="hidden"
                onChange={(e) => handleFileUpload(e, (url) => setTestimonialForm({ ...testimonialForm, avatar: url }))}
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="checkbox"
            id="testiActive"
            checked={testimonialForm.active !== false}
            onChange={(e) => setTestimonialForm({ ...testimonialForm, active: e.target.checked })}
            className="w-4 h-4 rounded text-emerald-700 cursor-pointer"
          />
          <label htmlFor="testiActive" className="font-bold text-slate-700 cursor-pointer">
            Tampilkan testimoni ini di Halaman Utama Website
          </label>
        </div>
      </div>

      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 shrink-0">
        <button onClick={() => setEditingTestimonial(null)} className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold cursor-pointer">
          Batal
        </button>
        <button
          onClick={() => handleSaveTestimonial(testimonialForm)}
          className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Testimoni</span>
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}