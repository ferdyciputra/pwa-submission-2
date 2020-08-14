// import { precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
    ignoreUrlParametersMatching: [/.*/],
});

// workbox.precaching.precacheAndRoute([
//     { url: '/', revision: '1' },
//     { url: '/manifest.json', revision: '1' },
//     { url: '/src/nav.html', revision: '1' },
//     { url: '/src/index.html', revision: '1' },
//     { url: '/src/detail-team.html', revision: '1' },
//     { url: '/src/pages/home.html', revision: '1' },
//     { url: '/src/pages/about.html', revision: '1' },
//     { url: '/src/pages/logo.html', revision: '1' },
//     { url: '/src/pages/standings.html', revision: '1' },
//     { url: '/src/pages/favorite.html', revision: '1' },
//     { url: '/src/css/materialize.min.css', revision: '1' },
//     { url: '/src/css/style.css', revision: '1' },
//     { url: '/src/js/materialize.min.js', revision: '1' },
//     { url: '/src/js/script.js', revision: '1' },
//     { url: '/src/js/push.js', revision: '1' },
//     { url: '/src/app.js', revision: '1' },
//     { url: '/src/detail.js', revision: '1' },
//     { url: '/src/js/data/data-source-api.js', revision: '1' },
//     { url: '/src/js/data/db.js', revision: '1' },
//     { url: '/src/js/data/idb.js', revision: '1' },
//     { url: '/src/img/icon-home.png', revision: '1' },
//     { url: '/src/img/icon-favorite.png', revision: '1' },
//     { url: '/src/img/aboutme.png', revision: '1' },
//     { url: '/src/img/dummy-logo-club.png', revision: '1' },
//     { url: '/src/img/ferdy.jpg', revision: '1' },
//     { url: '/src/img/icons/icon-72x72.png', revision: '1' },
//     { url: '/src/img/icons/icon-96x96.png', revision: '1' },
//     { url: '/src/img/icons/icon-128x128.png', revision: '1' },
//     { url: '/src/img/icons/icon-144x144.png', revision: '1' },
//     { url: '/src/img/icons/icon-152x152.png', revision: '1' },
//     { url: '/src/img/icons/icon-192x192.png', revision: '1' },
//     { url: '/src/img/icons/icon-384x384.png', revision: '1' },
//     { url: '/src/img/icons/icon-512x512.png', revision: '1' },
//     { url: '/src/img/icons/maskable_icon.png', revision: '1' },
// ], {
//     // Ignore all URL parameters.
//     ignoreUrlParametersMatching: [/.*/],
// });

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);



self.addEventListener('push', (event) => {
    const title = 'Hello from Football Apps';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
});