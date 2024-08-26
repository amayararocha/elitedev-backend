import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/userController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);

export default router;
