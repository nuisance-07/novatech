"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, ShoppingBag, Star, Volume2, VolumeX } from "lucide-react";

// --- HERO VIDEO PLAYLIST (Tech-themed) ---
const HERO_VIDEOS = [
  "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
  "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
  "https://cdn.pixabay.com/video/2023/01/13/146336-789093861_large.mp4",
  "https://cdn.pixabay.com/video/2024/09/14/231485_large.mp4",
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?latest=true');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. Video cycling with crossfade
  const advanceVideo = useCallback(() => {
    const next = (currentVideoIndex + 1) % HERO_VIDEOS.length;
    setNextVideoIndex(next);
    setIsTransitioning(true);

    // After the CSS crossfade completes (1.5s), swap the videos
    transitionTimerRef.current = setTimeout(() => {
      setCurrentVideoIndex(next);
      setIsTransitioning(false);
    }, 1500);
  }, [currentVideoIndex]);

  useEffect(() => {
    const handleVideoEnd = () => {
      advanceVideo();
    };

    const currentVid = videoRef.current;
    if (currentVid) {
      currentVid.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (currentVid) {
        currentVid.removeEventListener("ended", handleVideoEnd);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [advanceVideo]);

  // Auto-advance fallback: if video doesn't fire 'ended' (e.g., very long video), cycle every 15s
  useEffect(() => {
    const fallback = setInterval(() => {
      advanceVideo();
    }, 15000);
    return () => clearInterval(fallback);
  }, [advanceVideo]);

  // Preload next video
  useEffect(() => {
    if (nextVideoRef.current) {
      nextVideoRef.current.src = HERO_VIDEOS[(currentVideoIndex + 1) % HERO_VIDEOS.length];
      nextVideoRef.current.load();
    }
  }, [currentVideoIndex]);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">

      {/* --- HERO SECTION WITH VIDEO CAROUSEL BACKGROUND --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Layers with Crossfade */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-10" />

          {/* Current Video */}
          <video
            ref={videoRef}
            key={`video-${currentVideoIndex}`}
            src={HERO_VIDEOS[currentVideoIndex]}
            autoPlay
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Next Video (fades in during transition) */}
          <video
            ref={nextVideoRef}
            key={`video-next-${nextVideoIndex}`}
            src={HERO_VIDEOS[nextVideoIndex]}
            autoPlay
            muted={isMuted}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Video Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {HERO_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setNextVideoIndex(i);
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentVideoIndex(i);
                  setIsTransitioning(false);
                }, 1500);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentVideoIndex
                  ? "w-8 bg-primary shadow-[0_0_12px_rgba(0,122,255,0.6)]"
                  : "w-3 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Switch to video ${i + 1}`}
            />
          ))}
        </div>

        {/* Mute / Unmute Toggle */}
        <button
          onClick={() => setIsMuted((v) => !v)}
          className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

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

        {isLoading ? (
          <div className="flex gap-4 px-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[300px] mx-4 shrink-0">
                <div className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse mb-4" />
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/4 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
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
                      src={product.images && product.images.length > 0 ? product.images[0] : (product.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop")}
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
        ) : (
          <div className="text-center text-gray-500 py-12">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Products loading soon...</p>
          </div>
        )}
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
              <Link href="/shop?category=Gaming" className="text-primary font-medium flex items-center gap-2 group-hover:gap-4 transition-all">Shop Collection <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?q=80&w=1600&auto=format&fit=crop"
              alt="Audio"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-2">Audiophile</h3>
              <p className="text-gray-300 mb-4">Noise Cancelling Headphones & Spatial Audio.</p>
              <Link href="/shop?category=Audio" className="text-primary font-medium flex items-center gap-2 group-hover:gap-4 transition-all">Shop Collection <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST DROPS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Latest Drops</h2>
            <p className="text-gray-400">Fresh from the lab. The newest tech in stock.</p>
          </div>
          <Link href="/shop" className="text-primary hover:text-white transition flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group block">
                <div className="aspect-square rounded-2xl bg-white/5 animate-pulse mb-4 border border-white/10" />
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/4 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, i) => (
              <Link href={`/shop/${product._id}`} key={i} className="group block">
                <div className="aspect-square relative rounded-2xl overflow-hidden mb-4 bg-white/5 border border-white/10">
                  <Image
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-gray-400">${product.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No products available yet. Check back soon!</p>
          </div>
        )}
      </section>

    </main>
  );
}