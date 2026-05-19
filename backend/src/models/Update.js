import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    iconType: { type: String, default: "bell" }, // 'clock', 'heart', 'star', 'bell', etc.
    pdfUrl: { type: String, default: null },
    imageUrl: { type: String, default: null },
    linkUrl: { type: String, default: null },
    isImportant: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Update = mongoose.model("Update", updateSchema);
export default Update;
