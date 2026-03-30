"use client";

import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    const loggedInUser = JSON.parse(localStorage.getItem("velora_currentUser"));
    const userEmail = loggedInUser ? loggedInUser.email : "invitado@tienda.com";

    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) {
          
          const myOrders = parsedOrders.filter(
            order => order.user === userEmail || !order.user
          );
          
          setOrders(myOrders);
        }
      } catch (error) { console.error("Error", error); }
    }
    setIsLoaded(true);

    window.dispatchEvent(new Event("orderUpdated"));
  }, []);

  if (!isLoaded) {
    return <div className="p-10 text-center font-bold text-gray-500">Cargando historial...</div>;
  }

  const address = "Av. Javier Prado Este 123, San Isidro, Lima";
  const mapsLink = `http://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 uppercase tracking-wide">
        Historial de Pedidos 📦
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-xl text-gray-500 mb-4">No hay compras aún</p>
          <a href="/" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-black transition shadow-md">
            Ir a la tienda
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, index) => {
           
            const firstProduct = order.items?.[0] || {};
            
            return (
              <div key={index} className="flex gap-6 items-center border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
                
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border shadow-sm p-2">
                  <img 
                    src={firstProduct.image || "https://via.placeholder.com/100"} 
                    alt={firstProduct.name} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>

                <div className="flex flex-col w-full text-sm">
                  
                  <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <h2 className="font-bold text-gray-800 tracking-wide text-base">
                      Pedido {order.id}
                    </h2>
                    <span className="text-xs text-gray-400 font-bold">{order.date || "Reciente"}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center gap-2">
                          
                          <span className="font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md">
                            {item.quantity || 1}x
                          </span> 
                          <span className="capitalize">{item.name}</span>
                        </span>
                        
                        <span className="text-gray-400 font-medium">
                          S/. {(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#006699] font-medium hover:underline mb-3 flex items-center gap-1 w-fit"
                  >
                    📍 {address}
                  </a>

                  <div className="flex justify-between items-end border-t border-gray-100 pt-3 mt-1">
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      • Entregado
                    </span>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total</span>
                      <span className="font-bold text-xl text-black">
                        S/. {Number(order.total || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}