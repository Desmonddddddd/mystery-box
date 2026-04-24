import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BoxTier, CartItem } from "@/types";
import { getBoxByTier } from "@/data/boxes";

interface CartStore {
  items: CartItem[];
  addItem: (boxId: BoxTier, engravingName?: string) => void;
  removeItem: (boxId: BoxTier) => void;
  updateQuantity: (boxId: BoxTier, quantity: number) => void;
  updateEngraving: (boxId: BoxTier, name: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (boxId, engravingName) => {
        set((state) => {
          const existing = state.items.find((item) => item.boxId === boxId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.boxId === boxId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { boxId, quantity: 1, engravingName },
            ],
          };
        });
      },

      removeItem: (boxId) => {
        set((state) => ({
          items: state.items.filter((item) => item.boxId !== boxId),
        }));
      },

      updateQuantity: (boxId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.boxId !== boxId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.boxId === boxId ? { ...item, quantity } : item
            ),
          };
        });
      },

      updateEngraving: (boxId, name) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.boxId === boxId ? { ...item, engravingName: name } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const box = getBoxByTier(item.boxId);
          return total + (box ? box.price * item.quantity : 0);
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "mysteryx-cart",
    }
  )
);
