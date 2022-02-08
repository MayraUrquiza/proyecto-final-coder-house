import mongoose from "mongoose";

export const User = mongoose.model("Users", {
  email: String,
  password: String,
  name: String,
  age: Number,
  address: String,
  phone: String,
  image: String,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
});

export default UserSchema;
