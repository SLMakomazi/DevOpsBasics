import 'dotenv/config';
import express from 'express';
import { initDatabase } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Initialize Database Table
initDatabase();

// Prefix all user endpoints with '/api' (e.g. /api/users)
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Modular Backend running on http://localhost:${PORT}`);
});