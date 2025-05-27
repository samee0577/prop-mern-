import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["residential", "commercial", "villa"], required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: { type: [String] }, // Array of image URLs
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
