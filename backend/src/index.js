import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import branchesRouter from './routes/branches.js';
import doctorsRouter from './routes/doctors.js';
import bookingsRouter from './routes/bookings.js';
import opdRouter from './routes/opd.js';
import cmsRouter from './routes/cms.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors({ origin: true }));
app.use(express.json());

// Public API
app.use('/api/branches', branchesRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/opd', opdRouter);
app.use('/api/cms', cmsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Popular Hospital API running at http://localhost:${PORT}`);
});
