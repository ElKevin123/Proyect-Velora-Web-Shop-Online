"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          const consolidated = [];
          parsedCart.forEach(item => {
            const existing = consolidated.find(i => 
              (item.id && i.id === item.id) || (!item.id && i.name === item.name)
            );
            if (existing) {
              existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
            } else {
              consolidated.push({ ...item, quantity: item.quantity || 1 });
            }
          });
          setCart(consolidated);
          localStorage.setItem("cart", JSON.stringify(consolidated)); 
        }
      } catch (error) { console.error("Error", error); }
    }
    setIsLoaded(true);
  }, []);

  function removeFromCart(indexToRemove) {
    const updatedCart = cart.filter((_, i) => i !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function updateQuantity(index, change) {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, (newCart[index].quantity || 1) + change); 
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price || 0) * (item.quantity || 1)), 0);
  const igv = subtotal * 0.18;
  const totalAmount = subtotal + igv;

  function handleCheckout() {
    const loggedInUser = localStorage.getItem("velora_currentUser");
    if (!loggedInUser) {
      window.location.href = "/login"; 
      return; 
    }
    setIsCheckingOut(true); 
  }

  function handlePayment() {
    setIsLoading(true);
    setTimeout(() => {
      const itemsComprados = [...cart];
      const loggedInUserString = localStorage.getItem("velora_currentUser");
      const loggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
      const userEmail = loggedInUser ? loggedInUser.email : "invitado@tienda.com";

      const newOrder = {
        id: "PED-" + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString("es-PE", { year: 'numeric', month: 'long', day: 'numeric' }),
        total: totalAmount, 
        items: itemsComprados,
        status: "ENTREGADO",
        user: userEmail
      };

      const savedOrders = localStorage.getItem("orders");
      let ordersArray = [];
      if (savedOrders) {
        try { ordersArray = JSON.parse(savedOrders); } catch (e) {}
      }

      ordersArray.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(ordersArray));

      localStorage.setItem("hasNewOrder", "true");
      window.dispatchEvent(new Event("orderUpdated"));

      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("cartUpdated"));

      setLastOrderTotal(totalAmount);
      
      setIsLoading(false);
      setIsCheckingOut(false);
      setIsSuccess(true);
    }, 2000); 
  }

  function handlePrint() {
    window.print();
  }

  if (!isLoaded) return <div className="p-10 text-center font-bold text-gray-500">Cargando tu carrito...</div>;

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10">
        <div className="bg-white p-8 border rounded-xl shadow-lg text-center" id="receipt">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase">¡Pago Exitoso!</h2>
          <p className="text-gray-500 mb-6 border-b pb-6">Tu pedido ha sido procesado correctamente.</p>
          
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span>Total pagado:</span>
            <span className="text-pink-500">S/. {lastOrderTotal.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-3 print:hidden">
            <button onClick={handlePrint} className="w-full bg-[#006699] text-white py-3 rounded font-bold hover:bg-blue-800 transition shadow-md uppercase text-sm">📄 Descargar Recibo PDF</button>
            <a href="/" className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition shadow-md uppercase text-sm">🏠 Volver al inicio</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!isCheckingOut ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-800 uppercase tracking-wide">Mi Carrito ({cart.length})</h1>
          {cart.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
              <p className="text-xl text-gray-500 mb-4">No hay productos en tu carrito aún.</p>
              <a href="/" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-black transition shadow-md">Volver a la tienda</a>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {cart.map((product, index) => (
                  <div key={index} className="relative flex items-center bg-gray-50 border-b-2 border-gray-200 p-4 rounded-lg">
                    <button onClick={() => removeFromCart(index)} className="absolute top-0 right-0 bg-[#006699] text-white w-8 h-8 flex items-center justify-center hover:bg-blue-800 transition rounded-tr-lg rounded-bl-lg">✕</button>
                    <div className="bg-white p-2 w-28 h-28 flex-shrink-0 flex items-center justify-center border shadow-sm">
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    
                    <div className="ml-6 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full pr-4">
                      <div>
                        <h2 className="font-bold text-gray-700 uppercase text-sm mb-2">{product.name}</h2>
                        <div className="flex items-end gap-1">
                          <span className="text-gray-500 font-semibold mb-1">S/.</span>
                          <p className="text-2xl font-bold text-black">{Number(product.price || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-200 rounded px-2 py-1 mt-3 sm:mt-0 w-fit">
                        <button onClick={() => updateQuantity(index, -1)} className="font-bold px-2 text-gray-600 hover:text-black text-lg">-</button>
                        <span className="font-bold text-sm w-4 text-center">{product.quantity || 1}</span>
                        <button onClick={() => updateQuantity(index, 1)} className="font-bold px-2 text-gray-600 hover:text-black text-lg">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between items-center border-t-2 pt-6">
                <div className="text-2xl font-bold text-gray-800">Subtotal: S/. {subtotal.toFixed(2)}</div>
                <button onClick={handleCheckout} className="bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition shadow-md uppercase tracking-wide rounded">Ir a pagar</button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 border rounded-xl shadow-lg mt-10 font-sans">
          <h2 className="text-2xl font-bold text-center mb-6 uppercase border-b pb-4 tracking-wide">Simulación de Pago</h2>
          
          <div className="space-y-4 mb-6 text-gray-700">
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dirección de Envío</p>
              <p className="font-medium text-sm">Av. Javier Prado Este 123, San Isidro, Lima</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Método de Pago</p>
              <p className="font-medium text-sm">💳 Tarjeta terminada en **** 4321</p>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded border mb-8">
            <div className="space-y-2 mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-bold uppercase tracking-wide">Subtotal</span>
                <span className="font-medium text-gray-800">S/. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-bold uppercase tracking-wide">IGV (18%)</span>
                <span className="font-medium text-gray-800">S/. {igv.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#006699] text-white p-4 rounded font-bold text-lg shadow-sm">
              <span className="uppercase tracking-widest text-sm">Total a cobrar:</span>
              <span className="text-xl">S/. {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handlePayment} className="w-full bg-green-600 text-white py-4 rounded font-bold text-sm hover:bg-green-700 transition shadow-md uppercase tracking-widest">
              Confirmar Pago
            </button>
            <button onClick={() => setIsCheckingOut(false)} className="w-full text-gray-500 py-3 hover:text-black transition uppercase text-xs font-bold tracking-widest">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}