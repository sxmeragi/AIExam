import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import NavBar from "../Main/NavBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";

const NFTDetail = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const isAuthenticated = !!localStorage.getItem("access_token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const response = await axiosInstance.get(`/nfts/${id}/`);
        setNft(response.data);
      } catch (error) {
        console.error("Ошибка при получении NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [id]);

  const handleBuy = async () => {
    try {
      await axiosInstance.post(`/nfts/${id}/purchase/`);
      setMessage({
        open: true,
        text: "NFT успешно куплен!",
        severity: "success",
      });
      setNft((prev) => ({
        ...prev,
        status: "sold",
        owner_username: "Вы",
      }));
    } catch (error) {
      console.log("Ошибка покупки:", error.response);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );

  if (!nft)
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        NFT не найден
      </Typography>
    );

  const showBuyButton =
    isAuthenticated &&
    nft &&
    nft.status === "on_sale" &&
    nft.owner_username !== username;

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Container sx={{ mt: { xs: 4, md: 6 }, mb: 4 }}>
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#3b3b3b",
              color: "white",
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              boxShadow: "0 0 10px rgba(255,255,255,0.1)",
            }}
          >
            <CardMedia
              component="img"
              image={nft.image}
              alt={nft.title}
              sx={{
                maxHeight: 400,
                objectFit: "contain",
                width: "100%",
                borderRadius: 2,
              }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
              >
                {nft.name}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                {nft.description}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Цена: {nft.price}
              </Typography>
              <Typography variant="body2">
                Автор: {nft.creator_username}
              </Typography>
              <Typography variant="body2" color="gray" gutterBottom>
                Статус: {nft.status === "sold" ? "Продан" : "В продаже"}
              </Typography>

              {showBuyButton && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleBuy}
                  fullWidth
                >
                  Купить
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>

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
    </>
  );
};

export default NFTDetail;
