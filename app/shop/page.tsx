import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ShopClient from "@/components/shop/ShopClient";

export const dynamic = "force-dynamic";

export default async function Shop() {
  await connectDB();
  // Fetch all products to pass to the client component for filtering
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  const cleanProducts = JSON.parse(JSON.stringify(products));

  return <ShopClient products={cleanProducts} />;
}