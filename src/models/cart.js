import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [{ type: Object, required: true }],
    timestamp: { type: Number, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CartSchema.virtual("id").get(function () {
  return this._id;
});

export default CartSchema;
