import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Blog from '../models/Blog.js';
import { escapeRegex } from '../middleware/security.js';

const normalizeUploadPath = (value = '') => {
  if (typeof value !== 'string' || !value) return '';
  const match = value.match(/\/uploads\/[^"'\s)]+/i);
  return match ? match[0] : value;
};

const normalizeRichContent = (content = '') => {
  if (typeof content !== 'string' || !content) return '';
  return content.replace(/https?:\/\/[^"'\s<]+(\/uploads\/[^"'\s<]+)/gi, '$1');
};

const extractContentImages = (content = '') => {
  if (typeof content !== 'string' || !content) return [];
  const matches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
  return [...new Set(matches.map((match) => normalizeUploadPath(match[1])).filter(Boolean))];
};

const normalizeBlogOutput = (blogDoc) => {
  const obj = blogDoc.toObject();
  if (obj.content && Array.isArray(obj.content)) {
    obj.content = obj.content.map(p => `<p>${p}</p>`).join('');
  }
  obj.content = normalizeRichContent(obj.content || '');
  obj.contentImages = Array.isArray(obj.contentImages) && obj.contentImages.length
    ? obj.contentImages.map(normalizeUploadPath).filter(Boolean)
    : extractContentImages(obj.content);
  return obj;
};

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/blogs';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate unique name with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `blog-media-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Public: Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 }).limit(limit);
    const normalized = blogs.map(normalizeBlogOutput);
    res.json(normalized);
  } catch (error) {
    console.error('[BLOG]', error.message);
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// Public: Get categories with counts
export const getBlogCategoriesMetrics = async (req, res) => {
  try {
    const pipeline = [
      { $match: { isUncategorized: { $ne: true }, isActive: true } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          latestTitle: { $first: "$title" }
        }
      }
    ];
    const metrics = await Blog.aggregate(pipeline);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Add a user comment
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    const { name, email, website, comment } = req.body;

    // Validate required comment fields
    if (!name || !comment || typeof name !== 'string' || typeof comment !== 'string') {
      return res.status(400).json({ error: 'Name and comment are required.' });
    }
    if (name.length > 100 || comment.length > 2000) {
      return res.status(400).json({ error: 'Input exceeds maximum length.' });
    }

    blog.comments.push({ 
      name: name.trim().substring(0, 100), 
      email: email ? String(email).trim().substring(0, 200) : '',
      website: website ? String(website).trim().substring(0, 200) : '',
      comment: comment.trim().substring(0, 2000)
    });
    await blog.save();
    
    res.status(201).json(blog);
  } catch (error) {
    console.error('[BLOG]', error.message);
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// Public: Get a single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true });
    if (!blog) return res.status(404).json({ error: 'Blog article not found' });
    const obj = normalizeBlogOutput(blog);
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Search blogs
export const searchBlogs = async (req, res) => {
  try {
    const query = req.query.q || '';
    if (!query || typeof query !== 'string') return res.json([]);
    
    // Escape user input to prevent ReDoS attacks
    const safeQuery = escapeRegex(query.substring(0, 100));
    const regex = new RegExp(safeQuery, 'i');
    const blogs = await Blog.find({
      isActive: true,
      $or: [
        { title: regex },
        { category: regex }
      ]
    }).limit(3).select('title slug image category');
    
    res.json(blogs);
  } catch (error) {
    console.error('[BLOG]', error.message);
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// CMS: Get all blogs
export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const normalized = blogs.map(normalizeBlogOutput);
    res.json(normalized);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Create new blog
export const createBlog = async (req, res) => {
  try {
    // Request body logged at debug level only
    const { 
      title, slug, excerpt, content, date, 
      category, isUncategorized, isActive, author,
      metaTitle, metaDescription, metaKeywords, 
      focusKeyword, imageAlt
    } = req.body;
    
    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : normalizeUploadPath(req.body.image || '');
    const normalizedContent = normalizeRichContent(content || '');
    
    // Ensure keywords are synced if one is provided
    const finalFocusKeyword = focusKeyword || '';
    const finalMetaKeywords = metaKeywords || finalFocusKeyword;

    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || '',
      content: normalizedContent,
      contentImages: extractContentImages(normalizedContent),
      author: author || 'popularhospital-admin',
      date,
      image: imagePath,
      imageAlt: imageAlt || title,
      category: isUncategorized === 'true' || isUncategorized === true ? '' : category,
      isUncategorized: isUncategorized === 'true' || isUncategorized === true,
      isActive: isActive !== 'false' && isActive !== false,
      metaTitle: metaTitle || title, // Fallback to title
      metaDescription: metaDescription !== undefined ? metaDescription : (excerpt || ''),
      metaKeywords: finalMetaKeywords,
      focusKeyword: finalFocusKeyword
    });
    
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Update blog (including replacing image)
export const updateBlog = async (req, res) => {
  try {
    // Request body logged at debug level only
    const { 
      title, slug, excerpt, content, date, 
      category, isUncategorized, isActive, author, image,
      metaTitle, metaDescription, metaKeywords,
      focusKeyword, imageAlt
    } = req.body;
    
    const finalFocusKeyword = focusKeyword || '';
    const finalMetaKeywords = metaKeywords || finalFocusKeyword;

    const normalizedContent = normalizeRichContent(content || '');
    const updates = {
      title,
      slug,
      excerpt: excerpt || '',
      content: normalizedContent,
      contentImages: extractContentImages(normalizedContent),
      author: author || 'popularhospital-admin',
      date,
      category: isUncategorized === 'true' || isUncategorized === true ? '' : category,
      isUncategorized: isUncategorized === 'true' || isUncategorized === true,
      isActive: isActive !== 'false' && isActive !== false,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription !== undefined ? metaDescription : (excerpt || ''),
      metaKeywords: finalMetaKeywords,
      focusKeyword: finalFocusKeyword,
      imageAlt: imageAlt || title
    };

    if (req.file) {
      updates.image = `/uploads/blogs/${req.file.filename}`;
    } else if (image && image.trim() !== '') {
      updates.image = normalizeUploadPath(image);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    res.json(normalizeBlogOutput(blog));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Add reply from admin
export const replyToComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;
    
    const blog = await Blog.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $push: { "comments.$.replies": { admin: true, text } } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog or Comment not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Delete an admin reply
export const deleteAdminReply = async (req, res) => {
  try {
    const { id, commentId, replyId } = req.params;
    
    const blog = await Blog.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $pull: { "comments.$.replies": { _id: replyId } } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog, Comment or Reply not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog or Comment not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: TinyMCE Image Upload Handler
export const uploadBlogImage = (req, res) => {
  // File upload logged at debug level only
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // TinyMCE expects a JSON response with a 'location' property
    const imagePath = `/uploads/blogs/${req.file.filename}`;
    res.json({ location: imagePath, path: imagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

