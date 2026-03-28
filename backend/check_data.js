import mongoose from 'mongoose';
import 'dotenv/config';
import Application from './src/models/Application.js';

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const app = await Application.findOne().sort({ createdAt: -1 });
    if (app) {
      console.log('✅ Latest Application Data:');
      console.log(JSON.stringify(app, null, 2));
    } else {
      console.log('❌ No applications found.');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ DB Error:', err.message);
  }
};

checkData();
