import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetchingLoading(state) {
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLoginLoading(state) {
      state.isLoading = true;
    },
    userLoginSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.loginError = "";
      state.user = action.payload;
    },
    userLoginError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.loginError = action.payload;
    },
    userRegisterLoading(state) {
      state.isLoading = true;
    },
    userRegisterSuccess(state) {
      state.isLoading = false;
      state.registerError = "";
    },
    userRegisterError(state, action: PayloadAction<string>) {
      state.registerError = action.payload;
      state.isLoading = false;
    },
    userLogout(state) {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
