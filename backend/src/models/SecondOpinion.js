import mongoose from "mongoose";

const secondOpinionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    department: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true, maxlength: 2000 },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true },
);

const SecondOpinion = mongoose.model("SecondOpinion", secondOpinionSchema);
export default SecondOpinion;

