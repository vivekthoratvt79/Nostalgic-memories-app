import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const { title, message, tags } = req.body;
  try {
    const post = await PostMessage.findByIdAndUpdate(
      { _id },
      { title, message, tags },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const _id = req.params.id;
  try {
    await PostMessage.deleteOne({ _id });
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const _id = req.params.id;
  if (!req.userId) return res.json({ message: 'Unauthenticated' });
  try {
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      //dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatePost = await PostMessage.findByIdAndUpdate({ _id }, post, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
