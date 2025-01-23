import type { Metadata } from "next";
import { Caveat, Neucha, Rubik_Doodle_Shadow } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-accent",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

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
      <body
        className={`${rubikDoodleShadow.variable} ${neucha.variable} ${caveat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
