const CACHE_NAME = 'image-cache';

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('install', evt => {
  console.log("[SERVICE WORKER] installed");
});

self.addEventListener('activate', evt => {
  console.log("[SERVICE WORKER] activated");

  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        if(evt.request.destination !== "image" || evt.request.url.indexOf("firebasestorage.googleapis") < 0) {
          return fetchRes;
        }
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(CACHE_NAME, 30)
          return fetchRes;
        })
      });
    })
  );
});