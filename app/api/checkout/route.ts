import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in checkout" }, { status: 400 });
        }

        // Map cart items to Stripe line items
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: item.images ? [item.images[0]] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: 1, // Assuming 1 for now, or use item.quantity if available
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/cancel`,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
