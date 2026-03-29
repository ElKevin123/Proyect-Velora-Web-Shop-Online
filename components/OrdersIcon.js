"use client";

import { useEffect, useState } from "react";

export default function OrdersIcon() {
  const [hasNewOrder, setHasNewOrder] = useState(false);

  function checkOrders() {
    const isNew = localStorage.getItem("hasNewOrder") === "true";
    setHasNewOrder(isNew);
  }

  useEffect(() => {
    checkOrders();
    window.addEventListener("orderUpdated", checkOrders);
    window.addEventListener("storage", checkOrders);

    return () => {
      window.removeEventListener("orderUpdated", checkOrders);
      window.removeEventListener("storage", checkOrders);
    };
  }, []);

  return ( 
    <div className="relative text-2xl inline-block hover:text-pink-500 transition">
      📑
      {hasNewOrder && (
        <span className="absolute -top-1 -right-3 w-3 h-3 bg-green-500 border border-white rounded-full animate-pulse"></span>
      )}
    </div>
  );
}