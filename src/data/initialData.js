// Data Awal KSPPS Perambabulan Makmur Abadi (KSPPS PMA)

export const initialBanners = [
  {
    id: 'banner-video',
    title: '# Membangun Ekonomi Umat',
    subtitle: 'Koperasi Simpan Pinjam dan Pembiayaan Syariah Perambabulan Makmur Abadi berkomitmen membangun ekonomi umat dengan prinsip syariah dan gotong royong.',
    tagline: 'Video Profil Resmi KSPPS PMA Cirebon',
    mediaType: 'video',
    videoUrl: './uploads/1794239218336_717_gemini_generated_video_9a83cc5.mp4',
    imageUrl: './banner1.png',
    link: '#about',
    ctaText: 'Pelajari Selengkapnya',
    active: true,
  },
  {
    id: 'banner-1',
    title: 'Lembaga Keuangan Syariah Amanah',
    subtitle: 'Memberikan layanan keuangan terbaik, transparan, dan sesuai syariat Islam untuk kemajuan bersama.',
    tagline: 'Terpercaya Sejak 1995 di Cirebon',
    imageUrl: './banner1.png',
    link: '#about',
    ctaText: 'Profil Koperasi',
    active: false, // Dinonaktifkan default agar tidak duplikat dengan video banner utama
  },
  {
    id: 'banner-2',
    title: 'Ayo Menabung di KSPPS PMA!',
    subtitle: 'Menabung Hari Ini, Untuk Masa Depan yang Lebih Baik. Aman, berkah, bagi hasil kompetitif dan bebas riba.',
    tagline: 'Simpanan Syariah Berkah',
    imageUrl: './banner2.png',
    link: '#products',
    ctaText: 'Mulai Menabung',
    active: true,
  },
  {
    id: 'banner-3',
    title: 'Kini Lebih Mudah dalam Genggaman',
    subtitle: 'Aplikasi dan Layanan Digital KSPPS PMA hadir memudahkan cek saldo, riwayat transaksi, simulasi pinjaman, dan konsultasi syariah kapan saja.',
    tagline: 'Layanan Digital Cepat & Aman',
    imageUrl: './banner3.png',
    link: '#calculator',
    ctaText: 'Hitung Simulasi Pinjaman',
    active: true,
  },
];

