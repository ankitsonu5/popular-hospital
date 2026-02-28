import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Blog from '../models/Blog.js';

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
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

// Public: Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 }).limit(limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    blog.comments.push({ name, email, website, comment });
    await blog.save();
    
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Get a single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true });
    if (!blog) return res.status(404).json({ error: 'Blog article not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Search blogs
export const searchBlogs = async (req, res) => {
  try {
    const query = req.query.q || '';
    if (!query) return res.json([]);
    
    // Fuzzy search using regex for better matches in title or category
    const regex = new RegExp(query, 'i');
    const blogs = await Blog.find({
      isActive: true,
      $or: [
        { title: regex },
        { category: regex }
      ]
    }).limit(3).select('title slug image category');
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Get all blogs
export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Create new blog
export const createBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, date, category, isUncategorized, isActive, author } = req.body;
    
    let contentArr = [];
    if (content) {
      if (typeof content === 'string') {
        try {
          contentArr = JSON.parse(content);
        } catch {
          contentArr = [content];
        }
      } else {
        contentArr = content;
      }
    }

    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : '';
    // If no image provided, maybe block? But we have default check up to frontend.
    
    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || '',
      content: contentArr,
      author: author || 'popularhospital-admin',
      date,
      image: imagePath,
      category: isUncategorized === 'true' || isUncategorized === true ? '' : category,
      isUncategorized: isUncategorized === 'true' || isUncategorized === true,
      isActive: isActive !== 'false' && isActive !== false
    });
    
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CMS: Update blog (including replacing image)
export const updateBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, date, category, isUncategorized, isActive, author } = req.body;
    
    let contentArr = [];
    if (content) {
      if (typeof content === 'string') {
        try {
          contentArr = JSON.parse(content);
        } catch {
          contentArr = [content];
        }
      } else {
        contentArr = content;
      }
    }

    const updates = {
      title,
      slug,
      excerpt: excerpt || '',
      content: contentArr,
      author: author || 'popularhospital-admin',
      date,
      category: isUncategorized === 'true' || isUncategorized === true ? '' : category,
      isUncategorized: isUncategorized === 'true' || isUncategorized === true,
      isActive: isActive !== 'false' && isActive !== false
    };

    if (req.file) {
      updates.image = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    res.json(blog);
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
