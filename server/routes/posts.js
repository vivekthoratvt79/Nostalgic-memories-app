import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/likePost/:id', auth, likePost);

export default router;
