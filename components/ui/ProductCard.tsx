"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useCompareStore } from "@/store/useCompareStore";
import { Plus, BarChart2, Check } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToCompare, isInCompare } = useCompareStore();
  const isComparing = isInCompare(product._id);

  return (
    <div className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,122,255,0.15)]">
      <div className="aspect-square relative bg-white/5 flex items-center justify-center">
        <Link href={`/shop/${product._id}`} className="w-full h-full relative block">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}
        </Link>

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCompare(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${isComparing ? "bg-primary text-white" : "bg-black/50 text-white hover:bg-primary"
            }`}
          title="Compare"
        >
          {isComparing ? <Check size={16} /> : <BarChart2 size={16} />}
        </button>

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