'use client';

import { addToCart } from "../actions/cartActions";
import SubmitButton from "./submitButton";

export default function AddToCartForm({ book }) {
  return (
    <form action={addToCart}>
      <input
        type="hidden"
        name="book"
        value={JSON.stringify(book)}
      />
      <SubmitButton />
    </form>
  );
}