import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  page: 1,
  perPage: 10,
  loading: "IDLE", // The initial state for loading
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    add: (state, action) => {
      state.posts.push(...action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { add, setLoading } = postsSlice.actions;

// The async thunk to fetch posts and update the loading state
export const getPostsAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading("LOADING"));
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=50`
    );

    const result = await response.json();

    dispatch(add(result));
    dispatch(setLoading("SUCCESS"));
  } catch (error) {
    dispatch(setLoading("ERROR"));
    console.error("Error:", error);
  }
};

export default postsSlice;
