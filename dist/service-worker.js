// Service Worker: Caches assets for offline use and improves performance

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',  // Cache homepage
          '/css/styles.css', // Cache CSS file
          '/js/scripts.js',  // Cache JS file
          '/images/logo.png', // Cache logo image (you can add more assets)
        ]);
      })
    );
  });
  
  // Intercept requests to serve cached assets
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // If cached asset is found, serve it. Otherwise, fetch it from the network
        return cachedResponse || fetch(event.request);
      })
    );
  });
  