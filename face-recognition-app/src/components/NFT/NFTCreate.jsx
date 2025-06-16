import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import NavBar from "../Main/NavBar/NavBar";

const NFTCreate = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    image: null,
  });

  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axiosInstance.post("/nfts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        open: true,
        text: "NFT успешно создан!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/nfts");
      }, 1500);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Ошибка при создании NFT.";
      setMessage({ open: true, text: errorMsg, severity: "error" });
    }
  };

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Container sx={{ mt: { xs: 3, md: 5 }, color: "white" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Создать новый NFT
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "#2b2b2b",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          <TextField
            name="name"
            label="Название"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ sx: { color: "gray" } }}
            InputProps={{ sx: { color: "white" } }}
          />
          <TextField
            name="description"
            label="Описание"
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ sx: { color: "gray" } }}
            InputProps={{ sx: { color: "white" } }}
          />
          <TextField
            name="price"
            label="Цена"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ sx: { color: "gray" } }}
            InputProps={{ sx: { color: "white" } }}
          />

          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
              Изображение (JPG, PNG, GIF)
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{ color: "white" }}
            />
          </Box>

          <Button variant="contained" type="submit" size="large">
            Создать NFT
          </Button>
        </Box>

        <Snackbar
          open={message.open}
          autoHideDuration={4000}
          onClose={() => setMessage({ ...message, open: false })}
        >
          <Alert
            onClose={() => setMessage({ ...message, open: false })}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default NFTCreate;
