const CACHE_NAME = 'canexam-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

// Install event - cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache).catch(() => {
                // Silently fail if some resources aren't available yet
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found
            if (response) {
                return response;
            }

            // Otherwise fetch from network
            return fetch(event.request)
                .then((response) => {
                    // Don't cache non-successful responses
                    if (
                        !response ||
                        response.status !== 200 ||
                        response.type !== 'basic'
                    ) {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache successful responses
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                })
                .catch(() => {
                    // Return cached response if network fails
                    return caches.match(event.request);
                });
        })
    );
});
