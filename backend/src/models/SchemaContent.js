import mongoose from "mongoose";

/**
 * Stores admin-managed JSON-LD schema overrides per page.
 *
 * pageKey is a unique identifier for the page/route, e.g.:
 *  - "home"
 *  - "doctors"
 *  - "doctor:dr-ak-kaushik"
 *  - "blog:my-blog-slug"
 *  - "department:cardiology"
 *
 * jsonLd holds the JSON-LD payload (as object) that overrides
 * the static schema on the corresponding page.
 *
 * When isActive=false the override is ignored and the static
 * component-level schema is rendered as-is.
 */
const schemaContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, trim: true },
    label: { type: String, default: "" },
    jsonLd: { type: mongoose.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("SchemaContent", schemaContentSchema);
