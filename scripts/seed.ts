import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, enum: ['Phones', 'Laptops', 'Accessories', 'Smart Home', 'Wearables'] },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  rating: { type: Number, default: 4.5 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
  {
    name: "NovaPhone X1 Pro",
    description: "The pinnacle of mobile computing. Featuring a aerospace-grade titanium chassis.",
    price: 1199,
    category: "Phones",
    brand: "Nova",
    stock: 50,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800"],
    tags: ["Phone", "Tech", "Mobile", "Flagship"],
  },
  {
    name: "BladeBook Ultra 16",
    description: "Power meets silence. The fanless M3 Max architecture delivers desktop-class performance.",
    price: 2499,
    category: "Laptops",
    brand: "Nova",
    stock: 20,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800"],
    tags: ["Laptop", "Tech", "Computer", "Pro"],
  },
  {
    name: "SonicPods Elite",
    description: "Transparency mode so clear, you'll forget you're wearing them.",
    price: 249,
    category: "Accessories",
    brand: "Nova",
    stock: 150,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800"],
    tags: ["Audio", "Headphones", "Wireless", "Tech"],
  },
  {
    name: "CyberWatch 7",
    description: "Your health, on your wrist. Measures blood oxygen, ECG, and sleep stages.",
    price: 399,
    category: "Wearables",
    brand: "Nova",
    stock: 80,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800"],
    tags: ["Watch", "Wearable", "Health", "Tech"],
  }
];

async function seed() {
  try {
    console.log("Connecting...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("Clearing old data...");
    await Product.deleteMany({});
    console.log("Seeding...");
    await Product.insertMany(products);
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();