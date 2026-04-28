import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: { type: String, required: true },
    name: { type: String, default: null },
    role: { type: String, enum: ["super_admin", "career_admin"], default: "super_admin" },
    isActive: { type: Boolean, default: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
export default AdminUser;
