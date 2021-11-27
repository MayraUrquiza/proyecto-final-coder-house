import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: [{ type: Object, require: true }],
  timestamp: { type: Number, require: true },
});

export default CartSchema;
