import mongoose from "mongoose";

const callbackRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    department: { type: String, default: "", trim: true },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true },
);

const CallbackRequest = mongoose.model(
  "CallbackRequest",
  callbackRequestSchema,
);
export default CallbackRequest;
