// A simple Service Worker to make the app installable
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // Pass through all requests to the network
  e.respondWith(fetch(e.request));
});