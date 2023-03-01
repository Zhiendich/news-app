import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./hooks/UseTypesSelector";
import { privateRoutes, publickRoutes } from "./routes/routes";
import { fetchPosts } from "./store/action-creators/post";
import { isUserAuth } from "./store/action-creators/user";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(isUserAuth());
    }
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        {publickRoutes.map((route) =>
          route.path === "/login" || route.path === "/registration" ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                user ? <Navigate to="/profile" replace /> : <route.component />
              }
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          )
        )}
        {user &&
          privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
      </Routes>
    </div>
  );
}

export default App;
