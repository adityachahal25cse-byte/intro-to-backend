import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// User Registration endpoint: POST /api/users/register
router.post('/register', registerUser);

// User Login endpoint: POST /api/users/login
router.post('/login', loginUser);

// Get All Users (for testing/inspection): GET /api/users
router.get('/', getAllUsers);

export default router;
