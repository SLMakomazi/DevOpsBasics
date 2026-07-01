import { pool } from '../config/db.js';

// Controller for fetching users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error pulling names from database' });
  }
};

// Controller for creating a user
export const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name field cannot be empty' });
    }

    const insertQuery = 'INSERT INTO users (name) VALUES ($1) RETURNING *;';
    const result = await pool.query(insertQuery, [name]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error saving name to database' });
  }
};