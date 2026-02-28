import { Router } from 'express';
import { getAllBranches, createBranch, updateBranch, deleteBranch } from '../controllers/branchController.js';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import { getAllBookings } from '../controllers/bookingController.js';
import { getSiteContent, setSiteContent } from '../controllers/cmsController.js';
import { getAllNews, createNews, updateNews, deleteNews, getAdminNews, uploadNews } from '../controllers/newsController.js';
import { 
  getAdminBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  replyToComment, 
  deleteAdminReply, 
  deleteComment,
  upload
} from '../controllers/blogController.js';
import { cmsAuth } from '../middleware/auth.js';


const router = Router();

router.use(cmsAuth);

// Branches CRUD
router.get('/branches', getAllBranches);
router.post('/branches', createBranch);
router.put('/branches/:id', updateBranch);
router.delete('/branches/:id', deleteBranch);

// Doctors CRUD
router.get('/doctors', async (req, res) => {
  // Override filter — CMS should see all doctors including inactive
  const Doctor = (await import('../models/Doctor.js')).default;
  try {
    const doctors = await Doctor.find()
      .populate('speciality', 'name slug')
      .populate('branches', 'name slug')
      .sort({ name: 1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/doctors', createDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// Bookings (read-only for CMS)
router.get('/bookings', getAllBookings);

// Site Content
router.get('/content', getSiteContent);
router.post('/content', setSiteContent);

// News CRUD
router.get('/news', getAdminNews);
router.post('/news', uploadNews.single('image'), createNews);
router.put('/news/:id', uploadNews.single('image'), updateNews);
router.delete('/news/:id', deleteNews);

// Blogs CRUD
router.get('/blogs', getAdminBlogs);
router.post('/blogs', upload.single('image'), createBlog);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Blog Comments Management
router.post('/blogs/:id/comments/:commentId/reply', replyToComment);
router.delete('/blogs/:id/comments/:commentId/reply/:replyId', deleteAdminReply);
router.delete('/blogs/:id/comments/:commentId', deleteComment);


export default router;
