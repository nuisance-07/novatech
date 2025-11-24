import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, enum: ['Phones', 'Laptops', 'Accessories', 'Smart Home', 'Wearables'] },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);