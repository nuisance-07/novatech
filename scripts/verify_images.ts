import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function verify() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("Connected to MongoDB.");

        const products = await Product.find({});
        console.log(`Found ${products.length} products.`);

        let missingImages = 0;
        products.forEach((p: any) => {
            if (!p.images || p.images.length === 0) {
                console.log(`❌ Missing images for: ${p.name}`);
                missingImages++;
            }
        });

        if (missingImages === 0) {
            console.log("✅ All products have images!");
        } else {
            console.log(`❌ ${missingImages} products are missing images.`);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

verify();
