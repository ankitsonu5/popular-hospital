import express from 'express';
import { 
  submitApplication, 
  getApplications, 
  getApplicationById, 
  deleteApplication, 
  toggleRead,
  toggleStarred,
  upload 
} from '../controllers/applicationController.js';

const router = express.Router();

// Public: Submit job application
router.post('/', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), submitApplication);

// Admin: Manage applications
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.patch('/:id/read', toggleRead);
router.patch('/:id/star', toggleStarred);
router.delete('/:id', deleteApplication);

export default router;
