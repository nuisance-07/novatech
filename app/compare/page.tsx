"use client";

import { useCompareStore } from "@/store/useCompareStore";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ComparePage() {
    const { items, removeItem, clearCompare } = useCompareStore();
    const addItemToCart = useCartStore((state) => state.addItem);

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Compare Products</h1>
                <p className="text-gray-400 mb-8">No products selected for comparison.</p>
                <Link href="/shop" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">Compare Products ({items.length})</h1>
                <button
                    onClick={clearCompare}
                    className="text-sm text-gray-400 hover:text-white transition"
                >
                    Clear All
                </button>
            </div>

            <FadeIn>
                <div className="overflow-x-auto pb-8">
                    <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-8">

                        {/* Labels Column */}
                        <div className="space-y-8 pt-[300px]">
                            <div className="h-12 font-bold text-gray-400 flex items-center">Price</div>
                            <div className="h-12 font-bold text-gray-400 flex items-center">Rating</div>
                            <div className="h-12 font-bold text-gray-400 flex items-center">Category</div>
                            <div className="h-12 font-bold text-gray-400 flex items-center">Brand</div>
                            {/* Dynamic Specs Labels could go here if normalized */}
                            <div className="h-12 font-bold text-gray-400 flex items-center">Description</div>
                        </div>

                        {/* Product Columns */}
                        {items.map((product) => (
                            <div key={product._id} className="relative space-y-8">
                                <button
                                    onClick={() => removeItem(product._id)}
                                    className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition"
                                >
                                    <X size={16} />
                                </button>

                                {/* Header Card */}
                                <div className="h-[300px] flex flex-col">
                                    <div className="relative flex-1 bg-white/5 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
                                        {product.images && product.images.length > 0 ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-500 text-xs">No Image</div>
                                        )}
                                    </div>
                                    <Link href={`/shop/${product._id}`} className="font-bold text-xl hover:text-primary transition mb-2 block">
                                        {product.name}
                                    </Link>
                                    <button
                                        onClick={() => addItemToCart(product)}
                                        className="w-full py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={16} /> Add to Cart
                                    </button>
                                </div>

                                {/* Data Rows */}
                                <div className="h-12 flex items-center text-xl font-bold text-primary">${product.price}</div>
                                <div className="h-12 flex items-center">{product.rating || "N/A"} / 5</div>
                                <div className="h-12 flex items-center">{product.category}</div>
                                <div className="h-12 flex items-center">{product.brand || "-"}</div>
                                <div className="text-sm text-gray-400 leading-relaxed h-auto min-h-[3rem]">
                                    {product.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
