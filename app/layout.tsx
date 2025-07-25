
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContextProvider } from '../context/globalContext';
import Navbar from '../components/navbar';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Укладка плитки в Санкт-Петербурге | Питерский плиточник",
  icons: {
    icon: '/shortcut.png',
    shortcut: '/shortcut.png',
  },
  description: "Плиточные работы и услуги плиточника в Санкт-Петербурге. Укладка плитки, монтаж керамогранита на пол и стены квартире, доме, коммерческом помещении.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ContextProvider>
          <Navbar/>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
