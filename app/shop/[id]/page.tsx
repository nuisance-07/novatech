import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { FadeIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ui/ProductCard";
import ProductImages from "@/components/shop/ProductImages";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
    try {
        await connectDB();
        const product = await Product.findById(id).lean();
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        return null;
    }
}

async function getRelatedProducts(tags: string[], currentId: string) {
    try {
        await connectDB();
        const products = await Product.find({
            tags: { $in: tags },
            _id: { $ne: currentId }
        }).limit(4).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        return [];
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product.tags || [], product._id);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                        {/* Images with Lightbox */}
                        <ProductImages images={product.images} name={product.name} />

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-primary font-medium mb-2 uppercase tracking-wider">{product.category}</p>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
                                <p className="text-2xl font-bold text-white">${product.price}</p>
                            </div>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                {product.description}
                            </p>

                            <div className="pt-8 border-t border-white/10">
                                <AddToCartButton product={product} />
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {product.tags?.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <FadeIn delay={0.2}>
                        <h2 className="text-2xl font-bold mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p: any) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}
