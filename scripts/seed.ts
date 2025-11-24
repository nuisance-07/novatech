const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number, required: true },
  images: [{ type: String }],
  rating: { type: Number, default: 4.5 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
  // --- Gaming ---
  {
    name: "Sony PlayStation 5 Pro",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    price: 499,
    category: "Gaming",
    brand: "Sony",
    stock: 50,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800"],
    tags: ["Gaming", "Console", "Sony", "Next-Gen"],
  },
  {
    name: "Alienware Aurora R16",
    description: "Optimized for gaming performance with liquid cooling and the latest NVIDIA GeForce RTX 40-series graphics.",
    price: 2199,
    category: "Gaming",
    brand: "Alienware",
    stock: 15,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800"],
    tags: ["Gaming", "PC", "Desktop", "High-Performance"],
  },
  {
    name: "Logitech G Pro X Superlight",
    description: "Meticulously designed in collaboration with many of the world's leading esports pros. Engineered to win.",
    price: 159,
    category: "Gaming",
    brand: "Logitech",
    stock: 100,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800"],
    tags: ["Gaming", "Mouse", "Wireless", "Esports"],
  },

  // --- TVs ---
  {
    name: "Sony Bravia XR A95L OLED",
    description: "Our brightest and widest range of colors and shades, all beautifully displayed on a QD-OLED screen powered by Cognitive Processor XR.",
    price: 2999,
    category: "TVs",
    brand: "Sony",
    stock: 10,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800"],
    tags: ["TV", "OLED", "4K", "Home Theater"],
  },
  {
    name: "Samsung Neo QLED 8K",
    description: "The pinnacle of light control. Quantum Matrix Technology Pro propels our Neo QLED 8K to new heights.",
    price: 3499,
    category: "TVs",
    brand: "Samsung",
    stock: 8,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800"],
    tags: ["TV", "8K", "QLED", "Samsung"],
  },
  {
    name: "LG OLED evo G3",
    description: "Brightness Booster Max produces up to 70% brighter images, for luminous, high-contrast picture quality.",
    price: 2499,
    category: "TVs",
    brand: "LG",
    stock: 12,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&q=80&w=800"],
    tags: ["TV", "OLED", "Gaming", "LG"],
  },

  // --- Audio ---
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones for unprecedented noise cancellation.",
    price: 399,
    category: "Audio",
    brand: "Sony",
    stock: 60,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
    tags: ["Audio", "Headphones", "Noise Cancelling", "Wireless"],
  },
  {
    name: "Apple AirPods Max",
    description: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
    price: 549,
    category: "Audio",
    brand: "Apple",
    stock: 45,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800"],
    tags: ["Audio", "Headphones", "Apple", "Premium"],
  },
  {
    name: "Bose QuietComfort Ultra",
    description: "World-class noise cancellation, quieter than ever before. Breakthrough spatial audio for more immersive listening.",
    price: 429,
    category: "Audio",
    brand: "Bose",
    stock: 55,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"],
    tags: ["Audio", "Headphones", "Bose", "Travel"],
  },

  // --- Laptops ---
  {
    name: "MacBook Pro 16 M3 Max",
    description: "Mind-blowing performance. The M3 Max chip brings massive CPU and GPU performance for the most demanding workflows.",
    price: 3499,
    category: "Laptops",
    brand: "Apple",
    stock: 25,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"],
    tags: ["Laptop", "Apple", "Pro", "Creative"],
  },
  {
    name: "Dell XPS 15",
    description: "Immersive display, powerful performance. The perfect balance of power and portability.",
    price: 1899,
    category: "Laptops",
    brand: "Dell",
    stock: 30,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800"],
    tags: ["Laptop", "Windows", "Dell", "Business"],
  },

  // --- Phones ---
  {
    name: "iPhone 15 Pro Max",
    description: "Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1199,
    category: "Phones",
    brand: "Apple",
    stock: 100,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800"],
    tags: ["Phone", "Apple", "Mobile", "Flagship"],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Unleash new ways to create, connect, and more. The new era of mobile AI is here.",
    price: 1299,
    category: "Phones",
    brand: "Samsung",
    stock: 85,
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"],
    tags: ["Phone", "Samsung", "Android", "AI"],
  },

  // --- Wearables ---
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.",
    price: 799,
    category: "Wearables",
    brand: "Apple",
    stock: 40,
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800"],
    tags: ["Wearable", "Watch", "Apple", "Fitness"],
  }
];

async function seed() {
  try {
    console.log("Connecting...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    console.log("Clearing old data...");
    await Product.deleteMany({});

    console.log("Seeding...");
    await Product.insertMany(products);

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();