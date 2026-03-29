"use client";

// 🔥 IMPORTANTE: Agregamos "use" aquí arriba para solucionar el error de Next.js 15
import { useEffect, useState, use } from "react"; 

const ArtisanPhoto = () => (
  <svg className="w-8 h-8 rounded-full border border-gray-100 p-0.5" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export default function ProductPage({ params }) {
  // 1. 🔥 SOLUCIÓN AL ERROR ROJO: Desempaquetamos los params usando "use()"
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    // 2. 🔥 SOLUCIÓN A TUS PRODUCTOS REALES: Leemos los que creaste
    
    const userString = localStorage.getItem("velora_currentUser");
    if (userString) setCurrentUser(JSON.parse(userString));

    const allComments = JSON.parse(localStorage.getItem("product_comments")) || [];
    const thisProductComments = allComments.filter(c => String(c.productId) === String(productId));
    setComments(thisProductComments);

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Buscamos tu producto. A veces el ID es el número de posición (0, 1, 2...)
    let foundProduct = savedProducts.find(p => String(p.id) === String(productId));
    
    // Si no lo encuentra por ID, probamos con su número de posición en la lista
    if (!foundProduct && !isNaN(productId)) {
      foundProduct = savedProducts[Number(productId)];
    }

    if (foundProduct) {
      // Preparamos el producto para mostrarlo. 
      // Si te faltó ponerle descripción al crearlo, le ponemos una genérica de Velora.
      const finalProduct = {
        id: foundProduct.id || productId,
        name: foundProduct.name,
        price: Number(foundProduct.price || 0),
        image: foundProduct.image,
        series: foundProduct.series || "VELORA EXCLUSIVE",
        craftsman: foundProduct.craftsman || "Artesano de Velora",
        craftsmanEmail: foundProduct.craftsmanEmail || "",
        description: foundProduct.description || "Un diseño exclusivo creado en tu tienda Velora. Pieza única de colección que combina estética moderna y funcionalidad.",
        
        specs: foundProduct.specs || [
          { label: "MATERIAL", value: foundProduct.material || "No especificado" },
          { label: "ORIGEN", value: "VELORA FASHION" },
        ]
      };
      setProduct(finalProduct);
    }

    setIsLoaded(true);
  }, [productId]);

  function handleAddToBag() {
    if (!product) return;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.unshift(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Disparamos evento para el puntito verde del carrito
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "/Cart"; 
  }

  // 🔥 3. FUNCIÓN PARA ENVIAR EL COMENTARIO
  function handleAddComment() {
    if (!newComment.trim()) return; // Evita comentarios vacíos

    if (!currentUser) {
      alert("Debes iniciar sesión para dejar un comentario.");
      window.location.href = "/login"; // Los mandamos a loguearse
      return;
    }

    const commentData = {
      id: Date.now(),
      // 🔥 CORRECCIÓN AQUÍ: Usamos productId en vez de PRODUCT_ID_AQUI
      productId: productId, 
      user: currentUser.email.split('@')[0], // Usamos la primera parte del correo como "Nombre"
      text: newComment,
      rating: rating,
      date: new Date().toLocaleDateString("es-PE", { year: 'numeric', month: 'short', day: 'numeric' })
    };

    // Guardamos en el localStorage global
    const allComments = JSON.parse(localStorage.getItem("product_comments")) || [];
    const updatedComments = [...allComments, commentData];
    localStorage.setItem("product_comments", JSON.stringify(updatedComments));

    // Actualizamos la pantalla al instante
    setComments([...comments, commentData]);
    setNewComment(""); // Limpiamos la caja de texto
    setRating(5);
  }

  if (!isLoaded) return <div className="p-10 text-center font-serif text-gray-500">Cargando detalles de Velora...</div>;
  if (!product) return <div className="p-10 text-center font-serif text-gray-500 uppercase">Producto no encontrado.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start font-serif bg-gray-50">
      
      {/* 🖼️ Imagen Real del Producto */}
      <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-auto object-contain rounded-lg aspect-[4/5]"
        />
      </div>

      {/* 📝 Información Real */}
      <div className="flex flex-col text-gray-800">
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <span className="text-xs text-gray-400 font-sans tracking-widest uppercase">
            {product.series}
          </span>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-sans uppercase font-bold tracking-wider">
            LIMITED EDITION
          </span>
        </div>

        {/* Nombre y Precio Reales */}
        <h1 className="text-4xl font-bold mb-3 tracking-wide">{product.name}</h1>
        <p className="text-2xl text-[#006699] font-bold mb-8">S/. {product.price.toFixed(2)}</p>

        <div className="flex items-center gap-3 border border-gray-100 p-4 bg-white rounded-lg mb-8 shadow-sm">
          <ArtisanPhoto />
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wide">Crafted by</span>
            <p className="font-medium text-gray-800 text-sm capitalize">{product.craftsman}</p>
            {/* 🔥 Mostramos el correo solo si existe, en letra pequeñita */}
            {product.craftsmanEmail && (
              <p className="text-xs text-gray-400 lowercase mt-0.5">{product.craftsmanEmail}</p>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-base leading-relaxed mb-10 border-b border-gray-100 pb-10">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm mb-12">
          {product.specs.map(spec => (
            <div key={spec.label} className="border-b border-gray-100 pb-2">
              <span className="text-xs text-gray-400 font-sans uppercase tracking-widest block mb-1">
                {spec.label}
              </span>
              <p className="font-medium text-gray-800">{spec.value}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAddToBag}
          className="w-full bg-[#222] text-white py-4 px-8 font-sans font-bold hover:bg-black transition shadow-md uppercase tracking-wider rounded text-base"
        >
          Añadir a la bolsa
        </button>

      {/* 🔥 SECCIÓN DE COMENTARIOS ACTUALIZADA CON ESTRELLAS */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-bold mb-6 uppercase tracking-wide">Opiniones de los usuarios ({comments.length})</h3>

          {/* Caja para escribir y elegir estrellas */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
            
            {/* ⭐️ Selector de Estrellas */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-sm text-gray-500 mr-2">Tu calificación:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={!currentUser}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-colors ${!currentUser ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={currentUser ? "Escribe tu opinión sobre este producto..." : "Inicia sesión para comentar..."}
              className="w-full p-3 border rounded focus:outline-none focus:border-black resize-none h-24"
              disabled={!currentUser}
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={handleAddComment}
                disabled={!currentUser}
                className={`px-6 py-2 rounded font-bold text-white transition ${currentUser ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Publicar comentario
              </button>
            </div>
          </div>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">@{c.user}</span>
                      
                      {/* ⭐️ Dibujamos las estrellas que guardó este usuario */}
                      <div className="flex text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= (c.rating || 5) ? 'text-yellow-400' : 'text-gray-200'}>
                            ★
                          </span>
                        ))}
                      </div>

                    </div>
                    <span className="text-xs text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Sé el primero en dejar una opinión y calificar este producto.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}