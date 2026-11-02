# Intro to Backend Web Development (Node.js, Express & MongoDB)

A complete RESTful backend API built using **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**), featuring user authentication (password hashing with bcrypt) and full **CRUD** (Create, Read, Update, Delete) operations.

This project follows the **Model-Route-Controller (MRC)** architectural design pattern.

---

## 🚀 Features

- **Express Server Setup**: Structured routing, middleware (CORS, JSON parser, request logger), and centralized error handling.
- **MongoDB Atlas Integration**: Cloud database connection using Mongoose ODM with schema validations.
- **User Authentication**:
  - `POST /api/users/register` - Secure user registration with Bcrypt password hashing.
  - `POST /api/users/login` - User authentication and credential verification.
  - `GET /api/users` - Fetch registered users list.
- **Full CRUD API for Posts**:
  - **Create**: `POST /api/posts` - Add a new post document.
  - **Read (All)**: `GET /api/posts` - Retrieve all posts sorted chronologically.
  - **Read (Single)**: `GET /api/posts/:id` - Fetch a post by its MongoDB ObjectId.
  - **Update**: `PUT /api/posts/:id` - Modify an existing post.
  - **Delete**: `DELETE /api/posts/:id` - Remove a post from the database.
- **Postman Ready**: Includes a pre-configured `postman_collection.json` for 1-click testing.

---

## 📁 Project Structure

```
intro-to-backend/
├── config/
│   └── db.js                 # MongoDB connection using Mongoose
├── controllers/
│   ├── userController.js     # User registration and login business logic
│   └── postController.js     # Full CRUD business logic for Posts
├── models/
│   ├── User.js               # User Mongoose Schema (username, email, password)
│   └── Post.js               # Post Mongoose Schema (title, content, author)
├── routes/
│   ├── userRoutes.js         # User routes mapping to userController
│   └── postRoutes.js         # Post CRUD routes mapping to postController
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules (node_modules, .env)
├── package.json              # Project dependencies and npm scripts
├── postman_collection.json   # Ready-to-import Postman testing collection
├── server.js                 # Express server entry point
└── README.md                 # Project documentation and submission guide
```

---

## 🛠️ Tech Stack & Dependencies

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Security**: [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)
- **Testing**: [Postman Desktop App](https://www.postman.com/downloads/)

---

## ⚙️ Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <your-github-repo-url>
cd intro-to-backend

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of `intro-to-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

> **How to get your MongoDB Connection String**:
> 1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
> 2. Create a free **M0 cluster**.
> 3. Under **Database Access**, create a user (e.g., `admin`) and set a password.
> 4. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere** (`0.0.0.0/0`).
> 5. Click **Database** -> **Connect** -> **Drivers (Node.js)** and copy your connection string.
> 6. Paste it as `MONGO_URI` in `.env`, replacing `<password>` with your database user password.

### 3. Run the Server

- **Development mode (with auto-reload)**:
  ```bash
  npm run dev
  ```
  *(or `npm run watch`)*

- **Production mode**:
  ```bash
  npm start
  ```

Once running, you will see:
```
🚀 Server successfully started on port: 5000
🌐 Base URL: http://localhost:5000
✅ MongoDB Connected Successfully: <cluster-name>
```

---

## 📡 API Endpoints Reference

### 1. Base / Health Check
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Checks server health and returns available endpoints |

### 2. User Authentication APIs
| Method | Endpoint | Description | Sample Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register a new user | `{"username": "aditya", "email": "aditya@test.com", "password": "pass123"}` |
| `POST` | `/api/users/login` | Login user & verify password | `{"email": "aditya@test.com", "password": "pass123"}` |
| `GET` | `/api/users` | List all registered users | *(None)* |

### 3. Post CRUD APIs
| Operation | Method | Endpoint | Sample Request Body |
| :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/api/posts` | `{"title": "My Post", "content": "Post body text", "author": "Aditya"}` |
| **Read (All)** | `GET` | `/api/posts` | *(None)* |
| **Read (Single)** | `GET` | `/api/posts/:id` | *(None)* |
| **Update** | `PUT` | `/api/posts/:id` | `{"title": "Updated Title", "content": "Updated content"}` |
| **Delete** | `DELETE` | `/api/posts/:id` | *(None)* |

---

## 🧪 Postman Desktop Testing

1. Open the **Postman Desktop App**.
2. Click the **Import** button in the top-left corner.
3. Select the file `postman_collection.json` located in this project directory.
4. The entire collection with all routes, HTTP methods, headers, and request bodies will appear in your left sidebar.
5. Make requests against `http://localhost:5000`:
   - Start by testing `0. Health Check`.
   - Run `Register User` and `Login User`.
   - Run `Create Post`. Copy the `_id` returned in the response.
   - Replace `REPLACE_WITH_POST_ID` in `Get Post by ID`, `Update Post by ID`, and `Delete Post by ID` with your copied `_id` to test full CRUD.

---

## 📝 Evaluation Quick-Reference (Viva / Defense)

- **Express.js**: Fast, unopinionated minimalist web framework for Node.js handling routing and middleware.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js managing data validation, casting, and queries.
- **Model-Route-Controller (MRC)**:
  - **Model**: Defines the schema and database interactions (`User.js`, `Post.js`).
  - **Route**: Maps URL endpoints and HTTP verbs to controller functions (`userRoutes.js`, `postRoutes.js`).
  - **Controller**: Executes the business logic and database operations (`userController.js`, `postController.js`).
- **HTTP Methods & Status Codes**:
  - `POST` (201 Created): Resource creation.
  - `GET` (200 OK): Resource retrieval.
  - `PUT` (200 OK): Full or partial update of an existing resource.
  - `DELETE` (200 OK): Resource deletion.
  - `400 Bad Request`: Missing or invalid input payload.
  - `401 Unauthorized`: Bad credentials during login.
  - `404 Not Found`: Resource or ID does not exist.
  - `500 Internal Server Error`: Unhandled database or server exception.
- **Password Security**: Passwords are never stored in plain text; `bcryptjs` creates a salted hash (`bcrypt.hash(password, 10)`), making reverse lookups infeasible.
