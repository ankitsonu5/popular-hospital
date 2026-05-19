import mongoose from "mongoose";

const departmentGalleryItemSchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speciality",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      default: "image",
    },
    title: { type: String, default: "", trim: true },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const DepartmentGalleryItem = mongoose.model(
  "DepartmentGalleryItem",
  departmentGalleryItemSchema,
);

export default DepartmentGalleryItem;
