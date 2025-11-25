"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useCompareStore } from "@/store/useCompareStore";
import { BarChart2, Check, ShoppingBag, Plus } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const { items: compareItems, addItem: addToCompare, removeItem: removeFromCompare } = useCompareStore();

  const isInCompare = compareItems.some((item) => item._id === product._id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCompare) {
      removeFromCompare(product._id);
    } else {
      addToCompare({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images, // Fixed: image -> images
        category: product.category,
        brand: product.brand,
        description: product.description,
        rating: product.rating,
        specs: product.specs
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-square relative bg-white/5 overflow-hidden">
        <Link href={`/shop/${product._id}`}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
              No Image
            </div>
          )}
        </Link>

        {/* Quick Actions Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={toggleCompare}
            className={`p-2 rounded-full backdrop-blur-md transition-colors duration-300 ${isInCompare
                ? "bg-primary text-white"
                : "bg-black/50 text-white hover:bg-primary"
              }`}
            title={isInCompare ? "Remove from Compare" : "Add to Compare"}
          >
            {isInCompare ? <Check size={18} /> : <BarChart2 size={18} />}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold text-primary tracking-wider uppercase">{product.category}</p>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs text-gray-400">{product.rating || "4.5"}</span>
          </div>
        </div>

        <Link href={`/shop/${product._id}`}>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary text-white rounded-lg transition-all duration-300 text-sm font-medium group/btn"
          >
            <Plus size={16} className="group-hover/btn:scale-110 transition-transform" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}