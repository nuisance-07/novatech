import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');
        const latest = searchParams.get('latest');

        let query = {};
        let sort = {};

        if (featured === 'true') {
            query = { isFeatured: true };
        }

        if (latest === 'true') {
            sort = { createdAt: -1 };
        }

        const products = await Product.find(query).sort(sort).limit(latest === 'true' ? 8 : 0);

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
