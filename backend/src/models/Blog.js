import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  replies: [
    {
      admin: { type: Boolean, default: false },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" }, // Store rich HTML from CMS
    contentImages: [{ type: String }], // Embedded editor image paths from rich HTML
    image: { type: String, required: true }, // main thumbnail image path
    imageAlt: { type: String, default: "" }, // for SEO Full Content (Article History) *& Accessibility
    author: { type: String, default: "popularhospital-admin" },
    date: { type: String, required: true },
    category: { type: String, default: "" },
    isUncategorized: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    // Meta SEO fields
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    focusKeyword: { type: String, default: "" }, // For SEO analysis hint
    comments: [commentSchema],
  },
  { timestamps: true },
);

// To ensure search works nicely, add a text index
blogSchema.index({ title: "text", content: "text", category: "text" });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
