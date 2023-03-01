import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, PostState } from "../../types/post";

const initialState: PostState = {
  posts: [],
  isPostLoading: false,
  isPostError: "",
};

export const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postsFetching(state) {
      state.isPostLoading = true;
    },
    postsFetchingSuccess(state, action: PayloadAction<IPost[]>) {
      state.isPostLoading = false;
      state.isPostError = "";
      state.posts = [...state.posts, ...action.payload];
    },
    postsFetchingError(state, action: PayloadAction<string>) {
      state.isPostLoading = false;
      state.isPostError = action.payload;
    },
    deletePost(state) {
      state.isPostDeleting = true;
    },
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.posts = state.posts?.filter((post) => post.id !== action.payload);
      state.isPostDeleting = false;
    },
  },
});

export default postSlice.reducer;
