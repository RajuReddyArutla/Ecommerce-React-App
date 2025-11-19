
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }

        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newState.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      removeItem: (id: number) => {
        const { items } = get();
        set({ items: items.filter((i) => i.id !== id) });

        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newState.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const { items } = get();
        set({
          items: items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });

        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: newState.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
