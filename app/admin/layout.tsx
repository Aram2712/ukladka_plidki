
import type { Metadata } from "next";
import '../../styles/admin.css';

export const metadata: Metadata = {
  title: "Укладка плитки в Санкт-Петербурге | Питерский плиточник",
  description: "Плиточные работы и услуги плиточника в Санкт-Петербурге. Укладка плитки, монтаж керамогранита на пол и стены квартире, доме, коммерческом помещении.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout-container">
        {children}
    </div>
  );
}
