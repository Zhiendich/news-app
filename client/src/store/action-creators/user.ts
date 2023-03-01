import axios from "axios";
import { IUser } from "../../types/user";
import { userSlice } from "../reducers/userSlice";
import { AppDispatch } from "../store";

export const isUserAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetchingLoading());
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_USER}/getUser`,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch(userSlice.actions.userFetchingSuccess(response.data));
  } catch (e: string | any) {
    dispatch(userSlice.actions.userFetchingError(e.message));
  }
};

export const userRegister =
  (newUserInfo: IUser) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.userRegisterLoading());
      await axios.post(
        `${process.env.REACT_APP_API_URL_USER}/registration`,
        newUserInfo
      );
      dispatch(userSlice.actions.userRegisterSuccess());
    } catch (e: string | any) {
      console.log(e);
      dispatch(userSlice.actions.userRegisterError(e.response.data.message));
    }
  };

export const userLogin = (userInfo: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userLoginLoading);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL_USER}/auth`,
      userInfo
    );
    dispatch(userSlice.actions.userLoginSuccess(response.data.user));
    window.localStorage.setItem("token", response.data.token);
  } catch (e: string | any) {
    dispatch(userSlice.actions.userLoginError(e.response.data.message));
  }
};

export const userLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userLogout());
    window.localStorage.removeItem("token");
  } catch (e: string | any) {
    console.log(e);
  }
};
