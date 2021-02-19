const dataCacheName = 'avafor-data-v1';
const cacheName = 'avafor-v1';
const baseUrl = '/avalanche-forecast/'
const filesToCache = [
  baseUrl,
  baseUrl + 'index.html',
  baseUrl + 'favicon.ico',
  baseUrl + 'css/color.css',
  baseUrl + 'css/fonts.css',
  baseUrl + 'css/layout.css',
  baseUrl + 'css/material-icons.css',
  baseUrl + 'css/normalize.css',
  baseUrl + 'css/style.css',
  baseUrl + 'fonts/MaterialIcons-Regular.woff2',
  baseUrl + 'js/bundle.js'
];

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');

  self.skipWaiting();

  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', e => {
  console.debug('[ServiceWorker] activate');

  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== cacheName && key != dataCacheName) {
          console.debug('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      })))
  );

  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url);
  const dataUrl = 'https://api.avalanche.org/v2/public/products/map-layer/NWAC';

  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(cache => {
        return fetch(e.request)
          .then(response => {
            cache.put(e.request.url, response.clone());
            return response;
          })
          .catch(reason => cache.match(e.request.url));
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    console.log('[Service Worker] using cache data');
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request);
      })
    );
  }
});
