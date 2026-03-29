"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center mb-10">
  <div className="flex w-full max-w-2xl shadow-lg rounded-full overflow-hidden">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar productos..."
      className="flex-1 p-4 outline-none"
    />
    <button
      onClick={() => router.push(`/?q=${query}`)}
      className="bg-pink-500 text-white px-6 hover:bg-black transition"
    >
      Buscar
    </button>
  </div>
</div>
  );
}