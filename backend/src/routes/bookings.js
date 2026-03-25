import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.js';
import { cmsAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createBooking);        // Public: patients can create bookings
router.get('/', cmsAuth, getBookings);   // Admin only: list all bookings

export default router;
