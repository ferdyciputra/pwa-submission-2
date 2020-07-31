const CACHE_NAME = "firstpwa-v2";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/src/nav.html",
    "/src/index.html",
    "/src/pages/home.html",
    "/src/pages/about.html",
    "/src/pages/albums.html",
    "/src/pages/standings.html",
    "/src/css/materialize.min.css",
    "/src/css/style.css",
    "/src/js/materialize.min.js",
    "/src/js/script.js",
    "/src/js/data/data-source-api.js",
    "/src/img/icon-home.png",
    "/src/img/icon-albums.png",
    "/src/img/armstrong.jpg",
    "/src/img/mike.jpeg",
    "/src/img/tree.jpg",
    "/src/img/aboutme.png",
    "/src/img/ferdy.jpg",
    "/src/img/icons/icon-72x72.png",
    "/src/img/icons/icon-96x96.png",
    "/src/img/icons/icon-128x128.png",
    "/src/img/icons/icon-144x144.png",
    "/src/img/icons/icon-152x152.png",
    "/src/img/icons/icon-192x192.png",
    "/src/img/icons/icon-384x384.png",
    "/src/img/icons/icon-512x512.png",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});