export const initialProducts = [
  // PRODUK SIMPANAN
  {
    id: 'tamaskop',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'TAMASKOP',
    fullName: 'Tabungan Anggota Masyarakat Koperasi',
    akad: 'Mudharabah Muthlaqah',
    shortDesc: 'Setoran awal ringan, bagi hasil kompetitif, penarikan mudah di semua cabang.',
    fullDesc: 'Tabungan harian bagi seluruh anggota masyarakat dengan bagi hasil yang menguntungkan dan mengacu pada prinsip syariah murni. Dana dikelola secara produktif dan amanah.',
    benefits: [
      'Setoran awal mulai dari Rp 20.000,-',
      'Bagi hasil kompetitif setiap akhir bulan',
      'Penarikan mudah di semua kantor cabang',
      'Bebas biaya administrasi bulanan',
      'Dapat dijadikan jaminan pembiayaan'
    ],
    requirements: [
      'Fotokopi KTP / Identitas resmi',
      'Mengisi formulir pembukaan rekening',
      'Menjadi anggota KSPPS PMA'
    ],
    contactPerson: {
      name: 'Layanan Simpanan PMA',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Terpopuler',
    minDeposit: 'Rp 20.000',
    popular: true,
  },
  {
    id: 'takopnas',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'TAKOPNAS',
    fullName: 'Tabungan Koperasi Anak Sekolah',
    akad: 'Mudharabah Muthlaqah',
    shortDesc: 'Menabung sejak dini untuk pelajar, edukasi keuangan syariah, bebas biaya admin.',
    fullDesc: 'Simpanan khusus untuk pelajar mulai tingkat PAUD hingga SLTA. Melatih kemandirian finansial dan budaya menabung sesuai nilai-nilai Islam.',
    benefits: [
      'Setoran sangat ringan mulai Rp 10.000,-',
      'Bebas biaya admin selamanya',
      'Buku tabungan atas nama siswa sendiri',
      'Layanan jemput tabungan ke sekolah mitra'
    ],
    requirements: [
      'Fotokopi Kartu Pelajar / Akta Kelahiran',
      'Fotokopi KTP Orang Tua / Wali',
      'Formulir pendaftaran'
    ],
    contactPerson: {
      name: 'Tim Edukasi Sekolah PMA',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    badge: 'Untuk Pelajar',
    minDeposit: 'Rp 10.000',
    popular: false,
  },
  {
    id: 'taqorub',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'TAQORUB',
    fullName: 'Tabungan Qurban',
    akad: 'Mudharabah Muthlaqah',
    shortDesc: 'Rencana qurban tahunan dengan setoran bertahap sesuai kemampuan.',
    fullDesc: 'Tabungan berjangka syariah yang mempermudah niat ibadah qurban Idul Adha Anda. Koperasi juga menyediakan fasilitas pembelian hewan qurban sehat bersertifikat.',
    benefits: [
      'Jadwal setoran fleksibel (harian, mingguan, bulanan)',
      'Bebas biaya transfer ke penyedia hewan qurban',
      'Pencairan tepat waktu menjelang Hari Raya Idul Adha',
      'Dapat disalurkan langsung melalui panitia qurban desa/masjid'
    ],
    requirements: [
      'KTP & Formulir Pendaftaran',
      'Pilihan target nominal qurban kambing/sapi'
    ],
    contactPerson: {
      name: 'Layanan Qurban Syariah',
      phone: '0813-0000-0001',
      waNumber: '6281300000001'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    badge: 'Program Ibadah',
    minDeposit: 'Rp 50.000',
    popular: false,
  },
  {
    id: 'wadiah-dhamanah',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'WADIAH YAD DHAMANAH',
    fullName: 'Titipan Dana Dijamin Koperasi',
    akad: 'Wadiah Yad Dhamanah',
    shortDesc: 'Dana titipan aman, dapat diambil kapan saja, bonus atasharruf koperasi.',
    fullDesc: 'Skema titipan murni di mana koperasi diizinkan mengelola dana titipan secara amanah dengan jaminan utuh 100% dan bonus sukarela bagi nasabah.',
    benefits: [
      'Dana dijamin keamanannya dan utuh 100%',
      'Penarikan sewaktu-waktu tanpa pinalti',
      'Berkesempatan mendapatkan bonus sukarela (athaya) dari koperasi',
      'Transparan dan berkah'
    ],
    requirements: [
      'KTP / Paspor asli dan fotokopi',
      'Formulir akad Wadiah Yad Dhamanah'
    ],
    contactPerson: {
      name: 'Customer Care Wadiah PMA',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    badge: 'Titipan Amanah',
    minDeposit: 'Rp 50.000',
    popular: false,
  },
  {
    id: 'wadiah-amanah',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'WADIAH YAD AMANAH',
    fullName: 'Titipan Murni Tanpa Pemanfaatan',
    akad: 'Wadiah Yad Amanah',
    shortDesc: 'Titipan murni, koperasi tidak memanfaatkan dana tanpa izin.',
    fullDesc: 'Layanan titipan harta atau dana di mana koperasi murni menjaga fisik harta tanpa menggunakannya untuk aktivitas bisnis pembiayaan.',
    benefits: [
      'Keamanan tingkat tinggi',
      'Sesuai syariat fiqih titipan mutlak',
      'Penyimpanan rapi dan bersertifikat tanda titipan'
    ],
    requirements: [
      'KTP & identitas resmi',
      'Dokumen serah terima titipan'
    ],
    contactPerson: {
      name: 'Layanan Kustodian PMA',
      phone: '0813-0000-0002',
      waNumber: '6281300000002'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    badge: 'Murni & Aman',
    minDeposit: 'Fleksibel',
    popular: false,
  },
  {
    id: 'tahara',
    category: 'simpanan',
    categoryLabel: 'Produk Simpanan',
    name: 'TAHARA',
    fullName: 'Tabungan Hari Raya',
    akad: 'Mudharabah Muthlaqah',
    shortDesc: 'Persiapan hari raya dengan pencairan menjelang Idul Fitri.',
    fullDesc: 'Tabungan rencana untuk menyambut hari raya Idul Fitri dengan gembira tanpa pusing biaya baju lebaran, mudik, maupun jamuan keluarga.',
    benefits: [
      'Pencairan serentak H-14 sebelum Idul Fitri',
      'Bagi hasil menarik khusus paket hari raya',
      'Souvenir dan bingkisan lebaran menarik bagi penabung aktif'
    ],
    requirements: [
      'KTP & Kartu Keluarga',
      'Formulir keikutsertaan TAHARA'
    ],
    contactPerson: {
      name: 'Layanan Hari Raya PMA',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorit Keluarga',
    minDeposit: 'Rp 25.000',
    popular: true,
  },

  // PRODUK PINJAMAN
  {
    id: 'pinjaman-usaha',
    category: 'pinjaman',
    categoryLabel: 'Produk Pinjaman',
    name: 'PINJAMAN USAHA',
    fullName: 'Modal Usaha Mikro & Kecil',
    akad: 'Murabahah / Mudharabah',
    shortDesc: 'Plafon fleksibel, tenor hingga 36 bulan, proses cepat dengan prinsip syariah.',
    fullDesc: 'Fasilitas permodalan syariah untuk pengusaha mikro, pedagang pasar, UMKM konveksi, dan usaha produktif di desa dan kota. Mendukung pertumbuhan usaha tanpa jeratan riba.',
    benefits: [
      'Plafon mulai Rp 2.000.000 s/d Rp 150.000.000',
      'Tenor fleksibel 6, 12, 24, hingga 36 bulan',
      'Tanpa biaya tersembunyi, margin disepakati di awal',
      'Pendampingan manajemen usaha oleh tim koperasi'
    ],
    requirements: [
      'Fotokopi KTP Suami & Istri (bagi yang berkeluarga)',
      'Kartu Keluarga & Surat Keterangan Usaha (SKU/NIB)',
      'Jaminan sertifikat / BPKB sesuai plafon'
    ],
    contactPerson: {
      name: 'Tim Pembiayaan UMKM',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    badge: 'Rekomendasi UMKM',
    minDeposit: 'Plafon s/d Rp 150 Jt',
    popular: true,
  },
  {
    id: 'pinjaman-pendidikan',
    category: 'pinjaman',
    categoryLabel: 'Produk Pinjaman',
    name: 'PINJAMAN PENDIDIKAN',
    fullName: 'Biaya Sekolah & Kuliah',
    akad: 'Qardh / Murabahah',
    shortDesc: 'Ringan untuk pelajar dan mahasiswa, angsuran menyesuaikan kalender akademik.',
    fullDesc: 'Solusi dana talangan pendidikan untuk pendaftaran sekolah, uang gedung, SPP semester, hingga biaya wisuda perguruan tinggi dengan skema kebajikan (Qardhul Hasan) atau Murabahah.',
    benefits: [
      'Margin sangat ringan & peduli umat',
      'Jadwal angsuran diselaraskan dengan pemasukan orang tua',
      'Pencairan langsung ke rekening institusi pendidikan atau orang tua',
      'Bebas denda keterlambatan yang berunsur riba'
    ],
    requirements: [
      'KTP Orang Tua/Wali & Kartu Keluarga',
      'Surat tagihan / bukti pendaftaran dari sekolah atau kampus',
      'Slip gaji atau surat keterangan penghasilan'
    ],
    contactPerson: {
      name: 'Layanan Pendidikan Berkah',
      phone: '0813-0000-0001',
      waNumber: '6281300000001'
    },
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badge: 'Peduli Pendidikan',
    minDeposit: 'Plafon s/d Rp 30 Jt',
    popular: false,
  },

  // PRODUK PEMBIAYAAN
  {
    id: 'tabungan-rumah',
    category: 'pembiayaan',
    categoryLabel: 'Produk Pembiayaan',
    name: 'TABUNGAN RUMAH',
    fullName: 'Rencana Kepemilikan Rumah',
    akad: 'Mudharabah Muqayyadah',
    shortDesc: 'Setoran bertahap menuju DP rumah impian dengan bagi hasil menarik.',
    fullDesc: 'Program pembiayaan kepemilikan dan renovasi rumah hunian syariah. Koperasi membantu perencanaan dana awal (DP) hingga pembiayaan pembelian properti tanpa bank konvensional.',
    benefits: [
      'Bagi hasil khusus yang dialokasikan langsung untuk tabungan DP',
      'Bimbingan verifikasi legalitas developer properti syariah',
      'Skema cicilan tetap (fixed) sampai lunas tanpa bunga mengambang',
      'Proses akad jelas dan transparan'
    ],
    requirements: [
      'KTP, KK, NPWP & Surat Nikah',
      'Slip gaji / Rekening koran 3 bulan terakhir',
      'Data lokasi atau rumah yang diminati'
    ],
    contactPerson: {
      name: 'Konsultan Properti Syariah PMA',
      phone: '0813-0000-0002',
      waNumber: '6281300000002'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'Hunian Berkah',
    minDeposit: 'Plafon s/d Rp 350 Jt',
    popular: true,
  },
  {
    id: 'murabahah',
    category: 'pembiayaan',
    categoryLabel: 'Produk Pembiayaan',
    name: 'MURABAHAH',
    fullName: 'Jual Beli dengan Margin Jelas',
    akad: 'Murabahah',
    shortDesc: 'Pembiayaan barang modal/konsumtif dengan harga dan margin transparan di awal.',
    fullDesc: 'Koperasi membelikan barang yang Anda butuhkan (kendaraan bermotor, mesin jahit, alat produksi, renovasi) lalu menjualnya kepada Anda dengan harga beli ditambah margin keuntungan yang disepakati bersama.',
    benefits: [
      'Harga perolehan dan keuntungan koperasi dijelaskan secara jujur',
      'Angsuran tetap setiap bulan dari awal hingga akhir',
      'Tidak ada denda berbunga saat terlambat',
      'Barang langsung menjadi hak milik anggota'
    ],
    requirements: [
      'KTP & Kartu Keluarga',
      'Surat penawaran harga / rincian barang yang dibutuhkan',
      'Agunan penjamin'
    ],
    contactPerson: {
      name: 'Tim Murabahah Barang',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    badge: 'Transparan & Pasti',
    minDeposit: 'Plafon Fleksibel',
    popular: false,
  },
  {
    id: 'musyarakah',
    category: 'pembiayaan',
    categoryLabel: 'Produk Pembiayaan',
    name: 'MUSYARAKAH',
    fullName: 'Kongsi Modal Usaha',
    akad: 'Musyarakah',
    shortDesc: 'Kongsi modal antara koperasi dan anggota, bagi hasil sesuai nisbah.',
    fullDesc: 'Kemitraan modal kerja usaha bersama. KSPPS PMA dan Anda sama-sama menyertakan modal pada suatu proyek atau usaha yang menguntungkan dengan nisbah bagi hasil yang disepakati.',
    benefits: [
      'Kemitraan berkeadilan sesuai syariat Islam',
      'Bagi hasil untung dan resiko ditanggung secara proporsional',
      'Cocok untuk ekspansi proyek, pengadaan tender, atau usaha konveksi massal',
      'Dukungan jaringan relasi koperasi di Cirebon'
    ],
    requirements: [
      'Proposal usaha atau kontrak kerja / SPK proyek',
      'Laporan keuangan usaha minimal 6 bulan',
      'Legalitas usaha dan identitas anggota'
    ],
    contactPerson: {
      name: 'Divisi Kemitraan Musyarakah',
      phone: '0813-1262-9486',
      waNumber: '6281312629486'
    },
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    badge: 'Kemitraan Adil',
    minDeposit: 'Plafon Kerjasama',
    popular: false,
  },
];

export const initialArticles = [
  {
    id: 'art-1',
    type: 'promo',
    title: 'Promo Berkah Ramadhan: Bebas Biaya Administrasi Tabungan & Hadiah Menarik',
    slug: 'promo-berkah-ramadhan',
    summary: 'Buka rekening tabungan TAMASKOP dan TAHARA selama bulan ini dan dapatkan merchandise eksklusif serta saldo tambahan.',
    content: `Dalam rangka menyambut bulan suci penuh berkah, KSPPS Perambabulan Makmur Abadi meluncurkan program spesial Promo Berkah Ramadhan untuk seluruh masyarakat di wilayah Cirebon dan sekitarnya.\n\nBagi anggota baru maupun anggota lama yang membuka rekening simpanan TAMASKOP atau menambah setoran TAHARA minimal Rp 100.000,-, berhak mendapatkan bingkisan sajadah eksklusif dan kupon undian Semarak Idul Fitri.\n\nSegera kunjungi kantor cabang Mertapada Kulon, Pasar Celancang, atau Gunung Jati!`,
    date: '2026-03-10',
    badge: 'Promo Spesial',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    author: 'Admin PMA',
    views: 428,
    active: true,
  },
  {
    id: 'art-2',
    type: 'berita',
    title: 'Rapat Anggota Tahunan (RAT) 2025: Aset KSPPS PMA Tumbuh Signifikan',
    slug: 'rat-kspps-pma-2025',
    summary: 'KSPPS PMA sukses menyelenggarakan RAT dengan capaian peningkatan aset dan pembagian Sisa Hasil Usaha (SHU) yang meningkat bagi seluruh anggota.',
    content: `Koperasi Simpan Pinjam dan Pembiayaan Syariah Perambabulan Makmur Abadi (KSPPS PMA) telah sukses menggelar Rapat Anggota Tahunan (RAT) Tahun Buku 2025 dengan penuh khidmat dan kebersamaan.\n\nDalam laporan pertanggungjawaban, Dewan Pengurus menyampaikan pertumbuhan aset dan peningkatan jumlah anggota yang kini telah menembus lebih dari 5.000 anggota aktif di 3 kantor cabang.\n\nKetua Pengurus menyampaikan terima kasih mendalam atas amanah dan kepercayaan masyarakat terhadap prinsip perbankan syariah yang dikelola dengan modern dan transparan.`,
    date: '2026-02-18',
    badge: 'Berita Koperasi',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    author: 'Humas KSPPS PMA',
    views: 890,
    active: true,
  },
  {
    id: 'art-3',
    type: 'promo',
    title: 'Program Pembiayaan UMKM Konveksi & Jahit: Margin Super Ringan 0.8%',
    slug: 'pembiayaan-umkm-konveksi',
    summary: 'Mendukung tradisi penjahit lokal Cirebon, KSPPS PMA memberikan fasilitas pembiayaan mesin jahit dan bahan baku modal kerja dengan proses cepat 1 hari kerja.',
    content: `Sebagai koperasi yang lahir dari inisiatif para penjahit desa Bamabupa sejak tahun 1995, KSPPS PMA senantiasa menaruh perhatian besar pada para pengrajin, penjahit, dan pelaku UMKM lokal.\n\nMelalui skema Murabahah khusus mesin jahit industri, bordir, dan bahan baku kain, anggota dapat mengajukan pembiayaan dengan margin khusus 0.8% flat per bulan, tanpa denda dan proses verifikasi cepat satu hari kerja.\n\nSilakan hubungi customer service kami atau ajukan langsung lewat kalkulator pinjaman di website ini!`,
    date: '2026-02-05',
    badge: 'Promo UMKM',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    author: 'Divisi Pembiayaan',
    views: 612,
    active: true,
  },
  {
    id: 'art-4',
    type: 'berita',
    title: 'Pelatihan Literasi Keuangan Syariah untuk Pelajar dan Generasi Muda Cirebon',
    slug: 'pelatihan-literasi-keuangan-syariah',
    summary: 'KSPPS PMA mengadakan roadshow edukasi ke sekolah-sekolah untuk mengenalkan produk TAKOPNAS dan pentingnya menghindari pinjol ilegal.',
    content: `Guna membentengi generasi muda dari maraknya pinjaman online ilegal dan judi online, KSPPS PMA menggelar rangkaian seminar literasi keuangan syariah bertajuk "Muda Berkah, Bijak Mengelola Rupiah".\n\nKegiatan ini dihadiri ratusan siswa dan guru di wilayah Astanajapura dan sekitarnya. Siswa diajarkan prinsip menabung sejak dini melalui TAKOPNAS yang bebas biaya potongan administrasi.`,
    date: '2026-01-22',
    badge: 'Edukasi Umat',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    author: 'Tim CSR PMA',
    views: 345,
    active: true,
  }
];

export const initialTeam = [
  {
    id: 'founder-1',
    category: 'pendiri',
    role: 'Penggagas & Pendiri Utama',
    name: 'H. Ahmad Syukron, M.E.Sy.',
    title: 'Tokoh Penggagas Bamabupa 1995 & Pendiri Koperasi',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Tokoh penggerak ekonomi umat yang memelopori terbentuknya kelompok penjahit Bamabupa pada tahun 1995 hingga berkembang menjadi KSPPS PMA berbadan hukum nasional.',
    quote: '"Ekonomi umat akan bangkit manakala kita saling menguatkan dalam kejujuran, gotong royong, dan syariat Islam."',
    cv: {
      birthPlace: 'Cirebon, 12 Agustus 1968',
      pendidikan: [
        'S2 Magister Ekonomi Syariah - UIN Sunan Kalijaga Yogyakarta',
        'S1 Sarjana Hukum Islam - IAIN Syekh Nurjati Cirebon',
        'Pondok Pesantren Babakan Ciwaringin Cirebon'
      ],
      pengalaman: [
        'Pendiri & Penggagas Wadah Pemuda Penjahit Bamabupa (1995)',
        'Direktur LEPMM Perambabulan Mandiri (2001 - 2009)',
        'Ketua Dewan Pengawas Syariah KSPPS PMA (2010 - 2022)',
        'Penasihat Ahli Forum Komunikasi Koperasi Syariah Jawa Barat'
      ],
      sertifikasi: [
        'Sertifikasi Pengawas Syariah Perbankan & Koperasi (DSN-MUI)',
        'Sertifikasi Asesor Kompetensi Koperasi Jasa Keuangan (BNSP)'
      ],
      penghargaan: [
        'Tokoh Penggerak Koperasi Tingkat Kabupaten Cirebon (2019)',
        'Pengabdi Ekonomi Kerakyatan Syariah Jawa Barat (2023)'
      ]
    }
  },
  {
    id: 'pengurus-1',
    category: 'pengurus',
    role: 'Ketua Pengurus',
    name: 'Drs. H. Mulyadi, M.M.',
    title: 'Ketua Pengurus KSPPS PMA',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'Praktisi perkoperasian berpengalaman lebih dari 20 tahun dalam manajemen perbankan dan koperasi jasa keuangan mikro syariah di wilayah III Cirebon.',
    quote: '"Melayani dengan hati, mengawal amanah dengan teknologi modern dan keteguhan syariah."',
    cv: {
      birthPlace: 'Cirebon, 05 Maret 1973',
      pendidikan: [
        'S2 Magister Manajemen Keuangan - Universitas Swadaya Gunung Jati',
        'S1 Administrasi Niaga - Universitas Padjadjaran'
      ],
      pengalaman: [
        'Ketua Pengurus KSPPS PMA (2018 - Sekarang)',
        'Manajer Operasional LEPMM Perambabulan (2004 - 2010)',
        'Wakil Ketua Dewan Koperasi Pimpinan Daerah Kabupaten Cirebon (2020 - 2025)'
      ],
      sertifikasi: [
        'Sertifikasi Pengelola Koperasi Jasa Keuangan Syariah (BNSP Level 6)',
        'Certified Islamic Wealth Professional (CIWP)'
      ],
      penghargaan: [
        'Pengelola Koperasi Berprestasi Tingkat Provinsi Jawa Barat (2022)'
      ]
    }
  },
  {
    id: 'pengurus-2',
    category: 'pengurus',
    role: 'Sekretaris Pengurus',
    name: 'Ahmad Fauzi, S.E.I.',
    title: 'Sekretaris Pengurus KSPPS PMA',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Pakar tata kelola kelembagaan dan transformasi digital koperasi syariah yang mengawal integrasi layanan mobile dan modernisasi administrasi anggota.',
    quote: '"Koperasi modern adalah koperasi yang adaptif terhadap teknologi tanpa meninggalkan akar nilai gotong royong."',
    cv: {
      birthPlace: 'Cirebon, 24 November 1985',
      pendidikan: [
        'S1 Ekonomi Islam - STEI SEBI Jakarta',
        'Pelatihan Eksekutif Digital Governance Microfinance'
      ],
      pengalaman: [
        'Sekretaris Pengurus KSPPS PMA (2018 - Sekarang)',
        'Kepala Divisi Teknologi Informasi & Data Anggota KSPPS PMA (2012 - 2017)',
        'Konsultan Sistem Informasi Manajemen Koperasi Umat'
      ],
      sertifikasi: [
        'Sertifikasi Kompetensi Manajer Koperasi Simpan Pinjam Syariah (BNSP)',
        'Data Governance & Compliance Syariah Professional'
      ],
      penghargaan: [
        'Inovator Digitalisasi Koperasi Desa Cirebon (2023)'
      ]
    }
  },
  {
    id: 'pengurus-3',
    category: 'pengurus',
    role: 'Bendahara Pengurus',
    name: 'Hj. Siti Rohmah, S.Ak.',
    title: 'Bendahara Pengurus KSPPS PMA',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Akuntan syariah profesional yang mengawasi kepatuhan tata kelola keuangan, likuiditas, dan pembagian hasil usaha yang adil bagi seluruh anggota.',
    quote: '"Setiap rupiah tabungan anggota adalah titipan yang wajib dipertanggungjawabkan di dunia dan akhirat."',
    cv: {
      birthPlace: 'Kuningan, 17 Mei 1987',
      pendidikan: [
        'S1 Akuntansi - Universitas Airlangga Surabaya',
        'Pendidikan Profesi Akuntansi Syariah (SAS IAI)'
      ],
      pengalaman: [
        'Bendahara Pengurus KSPPS PMA (2019 - Sekarang)',
        'Senior Auditor Kantor Akuntan Publik (KAP) Spesialis Koperasi (2010 - 2018)',
        'Dosen Tamu Fiqih Muamalah Keuangan Mikro'
      ],
      sertifikasi: [
        'Sertifikat Akuntansi Syariah (SAS) - Ikatan Akuntan Indonesia',
        'Sertifikasi Manajemen Risiko Keuangan Syariah Koperasi'
      ],
      penghargaan: [
        'Penyusun Laporan Keuangan Koperasi Berpredikat Wajar Tanpa Pengecualian (WTP) Berturut-turut'
      ]
    }
  },
  {
    id: 'dps-1',
    category: 'dps',
    role: 'Ketua Dewan Pengawas Syariah',
    name: 'K.H. Mas\'ud Nawawi, Lc., M.Ag.',
    title: 'Ketua Dewan Pengawas Syariah (DPS)',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Ulama ahli fiqih muamalah lulusan Al-Azhar Kairo yang memastikan setiap akad, transaksi, dan produk KSPPS PMA 100% selaras dengan fatwa DSN-MUI.',
    quote: '"Keberkahan bukan hanya tentang keuntungan, melainkan tentang kesesuaian setiap langkah dengan ridho Allah SWT."',
    cv: {
      birthPlace: 'Cirebon, 14 Februari 1970',
      pendidikan: [
        'S2 Magister Agama Fiqih Muamalah Kontemporer - UIN Syarif Hidayatullah Jakarta',
        'S1 Syariah Islamiyyah - Universitas Al-Azhar Kairo, Mesir',
        'Pondok Pesantren Buntet Cirebon'
      ],
      pengalaman: [
        'Ketua Dewan Pengawas Syariah KSPPS PMA (2015 - Sekarang)',
        'Anggota Komisi Fatwa MUI Kabupaten Cirebon',
        'Pengasuh Majlis Taklim & Ma\'had Aly Fiqih Muamalah'
      ],
      sertifikasi: [
        'Dewan Pengawas Syariah Tersertifikasi Resmi DSN-MUI Pusat',
        'Ahli Syariah Pasar Modal & Keuangan Mikro'
      ],
      penghargaan: [
        'Pendidik & Pembina Muamalah Syariah Teladan Cirebon'
      ]
    }
  }
];

export const initialBranches = [
  {
    id: 'cabang-mertapada',
    name: 'KSPPS PMA Cabang Mertapada Kulon',
    tagline: 'Kantor Layanan Utama & Pusat',
    address: 'Jl. Pasar Mundu No. 123, Mertapada Kulon, Astanajapura, Kabupaten Cirebon, Jawa Barat 45181',
    phone: '0813-1262-9486',
    waNumber: '6281312629486',
    email: 'ksppspmamertapadakulon@gmail.com',
    operationalHours: 'Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 14.00 WIB | Minggu: Tutup',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Pasar+Mundu+No.+123,+Mertapada+Kulon,+Astanajapura,+Kabupaten+Cirebon,+Jawa+Barat+45181',
    isPusat: true,
  },
  {
    id: 'cabang-celancang',
    name: 'KSPPS PMA Cabang Pasar Celancang',
    tagline: 'Layanan Sentra Pedagang & Pasar',
    address: 'Jl. Pasar Celancang, Karangwangi, Depok, Kabupaten Cirebon, Jawa Barat',
    phone: '0813-0000-0001',
    waNumber: '6281300000001',
    email: 'ksppspma.celancang@gmail.com',
    operationalHours: 'Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 14.00 WIB | Minggu: Tutup',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Pasar+Celancang,+Karangwangi,+Depok,+Kabupaten+Cirebon,+Jawa+Barat',
    isPusat: false,
  },
  {
    id: 'cabang-gunungjati',
    name: 'KSPPS PMA Cabang Gunung Jati',
    tagline: 'Layanan Religi & Kawasan Utara',
    address: 'Jl. Sunan Gunung Jati, Cirebon Utara, Jawa Barat',
    phone: '0813-0000-0002',
    waNumber: '6281300000002',
    email: 'ksppspma.gunungjati@gmail.com',
    operationalHours: 'Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 14.00 WIB | Minggu: Tutup',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Sunan+Gunung+Jati,+Cirebon+Utara,+Jawa+Barat',
    isPusat: false,
  }
];

export const initialApplications = [
  {
    id: 'app-001',
    applicantName: 'Budi Santoso',
    phone: '081234567890',
    email: 'budi.santoso@email.com',
    branch: 'KSPPS PMA Cabang Mertapada Kulon',
    productType: 'PINJAMAN USAHA (Murabahah)',
    amount: 25000000,
    tenor: 12,
    monthlyInstallment: 2283333,
    purpose: 'Penambahan stok kain dan bahan konveksi gamis',
    status: 'Baru', // 'Baru', 'Dihubungi', 'Disetujui', 'Ditolak'
    createdAt: '2026-11-08 14:20',
    notes: 'Pemohon memiliki toko baju di Pasar Mundu, sudah berjalan 4 tahun.'
  },
  {
    id: 'app-002',
    applicantName: 'Siti Maryam',
    phone: '085799988771',
    email: 'siti.maryam@gmail.com',
    branch: 'KSPPS PMA Cabang Pasar Celancang',
    productType: 'PINJAMAN PENDIDIKAN (Qardh)',
    amount: 10000000,
    tenor: 6,
    monthlyInstallment: 1750000,
    purpose: 'Biaya registrasi semester anak kuliah di IAIN Cirebon',
    status: 'Dihubungi',
    createdAt: '2026-11-07 10:15',
    notes: 'Sudah dihubungi admin via WA, berkas KK dan KTP sedang disiapkan.'
  }
];

export const initialContactMessages = [
  {
    id: 'msg-001',
    name: 'Hendra Gunawan',
    phone: '081987654321',
    email: 'hendra.gun@yahoo.com',
    branch: 'KSPPS PMA Cabang Gunung Jati',
    subject: 'Konsultasi Tabungan Qurban TAQORUB',
    message: 'Assalamu alaikum, saya mau tanya apakah untuk qurban sapi kelompok bisa dikoordinir langsung oleh KSPPS PMA? Terima kasih.',
    status: 'Belum Dibalas',
    createdAt: '2026-11-09 09:12'
  },
  {
    id: 'msg-002',
    name: 'Nurul Hidayati',
    phone: '082212344321',
    email: 'nurul.h@gmail.com',
    branch: 'KSPPS PMA Cabang Mertapada Kulon',
    subject: 'Pendaftaran Anggota Koperasi',
    message: 'Selamat pagi, syarat untuk menjadi anggota dan membuka tabungan TAMASKOP apa saja ya pak? Apakah bisa dijemput ke rumah?',
    status: 'Sudah Dibalas',
    createdAt: '2026-11-06 16:45'
  }
];

// DATA LAPORAN KEUANGAN & PERKEMBANGAN (GRAFIK & TABEL 2021-2025 SESUAI BUKU KSPPS PMA)
export const initialFinancialReports = {
  years: ['2021', '2022', '2023', '2024', '2025'],
  aktiva: {
    title: 'Perkembangan Aset (Aktiva)',
    subtitle: 'Data Perkembangan Aset Tahun 2021 s.d 2025 (Dalam Rupiah)',
    unit: 'Rp',
    items: [
      {
        id: 'aktiva-1',
        name: 'Aktiva Lancar',
        color: '#10b981',
        values: {
          '2021': 28596372414,
          '2022': 29560567779,
          '2023': 30307890217,
          '2024': 29020502088,
          '2025': 32324691933
        }
      },
      {
        id: 'aktiva-2',
        name: 'Aktiva Tetap',
        color: '#059669',
        values: {
          '2021': 1525277203,
          '2022': 2220612203,
          '2023': 2377691203,
          '2024': 2608158397,
          '2025': 2743271803
        }
      },
      {
        id: 'aktiva-3',
        name: 'Aktiva Lain-lain',
        color: '#047857',
        values: {
          '2021': 228316695,
          '2022': 240316640,
          '2023': 1436316640,
          '2024': 2044928342,
          '2025': 679698656
        }
      }
    ]
  },
  pasiva: {
    title: 'Pasiva',
    subtitle: 'Kewajiban, Modal Sendiri, dan SHU Tahun 2021 s.d 2025 (Dalam Rupiah)',
    unit: 'Rp',
    items: [
      {
        id: 'pasiva-1',
        name: 'Kewajiban',
        color: '#3b82f6',
        values: {
          '2021': 32704318849,
          '2022': 35137866659,
          '2023': 37611138382,
          '2024': 33673588827,
          '2025': 35765662392
        }
      },
      {
        id: 'pasiva-2',
        name: 'Modal Sendiri',
        color: '#2563eb',
        values: {
          '2021': 1960532985,
          '2022': 2346699610,
          '2023': 2635572988,
          '2024': 2888539177,
          '2025': 3154121214
        }
      },
      {
        id: 'pasiva-3',
        name: 'SHU',
        color: '#1d4ed8',
        values: {
          '2021': 197090445,
          '2022': 350321171,
          '2023': 443248235,
          '2024': 186387242,
          '2025': 164745654
        }
      }
    ]
  },
  permodalan: {
    title: 'Permodalan',
    subtitle: 'Simpanan Anggota dan Simpanan Sukarela Tahun 2021 s.d 2025 (Dalam Rupiah)',
    unit: 'Rp',
    items: [
      {
        id: 'modal-1',
        group: 'Simpanan Anggota',
        name: 'Simpanan Pokok',
        color: '#f59e0b',
        values: {
          '2021': 182558500,
          '2022': 205688500,
          '2023': 228489000,
          '2024': 378380167,
          '2025': 389952814
        }
      },
      {
        id: 'modal-2',
        group: 'Simpanan Anggota',
        name: 'Simpanan Wajib',
        color: '#d97706',
        values: {
          '2021': 1205436533,
          '2022': 1394424373,
          '2023': 1524320029,
          '2024': 1834376849,
          '2025': 2076850897
        }
      },
      {
        id: 'modal-3',
        group: 'Simpanan Sukarela',
        name: 'Simp. Tamaskop',
        color: '#b45309',
        values: {
          '2021': 17068773271,
          '2022': 17437008533,
          '2023': 17275126602,
          '2024': 17418083623,
          '2025': 19342228069
        }
      },
      {
        id: 'modal-4',
        group: 'Simpanan Sukarela',
        name: 'Simp. Berjangka',
        color: '#78350f',
        values: {
          '2021': 9304100000,
          '2022': 10372500000,
          '2023': 10945460000,
          '2024': 8562500000,
          '2025': 9157000000
        }
      }
    ]
  },
  usahaKeuangan: {
    title: 'Data Usaha dan Keuangan',
    subtitle: 'Pembiayaan, Pendapatan Bruto, dan SHU Sebelum Pajak Tahun 2021 s.d 2025',
    unit: 'Rp',
    items: [
      {
        id: 'usaha-1',
        name: 'Pembiayaan',
        color: '#8b5cf6',
        values: {
          '2021': 19244481545,
          '2022': 22950308118,
          '2023': 25277640892,
          '2024': 24111902244,
          '2025': 25896794557
        }
      },
      {
        id: 'usaha-2',
        name: 'Pendapatan Bruto',
        color: '#7c3aed',
        values: {
          '2021': 3066686523,
          '2022': 3781105346,
          '2023': 4343795775,
          '2024': 4141999662,
          '2025': 4055787199
        }
      },
      {
        id: 'usaha-3',
        name: 'SHU Sebelum Pajak',
        color: '#6d28d9',
        values: {
          '2021': 197090445,
          '2022': 350321171,
          '2023': 443248235,
          '2024': 186387242,
          '2025': 164745654
        }
      }
    ]
  },
  keanggotaan: {
    title: 'Keanggotaan',
    subtitle: 'Rincian Jumlah Anggota dari Tahun 2021 s.d 2025 (Per 31 Desember 2024)',
    unit: 'Orang',
    items: [
      {
        id: 'anggota-1',
        name: 'Babadan',
        color: '#0ea5e9',
        values: {
          '2021': 1243,
          '2022': 1552,
          '2023': 1426,
          '2024': 2678,
          '2025': 2466
        }
      },
      {
        id: 'anggota-2',
        name: 'Mertapada Kulon',
        color: '#0284c7',
        values: {
          '2021': 270,
          '2022': 319,
          '2023': 352,
          '2024': 492,
          '2025': 528
        }
      },
      {
        id: 'anggota-3',
        name: 'Pasar Celancang',
        color: '#0369a1',
        values: {
          '2021': 484,
          '2022': 589,
          '2023': 654,
          '2024': 878,
          '2025': 981
        }
      }
    ]
  }
};

// DATA BIDANG SPIRITUAL DAN SOSIAL (DARI BUKU KSPPS PMA)
export const initialSpiritualSocial = {
  spiritual: {
    title: 'Spiritual (Keagamaan)',
    tagline: 'Pembinaan Ruhiyah & Karakter Syariah',
    desc: 'Pembinaan spiritual pengurus, pengelola, anggota, serta masyarakat sekitar melalui kegiatan-kegiatan rutin:',
    activities: [
      { id: 'act-1', name: 'Doa Bersama', desc: 'Doa bersama secara khusyuk sebelum memulai jam kerja dan setelah menyelesaikan jam kerja setiap hari.' },
      { id: 'act-2', name: 'Salat Duha Berjamaah', desc: 'Membiasakan salat sunnah Duha sebagai ikhtiar pembuka pintu rezeki yang berkah dan halal.' },
      { id: 'act-3', name: 'Jamiyah Yasin', desc: 'Kajian dan pembacaan surat Yasin bersama untuk mempererat ukhuwah islamiyah antar pengelola dan anggota.' },
      { id: 'act-4', name: 'Tausiyah Bulanan', desc: 'Siraman rohani berkala bersama para alim ulama dan ustadz Cirebon guna menguatkan komitmen fiqih muamalah.' },
      { id: 'act-5', name: 'Ziarah Wali & Alim Ulama', desc: 'Kegiatan ziarah ke makam para wali songo dan alim ulama untuk meneladani perjuangan dakwah Islam.' },
      { id: 'act-6', name: 'Tadarus Al-Qur\'an', desc: 'Membaca dan mentadabburi ayat-ayat suci Al-Qur\'an secara rutin di seluruh kantor cabang.' }
    ]
  },
  sosial: {
    title: 'Sosial dan Pendidikan',
    tagline: 'Amanah Keumatan & Filantropi Islam',
    programs: [
      {
        id: 'baitulmal',
        name: 'Baitulmal',
        badge: 'Pengelolaan ZIS',
        icon: 'Coins',
        desc: 'Unit pengelola dana sosial keagamaan yang berfokus pada kemaslahatan umat dhuafa.',
        points: [
          'Menampung zakat, infak, dan sedekah masyarakat untuk disampaikan secara langsung kepada fakir miskin, orang yang membutuhkan, atau siapa pun yang berhak (asnaf).',
          'Turut serta aktif dalam menunjang peningkatan sarana dan prasarana tempat ibadah, masjid, dan musholla di wilayah Cirebon.'
        ]
      },
      {
        id: 'santunan',
        name: 'Santunan',
        badge: 'Kepedulian Sosial & Taawun',
        icon: 'HeartHandshake',
        desc: 'Bantuan kemanusiaan dan jaminan tolong-menolong syariah antar sesama anggota.',
        points: [
          'Menyantuni anak yatim, piatu, yatim piatu, para jompo, dan kaum dhuafa secara berkesinambungan.',
          'Melalui Program Taawun, lembaga bisa menanggung asuransi/pembebasan bagi anggota yang meninggal dunia ketika masih memiliki tanggungan pembiayaan.'
        ]
      },
      {
        id: 'perambabulan-pintar',
        name: 'Perambabulan Pintar',
        badge: 'Beasiswa Pendidikan Yatim Piatu',
        icon: 'GraduationCap',
        desc: 'Program pendidikan berkelanjutan untuk mewujudkan masa depan anak yatim berprestasi.',
        points: [
          'Program pemberian santunan dan biaya pendidikan kepada siswa yang berstatus yatim piatu.',
          'Tahun 2025 memasuki tahun ke-9 dengan jumlah siswa yang mendapat santunan 5 siswa binaan.',
          'Program ini bersifat umum dan siap menerima titipan zakat, infaq maupun sedekah dari para sahabat donatur Perambabulan.'
        ],
        rekening: '103-01-002278',
        atasNama: 'Perambabulan Pintar'
      }
    ]
  }
};

// DATA STATISTIK PENGUNJUNG WEBSITE
export const initialVisitorStats = {
  total: 14285,
  today: 142,
  todayDate: new Date().toISOString().split('T')[0],
  monthly: 3840,
  online: 8,
  devices: {
    mobile: 68,
    desktop: 28,
    tablet: 4
  },
  browsers: {
    Chrome: 72,
    Safari: 15,
    Edge: 8,
    Firefox: 5
  },
  popularPages: {
    home: 7420,
    products: 4180,
    calculator: 2860,
    about: 1450,
    branches: 920
  },
  dailyHistory: [
    { date: '05 Nov', visits: 118 },
    { date: '06 Nov', visits: 135 },
    { date: '07 Nov', visits: 110 },
    { date: '08 Nov', visits: 148 },
    { date: '09 Nov', visits: 162 },
    { date: '10 Nov', visits: 150 },
    { date: '11 Nov', visits: 142 }
  ],
  recentLogs: [
    { id: 1, time: 'Baru saja', page: 'Beranda (Home)', device: 'Mobile Android', ip: '180.252.***.***', status: 'Aktif' },
    { id: 2, time: '3 mnt lalu', page: 'Kalkulator Pembiayaan', device: 'Desktop Windows', ip: '114.122.***.***', status: 'Selesai' },
    { id: 3, time: '7 mnt lalu', page: 'Produk Simpanan (TAMASKOP)', device: 'Mobile iOS', ip: '182.1.***.***', status: 'Selesai' },
    { id: 4, time: '12 mnt lalu', page: 'Tentang Kami & Profil CV', device: 'Desktop Mac', ip: '139.195.***.***', status: 'Selesai' },
    { id: 5, time: '18 mnt lalu', page: 'Jaringan Kantor Cabang', device: 'Mobile Android', ip: '36.72.***.***', status: 'Selesai' }
  ]
};

// DATA LEGALITAS RESMI KSPPS PMA
export const initialLegality = [
  {
    id: 'leg-1',
    letter: 'a',
    title: 'Akta Pendirian Badan Hukum',
    number: 'No. 06/BH/DIS-KOP/V/2001',
    category: 'Badan Hukum',
    issuer: 'Dinas Koperasi',
    date: 'Mei 2001',
    description: 'Pengesahan akta pendirian awal badan hukum KSPPS Perambabulan Makmur Abadi.',
    badge: 'Akta Pendirian',
    active: true
  },
  {
    id: 'leg-2',
    letter: 'b',
    title: 'Akta Perubahan I Badan Hukum',
    number: 'No.: 06/BH/PAD/DIS.KOP/X/2004',
    category: 'Perubahan Anggaran Dasar',
    issuer: 'Dinas Koperasi',
    date: 'Oktober 2004',
    description: 'Akta perubahan anggaran dasar pertama badan hukum koperasi.',
    badge: 'Perubahan I',
    active: true
  },
  {
    id: 'leg-3',
    letter: 'c',
    title: 'Akta Perubahan II Badan Hukum',
    number: 'No.: 08/BH/PAD/KUMKM/2015',
    category: 'Perubahan Anggaran Dasar',
    issuer: 'Kementerian KUMKM',
    date: 'Tahun 2015',
    description: 'Akta perubahan anggaran dasar kedua badan hukum koperasi.',
    badge: 'Perubahan II',
    active: true
  },
  {
    id: 'leg-4',
    letter: 'd',
    title: 'Akta Perubahan III Badan Hukum',
    number: 'No.: AHU-0000425.Ah.01.38.Tahun 2022',
    category: 'Kemenkumham RI',
    issuer: 'Kemenkumham RI (AHU Online)',
    date: 'Tahun 2022',
    description: 'Pengesahan perubahan anggaran dasar koperasi secara elektronik melalui Ditjen AHU Kemenkumham.',
    badge: 'AHU Kemenkumham',
    active: true
  },
  {
    id: 'leg-5',
    letter: 'e',
    title: 'Izin Usaha Simpan Pinjam',
    number: '518/034/Bidang Koperasi tanggal 21 Desember 2015',
    category: 'Izin Operasional',
    issuer: 'Bidang Koperasi',
    date: '21 Desember 2015',
    description: 'Surat Izin Usaha Simpan Pinjam dan Pembiayaan Syariah operasional resmi KSPPS PMA.',
    badge: 'Izin Operasional',
    active: true
  },
  {
    id: 'leg-6',
    letter: 'f',
    title: 'Surat Izin Usaha Perdagangan (SIUP)',
    number: 'No. 0539/10-23/PK/V/2016',
    category: 'Izin Usaha',
    issuer: 'Dinas Penanaman Modal & Pelayanan Terpadu',
    date: 'Mei 2016',
    description: 'Surat Izin Usaha Perdagangan resmi yang sah dan terdaftar.',
    badge: 'SIUP',
    active: true
  },
  {
    id: 'leg-7',
    letter: 'g',
    title: 'Tanda Daftar Perusahaan (TDP)',
    number: 'No. 10222650288 tanggal 20 Mei 2016',
    category: 'Pendaftaran Perusahaan',
    issuer: 'Dinas Perindustrian & Perdagangan',
    date: '20 Mei 2016',
    description: 'Tanda Daftar Perusahaan resmi sebagai legalitas badan usaha koperasi.',
    badge: 'TDP',
    active: true
  },
  {
    id: 'leg-8',
    letter: 'h',
    title: 'Perizinan Berusaha Berbasis Risiko (NIB)',
    number: 'Nomor Induk Berusaha : 2205220004135',
    category: 'NIB OSS RBA',
    issuer: 'Kementerian Investasi / BKPM (OSS RBA)',
    date: 'Terdaftar & Aktif',
    description: 'Perizinan Berusaha Berbasis Risiko Nasional terintegrasi sistem Online Single Submission (OSS).',
    badge: 'NIB OSS RBA',
    active: true
  },
  {
    id: 'leg-9',
    letter: 'i',
    title: 'Sertifikat Nomor Induk Koperasi (NIK)',
    number: '3209280030002',
    category: 'Kemenkop & UKM RI',
    issuer: 'Kementerian Koperasi dan UKM RI',
    date: 'Terverifikasi Aktif & Sehat',
    description: 'Sertifikat Nomor Induk Koperasi yang membuktikan koperasi terdaftar resmi, aktif, dan sehat di Kemenkop RI.',
    badge: 'NIK Kemenkop',
    active: true
  },
  {
    id: 'leg-10',
    letter: 'j',
    title: 'Sertifikasi Kompetensi Pengurus & Pengawas',
    number: 'Sertifikasi Kompetensi Tahun 2025',
    category: 'Standar Kompetensi SDM',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: 'Tahun 2025',
    description: 'Seluruh jajaran Pengurus dan Pengawas memiliki Sertifikasi Standar Kompetensi resmi di bidang pengelolaan koperasi syariah.',
    badge: 'Kompetensi 2025',
    active: true
  }
];

// DATA TESTIMONI & ULASAN ANGGOTA KSPPS PMA
export const initialTestimonials = [
  {
    id: 'testi-1',
    name: 'H. Sudirman',
    role: 'Pedagang Grosir Beras, Pasar Celancang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '10 Februari 2026',
    branch: 'Cabang Celancang',
    badge: 'Anggota Sejak 2017',
    content: 'Alhamdulillah, pembiayaan modal usaha syariah di KSPPS PMA sangat membantu perputaran stok toko beras saya. Prosesnya cepat, tanpa riba, dan angsurannya transparan sesuai akad murabahah.',
    productUsed: 'Pembiayaan Modal Kerja Syariah',
    active: true
  },
  {
    id: 'testi-2',
    name: 'Ibu Hj. Siti Nurhasanah',
    role: 'Pengusaha Konveksi & Jahit, Mertapada',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '28 Januari 2026',
    branch: 'Cabang Mertapada',
    badge: 'Penabung Aktif',
    content: 'Saya mempercayakan simpanan kurban dan TAMASKOP di KSPPS PMA sejak 6 tahun lalu. Bagi hasilnya berkah, pelayanannya ramah seperti keluarga sendiri, dan penarikan sangat mudah saat dibutuhkan.',
    productUsed: 'Simpanan Sukarela TAMASKOP',
    active: true
  },
  {
    id: 'testi-3',
    name: 'Ahmad Fauzi, S.Pd.',
    role: 'Guru & Wirausaha Toko ATK, Babadan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '15 Januari 2026',
    branch: 'Kantor Pusat Babadan',
    badge: 'Anggota Aktif',
    content: 'Pengajuan pembiayaan renovasi tempat usaha di KSPPS PMA sangat jelas mekanismenya. Tidak ada biaya siluman atau bunga berbunga. Pelayanan stafnya santun dan amanah.',
    productUsed: 'Pembiayaan Multiguna',
    active: true
  },
  {
    id: 'testi-4',
    name: 'Ibu Ratna Dewi',
    role: 'Peternak Ayam Petelur, Cirebon Timur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '03 Januari 2026',
    branch: 'Cabang Celancang',
    badge: 'Penerima Pembiayaan',
    content: 'Koperasi yang benar-benar memajukan perekonomian umat di pedesaan Cirebon. Selain urusan bisnis, ada kegiatan pengajian rutin dan santunan anak yatim melalui program Baitulmal.',
    productUsed: 'Pembiayaan Usaha Mikro Syariah',
    active: true
  },
  {
    id: 'testi-5',
    name: 'Kusnan Saprudin',
    role: 'Pengemudi Armada Distribusi & Anggota',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '20 Desember 2025',
    branch: 'Cabang Mertapada',
    badge: 'Simpanan Berjangka',
    content: 'Sangat puas dengan simpanan berjangka mudharabah di KSPPS PMA. Setiap RAT selalu transparan laporannya, SHU dibagikan tepat waktu, dan pengurusnya sangat amanah.',
    productUsed: 'Simpanan Berjangka (Deposito)',
    active: true
  }
];




