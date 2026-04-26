import mongoose from "mongoose";

const uspItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);

const listSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    highlight: { type: String, default: "" },
    items: [{ type: String }],
    image: { type: String, default: "" },
    layout: {
      type: String,
      enum: ["default", "image-right", "image-left", "two-col"],
      default: "default",
    },
  },
  { _id: false },
);

const specialitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    department_display_name: { type: String, default: null },

    // Header categorisation
    category: {
      type: String,
      enum: ["super_specialty", "specialty"],
      default: "specialty",
    },

    // Hero banner
    banner_image: { type: String, default: "" },
    banner_color: { type: String, default: "#0b1c43" },
    banner_subtitle: { type: String, default: "Department of" },

    // Main content
    description: { type: String, default: "" },

    // USP cards
    usp_items: [uspItemSchema],

    // Flexible list sections
    lists: [listSectionSchema],

    // SEO
    meta_title: { type: String, default: "" },
    meta_description: { type: String, default: "" },

    sortIndex: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Speciality = mongoose.model("Speciality", specialitySchema);
export default Speciality;
