const STATIC_CACHE = 'static-cache';
const DYNAMIC_CACHE = 'dynamic-cache';

const assets = [
  '/index.html',
  '/styles.css',
  '/favicon.ico',
  'https://fonts.googleapis.com/css?family=Righteous|Russo+One&display=swap',

  '/img/background/bg-game.png',
  '/img/background/bg-loading.webp',
  '/img/background/bg-login.gif',
  '/img/background/bg-ranking.gif',
  '/img/background/bg-register.gif',

  '/img/lang/english-lang.svg',
  '/img/lang/polish-lang.svg',

  '/img/levelImages/easy.gif',
  '/img/levelImages/hard.gif',
  '/img/levelImages/legendary.gif',
  '/img/levelImages/medium.gif',

  '/img/pokedex/pokedex_cover_back.png',
  '/img/pokedex/pokedex_cover_front.png',
  '/img/pokedex/pokedex_inside.png',

  '/img/cardback.png',
  '/img/name.png',
  '/img/pokeball.png',

  '/build/bundle.css',
  '/build/bundle.js'
];

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

  evt.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  console.log("[SERVICE WORKER] activated");

  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(DYNAMIC_CACHE, 108)
          return fetchRes;
        })
      });
    })
  );
});