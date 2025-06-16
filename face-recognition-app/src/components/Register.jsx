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
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.password2) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await axiosInstance.post("/register/", {
        username: formData.username,
        password: formData.password,
      });

      setSuccess("Регистрация прошла успешно!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("Ошибка при регистрации. Возможно, имя уже занято.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Return
        </Button>
      </Box>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Регистрация
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя пользователя"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Повторите пароль"
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Зарегистрироваться
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1.2, color: "black" }}
        >
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Войти
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
