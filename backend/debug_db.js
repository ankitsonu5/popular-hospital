import mongoose from 'mongoose';
import 'dotenv/config';
import Application from './src/models/Application.js';

const testDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const dbName = mongoose.connection.db.databaseName;
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}`);
    console.log(`📂 Current Database Name: ${dbName}`);
    
    const count = await Application.countDocuments();
    console.log(`📊 Applications Count: ${count}`);
    
    // List all collections in the current DB
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections in this DB:');
    collections.forEach(c => console.log(` - ${c.name}`));
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ DB Error:', err.message);
  }
};

testDb();
