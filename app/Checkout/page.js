function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Checkout() {
    await delay(1000);

  return (
    <div>
      <h1 className="text-xl">Pago con QR</h1>

      <img src="/qr.png" alt="QR" className="w-40 mt-4" />

      <a
        href="/orders"
        className="bg-black text-white p-2 mt-4 inline-block"
      >
        Confirmar pago
      </a>
    </div>
  );
}
