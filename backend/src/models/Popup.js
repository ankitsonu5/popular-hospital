import mongoose from "mongoose";

const popupSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Popup", popupSchema);
