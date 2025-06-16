import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const navigate = useNavigate();
  const access = localStorage.getItem("access_token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/me/");
        setUser(response.data);
        setFormData(response.data);
        setPreviewAvatar(response.data.avatar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [access]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();

    for (const key in formData) {
      if (key === "avatar") {
        if (formData.avatar instanceof File) {
          data.append("avatar", formData.avatar);
        }
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axiosInstance.patch("/user/me/", data, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data);
      setEditMode(false);
      setPreviewAvatar(response.data.avatar);
    } catch (err) {
      console.error("Ошибка:", err.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (!user) return <CircularProgress sx={{ color: "white" }} />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, color: "white" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        mb={3}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
          fullWidth={isMobile}
        >
          Return
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          fullWidth={isMobile}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          src={previewAvatar}
          sx={{
            width: isMobile ? 80 : 100,
            height: isMobile ? 80 : 100,
            margin: "0 auto",
          }}
        />
        {editMode && (
          <Button variant="outlined" component="label" sx={{ mt: 1 }}>
            Загрузить аватар
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </Button>
        )}
      </Box>

      <form onSubmit={handleSave}>
        {!editMode ? (
          <Box>
            <Typography variant="h6">
              Имя пользователя: {user.username}
            </Typography>
            <Typography>Биография: {user.bio || "–"}</Typography>
            <Typography>
              Дата рождения: {user.birth_date || "не указана"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setEditMode(true)}
              fullWidth={isMobile}
            >
              Редактировать
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Имя пользователя"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <TextField
              label="Биография"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              InputLabelProps={{ sx: { color: "white" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <TextField
              label="Дата рождения"
              name="birth_date"
              type="date"
              value={formData.birth_date || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true, sx: { color: "white" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={saving}
                fullWidth
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(false)}
                fullWidth
              >
                Отмена
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default Profile;
