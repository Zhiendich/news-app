import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userRegister } from "../store/action-creators/user";
import { useAppDispatch, useAppSelector } from "../hooks/UseTypesSelector";
import { Alert } from "@mui/material";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerError } = useAppSelector((state) => state.userReducer);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userRegister({ email, password }));
    setSuccess(true);
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
          Зарегистрироваться
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
          {registerError && <Alert severity="error">{registerError}</Alert>}
          {success && !registerError && (
            <Alert severity="success">Регистрация прошла успешно</Alert>
          )}
          <Button
            onClick={registerHandler}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, p: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container>
            <Grid item sx={{ marginLeft: "auto" }}>
              <Link to="../login">{"Вернуться на страничку авторизации"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
