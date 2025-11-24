"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

// --- BACKGROUND VIDEOS ---
// Using reliable tech/futuristic stock footage URLs
const HERO_VIDEOS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState(0);

  // 1. Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true');
        // Fallback for demo if API isn't set up yet
        if (!res.ok) {
          // We'll rely on the seed data structure for the UI
          // In a real app, this fetches from DB. 
          // For now, we simulate a delay to show the skeleton or loading state
        }
      } catch (e) {
        console.error(e);
      }
    }

    // For this demo, we'll hardcode the "Featured" display using the seed logic 
    // so the user sees the marquee immediately without needing the API route
    setProducts([
      { name: "iPhone 15 Pro Max", price: 1199, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop" },
      { name: "PS5 Slim", price: 499, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop" },
      { name: "MacBook Air", price: 1299, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&auto=format&fit=crop" },
      { name: "Samsung S24 Ultra", price: 1299, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop" },
      { name: "Sony XM5", price: 348, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop" },
      { name: "Nintendo Switch", price: 349, image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop" },
    ]);
  }, []);

  // 2. Cycle Videos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">

      {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for readability */}
          {HERO_VIDEOS.map((src, index) => (
            <video
              key={src}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Content Layer */}
        <div className="z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-white tracking-wider">NEXT GEN COMMERCE</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8 drop-shadow-2xl">
            NovaTech.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of technology. <br />
            <span className="text-primary font-semibold">Visionary Gear</span> for the modern creator.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/shop"
              className="px-10 py-5 bg-primary text-white rounded-full font-bold hover:bg-primary-hover hover:scale-105 transition transform shadow-[0_0_40px_rgba(0,122,255,0.5)] flex items-center justify-center gap-3"
            >
              Start Shopping <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/30 transition backdrop-blur-md"
            >
              Explore Ecosystem
            </Link>
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE SCROLL (Auto-Scrolling Products) --- */}
      <section className="py-20 bg-surface border-y border-white/5 overflow-hidden">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase">Trending Now</h2>
        </div>

        {/* The Scrolling Container */}
        <div className="relative w-full">
          {/* Left/Right Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {/* We duplicate the products list twice to create a seamless loop */}
            {[...products, ...products, ...products].map((product, i) => (
              <div key={i} className="w-[300px] mx-4 shrink-0 group cursor-pointer">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-4 bg-white/5 border border-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-lg">{product.name}</h3>
                    <div className="flex gap-1 text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                  <span className="text-primary font-bold text-lg">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED CATEGORIES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"
              alt="Gaming"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-2">Pro Gaming</h3>
              <p className="text-gray-300 mb-4">Consoles, Controllers & High-Refresh Monitors.</p>
              <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-4 transition-all">Shop Collection <ArrowRight size={16} /></span>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1600&auto=format&fit=crop"
              alt="Audio"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-2">Audiophile</h3>
              <p className="text-gray-300 mb-4">Noise Cancelling Headphones & Spatial Audio.</p>
              <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-4 transition-all">Shop Collection <ArrowRight size={16} /></span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}