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
      const response = await axiosInstance.post(`/nfts/${id}/purchase/`);
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
      //   const errorMsg = error.response?.data?.error || "Ошибка при покупке.";
      console.log("Ошибка покупки:", error.response);
      //   setMessage({ open: true, text: errorMsg, severity: "error" });
    }
  };

  if (loading) return <CircularProgress sx={{ color: "white", mt: 4 }} />;
  if (!nft) return <Typography color="error">NFT не найден</Typography>;

  const showBuyButton =
    isAuthenticated &&
    nft &&
    nft.status === "on_sale" &&
    nft.owner_username !== username;

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <Container sx={{ mt: 4 }}>
        <Card sx={{ backgroundColor: "#2d2d2d", color: "white", p: 2 }}>
          <CardMedia
            component="img"
            image={nft.image}
            alt={nft.title}
            sx={{ maxHeight: 400, objectFit: "contain", margin: "0 auto" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              {nft.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {nft.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Цена: {nft.price}
            </Typography>
            <Typography variant="body2">
              Автор: {nft.creator_username}
            </Typography>
            <Typography variant="body2" color="gray">
              Статус: {nft.status}
            </Typography>

            {showBuyButton && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleBuy}
              >
                Купить
              </Button>
            )}
          </CardContent>
        </Card>
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
