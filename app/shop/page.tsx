import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ui/ProductCard";

export default async function Shop() {
  await connectDB();
  const products = await Product.find({}).lean();
  const cleanProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cleanProducts.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}