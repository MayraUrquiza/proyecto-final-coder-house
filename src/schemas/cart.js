import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  products: [{ type: Object, require: true }],
  timestamp: { type: Number, require: true },
});

export default MessageSchema;
