"use client";

import { useEffect, useState } from "react";

export default function CartIcon() {
  const [hasItems, setHasItems] = useState(false);

  function checkCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setHasItems(cart.length > 0);
  }

  useEffect(() => {
    // Revisar al cargar la página por primera vez
    checkCart();

    // 🔥 Escuchar el evento de la MISMA pestaña
    window.addEventListener("cartUpdated", checkCart);
    
    // 🔥 Escuchar cambios desde OTRAS pestañas (opcional pero buena práctica)
    window.addEventListener("storage", checkCart);

    // Limpiar los event listeners al desmontar
    return () => {
      window.removeEventListener("cartUpdated", checkCart);
      window.removeEventListener("storage", checkCart);
    };
  }, []);

  return (
    <div className="relative text-2xl inline-block">
      🛒
      {hasItems && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
      )}
    </div>
  );
}