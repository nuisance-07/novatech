"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react";

interface Order {
    _id: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
}

export default function OrderDetailsPage() {
    const params = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders?id=${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (error) {
                console.error("Failed to fetch order", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-gray-400">Loading order details...</div>;

    if (!order) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Order not found</h1>
                <Link href="/orders" className="text-primary hover:underline">
                    Back to Orders
                </Link>
            </div>
        );
    }

    const steps = [
        { status: "Processing", icon: Package },
        { status: "Shipped", icon: Truck },
        { status: "Delivered", icon: CheckCircle },
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status);

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/orders" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Orders
            </Link>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Order #{order._id.slice(-6).toUpperCase()}</h1>
                        <p className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-white">${order.total}</p>
                    </div>
                </div>

                {/* Status Tracker */}
                <div className="relative flex justify-between mb-12 max-w-2xl mx-auto">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0" />

                    {/* Active Progress Bar */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index <= currentStepIndex;
                        const isCompleted = index < currentStepIndex;

                        return (
                            <div key={step.status} className="relative z-10 flex flex-col items-center bg-background px-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? "bg-primary border-primary text-white" : "bg-black border-white/20 text-gray-500"
                                    }`}>
                                    <Icon size={18} />
                                </div>
                                <p className={`mt-2 text-xs font-bold ${isActive ? "text-white" : "text-gray-500"}`}>
                                    {step.status}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Order Items */}
                <div className="border-t border-white/10 pt-8">
                    <h3 className="text-xl font-bold mb-6">Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-black/20 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden relative">
                                        {/* Placeholder for image if not available */}
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{item.name}</p>
                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-bold text-white">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
