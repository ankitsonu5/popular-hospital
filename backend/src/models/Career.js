import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Medico", "Non-Medical", "Admin"],
    },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    postedOn: { type: String, required: true },
    lastDate: { type: String, default: "-" },
    description: { type: String, default: "" }, // Rich HTML from TinyMCE
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Career = mongoose.model("Career", careerSchema);
export default Career;
