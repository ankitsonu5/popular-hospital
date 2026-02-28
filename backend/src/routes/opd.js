import { Router } from 'express';
import { getAvailableSlots, setSlots } from '../controllers/opdController.js';

const router = Router();

router.get('/slots', getAvailableSlots);
router.post('/slots', setSlots);

export default router;
