const CACHE_NAME = "solmaforo-smart-uv-v2";
const APP_SHELL = [
  "/solmaforo-SmartUV/",
  "/solmaforo-SmartUV/index.html",
  "/solmaforo-SmartUV/styles.css",
  "/solmaforo-SmartUV/script.js",
  "/solmaforo-SmartUV/manifest.json",
  "/solmaforo-SmartUV/icon-192.png",
  "/solmaforo-SmartUV/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match("/solmaforo-SmartUV/"));
    })
  );
});
