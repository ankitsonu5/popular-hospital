import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    isInternational: Boolean,
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false },
);

const Contact = mongoose.model("Contact", contactSchema);

async function test() {
  await mongoose.connect(MONGO_URI);
  const c = await Contact.create({
    name: "System Verification Intl",
    email: "system@test.com",
    phone: "1111111111",
    isInternational: true,
  });
  console.log("Created:", c);
  await mongoose.disconnect();
}

test();
