import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: {
    type: String,
    enum: ['Phones', 'Laptops', 'Accessories', 'Smart Home', 'Wearables', 'Gaming', 'TVs', 'Audio'],
    required: true
  },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  specs: { type: Map, of: String },
  rating: { type: Number, default: 4.5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);