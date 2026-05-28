import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
const News = mongoose.model("News", new mongoose.Schema({}, { strict: false }));

const uploadsNewsDir = path.join(process.cwd(), 'uploads', 'news');
const filesInDir = fs.readdirSync(uploadsNewsDir);

const news = await News.find({});

for (const item of news) {
  if (!item.image) continue;
  
  // Example DB image: /uploads/news/1776152221466-happy_heart_day.jpg
  // Or /images/latestnews/one.jpg
  if (item.image.startsWith('/uploads/news/')) {
    const filename = item.image.replace('/uploads/news/', '');
    // Split by first '-' to get the original filename without timestamp, if it has one
    const parts = filename.split('-');
    let searchName = filename;
    if (parts.length > 1 && !isNaN(parts[0])) {
      searchName = parts.slice(1).join('-');
    }
    
    // Attempt 1: Exact match with something in dir
    if (!filesInDir.includes(filename)) {
      // Find a file that ends with searchName or similar
      const matchingFile = filesInDir.find(f => {
        const fParts = f.split('-');
        if (fParts.length > 1 && !isNaN(fParts[0])) {
          return fParts.slice(1).join('-') === searchName;
        }
        return f === searchName;
      });

      if (matchingFile) {
        const newImagePath = `/uploads/news/${matchingFile}`;
        await News.updateOne({ _id: item._id }, { $set: { image: newImagePath } });
        console.log(`Updated ${item.slug}: ${item.image} -> ${newImagePath}`);
      } else {
        // More fuzzy search based on slug keywords
        const keywords = item.slug.split('-');
        const fuzzyMatch = filesInDir.find(f => {
            const fLower = f.toLowerCase();
            return keywords.filter(k => k.length > 3).some(k => fLower.includes(k));
        });
        if (fuzzyMatch) {
            const newImagePath = `/uploads/news/${fuzzyMatch}`;
            await News.updateOne({ _id: item._id }, { $set: { image: newImagePath } });
            console.log(`Fuzzy Updated ${item.slug}: ${item.image} -> ${newImagePath}`);
        } else {
            console.log(`Missing file for ${item.slug}: ${item.image}`);
        }
      }
    }
  }
}

await mongoose.disconnect();
console.log("Finished updating news image paths.");
