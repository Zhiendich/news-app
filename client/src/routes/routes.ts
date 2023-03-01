import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import News from "../pages/News";
import PostPage from "../pages/PostPage";
import Profile from "../pages/Profile";
import RegisterForm from "../pages/RegisterForm";

export const privateRoutes = [
  { path: "/profile", component: Profile, exact: true },
];

export const publickRoutes = [
  { path: "/", component: Home, exact: true },
  { path: "/login", component: LoginForm, exact: true },
  { path: "/registration", component: RegisterForm, exact: true },
  { path: "/news", component: News, exact: true },
  { path: "/news/:id", component: PostPage, exact: true },
];
