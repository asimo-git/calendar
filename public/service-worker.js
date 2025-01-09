const CACHE_NAME = "v2";
const STATIC_FILES = [
  "/",
  "/manifest.json",
  "/default-img.jpg",
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
];

// Кэшируем статические файлы при установке
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES))
  );
});

// Очищаем старый кэш при активации
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Перехватываем запросы и добавляем динамическое кэширование
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Динамическое кэширование API-запросов
  if (request.url.includes("/api/getDayDescription")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(
        (cache) =>
          fetch(request)
            .then((response) => {
              // Кэшируем ответ для последующего использования
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => cache.match(request)) // Возвращаем кэш, если сеть недоступна
      )
    );
    return;
  }

  // Обработка статических файлов
  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
