import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import branchesRouter from './routes/branches.js';
import doctorsRouter from './routes/doctors.js';
import bookingsRouter from './routes/bookings.js';
import opdRouter from './routes/opd.js';
import cmsRouter from './routes/cms.js';
import authRouter from './routes/auth.js';
import newsRouter from './routes/news.js';
import blogRouter from './routes/blog.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(cors({ origin: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Public API Routes
app.use('/api/branches', branchesRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/opd', opdRouter);
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/blogs', blogRouter);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Direct Blog Image Upload for TinyMCE (Avoiding router nesting 404s)
import { upload, uploadBlogImage } from './controllers/blogController.js';
app.post('/api/blog-image-direct', upload.single('file'), uploadBlogImage);

// CMS / Admin Routes
app.use('/api/cms', cmsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏥 Popular Hospital API running at http://localhost:${PORT}`);
});
