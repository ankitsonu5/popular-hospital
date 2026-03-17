import { Router } from 'express';
import { getAllBranches, createBranch, updateBranch, deleteBranch, uploadBranch } from '../controllers/branchController.js';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor, uploadDoctor, createSpeciality, updateSpeciality, deleteSpeciality, getAllDesignations, createDesignation, updateDesignation, deleteDesignation } from '../controllers/doctorController.js';
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
  upload,
  uploadBlogImage
} from '../controllers/blogController.js';
import { cmsAuth } from '../middleware/auth.js';


const router = Router();

router.use(cmsAuth);

// Branches CRUD
router.get('/branches', getAllBranches);
router.post('/branches', uploadBranch.fields([{ name: 'image_one', maxCount: 1 }, { name: 'image_two', maxCount: 1 }]), createBranch);
router.put('/branches/:id', uploadBranch.fields([{ name: 'image_one', maxCount: 1 }, { name: 'image_two', maxCount: 1 }]), updateBranch);
router.delete('/branches/:id', deleteBranch);

// Doctors CRUD
router.get('/doctors', async (req, res) => {
  // Override filter — CMS should see all doctors including inactive
  const Doctor = (await import('../models/Doctor.js')).default;
  try {
    const doctors = await Doctor.find()
      .populate('speciality', 'name slug department_display_name')
      .populate('branches', 'name slug')
      .sort({ name: 1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/doctors', uploadDoctor.single('image'), createDoctor);
router.put('/doctors/:id', uploadDoctor.single('image'), updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// Specialities (Departments) CRUD
router.post('/specialities', createSpeciality);
router.put('/specialities/:id', updateSpeciality);
router.delete('/specialities/:id', deleteSpeciality);

// Designations CRUD
router.get('/designations', getAllDesignations);
router.post('/designations', createDesignation);
router.put('/designations/:id', updateDesignation);
router.delete('/designations/:id', deleteDesignation);

// Bookings (read-only for CMS)
router.get('/bookings', getAllBookings);

// Site Content
router.get('/content', getSiteContent);
router.post('/content', setSiteContent);

// News CRUD
router.get('/news', getAdminNews);
router.post('/news', uploadNews.any(), createNews);
router.put('/news/:id', uploadNews.any(), updateNews);
router.delete('/news/:id', deleteNews);

// Blogs CRUD
router.get('/blogs', getAdminBlogs);
router.post('/blogs/image-upload-direct', upload.single('file'), uploadBlogImage);
router.post('/blogs', upload.single('image'), createBlog);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Blog Comments Management
router.post('/blogs/:id/comments/:commentId/reply', replyToComment);
router.delete('/blogs/:id/comments/:commentId/reply/:replyId', deleteAdminReply);
router.delete('/blogs/:id/comments/:commentId', deleteComment);


export default router;
