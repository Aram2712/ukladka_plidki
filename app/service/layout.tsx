import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../../styles/services.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Укладка плитки | Питерский плиточник",
  description: "Плиточные работы и услуги плиточника в Санкт-Петербурге. Укладка плитки, монтаж керамогранита на пол и стены квартире, доме, коммерческом помещении.",
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="service-layout-container">
        {children}
    </div>
  );
}