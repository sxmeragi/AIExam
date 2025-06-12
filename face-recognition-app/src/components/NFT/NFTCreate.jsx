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
  const navigate = useNavigate(); // ← подключаем navigate

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

      // редирект через 1.5 секунды
      setTimeout(() => {
        navigate("/nfts"); // ← сюда направляем (измени путь, если нужно)
      }, 1500);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Ошибка при создании NFT.";
      setMessage({ open: true, text: errorMsg, severity: "error" });
    }
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 4, color: "white" }}>
        <Typography variant="h4" gutterBottom>
          Создать новый NFT
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            required
            InputLabelProps={{
              sx: { color: "white" },
            }}
            InputProps={{
              sx: { color: "white" },
            }}
          />
          <TextField
            name="description"
            label="description"
            multiline
            value={form.description}
            onChange={handleChange}
            required
            InputLabelProps={{
              sx: { color: "white" },
            }}
            InputProps={{
              sx: { color: "white" },
            }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            InputLabelProps={{
              sx: { color: "white" },
            }}
            InputProps={{
              sx: { color: "white" },
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <Button variant="contained" type="submit">
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
          >
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default NFTCreate;
