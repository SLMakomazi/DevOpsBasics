# 🚀 DevOps Basics - Node.js Backend API

This is a modular, production-ready Node.js REST API built with Express and PostgreSQL. It acts as the logic and data access layer for the DevOps Basics User Directory application.

---

## 🛠️ Architecture Pattern
This backend uses a **Layered (MVC) Architecture** to keep code cleanly decoupled:
* **`src/server.js`**: Application entry point, loads environment variables, routes traffic, and boots up the framework.
* **`src/config/db.js`**: Manages the PostgreSQL database connection pool and handles automatic table creation on startup.
* **`src/routes/userRoutes.js`**: Defines the URL endpoints (`/api/users`) and binds them to specific controller functions.
* **`src/controllers/userController.js`**: Contains business logic, structural validation, and SQL queries to interface with the database.

---

## 📋 API Endpoints

| HTTP Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/users` | Fetches all registered users ordered by ID descending. | *None* |
| **POST** | `/api/users` | Registers a new user inside the database. | `{"name": "String"}` |

---

## ⚙️ Local Configuration (.env)
The application reads configuration from a `.env` file in the root of the backend folder:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=devops_db
DB_PASSWORD=password
DB_PORT=5432
PORT=5000