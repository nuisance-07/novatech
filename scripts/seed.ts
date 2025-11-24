import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Updated Schema to include new categories
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: {
    type: String,
    enum: ['Phones', 'Laptops', 'Accessories', 'Smart Home', 'Wearables', 'Gaming', 'TVs', 'Audio']
  },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  specs: { type: Map, of: String },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }], // Kept tags for compatibility with existing features
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// --- THE MASTER CATALOG ---
const products = [
  // ==========================
  // SONY (Gaming, TV, Audio)
  // ==========================
  {
    name: "Sony PlayStation 5 Pro",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    price: 499,
    category: "Gaming",
    brand: "Sony",
    stock: 120,
    rating: 4.9,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800"],
    specs: { "Storage": "1TB SSD", "Resolution": "4K 120Hz", "Controller": "DualSense" },
    tags: ["Gaming", "Console", "Sony", "Next-Gen"]
  },
  {
    name: "Sony Bravia XR A95L OLED",
    description: "Our brightest and widest range of colors and shades, powered by the cognitive processor XR. The ultimate cinema experience at home.",
    price: 2999,
    category: "TVs",
    brand: "Sony",
    stock: 15,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800"],
    specs: { "Screen": "65-inch OLED", "Refresh Rate": "120Hz", "HDR": "Dolby Vision" },
    tags: ["TV", "OLED", "4K", "Home Theater"]
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones for unprecedented noise cancellation and exceptional call quality.",
    price: 348,
    category: "Audio",
    brand: "Sony",
    stock: 200,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
    specs: { "Battery": "30 Hours", "Type": "Over-Ear", "Feature": "Noise Canceling" },
    tags: ["Audio", "Headphones", "Noise Cancelling", "Wireless"]
  },

  // ==========================
  // APPLE (Phones, Laptops, Wearables)
  // ==========================
  {
    name: "iPhone 15 Pro Max",
    description: "Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1199,
    category: "Phones",
    brand: "Apple",
    stock: 80,
    rating: 4.8,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800"],
    specs: { "Chip": "A17 Pro", "Material": "Titanium", "Camera": "48MP Main" },
    tags: ["Phone", "Apple", "Mobile", "Flagship"]
  },
  {
    name: "MacBook Pro 16 M3 Max",
    description: "Mind-blowing performance. With the M3 Max chip, up to 22 hours of battery life, and a Liquid Retina XDR display.",
    price: 3499,
    category: "Laptops",
    brand: "Apple",
    stock: 25,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800"],
    specs: { "Chip": "M3 Max", "RAM": "36GB", "Storage": "1TB SSD" },
    tags: ["Laptop", "Apple", "Pro", "Creative"]
  },
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.",
    price: 799,
    category: "Wearables",
    brand: "Apple",
    stock: 45,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800"],
    specs: { "Case": "49mm Titanium", "Brightness": "3000 nits", "Water Resistance": "100m" },
    tags: ["Wearable", "Watch", "Apple", "Fitness"]
  },

  // ==========================
  // SAMSUNG (Phones, TVs)
  // ==========================
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Unleash new levels of creativity, productivity and possibility with Galaxy AI. The epic standard for mobile technology.",
    price: 1299,
    category: "Phones",
    brand: "Samsung",
    stock: 70,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"],
    specs: { "AI": "Galaxy AI", "Camera": "200MP", "S-Pen": "Included" },
    tags: ["Phone", "Samsung", "Android", "AI"]
  },
  {
    name: "Samsung Odyssey Ark 2nd Gen",
    description: "55-inch 1000R curved gaming screen that rotates to Cockpit Mode. The ultimate immersion station.",
    price: 1999,
    category: "Gaming",
    brand: "Samsung",
    stock: 10,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800"],
    specs: { "Size": "55-inch Curved", "Refresh Rate": "165Hz", "Resolution": "4K UHD" },
    tags: ["Gaming", "Monitor", "Samsung", "Curved"]
  },

  // ==========================
  // DELL & ALIENWARE (Computing)
  // ==========================
  {
    name: "Alienware Aurora R16",
    description: "Streamlined design, improved thermals, and quieter acoustics. Powered by NVIDIA GeForce RTX 4090.",
    price: 2799,
    category: "Gaming",
    brand: "Alienware",
    stock: 15,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"],
    specs: { "GPU": "RTX 4090", "CPU": "Intel i9 14th Gen", "RAM": "64GB DDR5" },
    tags: ["Gaming", "PC", "Desktop", "High-Performance"]
  },
  {
    name: "Dell XPS 13 Plus",
    description: "Simple. Balanced. Modern. A seamless glass touchpad and zero-lattice keyboard redefine the laptop experience.",
    price: 1399,
    category: "Laptops",
    brand: "Dell",
    stock: 35,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800"],
    specs: { "Screen": "OLED Touch", "Processor": "Intel Core Ultra 7", "Weight": "2.7 lbs" },
    tags: ["Laptop", "Windows", "Dell", "Business"]
  },

  // ==========================
  // ACCESSORIES (Logitech, Bose)
  // ==========================
  {
    name: "Logitech MX Master 3S",
    description: "An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance.",
    price: 99,
    category: "Accessories",
    brand: "Logitech",
    stock: 200,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800"],
    specs: { "DPI": "8000", "Clicks": "Quiet", "Scroll": "MagSpeed" },
    tags: ["Accessory", "Mouse", "Productivity", "Logitech"]
  },
  {
    name: "Bose QuietComfort Ultra",
    description: "World-class noise cancellation, quieter than ever before. Breakthrough spatial audio for more immersive listening.",
    price: 429,
    category: "Audio",
    brand: "Bose",
    stock: 100,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"],
    specs: { "Audio": "Spatial", "Battery": "24 Hours", "Connectivity": "Bluetooth 5.3" },
    tags: ["Audio", "Headphones", "Bose", "Travel"]
  }
];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected.");

    console.log("🧹 Clearing existing database to ensure clean slate...");
    await Product.deleteMany({});

    console.log(`🌱 Seeding ${products.length} major brand products...`);
    await Product.insertMany(products);

    console.log("✨ Database populated with Global Brands!");
    console.log("   - Sony (Gaming, TV, Audio)");
    console.log("   - Apple (Phone, Laptop, Watch)");
    console.log("   - Samsung (Phone, Gaming Monitor)");
    console.log("   - Alienware/Dell (Gaming PC, Laptop)");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();