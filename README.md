# 📝 Note-Taking Backend API

This is a RESTful API backend for a note-taking application built using **Node.js**, **Express**, and **MongoDB**. It supports user authentication, note creation, updating, deletion, sorting, and filtering.

## 🔧 Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt (Password hashing)
* CORS
* dotenv

---

## 📁 Project Structure

```
/project-root
│
├── controllers/        # All business logic (auth, notes)
├── models/             # Mongoose schemas (User, Note)
├── routes/             # API routes
├── middlewares/        # Auth middleware
├── config/             # MongoDB connection
├── utils/              # Utility functions (JWT, hash utils)
├── app.js              # Express app configuration
└── server.js           # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/note-taking-backend.git
cd note-taking-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
PORT=5000
MONGODB_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```bash
npm start
```

Server will start on `http://localhost:5000`.

---

## 📌 API Endpoints

### 🔐 Auth Routes (`/api/v1/auth`)

* `POST /register` — Register a new user
* `POST /login` — Login existing user

### 👤 User Routes (`/api/v1/user`)

* `GET /profile` — Get user profile (protected)

### 📝 Note Routes (`/api/v1/notes`)

* `GET /` — Get all note titles or a specific one (with query `?title=`)
* `POST /` — Create a new note
* `PATCH /:id` — Update a note by ID
* `DELETE /:id` — Delete a note by ID

> Optional query params:
> `?sort=importance` — Sort by importance
> `?level=high` — Filter by importance level

---

## ✏️ Notes Model

```js
{
  user: ObjectId,
  title: String,
  notes: String,
  importance: "low" | "medium" | "high",
  createdAt: Date,
  updatedAt: Date
}
```

> Unique constraint on title per user: a user cannot have multiple notes with the same title.

---

## 🔒 Authentication

Uses JWT stored in the `Authorization` header as `Bearer <token>` for protected routes.

---

## 👫 Contact

For any queries, feel free to reach out or raise an issue.

---

## ✅ To Do (Optional Enhancements)

* Add pagination
* Add labels/tags to notes
* Add sharing functionality
* Add password reset


Testing of middleware, user and notes routes are still remaining.