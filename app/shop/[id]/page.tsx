import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { FadeIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ui/ProductCard";
import ProductImages from "@/components/shop/ProductImages";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductDetailsClient from "@/components/shop/ProductDetailsClient";
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
                <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
            </div>
        </div>
    );
}

