import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, default: "" },
  },
  { timestamps: true },
);

const SiteContent = mongoose.model("SiteContent", siteContentSchema);
export default SiteContent;
