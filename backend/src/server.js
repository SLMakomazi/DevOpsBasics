import 'dotenv/config';
import express from 'express';
import { initDatabase } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const startServer = async () => {
  try {
    await initDatabase();

    app.use('/api', userRoutes);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Modular Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();