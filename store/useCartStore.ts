import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find((i) => i._id === product._id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return {
          items: [...state.items, {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
          }]
        };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i._id !== id)
      })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: 'novatech-cart' }
  )
);