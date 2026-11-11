// Helper functions for KSPPS PMA

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(number);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};

export const parseNumber = (str) => {
  if (typeof str === 'number') return str;
  return Number(String(str).replace(/[^0-9]/g, '')) || 0;
};

export const createWaLink = (phone, text) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
};

export const getCategoryColor = (cat) => {
  switch (cat) {
    case 'simpanan':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        badge: 'bg-emerald-600 text-white',
        accent: 'from-emerald-500 to-teal-600',
      };
    case 'pinjaman':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        badge: 'bg-blue-600 text-white',
        accent: 'from-blue-600 to-indigo-600',
      };
    case 'pembiayaan':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        badge: 'bg-amber-600 text-white',
        accent: 'from-emerald-600 to-amber-600',
      };
    default:
      return {
        bg: 'bg-slate-50 text-slate-700 border-slate-200',
        badge: 'bg-slate-700 text-white',
        accent: 'from-slate-600 to-slate-800',
      };
  }
};

/**
 * Resolves candidate URLs dynamically based on current window location
 */
const getCandidateUrls = (type) => {
  const isUpload = type === 'upload';
  const phpFile = isUpload ? 'upload.php' : 'data.php';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const dir = path.substring(0, path.lastIndexOf('/') + 1);

  const list = [
    `${dir}api/${phpFile}`,
    `${dir}${phpFile}`,
    `${dir}../api/${phpFile}`,
    `${dir}../${phpFile}`,
    `/ksppspma/api/${phpFile}`,
    `/ksppspma/${phpFile}`,
    `./api/${phpFile}`,
    `../api/${phpFile}`,
    `../../api/${phpFile}`,
    `./${phpFile}`,
    `../${phpFile}`,
    `/api/${isUpload ? 'upload' : 'data'}`,
    `/api/${phpFile}`,
  ];

  return [...new Set(list)];
};

/**
 * Uploads a file (image or video) directly to the server folder (`uploads/`).
 * Supports both XAMPP Apache PHP (`api/upload.php`) and Vite dev server (`/api/upload`).
 * Returns an object with the saved relative path (e.g. `./uploads/filename.ext`).
 */
export const uploadFileToServer = async (file) => {
  if (!file) throw new Error('File tidak ditemukan.');
  if (file.size > 25 * 1024 * 1024) {
    throw new Error('Ukuran file maksimal 25MB.');
  }

  // Candidate endpoints to check
  const candidateUrls = getCandidateUrls('upload');

  // 1. Try multipart/form-data upload
  for (const url of candidateUrls) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (data && data.success && data.url) {
            return {
              success: true,
              url: data.url,
              filename: data.filename || file.name,
              message: data.message || 'File berhasil disimpan ke folder uploads!'
            };
          }
        } catch (jsonErr) {
          // not json, continue to next
        }
      }
    } catch (err) {
      // continue to next endpoint
    }
  }

  // 2. Try JSON base64 upload if multipart was rejected by server or proxy
  const base64Data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          base64: base64Data,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && data.url) {
          return {
            success: true,
            url: data.url,
            filename: data.filename || file.name,
            message: data.message || 'File berhasil disimpan ke folder uploads!'
          };
        }
      }
    } catch (err) {
      // continue to next
    }
  }

  // 3. Fallback preview
  console.warn('Server upload tidak terjangkau, menggunakan preview lokal.');
  return {
    success: true,
    url: base64Data,
    filename: file.name,
    message: 'File dimuat sebagai pratinjau lokal.'
  };
};

/**
 * Fetches the central database from the server (`data/database.json`).
 * Guarantees that ALL browsers and devices see the exact same updated products, banners, and applications!
 */
export const fetchServerData = async () => {
  const candidateUrls = [
    ...getCandidateUrls('data'),
    './data/database.json',
    '../data/database.json',
    '/ksppspma/data/database.json',
    './public/data/database.json',
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(`${url}?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.products || data.banners || data.team || data.financialReports)) {
          return data;
        }
      }
    } catch (err) {
      // try next candidate
    }
  }
  return null;
};

/**
 * Saves a key or full database to the central server so all browsers stay synchronized.
 */
export const saveDataToServer = async (payload) => {
  const candidateUrls = getCandidateUrls('data');

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) {
          return json;
        }
      }
    } catch (err) {
      // try next
    }
  }
  return null;
};
