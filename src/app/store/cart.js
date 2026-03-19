"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const { items } = get();
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.product.id !== productId) });
        } else {
          set({
            items: get().items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "handcrafted-haven-cart" }
  )
);
