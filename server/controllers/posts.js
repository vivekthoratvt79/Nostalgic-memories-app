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
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const { title, message, tags, creator } = req.body;
  try {
    const post = await PostMessage.findByIdAndUpdate(
      { _id },
      { title, message, tags, creator },
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
  try {
    const post = await PostMessage.findByIdAndUpdate(
      { _id },
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
