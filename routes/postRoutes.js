import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

// CRUD: Create a new post (POST /api/posts)
router.post('/', createPost);

// CRUD: Read all posts (GET /api/posts)
router.get('/', getAllPosts);

// CRUD: Read single post by ID (GET /api/posts/:id)
router.get('/:id', getPostById);

// CRUD: Update post by ID (PUT /api/posts/:id)
router.put('/:id', updatePost);

// CRUD: Delete post by ID (DELETE /api/posts/:id)
router.delete('/:id', deletePost);

export default router;
