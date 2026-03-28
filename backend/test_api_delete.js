import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function testDeleteAPI() {
  try {
    // Create a test JWT token (same way admin would have it)
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    console.log("Generated token:", token.substring(0, 30) + "...");
    
    // First get all contacts
    const listRes = await fetch('http://localhost:5100/api/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const listStatus = listRes.status;
    console.log("List status:", listStatus);
    
    if (!listRes.ok) {
      const text = await listRes.text();
      console.log("List error:", text);
      return;
    }
    
    const contacts = await listRes.json();
    console.log("Total contacts:", contacts.length);
    
    if (contacts.length === 0) {
      console.log("No contacts to delete");
      return;
    }
    
    // Try to delete the first one
    const target = contacts[0];
    console.log("Attempting to delete:", target._id, target.name);
    
    const delRes = await fetch(`http://localhost:5100/api/contacts/${target._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log("Delete status:", delRes.status);
    const delText = await delRes.text();
    console.log("Delete response:", delText);
    
  } catch (err) {
    console.error("API test error:", err.message);
  }
}

testDeleteAPI();
