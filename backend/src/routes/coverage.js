import { Router } from 'express';
import { getAllCoverage } from '../controllers/coverageController.js';

const router = Router();

router.get('/', getAllCoverage);

export default router;
