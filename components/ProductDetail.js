"use client";

import { useState } from "react";
import AddToCartForm from "./addToCartForm";

export default function ProductDetail({ index, image }) {
  const [color, setColor] = useState("pink");

  const colors = [
    { name: "pink", class: "bg-pink-500" },
    { name: "black", class: "bg-black" },
    { name: "gray", class: "bg-gray-300" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      <div>
        <img
          src={image}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex flex-col justify-center">

        <h1 className="text-3xl font-bold mb-3">
          Producto Velora {index}
        </h1>

        <p className="text-gray-500 mb-4">
          Diseño elegante inspirado en moda premium.
        </p>

        <div className="mb-4">
          <p className="font-semibold mb-2">Colores:</p>

          <div className="flex gap-3">
            {colors.map((c) => (
              <span
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  c.class
                } ${
                  color === c.name
                    ? "border-pink-500 scale-110"
                    : "border-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        <p className="text-2xl font-bold text-pink-500 mb-6">
          $ {(Math.random() * 50 + 20).toFixed(2)}
        </p>

        <AddToCartForm book={{ id: index, color }} />

      </div>
    </div>
  );
}