import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("username", username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      if (onLogin) {
        onLogin();
        console.log("22");
      }
    } catch (err) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ position: "relative" }}>
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom color="black">
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
        sx={{ position: "absolute", top: 0, left: "-90px" }}
        onClick={() => navigate("/")}
      >
        Return
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
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
