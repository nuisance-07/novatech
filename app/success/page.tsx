"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export default function SuccessPage() {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Payment Successful!</h1>
            <p className="text-gray-400 mb-8 max-w-md">
                Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
            </p>
            <Link
                href="/shop"
                className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
