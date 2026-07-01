import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

// Map HTTP verbs & endpoints to controller logic
router.get('/users', getUsers);
router.post('/users', createUser);

export default router;