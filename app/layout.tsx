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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikDoodleShadow.variable} ${neucha.variable}`}>
        {children}
      </body>
    </html>
  );
}
