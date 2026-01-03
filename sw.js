// Service Worker for arXiv Batch Downloader
// Version: 0.1.0

const CACHE_NAME = 'arxiv-dl-v0.1.3';
const STATIC_ASSETS = [
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './screenshot-wide.png',
    './screenshot-narrow.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - network first for app shell, skip caching for proxied requests
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Don't cache proxy requests (they contain PDF data)
    if (url.href.includes('corsproxy.io') ||
        url.href.includes('allorigins.win') ||
        url.href.includes('cors-anywhere') ||
        url.href.includes('arxiv.org')) {
        return;
    }

    // Don't cache POST requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Network first, fallback to cache for app shell
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone the response before caching
                const responseClone = response.clone();

                // Only cache successful responses for our own assets
                if (response.ok && url.origin === self.location.origin) {
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, responseClone));
                }

                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }

                        // Nothing in cache
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});
