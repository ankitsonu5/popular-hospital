import mongoose from "mongoose";

const coverageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    date: { type: String, required: true },
    source: { type: String, required: true }, // e.g. Amar Ujala
    image: { type: String, required: true }, // The newspaper clipping
    excerpt: { type: String },
    content: { type: String },
    gallery: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

coverageSchema.pre("save", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let slug = baseSlug || "coverage";
    let count = 1;
    const CoverageModel =
      mongoose.models.Coverage || mongoose.model("Coverage", coverageSchema);
    while (await CoverageModel.exists({ _id: { $ne: this._id }, slug })) {
      slug = `${baseSlug || "coverage"}-${count++}`;
    }
    this.slug = slug;
  }
  next();
});

coverageSchema.index({ title: "text", source: "text" });

const Coverage = mongoose.model("Coverage", coverageSchema);
export default Coverage;
