"use client";

import { useState, useRef } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ui/ProductCard";
import ProductImages from "@/components/shop/ProductImages";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductConfigurator from "@/components/shop/ProductConfigurator";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductDetailsClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const [currentPrice, setCurrentPrice] = useState(product.price);
    const [productConfig, setProductConfig] = useState<{ color: any; storage: any } | null>(null);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <>
            <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    {/* Images with Lightbox */}
                    <ProductImages images={product.images} name={product.name} />

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-primary font-bold mb-2 uppercase tracking-widest text-sm">{product.category}</p>
                            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">{product.name}</h1>
                            <p className="text-4xl font-bold text-white transition-all duration-300">
                                ${currentPrice}
                            </p>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed font-sans">
                            {product.description}
                        </p>

                        {/* Configurator */}
                        <ProductConfigurator
                            basePrice={product.price}
                            onPriceChange={setCurrentPrice}
                            onConfigChange={setProductConfig}
                        />

                        <div className="pt-8 border-t border-white/10">
                            <AddToCartButton product={{
                                ...product,
                                price: currentPrice,
                                selectedColor: productConfig?.color,
                                selectedStorage: productConfig?.storage
                            }} />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {product.tags?.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Scrollytelling Feature Highlight */}
            <div ref={targetRef} className="py-32 mb-24 border-t border-white/5 overflow-hidden">
                <motion.div
                    style={{ opacity, scale }}
                    className="text-center max-w-4xl mx-auto px-4"
                >
                    <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Designed for Excellence.
                    </h2>
                    <p className="text-2xl text-gray-400 leading-relaxed font-light">
                        Every detail of the {product.name} has been meticulously crafted to provide an unparalleled experience.
                        From the premium materials to the cutting-edge technology within, this is more than just a device—it's a statement.
                    </p>
                </motion.div>
            </div>

            {/* Ecosystem Cross-Selling */}
            {relatedProducts.length > 0 && (
                <FadeIn delay={0.2}>
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-heading font-bold mb-3 text-white">Complete Your Ecosystem</h2>
                        <p className="text-gray-400 text-lg">Works best with these accessories.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p: any) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </FadeIn>
            )}
        </>
    );
}
