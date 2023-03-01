import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../hooks/UseTypesSelector";
import { Alert } from "@mui/material";
import { userLogin } from "../store/action-creators/user";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector((state) => state.userReducer);
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Авторизироваться
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            value={email}
            onChange={changeEmailHandler}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={changePasswordHandler}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <Button
            onClick={loginHandler}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, p: 2 }}
          >
            Авторизироваться
          </Button>
          <Grid container>
            <Grid item sx={{ marginLeft: "auto" }}>
              <Link to="../registration">
                {"Нет аккаунта? Зарегистрируйтесь"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
