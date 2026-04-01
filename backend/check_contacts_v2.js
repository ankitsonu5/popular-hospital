import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

async function check() {
  try {
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;
    const collection = db.collection("contacts");
    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    contacts.forEach((c) => {
      console.log(
        `ID: ${c._id}, Name: ${c.name}, Int: ${c.isInternational}, Created: ${c.createdAt}`,
      );
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

check();
