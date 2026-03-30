"use client";

import { useEffect, useState } from "react";

const LoginIcon = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("velora_currentUser");
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("velora_currentUser");
    setUser(null);
    window.location.href = "/";
  }

  if (!isLoaded) return <div className="w-20"></div>;

  if (user) {
    const shortName = user.email.split('@')[0];
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-sans text-gray-400 uppercase hidden md:inline">
          Hola, {shortName}
        </span>
        <button 
          onClick={handleLogout}
          className="text-sm font-bold text-gray-800 hover:text-pink-500 transition uppercase tracking-wide"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <a href="/login" className="text-sm font-bold text-gray-800 hover:text-pink-500 transition uppercase tracking-wide">
      Iniciar Sesión
    </a>
  );
};

export default LoginIcon;