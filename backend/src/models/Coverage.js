import mongoose from "mongoose";

const coverageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    source: { type: String, required: true }, // e.g. Amar Ujala
    image: { type: String, required: true }, // The newspaper clipping
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

coverageSchema.index({ title: "text", source: "text" });

const Coverage = mongoose.model("Coverage", coverageSchema);
export default Coverage;
