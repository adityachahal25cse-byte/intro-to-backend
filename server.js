import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express Application
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Built-in & Third-party Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware (helps in demonstration & debugging)
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root / Welcome Endpoint (Test route to verify server is running)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Backend API! Server is running smoothly.',
    endpoints: {
      auth: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        getUsers: 'GET /api/users'
      },
      posts_crud: {
        createPost: 'POST /api/posts',
        getAllPosts: 'GET /api/posts',
        getPostById: 'GET /api/posts/:id',
        updatePost: 'PUT /api/posts/:id',
        deletePost: 'DELETE /api/posts/:id'
      }
    }
  });
});

// Mount Feature Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404 Route Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 Server successfully started on port: ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`📌 Test in Browser or Postman: http://localhost:${PORT}/`);
  console.log(`==============================================\n`);
});

export default app;
