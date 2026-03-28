import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

async function check() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const collection = db.collection('contacts');
  const contacts = await collection.find({}).sort({ createdAt: -1 }).limit(10).toArray();
  
  console.log("LAST 10 CONTACTS:");
  contacts.forEach(c => {
    console.log(`[${c.createdAt.toISOString()}] Name: ${c.name}, Intl: ${c.isInternational}`);
  });
  
  await mongoose.disconnect();
}

check();
