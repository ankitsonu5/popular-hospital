import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

async function testDelete() {
  try {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;
    const collection = db.collection('contacts');
    
    // Find a contact to delete (one of the test ones)
    const contact = await collection.findOne({ name: /System Verification Intl/i });
    if (!contact) {
      console.log("No test contact found to delete.");
      return;
    }
    
    console.log("Attempting to delete ID:", contact._id);
    const result = await collection.deleteOne({ _id: contact._id });
    console.log("Delete result:", result);
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Test error:", err);
  }
}

testDelete();
