// PRE-CACHE RISORSE

// definisco il nome della cache
// per poterla richiamare in seguito
const cacheName = 'travel-app3';

const resourcesToCache = [
    '/',
    '/style/general.scss',
    '/index.html',
    'manifest.json',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'bootstrap/scss/bootstrap',
    '/main.js',
    'diary.png'
];

// all'evento di installazione dell'app
// metti in cache le risorse statiche
self.addEventListener('install', function (e) {
    console.log('Service worker installato! 🚀');

    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                
                return cache.addAll(resourcesToCache);
            })
    )
});

// ogni volta che il browser
// fa una chiamata per recuperare una risorsa, 
// accedi alla versione conservata nella cache
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
            .then(function (cachedResponse) {
                return cachedResponse || fetch(e.request);
            })
    );

})