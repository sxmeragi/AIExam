import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../utils/axiosInstance";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("username", username);

      axiosInstance.defaults.headers["Authorization"] = `Bearer ${access}`;

      if (onLogin) {
        onLogin();
      }

      navigate("/");
    } catch (err) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        position: "relative",
        px: isMobile ? 2 : 0,
        mt: isMobile ? 6 : 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: isMobile ? 3 : 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          align="center"
          gutterBottom
          color="black"
        >
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Login"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        sx={{
          position: "absolute",
          top: isMobile ? "-50px" : 0,
          left: isMobile ? 0 : "-90px",
          mt: isMobile ? 1 : 0,
          ml: isMobile ? 0 : 2,
        }}
        onClick={() => navigate("/")}
      >
        Return
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: isMobile ? 2 : 3, fontSize: isMobile ? "0.85rem" : "1rem" }}
      >
        New here?{" "}
        <Link
          to="/register"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Create an account
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
