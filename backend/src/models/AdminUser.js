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
    role: {
      type: String,
      enum: ["super_admin", "career_admin", "sub_admin"],
      default: "super_admin",
    },
    isActive: { type: Boolean, default: true },
    activeSessions: [{ token: String, expires: Date }],
    // Legacy fields kept for migration safety (unused)
    sessionToken: { type: String, default: null },
    sessionExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
export default AdminUser;
