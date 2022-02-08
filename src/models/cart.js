import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: [{ type: Object, required: true }],
  timestamp: { type: Number, required: true },
});

export default CartSchema;
