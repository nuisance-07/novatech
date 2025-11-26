"use client";

import { useCartStore } from "@/store/useCartStore";
import { Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function CartPage() {
    const { items, removeItem, total } = useCartStore();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Checkout failed: No URL returned");
                alert("Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/shop" className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-hover transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item._id} className="flex gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl items-center">
                            <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <span className="text-lg font-bold">${item.price * item.quantity}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition"
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white">${total()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white">Free</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition flex items-center justify-center gap-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : "Checkout"} <ArrowRight size={18} />
                        </button>

                        <div className="space-y-4">
                            <p className="text-xs text-gray-400 text-center uppercase tracking-wider">Secure Payment With</p>
                            <div className="flex justify-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                                {/* Visa */}
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 object-contain" />
                                </div>
                                {/* Mastercard */}
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" />
                                </div>
                                {/* Amex */}
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" alt="Amex" className="h-4 object-contain" />
                                </div>
                                {/* PayPal */}
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
