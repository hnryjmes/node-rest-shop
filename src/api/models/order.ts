import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { ref: "Product", required: true, type: mongoose.Schema.Types.ObjectId },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model("Order", orderSchema);
