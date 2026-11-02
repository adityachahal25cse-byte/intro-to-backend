import mongoose from 'mongoose';
import Post from '../models/Post.js';

/**
 * @desc    Create a new post (CRUD - Create)
 * @route   POST /api/posts
 * @access  Public
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and content for the post'
      });
    }

    // Create post in MongoDB
    const newPost = await Post.create({
      title,
      content,
      author: author || 'Anonymous'
    });

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Error in createPost controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating post',
      error: error.message
    });
  }
};

/**
 * @desc    Get all posts (CRUD - Read All)
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error in getAllPosts controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
      error: error.message
    });
  }
};

/**
 * @desc    Get a single post by ID (CRUD - Read Single)
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}' is not a valid MongoDB ObjectId`
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error in getPostById controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching post',
      error: error.message
    });
  }
};

/**
 * @desc    Update an existing post by ID (CRUD - Update)
 * @route   PUT /api/posts/:id
 * @access  Public
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}' is not a valid MongoDB ObjectId`
      });
    }

    // Update document and return updated version ({ new: true })
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(author !== undefined && { author })
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Error in updatePost controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating post',
      error: error.message
    });
  }
};

/**
 * @desc    Delete a post by ID (CRUD - Delete)
 * @route   DELETE /api/posts/:id
 * @access  Public
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID format: '${id}' is not a valid MongoDB ObjectId`
      });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      deletedPostId: id
    });
  } catch (error) {
    console.error('Error in deletePost controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting post',
      error: error.message
    });
  }
};
