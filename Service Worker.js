// Define the cache name and the list of URLs you want to cache for offline availability
const CACHE_NAME = 'alva-pos-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
// The install event is fired when the service worker is being installed.
// We use it to pre-cache the application shell and static assets.
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch assets from cache
// The fetch event intercepts network requests and allows us to serve cached responses if available.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the cached response
        if (response) {
          return response;
        }
        
        // Not in cache - fall back to standard network request
        return fetch(event.request);
      })
  );
});