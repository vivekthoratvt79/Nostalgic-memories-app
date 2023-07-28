import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nostalgic-memories-service.onrender.com',
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);

export const signup = (userData) => API.post(`/user/signup`, userData);
export const signin = (userData) => API.post(`/user/signin`, userData);
