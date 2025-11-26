"use client";

import { Heart } from "lucide-react";
import { useWishlistStore, WishlistItem } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WishlistButtonProps {
    product: WishlistItem;
    className?: string;
}

export default function WishlistButton({ product, className }: WishlistButtonProps) {
    const { addItem, removeItem, isInWishlist } = useWishlistStore();
    const [isInList, setIsInList] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsInList(isInWishlist(product._id));
    }, [isInWishlist, product._id]);

    // Subscribe to store changes to keep state in sync
    useEffect(() => {
        const unsubscribe = useWishlistStore.subscribe((state) => {
            setIsInList(!!state.items.find((i) => i._id === product._id));
        });
        return () => unsubscribe();
    }, [product._id]);

    if (!mounted) return null;

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInList) {
            removeItem(product._id);
        } else {
            addItem(product);
        }
    };

    return (
        <button
            onClick={toggleWishlist}
            className={cn(
                "p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95",
                isInList
                    ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    : "bg-black/20 text-white hover:bg-white hover:text-black backdrop-blur-sm",
                className
            )}
            aria-label={isInList ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart className={cn("w-5 h-5", isInList && "fill-current")} />
        </button>
    );
}
