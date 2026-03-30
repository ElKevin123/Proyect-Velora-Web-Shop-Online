"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    material: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const currentUserString = localStorage.getItem("velora_currentUser");
    let craftsmanName = "Artesano Anónimo";
    let craftsmanEmail = "";

    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      craftsmanName = user.email.split('@')[0]; 
      craftsmanEmail = user.email; 
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    
    const productToSave = { 
      ...form, 
      id: Date.now(),
      craftsman: craftsmanName,
      craftsmanEmail: craftsmanEmail 
    };
    
    products.push(productToSave);
    localStorage.setItem("products", JSON.stringify(products));

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {/* 📦 CARD */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6">
          Crear Producto
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            placeholder="Nombre del producto"
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Precio"
            type="number"
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <textarea
            placeholder="Descripción"
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="URL de imagen"
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Material del Producto:</label>
            <input 
              type="text" 
              placeholder="Ej: Cerámica, Algodón, Cuero..." 
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" 
              required 
              onChange={(e) =>
                setForm({ ...form, material: e.target.value })
              }
            />
          </div>

          <button className="bg-pink-500 text-white p-3 mt-2 rounded-lg font-semibold hover:bg-black transition">
            Guardar Producto 📦
          </button>

        </form>

      </div>

    </div>
  );
}