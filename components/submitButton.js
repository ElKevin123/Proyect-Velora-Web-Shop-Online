'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-black text-white px-4 py-2 mt-2"
    >
      {pending ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}