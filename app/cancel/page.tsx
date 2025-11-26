"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Payment Cancelled</h1>
            <p className="text-gray-400 mb-8 max-w-md">
                Your payment was cancelled and you have not been charged.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/cart"
                    className="px-8 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors"
                >
                    Return to Cart
                </Link>
                <Link
                    href="/shop"
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
