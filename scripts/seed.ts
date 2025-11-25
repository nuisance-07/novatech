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
    enum: [
      'Samsung',
      'Apple',
      'Smartphones',
      'Mobile Accessories',
      'Audio',
      'Gaming',
      'Storage',
      'Tablets',
      'Content Creator Kit'
    ]
  },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  specs: { type: Map, of: String },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }] // Added tags for "You may like" feature
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// --- THE EXPANDED CATALOG ---
const products = [
  // ==========================
  // SAMSUNG (Samsung phones ,Galaxy Buds, galaxy tablet and galaxy watch)
  // ==========================
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate Galaxy experience with AI, Titanium frame, and S Pen.",
    price: 1299,
    category: "Samsung",
    brand: "Samsung",
    stock: 50,
    rating: 4.9,
    isFeatured: true,
    images: [],
    specs: { "Storage": "512GB", "RAM": "12GB", "Camera": "200MP" },
    tags: ["phone", "samsung", "flagship", "android"]
  },
  {
    name: "Samsung Galaxy Z Flip 5",
    description: "Pocket-sized perfection. Flex Window, versatile camera, and durable design.",
    price: 999,
    category: "Samsung",
    brand: "Samsung",
    stock: 30,
    rating: 4.7,
    images: [],
    specs: { "Storage": "256GB", "Screen": "Foldable AMOLED" },
    tags: ["phone", "samsung", "foldable", "android"]
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    description: "24-bit Hi-Fi audio, Intelligent ANC, and 360 Audio for immersive sound.",
    price: 229,
    category: "Samsung",
    brand: "Samsung",
    stock: 100,
    rating: 4.6,
    images: [],
    specs: { "Audio": "24-bit Hi-Fi", "ANC": "Yes" },
    tags: ["audio", "buds", "samsung", "wireless"]
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "The new standard for premium tablets. Dynamic AMOLED 2X display and IP68 rating.",
    price: 1199,
    category: "Samsung",
    brand: "Samsung",
    stock: 20,
    rating: 4.8,
    images: [],
    specs: { "Screen": "14.6 inch", "S-Pen": "Included" },
    tags: ["tablet", "samsung", "android"]
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    description: "The rotating bezel is back. Advanced sleep coaching and heart health monitoring.",
    price: 399,
    category: "Samsung",
    brand: "Samsung",
    stock: 40,
    rating: 4.7,
    images: [],
    specs: { "Size": "47mm", "Health": "BIA Sensor" },
    tags: ["watch", "samsung", "wearable", "fitness"]
  },

  // ==========================
  // APPLE (Apple iphone , Apple iPad,Airpods Apple Pencil, Apple Watch ,iMac and Macbooks)
  // ==========================
  {
    name: "iPhone 15 Pro Max",
    description: "Titanium design, A17 Pro chip, and the most powerful iPhone camera ever.",
    price: 1199,
    category: "Apple",
    brand: "Apple",
    stock: 60,
    rating: 4.9,
    isFeatured: true,
    images: [],
    specs: { "Storage": "256GB", "Chip": "A17 Pro" },
    tags: ["phone", "apple", "iphone", "ios"]
  },
  {
    name: "iPad Pro 12.9 (M2)",
    description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.",
    price: 1099,
    category: "Apple",
    brand: "Apple",
    stock: 25,
    rating: 4.8,
    images: [],
    specs: { "Chip": "M2", "Screen": "12.9 inch" },
    tags: ["tablet", "apple", "ipad", "ios"]
  },
  {
    name: "AirPods Pro (2nd Gen)",
    description: "Rich audio, next-level Active Noise Cancellation, and Adaptive Transparency.",
    price: 249,
    category: "Apple",
    brand: "Apple",
    stock: 150,
    rating: 4.8,
    images: [],
    specs: { "Case": "USB-C", "ANC": "2x Better" },
    tags: ["audio", "apple", "airpods", "wireless"]
  },
  {
    name: "Apple Pencil (2nd Gen)",
    description: "Pixel-perfect precision and industry-leading low latency.",
    price: 129,
    category: "Apple",
    brand: "Apple",
    stock: 80,
    rating: 4.7,
    images: [],
    specs: { "Charging": "Magnetic", "Compatibility": "iPad Pro/Air" },
    tags: ["accessory", "apple", "creative"]
  },
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch. Designed for outdoor adventure.",
    price: 799,
    category: "Apple",
    brand: "Apple",
    stock: 30,
    rating: 4.9,
    images: [],
    specs: { "Case": "Titanium", "Battery": "36 Hours" },
    tags: ["watch", "apple", "wearable", "fitness"]
  },
  {
    name: "MacBook Air 15 (M3)",
    description: "Impressively big. Impossibly thin. Supercharged by the M3 chip.",
    price: 1299,
    category: "Apple",
    brand: "Apple",
    stock: 40,
    rating: 4.8,
    images: [],
    specs: { "Chip": "M3", "Screen": "15.3 inch" },
    tags: ["laptop", "apple", "macbook", "computer"]
  },

  // ==========================
  // SMARTPHONES (Infinix,tecno, xiaomi,oppo,google pixel, nothing phone,one plus vivo and itel)
  // ==========================
  {
    name: "Google Pixel 8 Pro",
    description: "The AI phone built by Google. Pro-level cameras and all-day battery.",
    price: 999,
    category: "Smartphones",
    brand: "Google",
    stock: 45,
    rating: 4.7,
    images: [],
    specs: { "Chip": "Tensor G3", "AI": "Gemini Nano" },
    tags: ["phone", "google", "pixel", "android"]
  },
  {
    name: "Tecno Camon 30 Premier",
    description: "Experience the ultimate portrait master with 50MP Sony IMX890.",
    price: 450,
    category: "Smartphones",
    brand: "Tecno",
    stock: 100,
    rating: 4.5,
    images: [],
    specs: { "Camera": "50MP", "Charging": "70W" },
    tags: ["phone", "tecno", "android"]
  },
  {
    name: "Infinix Note 40 Pro",
    description: "Take charge with 100W FastCharge and a 3D Curved AMOLED display.",
    price: 350,
    category: "Smartphones",
    brand: "Infinix",
    stock: 120,
    rating: 4.4,
    images: [],
    specs: { "Charging": "100W", "Screen": "120Hz" },
    tags: ["phone", "infinix", "android"]
  },
  {
    name: "Xiaomi Redmi Note 13 Pro+",
    description: "Iconic shots with 200MP OIS camera and IP68 protection.",
    price: 400,
    category: "Smartphones",
    brand: "Xiaomi",
    stock: 90,
    rating: 4.6,
    images: [],
    specs: { "Camera": "200MP", "Battery": "5000mAh" },
    tags: ["phone", "xiaomi", "redmi", "android"]
  },
  {
    name: "Nothing Phone (2)",
    description: "Come to the bright side. Glyph Interface and Nothing OS 2.0.",
    price: 699,
    category: "Smartphones",
    brand: "Nothing",
    stock: 30,
    rating: 4.7,
    images: [],
    specs: { "Interface": "Glyph", "Chip": "Snapdragon 8+ Gen 1" },
    tags: ["phone", "nothing", "android", "unique"]
  },
  {
    name: "OnePlus 12",
    description: "Smooth beyond belief. Powered by Snapdragon 8 Gen 3.",
    price: 799,
    category: "Smartphones",
    brand: "OnePlus",
    stock: 40,
    rating: 4.8,
    images: [],
    specs: { "Chip": "Snapdragon 8 Gen 3", "Charging": "100W" },
    tags: ["phone", "oneplus", "android"]
  },

  // ==========================
  // MOBILE ACCESSORIES (apple accessories, samsung accessories, smartwatches chargers and powerbanks)
  // ==========================
  {
    name: "Anker 737 Power Bank",
    description: "Ultra-powerful two-way charging. 24,000mAh capacity to charge your laptop and phone.",
    price: 149,
    category: "Mobile Accessories",
    brand: "Anker",
    stock: 80,
    rating: 4.9,
    images: [],
    specs: { "Capacity": "24000mAh", "Output": "140W" },
    tags: ["accessory", "powerbank", "charging"]
  },
  {
    name: "Samsung 45W Power Adapter",
    description: "Super Fast Charging 2.0 for your Galaxy devices.",
    price: 49,
    category: "Mobile Accessories",
    brand: "Samsung",
    stock: 200,
    rating: 4.8,
    images: [],
    specs: { "Power": "45W", "Port": "USB-C" },
    tags: ["accessory", "charger", "samsung"]
  },
  {
    name: "Apple MagSafe Charger",
    description: "Snap on and power up. Faster wireless charging for iPhone.",
    price: 39,
    category: "Mobile Accessories",
    brand: "Apple",
    stock: 150,
    rating: 4.7,
    images: [],
    specs: { "Power": "15W", "Type": "Magnetic" },
    tags: ["accessory", "charger", "apple"]
  },

  // ==========================
  // AUDIO (Buds,speakers headphones, in ear headphones, soundbars and microphones)
  // ==========================
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation and magnificent sound.",
    price: 348,
    category: "Audio",
    brand: "Sony",
    stock: 70,
    rating: 4.9,
    images: [],
    specs: { "ANC": "Yes", "Battery": "30 Hours" },
    tags: ["audio", "headphones", "sony", "wireless"]
  },
  {
    name: "JBL Flip 6",
    description: "Bold sound for every adventure. Waterproof and dustproof.",
    price: 129,
    category: "Audio",
    brand: "JBL",
    stock: 120,
    rating: 4.8,
    images: [],
    specs: { "Waterproof": "IP67", "Battery": "12 Hours" },
    tags: ["audio", "speaker", "jbl", "portable"]
  },
  {
    name: "Bose Smart Soundbar 900",
    description: "Immersive sound for all your content. Supports Dolby Atmos.",
    price: 899,
    category: "Audio",
    brand: "Bose",
    stock: 15,
    rating: 4.7,
    images: [],
    specs: { "Audio": "Dolby Atmos", "Voice": "Alexa/Google" },
    tags: ["audio", "soundbar", "home-theater"]
  },
  {
    name: "Blue Yeti USB Microphone",
    description: "The world's #1 USB microphone. Perfect for streaming, podcasting, and calls.",
    price: 129,
    category: "Audio",
    brand: "Logitech",
    stock: 50,
    rating: 4.8,
    images: [],
    specs: { "Pattern": "Multi-pattern", "Connection": "USB" },
    tags: ["audio", "microphone", "streaming"]
  },

  // ==========================
  // GAMING (gaming console, PS5 games , gaming controllers, gaming headsets and gaming phones)
  // ==========================
  {
    name: "PlayStation 5 Slim",
    description: "Play Has No Limits. Lightning fast loading and incredible immersion.",
    price: 499,
    category: "Gaming",
    brand: "Sony",
    stock: 60,
    rating: 4.9,
    isFeatured: true,
    images: [],
    specs: { "Storage": "1TB SSD", "Output": "4K 120Hz" },
    tags: ["gaming", "console", "ps5", "sony"]
  },
  {
    name: "DualSense Wireless Controller",
    description: "Discover a deeper gaming experience with haptic feedback and adaptive triggers.",
    price: 69,
    category: "Gaming",
    brand: "Sony",
    stock: 100,
    rating: 4.8,
    images: [],
    specs: { "Features": "Haptics", "Battery": "Rechargeable" },
    tags: ["gaming", "controller", "ps5"]
  },
  {
    name: "ASUS ROG Phone 8 Pro",
    description: "Beyond Gaming. The world's most powerful gaming smartphone.",
    price: 1199,
    category: "Gaming",
    brand: "ASUS",
    stock: 20,
    rating: 4.7,
    images: [],
    specs: { "Chip": "Snapdragon 8 Gen 3", "Screen": "165Hz AMOLED" },
    tags: ["gaming", "phone", "asus", "android"]
  },
  {
    name: "HyperX Cloud Alpha",
    description: "Pro Gaming Headset with dual chamber drivers for distinct audio.",
    price: 99,
    category: "Gaming",
    brand: "HyperX",
    stock: 80,
    rating: 4.6,
    images: [],
    specs: { "Audio": "Dual Chamber", "Comfort": "Memory Foam" },
    tags: ["gaming", "headset", "audio"]
  },

  // ==========================
  // STORAGE (flash drives, hard drives ,memory cards and USB hubs)
  // ==========================
  {
    name: "SanDisk Extreme Portable SSD",
    description: "Fast NVMe solid state performance in a portable, high-capacity drive.",
    price: 129,
    category: "Storage",
    brand: "SanDisk",
    stock: 60,
    rating: 4.8,
    images: [],
    specs: { "Capacity": "1TB", "Speed": "1050MB/s" },
    tags: ["storage", "ssd", "portable"]
  },
  {
    name: "Samsung EVO Plus microSD",
    description: "Smart choice for your phone, tablet, or Nintendo Switch.",
    price: 25,
    category: "Storage",
    brand: "Samsung",
    stock: 200,
    rating: 4.7,
    images: [],
    specs: { "Capacity": "256GB", "Class": "U3" },
    tags: ["storage", "sdcard", "memory"]
  },
  {
    name: "Anker USB-C Hub",
    description: "Massive expansion. 7-in-1 USB-C data hub with 4K HDMI.",
    price: 49,
    category: "Storage",
    brand: "Anker",
    stock: 50,
    rating: 4.6,
    images: [],
    specs: { "Ports": "7", "HDMI": "4K" },
    tags: ["storage", "hub", "accessory"]
  },

  // ==========================
  // TABLETS (kids tablets, Apple tablet, galaxy tablet and modio tablets)
  // ==========================
  {
    name: "Modio M22 Kids Tablet",
    description: "Perfect for learning and play. Durable case and parental controls included.",
    price: 89,
    category: "Tablets",
    brand: "Modio",
    stock: 100,
    rating: 4.2,
    images: [],
    specs: { "Screen": "7 inch", "OS": "Android" },
    tags: ["tablet", "kids", "modio"]
  },
  {
    name: "iPad Air (M1)",
    description: "Light. Bright. Full of might. Supercharged by the Apple M1 chip.",
    price: 599,
    category: "Tablets",
    brand: "Apple",
    stock: 40,
    rating: 4.8,
    images: [],
    specs: { "Chip": "M1", "Screen": "10.9 inch" },
    tags: ["tablet", "apple", "ipad"]
  },

  // ==========================
  // CONTENT CREATOR KIT (tripod, ring light, gimbal, drones and action cameras)
  // ==========================
  {
    name: "DJI Mini 4 Pro",
    description: "Go big with Mini. 4K/60fps HDR video and omnidirectional obstacle sensing.",
    price: 759,
    category: "Content Creator Kit",
    brand: "DJI",
    stock: 20,
    rating: 4.9,
    isFeatured: true,
    images: [],
    specs: { "Video": "4K HDR", "Weight": "<249g" },
    tags: ["creator", "drone", "dji", "video"]
  },
  {
    name: "GoPro HERO12 Black",
    description: "Incredible image quality, even better HyperSmooth video stabilization.",
    price: 399,
    category: "Content Creator Kit",
    brand: "GoPro",
    stock: 40,
    rating: 4.7,
    images: [],
    specs: { "Video": "5.3K", "Waterproof": "33ft" },
    tags: ["creator", "camera", "action", "gopro"]
  },
  {
    name: "DJI Osmo Mobile 6",
    description: "Unfold your creativity. Intelligent smartphone stabilizer with ActiveTrack 6.0.",
    price: 159,
    category: "Content Creator Kit",
    brand: "DJI",
    stock: 60,
    rating: 4.6,
    images: [],
    specs: { "Axis": "3-Axis", "Feature": "Extension Rod" },
    tags: ["creator", "gimbal", "stabilizer"]
  },
  {
    name: "Neewer Ring Light Kit",
    description: "Professional lighting for streaming, makeup, and photography.",
    price: 89,
    category: "Content Creator Kit",
    brand: "Neewer",
    stock: 80,
    rating: 4.5,
    images: [],
    specs: { "Size": "18 inch", "Temp": "3200K-5600K" },
    tags: ["creator", "lighting", "ringlight"]
  }
];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected.");

    console.log("🧹 Clearing existing database...");
    await Product.deleteMany({});

    console.log(`🌱 Seeding ${products.length} products for Electronics Rebrand...`);
    await Product.insertMany(products);

    console.log("✨ Database populated successfully!");
    console.log("   Categories: Samsung, Apple, Smartphones, Audio, Gaming, etc.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();