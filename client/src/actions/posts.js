import * as api from '../api';

//Action Creator
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); //API CALL
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); //API CALL
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); //API CALL
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id); //API CALL
    dispatch({ type: 'DELETE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); //API CALL
    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
