import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        await connectDB();

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ message: "You are already subscribed!" }, { status: 200 });
        }

        await Subscriber.create({ email });

        return NextResponse.json({ message: "Successfully subscribed!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}
