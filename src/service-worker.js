// import { precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// precacheAndRoute(self.__WB_MANIFEST, {
//     ignoreUrlParametersMatching: [/.*/]
// });

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
// ], {
//     // Ignore all URL parameters.
//     ignoreUrlParametersMatching: [/.*/]
// });

// workbox.routing.registerRoute(
//     ({ url }) => url.origin === 'https://api.football-data.org',
//     new workbox.strategies.CacheFirst({
//         cacheName: workbox.core.cacheNames.precache,
//         cacheName: 'api-football',
//         matchOptions: {
//             ignoreSearch: true,
//             ignoreVary: true
//         }
//     })
// );

const DEBUG = false

const { assets } = global.serviceWorkerOption

const CACHE_NAME = "firstpwa-v2";

let assetsToCache = [...assets, './']

assetsToCache = assetsToCache.map(path => {
    return new URL(path, global.location).toString()
})


// let urltoCache = [
//     "/",
//     "/manifest.json",
//     "/src/nav.html",
//     "/src/index.html",
//     "/src/detail-team.html",
//     "/src/pages/home.html",
//     "/src/pages/about.html",
//     "/src/pages/logo.html",
//     "/src/pages/standings.html",
//     "/src/pages/favorite.html",
//     "/src/css/materialize.min.css",
//     "/src/css/style.css",
//     "/src/js/materialize.min.js",
//     "/src/js/script.js",
//     "/src/app.js",
//     "/src/detail.js",
//     "/src/js/data/data-source-api.js",
//     "/src/js/data/db.js",
//     "/src/js/data/idb.js",
//     "/src/img/icon-home.png",
//     "/src/img/icon-favorite.png",
//     "/src/img/aboutme.png",
//     "/src/img/ferdy.jpg",
//     "/src/img/dummy-logo-club.png",
//     "/src/img/icons/icon-72x72.png",
//     "/src/img/icons/icon-96x96.png",
//     "/src/img/icons/icon-128x128.png",
//     "/src/img/icons/icon-144x144.png",
//     "/src/img/icons/icon-152x152.png",
//     "/src/img/icons/icon-192x192.png",
//     "/src/img/icons/icon-384x384.png",
//     "/src/img/icons/icon-512x512.png",
// ];

// When the service worker is first added to a computer.
self.addEventListener('install', event => {
    // Perform install steps.
    if (DEBUG) {
        console.log('[SW] Install event')
    }

    // Add core website files to cache during serviceworker installation.
    event.waitUntil(
        global.caches
        .open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(assetsToCache)
        })
        .then(() => {
            if (DEBUG) {
                console.log('Cached assets: main', assetsToCache)
            }
        })
        .catch(error => {
            console.error(error)
            throw error
        })
    )
})

// After the install event.
self.addEventListener('activate', event => {
    if (DEBUG) {
        console.log('[SW] Activate event')
    }

    // Clean the caches
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete the caches that are not the current one.
                    if (cacheName.indexOf(CACHE_NAME) === 0) {
                        return null
                    }

                    return global.caches.delete(cacheName)
                })
            )
        })
    )
})

self.addEventListener('message', event => {
    switch (event.data.action) {
        case 'skipWaiting':
            if (self.skipWaiting) {
                self.skipWaiting()
                self.clients.claim()
            }
            break
        default:
            break
    }
})


self.addEventListener('fetch', function(event) {
    let base_url = "https://api.football-data.org/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        )
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', (event) => {
    const title = 'Hello from Football Apps';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
});