self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('ArVault').then(function(cache) {
            return cache.addAll([
                'index.html',
                'global.css',
                'bundle.css',
                'bundle.js',
                'manifest.json',
                'favicon.png',
                'icon-512.png',
                'icon-192.png',
                'ibm-plex-sans-400.woff2',
                'ibm-plex-sans-700.woff2'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    if ( url.origin !== location.origin ) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
