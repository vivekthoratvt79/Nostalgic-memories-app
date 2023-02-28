import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
