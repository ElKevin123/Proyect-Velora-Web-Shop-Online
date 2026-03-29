import Link from "next/link";

export default function BookCard({ book, index }) {
  const image = `/images/product${(index % 5) + 1}.jpg`;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 bg-white group">
      
      {/* 🖼️ IMAGEN */}
      <div className="relative">
        <img
          src={image}
          alt="producto"
          className="w-full h-56 object-cover group-hover:scale-105 transition"
        />

        {/* 💖 ETIQUETA */}
        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
      </div>

      {/* 📦 INFO */}
      <div className="p-4">
        <h2 className="font-semibold text-lg">
          {book.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {book.author_name?.[0]}
        </p>

        <p className="text-pink-500 font-bold mt-2 text-lg">
          $ {(Math.random() * 50 + 20).toFixed(2)}
        </p>

        <Link href={`/product/${index}`}>
          <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-black transition">
            Ver producto
          </button>
        </Link>
      </div>
    </div>
  );
}