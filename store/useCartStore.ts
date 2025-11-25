import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
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
        // Generate a unique ID for the cart item based on product ID and selected options
        const cartItemId = `${product._id}-${product.selectedColor?.name || ''}-${product.selectedStorage?.size || ''}`;

        const existing = state.items.find((i) => i._id === cartItemId);

        if (existing) {
          return {
            items: state.items.map((i) =>
              i._id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }

        return {
          items: [...state.items, {
            _id: cartItemId,
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            selectedColor: product.selectedColor?.name,
            selectedStorage: product.selectedStorage?.size
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