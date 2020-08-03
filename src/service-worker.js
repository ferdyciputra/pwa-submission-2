import { precacheAndRoute, PrecacheController } from 'workbox-precaching';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

precacheAndRoute(self.__WB_MANIFEST);

// const CACHE_NAME = "firstpwa-v2";
// var urlsToCache = [
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
//     "/src/js/data/data-source-api.js",
//     "/src/img/icon-home.png",
//     "/src/img/aboutme.png",
//     "/src/img/ferdy.jpg",
//     "/src/img/icons/icon-72x72.png",
//     "/src/img/icons/icon-96x96.png",
//     "/src/img/icons/icon-128x128.png",
//     "/src/img/icons/icon-144x144.png",
//     "/src/img/icons/icon-152x152.png",
//     "/src/img/icons/icon-192x192.png",
//     "/src/img/icons/icon-384x384.png",
//     "/src/img/icons/icon-512x512.png",
// ];


// self.addEventListener("install", function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             return cache.addAll(urlsToCache);
//         })
//     )
// });

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheExpiration: {
            maxAgeSeconds: 60 * 30,
        }
    })
)

// registerRoute(
//     ({ url }) => url.origin === 'https://api.football-data.org/v2/',
//     new StaleWhileRevalidate({
//         cacheName: 'cache-football-api',
//     })
// );

// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });