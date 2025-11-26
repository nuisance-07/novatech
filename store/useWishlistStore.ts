import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface WishlistStore {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    clearWishlist: () => void;
    isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const items = get().items;
                if (!items.find((i) => i._id === item._id)) {
                    set({ items: [...items, item] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i._id !== id) });
            },
            clearWishlist: () => set({ items: [] }),
            isInWishlist: (id) => !!get().items.find((i) => i._id === id),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
