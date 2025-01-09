import type { Metadata } from "next";
import { Neucha, Rubik_Doodle_Shadow } from "next/font/google";
import "./globals.css";

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  variable: "--font-title",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

const neucha = Neucha({
  variable: "--font-main-text",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Calendar App",
  description: "Calendar App",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                  .register('/service-worker.js')
                  .then((registration) => {
                    console.log('Service Worker зарегистрирован:', registration);
                  })
                  .catch((error) => {
                    console.error('Ошибка регистрации Service Worker:', error);
                  });
              }
            `,
          }}
        ></script>
      </head>
      <body className={`${rubikDoodleShadow.variable} ${neucha.variable}`}>
        {children}
      </body>
    </html>
  );
}
