import mongoose from "mongoose";
import * as dotenv from "dotenv";

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
    enum: ['Phones', 'Laptops', 'Accessories', 'Smart Home', 'Wearables', 'Gaming', 'TVs', 'Audio', 'Tablets']
  },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  specs: { type: Map, of: String },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// --- THE EXPANDED CATALOG (PhonePlaceKenya Style) ---
const products = [
  // ==========================
  // APPLE (The Ecosystem)
  // ==========================
  {
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone. Forged in titanium, featuring the A17 Pro chip and the most powerful camera system in a smartphone.",
    price: 1199,
    category: "Phones",
    brand: "Apple",
    stock: 50,
    rating: 4.9,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800"],
    specs: { "Storage": "256GB/512GB", "Chip": "A17 Pro", "Camera": "48MP" }
  },
  {
    name: "iPhone 14",
    description: "A total powerhouse. Impressive dual-camera system, vital safety features, and all-day battery life.",
    price: 699,
    category: "Phones",
    brand: "Apple",
    stock: 100,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&q=80&w=800"],
    specs: { "Storage": "128GB", "Chip": "A15 Bionic", "Screen": "6.1 OLED" }
  },
  {
    name: "MacBook Air M3 (13-inch)",
    description: "Lean. Mean. M3 Machine. The world's most popular laptop is now faster and more capable than ever.",
    price: 1099,
    category: "Laptops",
    brand: "Apple",
    stock: 40,
    rating: 4.8,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800"],
    specs: { "Chip": "M3", "RAM": "8GB/16GB", "Battery": "18 Hours" }
  },
  {
    name: "iPad Pro 12.9 (M2)",
    description: "The ultimate iPad experience. Astonishing performance, superfast wireless connectivity, and next-level Apple Pencil hover experience.",
    price: 1099,
    category: "Tablets",
    brand: "Apple",
    stock: 30,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"],
    specs: { "Chip": "M2", "Screen": "Liquid Retina XDR", "Connectivity": "5G" }
  },
  {
    name: "AirPods Pro (2nd Gen)",
    description: "Rebuilt from the sound up. Up to 2x more Active Noise Cancellation and Adaptive Transparency.",
    price: 249,
    category: "Audio",
    brand: "Apple",
    stock: 150,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800"],
    specs: { "Case": "USB-C MagSafe", "Audio": "Spatial", "Battery": "6 Hours" }
  },

  // ==========================
  // SAMSUNG (Galaxy Universe)
  // ==========================
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Galaxy AI is here. The new titanium exterior and flat display meet the S Pen for the ultimate Android experience.",
    price: 1299,
    category: "Phones",
    brand: "Samsung",
    stock: 60,
    rating: 4.8,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"],
    specs: { "AI": "Galaxy AI", "Zoom": "100x Space Zoom", "S-Pen": "Included" }
  },
  {
    name: "Samsung Galaxy Z Fold 5",
    description: "PC-like power in your pocket. Unfold a massive 7.6-inch screen for gaming, working, and watching.",
    price: 1799,
    category: "Phones",
    brand: "Samsung",
    stock: 20,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1661347560636-96a3070b4713?auto=format&fit=crop&q=80&w=800"],
    specs: { "Form Factor": "Foldable", "Multitasking": "3 App Split", "Water Resistant": "IPX8" }
  },
  {
    name: "Samsung Galaxy A55 5G",
    description: "Awesome for everyone. The mid-range king with a premium metal frame, nightography camera, and 2-day battery life.",
    price: 449,
    category: "Phones",
    brand: "Samsung",
    stock: 200,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800"],
    specs: { "Camera": "50MP", "Battery": "5000mAh", "Screen": "120Hz AMOLED" }
  },
  {
    name: "Samsung QLED 4K Q80C (65\")",
    description: "Direct Full Array delivers incredible contrast for deep blacks and bright whites. Neural Quantum Processor 4K upscales everything.",
    price: 1199,
    category: "TVs",
    brand: "Samsung",
    stock: 15,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800"],
    specs: { "Resolution": "4K", "Audio": "Dolby Atmos", "Gaming": "Motion Xcelerator" }
  },

  // ==========================
  // TECNO & INFINIX & XIAOMI (Kenya Favorites)
  // ==========================
  {
    name: "Tecno Camon 30 Premier",
    description: "Master of Portraits. Featuring a 50MP Sony IMX890 sensor and 70W Ultra Charge. The best camera phone in its class.",
    price: 399,
    category: "Phones",
    brand: "Tecno",
    stock: 120,
    rating: 4.4,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&q=80&w=800"],
    specs: { "Camera": "50MP Periscope", "RAM": "12GB + 12GB Extended", "Charging": "70W" }
  },
  {
    name: "Infinix Note 40 Pro+",
    description: "All-Round FastCharge 2.0. 100W wired charging + 20W wireless MagCharge. A curved AMOLED display for immersive viewing.",
    price: 320,
    category: "Phones",
    brand: "Infinix",
    stock: 150,
    rating: 4.3,
    images: ["https://images.unsplash.com/photo-1556656793-02715d8dd6f8?auto=format&fit=crop&q=80&w=800"],
    specs: { "Charging": "100W", "Screen": "3D Curved AMOLED", "Speaker": "JBL Tuned" }
  },
  {
    name: "Redmi Note 13 Pro+ 5G",
    description: "Every shot iconic. 200MP OIS camera, IP68 water resistance, and a 1.5K CrystalRes curved display.",
    price: 450,
    category: "Phones",
    brand: "Xiaomi",
    stock: 80,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"],
    specs: { "Camera": "200MP", "Charging": "120W HyperCharge", "Protection": "IP68" }
  },

  // ==========================
  // GOOGLE & ONEPLUS
  // ==========================
  {
    name: "Google Pixel 8 Pro",
    description: "The AI phone. Features the Tensor G3 chip, Best Take, Magic Editor, and 7 years of OS updates.",
    price: 999,
    category: "Phones",
    brand: "Google",
    stock: 40,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1612442449529-88732a81df57?auto=format&fit=crop&q=80&w=800"],
    specs: { "AI": "Gemini Nano", "Camera": "Pro Controls", "Screen": "Super Actua" }
  },
  {
    name: "OnePlus 12",
    description: "Smooth Beyond Belief. Snapdragon 8 Gen 3, 16GB RAM, and a massive 5400mAh battery with 100W charging.",
    price: 799,
    category: "Phones",
    brand: "OnePlus",
    stock: 35,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1660467566164-338c20892257?auto=format&fit=crop&q=80&w=800"],
    specs: { "Performance": "Snapdragon 8 Gen 3", "Cooling": "Dual Cryo-velocity", "Battery": "5400mAh" }
  },

  // ==========================
  // AUDIO & LIFESTYLE (JBL, Sony, Garmin)
  // ==========================
  {
    name: "JBL Flip 6",
    description: "Bold sound for every adventure. IP67 waterproof and dustproof, 12 hours of playtime, and PartyBoost compatible.",
    price: 129,
    category: "Audio",
    brand: "JBL",
    stock: 300,
    rating: 4.8,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=800"],
    specs: { "Waterproof": "IP67", "Battery": "12 Hours", "Sound": "2-way Speaker System" }
  },
  {
    name: "Sony WH-1000XM5",
    description: "The best noise cancelling headphones on the market. Distraction-free listening with Auto NC Optimizer.",
    price: 348,
    category: "Audio",
    brand: "Sony",
    stock: 90,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
    specs: { "ANC": "Dual Processor", "Calls": "Precise Voice Pickup", "Battery": "30 Hours" }
  },
  {
    name: "Garmin Fenix 7 Pro",
    description: "Conquer every hour. Advanced training features, 24/7 health and wellness monitoring, and an LED flashlight.",
    price: 799,
    category: "Wearables",
    brand: "Garmin",
    stock: 25,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"],
    specs: { "Solar": "Sapphire Solar", "GPS": "Multi-Band", "Battery": "Up to 37 Days" }
  },

  // ==========================
  // GAMING & TV
  // ==========================
  {
    name: "PlayStation 5 Slim (Disc)",
    description: "Play Like Never Before. The same immense power of the PS5, packed into a slimmer, smaller design.",
    price: 499,
    category: "Gaming",
    brand: "Sony",
    stock: 80,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800"],
    specs: { "Storage": "1TB SSD", "Output": "4K 120Hz", "Ray Tracing": "Enabled" }
  },
  {
    name: "LG C3 Series OLED evo 55\"",
    description: "The world's #1 OLED TV. Powered by the a9 AI Processor Gen6 for beautiful picture and performance.",
    price: 1499,
    category: "TVs",
    brand: "LG",
    stock: 12,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800"],
    specs: { "Panel": "OLED evo", "Gaming": "0.1ms Response", "HDMI": "4x HDMI 2.1" }
  },
  {
    name: "Nintendo Switch OLED",
    description: "Feast your eyes on vivid colors and crisp contrast with the 7-inch OLED screen. Play anytime, anywhere.",
    price: 349,
    category: "Gaming",
    brand: "Nintendo",
    stock: 60,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1644365737525-45d475704873?auto=format&fit=crop&q=80&w=800"],
    specs: { "Screen": "7-inch OLED", "Modes": "TV/Tabletop/Handheld", "Storage": "64GB" }
  },

  // ==========================
  // LAPTOPS (Windows Powerhouses)
  // ==========================
  {
    name: "HP Spectre x360 14",
    description: "Crafted to perfection. A 2-in-1 convertible with an OLED display, AI-enhanced camera, and Intel Core Ultra.",
    price: 1599,
    category: "Laptops",
    brand: "HP",
    stock: 30,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=800"],
    specs: { "Processor": "Intel Core Ultra 7", "Screen": "2.8K OLED Touch", "Feature": "360 Hinge" }
  },
  {
    name: "Dell XPS 15",
    description: "Immersive display, true-to-life color, and powerhouse performance for creators.",
    price: 1899,
    category: "Laptops",
    brand: "Dell",
    stock: 25,
    rating: 4.5,
    images: ["https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800"],
    specs: { "GPU": "RTX 4050", "Screen": "InfinityEdge", "Build": "CNC Aluminum" }
  }
];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected.");

    console.log("🧹 Clearing existing database...");
    await Product.deleteMany({});

    console.log(`🌱 Seeding ${products.length} products mimicking PhonePlaceKenya inventory...`);
    await Product.insertMany(products);

    console.log("✨ Database populated successfully!");
    console.log("   Brands included: Apple, Samsung, Tecno, Infinix, Xiaomi, Sony, JBL, HP, Dell, etc.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();