const CACHE_NAME = "v2";
const STATIC_FILES = [
  "/",
  "/manifest.json",
  "/default-img.png",
  "/icon512.png",
  "/android-icon-36x36.png",
  "/android-icon-48x48.png",
  "/android-icon-72x72.png",
  "/android-icon-96x96.png",
  "/android-icon-144x144.png",
  "/android-icon-192x192.png",
  "/bg.jpg",
  "/img-bg.png",
  "/page-bg-portret.png",
  "/page-bg.png",
  "/modal-bg.png",
  "/modal-bg-portret.png",
  "/message-bg.png",
];

async function hasMidnightPassed() {
  try {
    const now = new Date();
    const storedData = await caches
      .open(CACHE_NAME)
      .then((cache) => cache.match("/lastUpdate"));

    if (!storedData) return true;

    const lastUpdate = await storedData.json();
    const lastDate = new Date(lastUpdate.timestamp);

    return now.toDateString() !== lastDate.toDateString();
  } catch (error) {
    console.error("Error in hasMidnightPassed:", error);
    return true;
  }
}

// Кэшируем статические файлы при установке
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES))
  );
});

// Очищаем старый кэш при активации
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })()
  );
  //SW немедленно начинает управлять всеми клиентами, заменяя старый SW, даже если вкладки не были перезагружены.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.url.includes("/_next/image")) {
    event.respondWith(
      caches.open("image-cache").then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          cache.put(request, response.clone());
          return response;
        });
      })
    );
    return;
  }

  if (request.url.includes("/rest/v1/days")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const midnightPassed = await hasMidnightPassed();

        if (midnightPassed) {
          return fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              cache.put(
                "/lastUpdate",
                new Response(JSON.stringify({ timestamp: new Date() }))
              );
              return response;
            })
            .catch(() => cache.match(request));
        }

        return cache.match(request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
