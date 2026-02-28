import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/authController.js';
import { cmsAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', cmsAuth, getMe);

export default router;
