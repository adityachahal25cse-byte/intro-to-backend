import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validation: check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password'
      });
    }

    // 2. Check if user already exists (by email or username)
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with that email or username already exists'
      });
    }

    // 3. Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user document in MongoDB
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    // 5. Send success response (excluding password)
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Error in registerUser controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while registering user',
      error: error.message
    });
  }
};

/**
 * @desc    Authenticate user & login
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation: check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // 2. Check if user exists in database
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 3. Compare provided password with hashed password in database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 4. Successful login response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error in loginUser controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while logging in',
      error: error.message
    });
  }
};

/**
 * @desc    Get all users (for verification/admin)
 * @route   GET /api/users
 * @access  Public
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error in getAllUsers controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching users',
      error: error.message
    });
  }
};
