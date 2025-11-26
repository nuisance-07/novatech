"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Order {
    _id: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

export default function OrdersPage() {
    const { user, isLoaded } = useUser();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await fetch("/api/orders");
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded) {
            fetchOrders();
        }
    }, [user, isLoaded]);

    if (!isLoaded || loading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-gray-400">Loading orders...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Sign in to view orders</h1>
                <Link href="/sign-in" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">No orders yet</h2>
                    <p className="text-gray-400 mb-6">Start shopping to see your orders here.</p>
                    <Link href="/shop" className="text-primary hover:underline">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            href={`/orders/${order._id}`}
                            className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="font-bold text-lg text-white">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Total</p>
                                        <p className="font-bold text-white">${order.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Status</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                                            order.status === "Shipped" ? "bg-blue-500/20 text-blue-400" :
                                                "bg-yellow-500/20 text-yellow-400"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <ChevronRight className="text-gray-500" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
