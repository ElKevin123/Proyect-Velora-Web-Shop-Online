import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔥 Importamos nuestro nuevo Navbar premium
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"

export const metadata = {
  title: "Velora.",
  description: "Tienda elegante online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* antialiased hace que las fuentes se vean más suaves y premium */}
      <body className="bg-gray-50 text-black font-serif antialiased min-h-screen flex flex-col">
        
        {/* Aquí llamamos a la barra de navegación */}
        <Navbar />

        {/* Aquí va el contenido de todas tus páginas */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}