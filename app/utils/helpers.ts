export function getDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  return { day, month };
}

export async function checkImageAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker зарегистрирован:", registration);
      })
      .catch((error) => {
        console.error("Ошибка регистрации Service Worker:", error);
      });
  }
}
