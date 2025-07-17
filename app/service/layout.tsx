import type { Metadata } from "next";
import '../../styles/services.css';

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