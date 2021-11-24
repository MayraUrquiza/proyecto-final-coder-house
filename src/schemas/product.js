import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  code: { type: Number, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
  stock: { type: Number, require: true },
  timestamp: { type: Number, require: true },
});

export default ProductSchema;
