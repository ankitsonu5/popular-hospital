import mongoose from "mongoose";

// Individual dropdown item ka schema
const dropdownItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  hidden: { type: Boolean, default: false },
  // Admin panel mein sub-heading ke liye (optional)
  group: { type: String, default: "" },
}, { _id: false });

// Menu group ka schema (e.g., "About Us", "Services")
const navMenuSchema = new mongoose.Schema(
  {
    // Unique identifier — "about-us", "popular-finds", etc.
    menuKey: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    // Poora menu group hidden hai ya nahi
    hidden: { type: Boolean, default: false },
    // Dropdown ke individual items
    items: [dropdownItemSchema],
  },
  { timestamps: true }
);

const NavMenu = mongoose.model("NavMenu", navMenuSchema);
export default NavMenu;
