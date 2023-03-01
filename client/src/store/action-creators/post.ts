import axios from "axios";
import { IPost } from "../../types/post";
import { getPagesCount } from "../../utils/pages";
import { postSlice } from "../reducers/postSlice";
import { AppDispatch } from "../store";

export const fetchPosts =
  (limit: number = 9, page: number = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(postSlice.actions.postsFetching());
      const response = await axios.get<IPost[]>(
        `${process.env.REACT_APP_API_URL_POST}`,
        {
          params: {
            _limit: limit,
            _page: page,
          },
        }
      );
      const totalCountPages = response.headers["x-total-count"];
      const calcPages = getPagesCount(totalCountPages, limit);
      dispatch(postSlice.actions.postsFetchingSuccess(response.data));
      return { posts: response.data, totalCountPages: calcPages };
    } catch (e: string | any) {
      dispatch(postSlice.actions.postsFetchingError(e.message));
    }
  };

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(postSlice.actions.deletePost());
    const response = await axios.delete<number>(
      `${process.env.REACT_APP_API_URL_POST}/${id}`
    );
    dispatch(postSlice.actions.deletePostSuccess(id));
  } catch (e: string | any) {
    console.log(e.message);
  }
};
