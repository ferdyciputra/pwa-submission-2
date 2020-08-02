const CACHE_NAME = "firstpwa-v2";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/src/nav.html",
    "/src/index.html",
    "/src/pages/home.html",
    "/src/pages/about.html",
    "/src/pages/logo.html",
    "/src/pages/standings.html",
    "/src/css/materialize.min.css",
    "/src/css/style.css",
    "/src/js/materialize.min.js",
    "/src/js/script.js",
    "/src/js/data/data-source-api.js",
    "/src/img/icon-home.png",
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

self.addEventListener('fetch', function(event) {
    const base_url = "https://api.football-data.org/v2/";

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