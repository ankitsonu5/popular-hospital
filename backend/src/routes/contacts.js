import { Router } from 'express';
import { createContact, getContacts, getContact, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { cmsAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createContact);                            // Public: form submission
router.get('/', cmsAuth, getContacts);                     // Admin: list all
router.get('/:id', cmsAuth, getContact);                   // Admin: get one
router.patch('/:id/status', cmsAuth, updateContactStatus); // Admin: mark read/new
router.delete('/:id', cmsAuth, deleteContact);             // Admin: delete entry

export default router;
