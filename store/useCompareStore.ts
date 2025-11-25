import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    description: string;
    specs?: Record<string, string>;
    rating?: number;
    brand?: string;
}

interface CompareStore {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCompare: () => void;
    isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items;
                if (items.find((i) => i._id === product._id)) return;
                if (items.length >= 4) {
                    alert("You can compare up to 4 products at a time.");
                    return;
                }
                set({ items: [...items, product] });
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i._id !== productId) });
            },
            clearCompare: () => set({ items: [] }),
            isInCompare: (productId) => !!get().items.find((i) => i._id === productId),
        }),
        {
            name: 'compare-storage',
        }
    )
);
