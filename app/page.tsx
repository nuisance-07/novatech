import Link from "next/link";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";

async function getFeaturedProducts() {
  try {
    await connectDB();
    const products = await Product.find({ isFeatured: true }).limit(4).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("DB Error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />
        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-6 backdrop-blur-md">
            The New Standard in Tech
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-8">
            Future Ready.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover a curated collection of next-generation devices designed to elevate your digital existence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-hover transition flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition">
              View Specs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Collection</h2>
            <p className="text-gray-400">Handpicked for the visionary.</p>
          </div>
          <Link href="/shop" className="text-primary hover:text-blue-300 transition flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-500">Database empty. Run <code className="text-primary">npm run seed</code> to populate data.</p>
          </div>
        )}
      </section>
    </main>
  );
}