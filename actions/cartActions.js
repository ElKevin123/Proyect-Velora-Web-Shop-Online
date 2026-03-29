"use server";

import { revalidatePath } from "next/cache";

let cart = [];

export async function addToCart(formData) {
  const book = JSON.parse(formData.get("book"));

  cart.push(book);

  revalidatePath("/cart");
}