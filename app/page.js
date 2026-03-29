"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Si los productos no tienen un ID, les agregamos uno único al cargarlos
    const data = JSON.parse(localStorage.getItem("products")) || [];
    const dataWithIds = data.map((p, index) => ({
      ...p,
      uniqueId: p.id || `temp-id-${index}`
    }));
    setProducts(dataWithIds);
  }, []);

  // 🔥 1. AHORA SÍ: filteredProducts está suelto en la función principal
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modificado para usar uniqueId en lugar del índice, así no se cruzan al buscar
  function toggleSelect(uniqueId) {
    if (selected.includes(uniqueId)) {
      setSelected(selected.filter((id) => id !== uniqueId));
    } else {
      setSelected([...selected, uniqueId]);
    }
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Buscamos los productos completos basándonos en los IDs seleccionados
    const selectedProducts = products.filter((p) =>
      selected.includes(p.uniqueId)
    );

    const newCart = [...cart, ...selectedProducts];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setSelected([]);

    // Disparamos el evento para que la bolita roja del carrito se actualice
    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Botón flotante del carrito */}
      {selected.length > 0 && (
        <button
          onClick={addToCart}
          className="fixed bottom-6 right-6 z-50 bg-black text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition"
        >
          🛒 Añadir ({selected.length})
        </button>
      )}

      {/* Cabecera con buscador y botón de crear */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        
        {/* El buscador visual */}
        <div className="w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="🔍 Buscar producto por nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        <a href="/create">
          <button className="bg-pink-500 text-white px-6 py-3 rounded font-bold shadow-md hover:bg-pink-600 transition w-full sm:w-auto">
            + Crear Producto
          </button>
        </a>
      </div>

      {/* 🔥 2. AQUÍ USAMOS filteredProducts PARA DIBUJAR LA CUADRÍCULA */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {filteredProducts.map((p) => (
            <div key={p.uniqueId} className="relative max-w-[200px] mx-auto bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg border border-gray-100">

              <input
                type="checkbox"
                className="absolute top-2 right-2 w-5 h-5 cursor-pointer z-10"
                checked={selected.includes(p.uniqueId)}
                onChange={() => toggleSelect(p.uniqueId)}
              />

              <a href={`/Product/${p.id || p.uniqueId}`}>
                <div className="w-full h-40 object-cover overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                </div>
              </a>

              <div className="p-4 border-t border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 uppercase truncate" title={p.name}>{p.name}</h2>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-xs font-bold text-gray-400">S/.</span>
                  <p className="text-lg font-black text-pink-500">
                    {Number(p.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-16">
          <p className="text-xl text-gray-500">No se encontraron productos con <span className="font-bold">"{searchTerm}"</span></p>
        </div>
      )}

    </div>
  );
}