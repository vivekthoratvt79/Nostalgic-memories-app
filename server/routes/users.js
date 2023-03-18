import express from 'express';
import { signin, signup } from '../controllers/user.js';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
