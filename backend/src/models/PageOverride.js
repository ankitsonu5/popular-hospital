import mongoose from "mongoose";

// Sirf admin ke badle hue (override) values store hote hain.
// Original (default) content frontend code + content-manifest.json mein rehta hai.
const pageOverrideSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true },
    values: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

const PageOverride = mongoose.model("PageOverride", pageOverrideSchema);
export default PageOverride;
