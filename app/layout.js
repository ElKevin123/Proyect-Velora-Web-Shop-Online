import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"

export const metadata = {
  title: "Velora.",
  description: "Tienda elegante online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-black font-serif antialiased min-h-screen flex flex-col">
        
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}