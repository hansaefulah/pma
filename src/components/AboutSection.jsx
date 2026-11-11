import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  Award, 
  FileText, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Quote, 
  ShieldCheck, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function AboutSection({ team, onOpenCv }) {
  const [activeTimeline, setActiveTimeline] = useState('1995');

  const history = [
    {
      year: '1995',
      title: 'Cikal Bakal Bamabupa',
      desc: 'Beberapa remaja desa Babadan, Buyut, Mayung, dan Pangkalan yang beraktivitas sebagai penjahit membentuk wadah Bamabupa (Babadan, Mayung, Buyut, dan Pangkalan).',
      badge: 'Awal Perjuangan'
    },
    {
      year: '1996',
      title: 'LEPPM',
      desc: 'Bamabupa menjadi Lembaga Ekonomi Produktif Masyarakat Mandiri (LEPMM) Perambabulan.',
      badge: 'Ekspansi Lembaga'
    },
    {
      year: '2001',
      title: 'LEPMM Perambabulan',
      desc: 'LEPMM berganti jenis menjadi Kelompok Serba Usaha (KSU) berpola Syariah dengan nama Koperasi Perambabulan Al-Qomariyah.',
      badge: 'Ekspansi Lembaga'
    },
    {
      year: '2004',
      title: 'Koperasi Syariah Pertama',
      desc: 'KSU berpola syariah menjadi Koperasi Simpan Pinjam Syariah (KSPS) Perambabulan Al Qomariyah. Pada tahun yang sama Koperasi Simpan Pinjam Syariah diubah menjadi Koperasi Jasa Keuangan Syariah (KJKS), nama tetap Perambabulan Al-Qomariyah.',
      badge: 'Legalitas Syariah'
    },
    {
      year: '2014',
      title: 'KSPPS PMA',
      desc: 'Pada tahun ini jenis koperasi kembali menjadi Koperasi Simpan Pinjam Syariah (KSPS) dengan nama singkat Perambabulan (Persatuan Remaja Penjahit Mayung, Babadan, Buyut, dan Pangkalan). Pada tahun ini membuka kantor cabang di Pasar Mundu dan Pasar Celancang.',
      badge: 'Transformasi'
    },
    {
      year: '2022',
      title: '3 Kantor Cabang & 5.000+ Anggota',
      desc: 'Koperasi mengalami perubahan dan menjadi koperasi nasional. Perubahan Anggaran Dasar KSPPS dengan nama Perambabulan Makmur Abadi yang disahkan 20 Mei 2022 disingkat KSPPS PMA. Di tahun yang sama Kantor Cabang Mundu pindah lokasi ke Mertapada Kulon dan sesuai NIB nama menjadi Kantor Cabang Mertapada Kulon.',
      badge: 'Kemakmuran Bersama'
    },
    {
      year: '2024',
      title: 'Layanan Digital',
      desc: 'Transformasi digital dimulai dengan penggunaan aplikasi Perambabulan Mobile. Aplikasi ini untuk memenuhi kebutuhan anggota dalam keterbukaan transaksi, sistem yang praktis, ekonomis yaitu pemanfaatan print bluetooth melalui aplikasi Prabu. Aplikasi ini menjadi bukti bahwa KSPPS PMA mampu mengikuti perkembangan zaman dan siap memasuki era media yang bertujuan memudahkan anggota dalam bertransaksi.',
      badge: 'Era Digitalisasi'
    },
    {
      year: '2026',
      title: '3 Kantor Cabang & 5.000+ Anggota',
      desc: 'Tahun ini usia KSPPS PMA mencapai usia 25. Tepatnya tanggal 14 Maret 2026. Memasuki usia seperempat abad KSPPS PMA siap membangun ekonomi umat dengan membuka kantor cabang baru di wilayah potensial, baik di dalam kota maupun di luar kota Cirebon di seluruh Indonesia.',
      badge: 'Kemakmuran Bersama Indonesia'
    },
  ];

  const missions = [
    {
      number: '01',
      title: 'Pengembangan Potensi Usaha',
      desc: 'Meningkatkan kemampuan manajemen pengelola dan anggota dalam mengembangkan potensi usaha anggota khususnya dan masyarakat pada umumnya.'
    },
    {
      number: '02',
      title: 'Pelayanan Prima & Teknologi Digital',
      desc: 'Memberikan pelayanan prima dengan teknologi digital yang mudah diakses, nyaman dan aman bagi seluruh lapisan masyarakat.'
    }
  ];

  const goals = [
    {
      number: '01',
      title: 'Kesejahteraan Umat & Bangsa',
      desc: 'Memajukan kesejahteraan anggota dan masyarakat serta membangun perekonomian nasional sesuai syariat Islam dan UUD 1945.'
    },
    {
      number: '02',
      title: 'Rencana Strategis Terukur',
      desc: 'Menyusun Rencana Strategis yang terukur, berkesinambungan, dan amanah untuk mencapai tujuan yang ditetapkan.'
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 space-y-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>Siapa Kami?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Koperasi Simpan Pinjam dan Pembiayaan Syariah <br className="hidden sm:inline" />
          <span className="text-emerald-700">Perambabulan Makmur Abadi</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          KSPPS PMA adalah lembaga keuangan syariah yang berkomitmen kuat untuk membangun ekonomi umat melalui prinsip-prinsip syariah yang berkeadilan, transparan, dan berlandaskan gotong royong.
        </p>
      </div>

      {/* Visi, Misi, & Tujuan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Visi Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between border border-emerald-700/50">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Visi Utama
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              Membangun Ekonomi Umat
            </h3>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-4 leading-relaxed">
              Menjadi pilar kebangkitan finansial masyarakat melalui pemberdayaan sektor riil, edukasi bebas riba, dan kemitraan syariah yang berkah.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-emerald-700/60 flex items-center gap-2 text-xs text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>KSPPS PMA — Amanah & Berdaya</span>
          </div>
        </div>

        {/* Misi Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Misi Kami
            </span>
            <div className="space-y-4 mt-3">
              {missions.map((m, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-lg shrink-0 mt-0.5">
                    {m.number}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tujuan Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Tujuan Koperasi
            </span>
            <div className="space-y-4 mt-3">
              {goals.map((g, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-xs font-extrabold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-lg shrink-0 mt-0.5">
                    {g.number}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{g.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Sejarah Perjalanan Kami (Timeline) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Napak Tilas 30 Tahun
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Sejarah Perjalanan Kami
            </h3>
          </div>
        </div>

        {/* Timeline Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {history.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveTimeline(item.year)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeTimeline === item.year
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
              }`}
            >
              <div className="text-base sm:text-lg font-black">{item.year}</div>
              <div className={`text-[11px] font-semibold truncate ${
                activeTimeline === item.year ? 'text-emerald-100' : 'text-slate-500'
              }`}>
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Timeline Details Card */}
        {(() => {
          const activeItem = history.find(h => h.year === activeTimeline) || history[0];
          return (
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                    Tahun {activeItem.year}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    {activeItem.badge}
                  </span>
                </div>
                <h4 className="text-lg font-extrabold text-emerald-950 mt-1">
                  {activeItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Tim Pendiri & Dewan Pengurus Beserta CV Detail */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pendiri dan Pengurus Koperasi
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm">
            Para tokoh berpengalaman dan dewan pengawas syariah yang mengawal amanah anggota dengan integritas tinggi.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenCv(member)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenCv(member);
                }
              }}
              aria-label={`Lihat CV ${member.name}`}
              className="group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              {/* Member Photo */}
              <div className="relative overflow-hidden px-6 pt-8">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Member Name & Title */}
              <div className="px-5 pt-5 pb-14 text-center space-y-1">
                <h4 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {member.name}
                </h4>
                <p className="text-sm text-slate-500">
                  {member.title}
                </p>
              </div>

              {/* Diagonal "Lihat CV" corner ribbon */}
              <div
                className="absolute bottom-0 right-0 w-32 h-24 bg-emerald-700 transition-opacity duration-300 group-hover:opacity-0"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              >
                <span
                  className="absolute right-3 bottom-4 text-[11px] font-semibold text-white underline origin-bottom-right"
                  style={{ transform: 'rotate(-35deg)' }}
                >
                  Lihat CV
                </span>
              </div>

              {/* Hover / Focus Overlay */}
              <div className="absolute inset-0 bg-emerald-700 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                <h4 className="text-2xl font-extrabold text-white">
                  {member.name}
                </h4>
                <p className="text-base text-white mt-2">
                  {member.title}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
                  <span>LIHAT PROFIL</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
