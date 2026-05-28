import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);

const News = mongoose.model("News", new mongoose.Schema({}, { strict: false }));

const news = await News.find({}, { title: 1, slug: 1, image: 1 });
for (const item of news) {
  console.log(`${item.slug}: ${item.image}`);
}

await mongoose.disconnect();
