"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Plus } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,122,255,0.15)]">
      <div className="aspect-square relative bg-white/5">
        <Link href={`/shop/${product._id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-primary font-medium uppercase tracking-wider">{product.category}</p>
            <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
          </div>
          <span className="text-lg font-bold text-white">${product.price}</span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{product.description}</p>
        <button
          onClick={() => addItem(product)}
          className="w-full py-3 bg-white/5 hover:bg-primary text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-primary"
        >
          <Plus size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}