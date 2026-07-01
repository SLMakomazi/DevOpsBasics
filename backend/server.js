// Import the Express framework to create our API server
import express from 'express';
// Import the 'Pool' class from the pg (PostgreSQL) library to manage database connections
import pkg from 'pg';
const { Pool } = pkg;

// Initialize the Express application
const app = express();
// Define the port our backend server will run on
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// Allow Express to automatically parse incoming JSON data in request bodies
app.use(express.json());

// --- DATABASE CONNECTION ---
// Set up a connection pool to your PostgreSQL database.
// These environment variables will be filled in manually or via Docker later.
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',         // Database username
  host: process.env.DB_HOST || 'localhost',        // Database location (localhost for now, 'db' for Docker)
  database: process.env.DB_NAME || 'devops_db',    // Name of the database
  password: process.env.DB_PASSWORD || 'password', // Database password
  port: process.env.DB_PORT || 5432,               // Default PostgreSQL port
});

// --- AUTOMATIC TABLE CREATION ---
// This helper function ensures the 'users' table exists as soon as the server starts up
const initDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    // Run the query against the database
    await pool.query(createTableQuery);
    console.log('✅ PostgreSQL "users" table is ready.');
  } catch (err) {
    console.error('❌ Failed to initialize database table:', err.message);
  }
};
// Execute the table creation logic
initDatabase();

// --- API ENDPOINTS ---

// 1. GET ROUTE: Fetch all users from the database
app.get('/api/users', async (req, res) => {
  try {
    // Query the database to select all rows, ordering them newest first
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    // Send the array of users back to the frontend with an HTTP 200 (Success) status
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    // If something breaks, send back a 500 Server Error
    res.status(500).json({ error: 'Server error pulling names from database' });
  }
});

// 2. POST ROUTE: Save a new name into the database
app.post('/api/users', async (req, res) => {
  try {
    // Extract the 'name' variable out of the JSON data sent by the frontend
    const { name } = req.body;

    // Check if the name is missing or just empty spaces
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name field cannot be empty' });
    }

    // Insert the name safely using a parameterized query ($1 prevents SQL injection attacks)
    const insertQuery = 'INSERT INTO users (name) VALUES ($1) RETURNING *;';
    const result = await pool.query(insertQuery, [name]);

    // Send back the newly created user object with an HTTP 201 (Created) status
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error saving name to database' });
  }
});

// --- START SERVER ---
// Tell the Express application to open up and listen for network traffic
app.listen(PORT, () => {
  console.log(`🚀 Backend server running smoothly on http://localhost:${PORT}`);
});