# 📝 Note-Taking Backend API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing user-authenticated note creation, editing, deletion, and filtering/sorting by importance and creation date.

---

## 🚀 Features

* ✅ User registration and login (JWT-based authentication)
* 📒 Create, read, update, delete (CRUD) notes
* 📌 Sort notes by importance or creation date
* 🎯 Filter notes by importance level (high, medium, low)
* 🔐 Password hashing with bcrypt
* 📓 Unique note titles per user
* 📌 MongoDB compound index for fast lookups

---

## 📁 Project Structure

```
note-taking-backend/
├── node_modules/
├── src/
│   ├── config/         # Database config
│   ├── controllers/    # Logic for auth, notes
│   ├── middlewares/    # Auth middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API route definitions
│   ├── utils/          # Helper functions (if any)
│   ├── app.js          # Express app
├── server.js           # App entry point
├── .env                # Environment variables
├── package.json
├── README.md
```

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/note-taking-backend.git
   cd note-taking-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root with the following values:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**

   ```bash
   nodemon ./server.js
   ```

---

## 📬 API Endpoints

### Auth Routes (`/api/v1/auth`)

| Method | Route       | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login a user        |

### Notes Routes (`/api/v1/notes`)

All note routes are protected by JWT.

| Method | Route          | Description                                  |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/`            | Get note titles (optionally filtered/sorted) |
| GET    | `/?title=name` | Get specific note by title                   |
| POST   | `/`            | Create a new note                            |
| PATCH  | `/:id`         | Update a note                                |
| DELETE | `/:id`         | Delete a note                                |

---

## 🔐 Auth Middleware

All protected routes must include a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## ✅ Sorting & Filtering Examples

* **Sort by importance:**

  ```
  GET /api/v1/notes?sort=importance
  ```

* **Filter by importance level:**

  ```
  GET /api/v1/notes?level=high
  ```

* **Fetch specific note by title:**

  ```
  GET /api/v1/notes?title=Java
  ```

---

## 🛠 Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* Bcrypt
* dotenv
* CORS

---

## 📌 TODOs

* [ ] Add pagination
* [ ] Add user profile endpoints
* [ ] Add tests (Jest / Supertest)
* [ ] Dockerize the project


