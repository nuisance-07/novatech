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
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1636199346618-912f70b77873?auto=format&fit=crop&q=80&w=800"], // Generic foldable feel
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
    images: ["https://images.unsplash.com/photo-1631281926665-2275464166f9?auto=format&fit=crop&q=80&w=800"], // Generic buds
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
    images: ["https://images.unsplash.com/photo-1588702547923-7093a6c3f067?auto=format&fit=crop&q=80&w=800"], // Generic tablet
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
    images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800"], // Smartwatch
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
    images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop"],
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
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1558590924-119c6742525c?auto=format&fit=crop&q=80&w=800"], // Stylus/Pencil concept
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
    images: ["https://images.unsplash.com/photo-1551817958-c18561b4b927?auto=format&fit=crop&q=80&w=800"], // Generic watch
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
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1592899677712-a5a254503484?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?auto=format&fit=crop&q=80&w=800"], // Techy vibe
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
    images: ["https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1609592424302-16c69ac1c699?auto=format&fit=crop&q=80&w=800"], // Powerbank
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
    images: ["https://images.unsplash.com/photo-1625750856386-7e447475604f?auto=format&fit=crop&q=80&w=800"], // Charger
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
    images: ["https://images.unsplash.com/photo-1617135008568-18507851944f?auto=format&fit=crop&q=80&w=800"], // MagSafe
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
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800"], // Speaker/Soundbar
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
    images: ["https://images.unsplash.com/photo-1590845947698-8924d7409b56?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1592840496011-a58566d68d41?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800"], // Gaming phone vibe
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
    images: ["https://images.unsplash.com/photo-1610041321420-a596dd14ebc9?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1597872252165-4827c9268754?auto=format&fit=crop&q=80&w=800"], // SSD/Hard drive
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
    images: ["https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=800"], // SD card
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
    images: ["https://images.unsplash.com/photo-1622617822944-162446731776?auto=format&fit=crop&q=80&w=800"], // Hub
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
    images: ["https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=800"], // Tablet
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
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"],
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
    images: ["https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800"], // Drone
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
    images: ["https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800"], // Action cam
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
    images: ["https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?auto=format&fit=crop&q=80&w=800"], // Gimbal vibe
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
    images: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"], // Lighting
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