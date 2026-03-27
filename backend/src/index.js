import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import securityConfig from './config/security.js';
import { globalLimiter, sanitizeInput, xssSanitizer, errorHandler } from './middleware/security.js';
import { authLimiter } from './middleware/security.js';

// Route imports
import branchesRouter from './routes/branches.js';
import doctorsRouter from './routes/doctors.js';
import bookingsRouter from './routes/bookings.js';
import opdRouter from './routes/opd.js';
import cmsRouter from './routes/cms.js';
import authRouter from './routes/auth.js';
import newsRouter from './routes/news.js';
import blogRouter from './routes/blog.js';
import coverageRouter from './routes/coverage.js';
import updatesRouter from './routes/updates.js';
import careersRouter from './routes/careers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5100;

// ─── SECURITY MIDDLEWARE ──────────────────────────────────────

// 1. Helmet: Sets 11+ HTTP security headers (X-Frame-Options, X-Content-Type-Options, etc.)
//    Also disables X-Powered-By
app.use(helmet({
  contentSecurityPolicy: false,     // CSP handled by Next.js frontend
  crossOriginEmbedderPolicy: false, // Allow loading images/uploads
}));

// 2. CORS: Strict origin whitelist (from ALLOWED_ORIGINS env var)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, mobile)
    if (!origin) return callback(null, true);
    if (securityConfig.cors.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-cms-key'],
}));

// 3. Rate limiting: Global limiter for all routes
app.use(globalLimiter);

// 4. Body parser with reduced limits (uploads use multer limits separately)
app.use(express.json({ limit: securityConfig.bodyLimits.json }));
app.use(express.urlencoded({ limit: securityConfig.bodyLimits.urlencoded, extended: true }));

// 5. NoSQL injection prevention: Strips $ and . from request data
app.use(sanitizeInput);

// 6. XSS prevention: Strips dangerous HTML/script from string values
app.use(xssSanitizer);

// ─── PUBLIC API ROUTES ────────────────────────────────────────

app.use('/api/branches', branchesRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/opd', opdRouter);
app.use('/api/auth', authLimiter, authRouter);  // Strict rate limit on auth
app.use('/api/news', newsRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/coverage', coverageRouter);
app.use('/api/events', (await import('./routes/events.js')).default);
app.use('/api/updates', updatesRouter);
app.use('/api/careers', careersRouter);

// Serve uploads (static files)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Direct Blog Image Upload for TinyMCE
import { upload, uploadBlogImage } from './controllers/blogController.js';
app.post('/api/blog-image-direct', upload.single('file'), uploadBlogImage);

// CMS / Admin Routes (protected by cmsAuth inside the router)
app.use('/api/cms', cmsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── CENTRALIZED ERROR HANDLER ────────────────────────────────
// Must be the LAST middleware — catches all unhandled errors
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🏥 Popular Hospital API running at http://localhost:${PORT}`);
});
