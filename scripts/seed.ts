import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { productsPart1 } from "./products_part1";
import { productsPart2 } from "./products_part2";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Updated Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: {
    type: String,
    enum: [
      'Samsung',
      'Apple',
      'Smartphones',
      'Laptops',
      'Accessories',
      'Mobile Accessories',
      'Audio',
      'Gaming',
      'Storage',
      'Tablets',
      'Content Creator Kit'
    ],
    required: true
  },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  specs: { type: Map, of: String },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }]
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// Combine all products
const allProducts = [...productsPart1, ...productsPart2];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected.");

    console.log("🧹 Clearing existing database...");
    await Product.deleteMany({});

    console.log(`🌱 Seeding ${allProducts.length} products for Destiny Fashions (Electronics)...`);
    await Product.insertMany(allProducts);

    console.log("✨ Database populated successfully!");
    console.log(`   Total Products: ${allProducts.length}`);
    console.log("   Categories populated: Samsung, Apple, Smartphones, Laptops, Accessories, Mobile Accessories, Audio, Gaming, Storage, Tablets, Content Creator Kit");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();