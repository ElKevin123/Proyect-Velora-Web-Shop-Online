export default function Loading() {
  return (
    // Pantalla completa, fondo blanco puro, posicionada por encima de todo
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center min-h-screen">
      
      {/* ✨ TÍTULO PREMIUM CON EFECTO DE LATIDO LENTO */}
      <div className="mb-8 text-center animate-pulse">
        <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-tighter text-black">
          Velora.
        </h1>
      </div>

      {/* 🔄 SPINNER MINIMALISTA */}
      <div className="flex flex-col items-center gap-5">
        <div className="w-8 h-8 border-[3px] border-gray-100 border-t-black rounded-full animate-spin"></div>
        
        {/* 📝 TEXTO ESTILO ATELIER */}
        <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold">
          Preparando tu experiencia...
        </p>
      </div>

    </div>
  );
}