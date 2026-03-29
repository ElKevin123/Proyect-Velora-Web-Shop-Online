"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasItemsInCart, setHasItemsInCart] = useState(false);
  const [hasNewOrder, setHasNewOrder] = useState(false); // 🔥 Nuevo estado para pedidos

  useEffect(() => {
    // 1. Verificamos usuario
    const userString = localStorage.getItem("velora_currentUser");
    if (userString) setCurrentUser(JSON.parse(userString));

    // 2. Función inteligente para revisar si hay cosas en el carrito
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setHasItemsInCart(cart.length > 0);
    };

    // Revisamos al cargar la página
    checkCart();

    // Escuchamos los eventos de compra y carrito
    window.addEventListener("cartUpdated", checkCart);
    window.addEventListener("orderUpdated", () => setHasNewOrder(true));
    
    return () => {
      window.removeEventListener("cartUpdated", checkCart);
      window.removeEventListener("orderUpdated", () => setHasNewOrder(true));
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("velora_currentUser");
    window.location.href = "/";
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex-1">
          <a href="/" className="text-3xl font-bold font-serif tracking-tighter text-black">
            Velora
          </a>
        </div>

        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <a href="/" className="text-sm font-medium text-gray-500 hover:text-black transition relative group">
            Inicio
            <span className="absolute left-0 -bottom-2 w-0 h-[1.5px] bg-black transition-all group-hover:w-full"></span>
          </a>
          
          {/* 🔥 Enlace de Pedidos con su puntito verde */}
          <a href="/Orders" onClick={() => setHasNewOrder(false)} className="text-sm font-medium text-gray-500 hover:text-black transition relative group flex items-center">
            Mis Pedidos
            {hasNewOrder && <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>}
            <span className="absolute left-0 -bottom-2 w-0 h-[1.5px] bg-black transition-all group-hover:w-full"></span>
          </a>
        </nav>

        <div className="flex-1 flex justify-end items-center gap-6">
          
          {/* 🔥 Icono de Carrito con su puntito verde */}
          <a href="/Cart" className="text-black hover:text-gray-600 transition relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {hasItemsInCart && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>}
          </a>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-800 hidden sm:block">
                Hola, <span className="capitalize">{currentUser.email.split('@')[0]}</span>
              </span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition" title="Cerrar sesión">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          ) : (
            <a href="/login" className="text-black hover:text-gray-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}