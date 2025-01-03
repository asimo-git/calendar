import type { Metadata } from "next";
import { Marck_Script, Nunito } from "next/font/google";
import "./globals.css";

const marckScript = Marck_Script({
  variable: "--font-marck-script",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

const nunito = Nunito({
  variable: "--font-nunito",
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
      <body className={`${marckScript.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
