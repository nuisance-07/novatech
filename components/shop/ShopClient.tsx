"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";

const CATEGORIES = [
    "All",
    "Samsung",
    "Apple",
    "Smartphones",
    "Mobile Accessories",
    "Audio",
    "Gaming",
    "Storage",
    "Tablets",
    "Content Creator Kit"
];

export default function ShopClient({ products }: { products: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sortBy, setSortBy] = useState("featured");

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
                const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
                return matchesCategory && matchesPrice;
            })
            .sort((a, b) => {
                if (sortBy === "price-asc") return a.price - b.price;
                if (sortBy === "price-desc") return b.price - a.price;
                return 0; // Default to original order (featured/newest)
            });
    }, [products, selectedCategory, priceRange, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 space-y-8 shrink-0">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category
                                            ? "bg-white text-black"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Price Range</h3>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                step="50"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full accent-white"
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                <span>$0</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">{selectedCategory} Products</h1>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <FadeIn key={product._id}>
                                <ProductCard product={product} />
                            </FadeIn>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-24 text-gray-500">
                            No products found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
