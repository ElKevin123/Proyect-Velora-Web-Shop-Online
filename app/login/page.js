"use client";

import { useState } from "react";
import Loading from "../loading";

export default function LoginPage() {
  // Estado para saber si estamos en "Login" o "Registro"
  const [isLogin, setIsLogin] = useState(true);
  
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔥 1. NUEVO ESTADO PARA LA PANTALLA DE CARGA
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Limpiamos errores previos

    // Leemos los usuarios guardados (o creamos una lista vacía si no hay)
    const users = JSON.parse(localStorage.getItem("velora_users")) || [];

    if (isLogin) {
      // 🔥 LÓGICA DE INICIAR SESIÓN
      const userExists = users.find(u => u.email === email && u.password === password);
      if (userExists) {
        // Guardamos quién inició sesión
        localStorage.setItem("velora_currentUser", JSON.stringify(userExists));
        
        // 🔥 2. ACTIVAMOS LA PANTALLA DE CARGA
        setIsLoading(true);
        
        // Esperamos 2 segundos antes de redirigir al inicio
        setTimeout(() => {
          window.location.href = "/"; 
        }, 2000);

      } else {
        setError("La cuenta no existe o la contraseña es incorrecta.");
      }
    } else {
      // 🔥 LÓGICA DE REGISTRO
      const emailAlreadyUsed = users.find(u => u.email === email);
      if (emailAlreadyUsed) {
        setError("Este correo ya está registrado. Por favor, inicia sesión.");
      } else {
        // Creamos el nuevo usuario
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("velora_users", JSON.stringify(users));
        
        // Lo iniciamos sesión automáticamente
        localStorage.setItem("velora_currentUser", JSON.stringify(newUser));
        
        // 🔥 3. ACTIVAMOS LA PANTALLA DE CARGA
        setIsLoading(true);
        
        // Esperamos 2 segundos antes de redirigir al inicio
        setTimeout(() => {
          window.location.href = "/"; 
        }, 2000);
      }
    }
  }

  // 🔥 4. MOSTRAMOS LA PANTALLA DE CARGA (Justo antes de tu return principal)
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        <h2 className="text-3xl font-serif font-bold text-center mb-6 tracking-wide uppercase">
          {isLogin ? "Bienvenido a Velora" : "Únete a Velora"}
        </h2>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-sans text-gray-500 uppercase tracking-widest mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-black transition"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-sans text-gray-500 uppercase tracking-widest mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-black transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 mt-6 font-sans font-bold hover:bg-gray-800 transition shadow-md uppercase tracking-wider rounded"
          >
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        {/* Interruptor para cambiar entre Login y Registro */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
          </p>
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Limpiar errores al cambiar
            }}
            className="mt-2 text-pink-500 font-bold hover:underline"
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </button>
        </div>

      </div>
    </div>
  );
}