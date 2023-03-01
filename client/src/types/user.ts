export interface IUser {
  _id?: number;
  password: string;
  email: string;
}

export interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
  loginError?: string;
  registerError?: string;
}
