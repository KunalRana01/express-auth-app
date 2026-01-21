```md
# Express Authentication App (Practice Project)

This is a basic authentication practice project built using Node.js, Express, MongoDB, JWT, bcrypt, and EJS.  
The purpose of this project is to understand user authentication flow and backend fundamentals.

---

## Features

- User registration
- User login
- User logout
- Password hashing using bcrypt
- JWT-based authentication
- Cookie-based session handling
- Protected routes using middleware
- Server-side rendering with EJS

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt
- jsonwebtoken (JWT)
- cookie-parser
- EJS

---

## Project Structure

```
.
├── models
│   ├── user.js
│   └── post.js
├── views
│   ├── index.ejs
│   └── login.ejs
├── app.js
├── package.json
├── .gitignore
└── README.md

````

---

## How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node app.js
```

or (if using nodemon):

```bash
nodemon app.js
```

The app will run on:

```
http://localhost:3000
```

---

## Routes Overview

| Method | Route      | Description         |
| ------ | ---------- | ------------------- |
| GET    | `/`        | Home page           |
| GET    | `/login`   | Login page          |
| POST   | `/create`  | Register a new user |
| POST   | `/login`   | Login user          |
| GET    | `/profile` | Protected route     |
| GET    | `/logout`  | Logout user         |

---

## Authentication Logic

* Passwords are hashed using bcrypt
* JWT token is generated on signup and login
* Token is stored in cookies
* Protected routes verify JWT before allowing access

---

## Notes

* This is a practice project for learning backend authentication
* JWT secret key is hardcoded for simplicity
* Not intended for production use

---
