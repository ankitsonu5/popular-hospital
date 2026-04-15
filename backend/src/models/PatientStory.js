import mongoose from "mongoose";

const patientStorySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    name: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("PatientStory", patientStorySchema);
