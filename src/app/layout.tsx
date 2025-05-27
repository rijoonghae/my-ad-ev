import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ada-EV",
  description: "Aplikasi Rekomendasi Mobil Listrik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={fraunces.variable}>
      <body style={{ fontFamily: "var(--font-fraunces), serif" }}>
        {children}
      </body>
    </html>
  );
}
