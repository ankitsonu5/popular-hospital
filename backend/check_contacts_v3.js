import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

async function check() {
  try {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;
    const collection = db.collection('contacts');
    const contacts = await collection.find({}).sort({ createdAt: -1 }).limit(5).toArray();
    
    console.log("--- LATEST 5 CONTACTS ---");
    contacts.forEach(c => {
      console.log(JSON.stringify({
        id: c._id,
        name: c.name,
        isInternational: c.isInternational,
        age: c.age,
        country: c.country,
        createdAt: c.createdAt
      }, null, 2));
    });
    
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

check();
