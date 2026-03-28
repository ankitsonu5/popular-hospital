import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/popular-hospital';

const contactSchema = new mongoose.Schema({
  name: String,
  isInternational: Boolean,
  createdAt: Date
}, { strict: false });

const Contact = mongoose.model('Contact', contactSchema);

async function check() {
  await mongoose.connect(MONGODB_URI);
  const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
  console.log(JSON.stringify(contacts, null, 2));
  await mongoose.disconnect();
}

check();
