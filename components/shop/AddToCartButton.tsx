"use client";

import { useCartStore } from "@/store/useCartStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-primary hover:bg-primary-hover text-white"
                }`}
        >
            {isAdded ? (
                "Added to Cart"
            ) : (
                <>
                    <Plus size={20} /> Add to Cart
                </>
            )}
        </button>
    );
}
