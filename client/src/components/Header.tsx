import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/UseTypesSelector";
import { userLogout } from "../store/action-creators/user";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [flag, setFlag] = React.useState(false);
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userLogout());
  };
  const { t, i18n } = useTranslation();
  const changeLanguage = () => {
    if (flag) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ua");
    }
    setFlag(!flag);
  };
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar
        sx={{
          flexWrap: "wrap",
          textDecoration: "none",
          color: "white",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            textTransform: "uppercase",
            fontSize: "bold",
          }}
        >
          <Link className="logo" to="/">
            {t("NewsSite")}
          </Link>
        </Typography>
        <nav className="nav-link">
          <Link to="news">{t("News")}</Link>
          {user && <Link to="profile">{t("Profile")}</Link>}
        </nav>
        <div className="switch-container">
          <h4>{t("en")}</h4>
          <label htmlFor="toggleSwitch" className="switch">
            <input
              checked={flag}
              onChange={changeLanguage}
              type="checkbox"
              id="toggleSwitch"
            />
            <span className="slider round"></span>
          </label>
          <h4>{t("ua")}</h4>
        </div>
        {!user ? (
          <Button variant="outlined" color="inherit" sx={{ my: 1, mx: 1.5 }}>
            <Link to="login"> {t("Login")}</Link>
          </Button>
        ) : (
          <Button
            onClick={logoutHandler}
            variant="outlined"
            color="inherit"
            sx={{ my: 1, mx: 1.5 }}
          >
            <Link to="login"> {t("Logout")}</Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
