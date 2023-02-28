import * as api from '../api';

//Action Creator
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); //API CALL
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
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
