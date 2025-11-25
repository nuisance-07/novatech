"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function searchProducts(query: string) {
    await connectDB();

    if (!query) return [];

    const products = await Product.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
        ],
    })
        .select("name category price images _id")
        .limit(10)
        .lean();

    return JSON.parse(JSON.stringify(products));
}
