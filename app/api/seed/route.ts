import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { productsPart1 } from "../../../scripts/products_part1";
import { productsPart2 } from "../../../scripts/products_part2";

export async function POST() {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});

        // Combine products
        const allProducts = [...productsPart1, ...productsPart2];

        // Insert new products
        await Product.insertMany(allProducts);

        return NextResponse.json({
            message: "Database seeded successfully",
            count: allProducts.length
        });
    } catch (error: any) {
        console.error("Seeding error:", error);
        return NextResponse.json(
            { error: "Failed to seed database", details: error.message },
            { status: 500 }
        );
    }
}
