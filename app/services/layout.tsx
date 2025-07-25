
import type { Metadata } from "next";
import '../../styles/services.css';

export const metadata: Metadata = {
  title: "Укладка крупноформатной плитки | Питерский плиточник",
  description: "Укладка крупноформатной плитки, размер плиты 1000×3000 мм, керамогранит 6 мм",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="services-layout-container">
        {children}
    </div>
  );
}
