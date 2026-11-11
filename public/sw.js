// KSPPS PMA - Service Worker v1.0
// Offline-First Progressive Web App

const CACHE_NAME = 'kspps-pma-v1';
const STATIC_CACHE = 'kspps-pma-static-v1';
const DYNAMIC_CACHE = 'kspps-pma-dynamic-v1';

// Core assets to cache immediately on install (lightweight shell)
const STATIC_ASSETS = [
  './',
  './index.html',
  './Logo.jpeg',
  './manifest.json',
  './icons/icon-192x192.png',
];

// Install: Cache core static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing KSPPS PMA Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => {
          return new Request(url, { cache: 'reload' });
        })).catch(err => {
          console.warn('[SW] Some static assets failed to cache:', err);
          // Cache what we can, don't fail the entire install
          return Promise.allSettled(
            STATIC_ASSETS.map(url => 
              cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
            )
          );
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating KSPPS PMA Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for API, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension, about:, etc
  if (!url.protocol.startsWith('http')) return;

  // API calls: Network-first strategy
  if (url.pathname.includes('/api/') || url.pathname.includes('.php')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Uploaded files and dynamic content: Network-first with cache fallback
  if (url.pathname.includes('/uploads/') || url.pathname.includes('/data/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets (JS, CSS, images, fonts): Cache-first strategy
  event.respondWith(cacheFirst(request));
});

// Cache-First: Try cache, fallback to network and update cache
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Revalidate in background
      fetchAndCache(request).catch(() => {});
      return cachedResponse;
    }
    return await fetchAndCache(request);
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('./index.html');
      if (offlinePage) return offlinePage;
    }
    
    return new Response('Offline - Konten tidak tersedia', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Network-First: Try network, fallback to cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone()).catch(() => {});
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('./index.html');
      if (offlinePage) return offlinePage;
    }
    
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Helper: Fetch and put into dynamic cache
async function fetchAndCache(request) {
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHES') {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
});

