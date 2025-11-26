import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get("id");
        const { userId } = await auth();

        await connectDB();

        if (orderId) {
            const order = await Order.findById(orderId);
            if (!order) {
                return NextResponse.json({ error: "Order not found" }, { status: 404 });
            }
            return NextResponse.json(order);
        }

        if (userId) {
            const orders = await Order.find({ userId }).sort({ createdAt: -1 });
            return NextResponse.json(orders);
        }

        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total, userId } = body;

        if (!items || !total) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDB();
        const newOrder = await Order.create({
            userId, // Optional, can be null for guest checkout
            items,
            total,
            status: "Processing",
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
