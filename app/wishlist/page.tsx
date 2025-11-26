"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ui/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const { items } = useWishlistStore();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    Start adding items you love to your wishlist by clicking the heart icon on products.
                </p>
                <Link
                    href="/shop"
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
                <p className="text-gray-400">{items.length} items saved for later</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item) => (
                    <FadeIn key={item._id}>
                        <ProductCard product={item} />
                    </FadeIn>
                ))}
            </div>
        </main>
    );
}
