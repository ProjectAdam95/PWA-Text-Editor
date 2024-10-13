const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache assets using self.__WB_MANIFEST (automatically injected by Workbox)
precacheAndRoute(self.__WB_MANIFEST);

// Cache manifest.json explicitly
precacheAndRoute([
  { url: '/manifest.json', revision: null }
]);

// Manually precache the icons
precacheAndRoute([
  { url: '/assets/icons/icon_96x96.png', revision: null },
  { url: '/assets/icons/icon_128x128.png', revision: null },
  { url: '/assets/icons/icon_192x192.png', revision: null },
  { url: '/assets/icons/icon_256x256.png', revision: null },
  { url: '/assets/icons/icon_384x384.png', revision: null },
  { url: '/assets/icons/icon_512x512.png', revision: null }
]);

// Cache page navigations (HTML)
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Pre-cache important pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigations (HTML)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching (CSS, JS, Images, Workers)
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60, 
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30, 
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);
