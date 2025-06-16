import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import NavBar from "../Main/NavBar/NavBar";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const MyNFTs = () => {
  const [owned, setOwned] = useState([]);
  const [created, setCreated] = useState([]);
  const [loading, setLoading] = useState(true);

  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    const fetchMyNFTs = async () => {
      try {
        const response = await axiosInstance.get("/nfts/my_nfts/");
        setOwned(response.data.owned);
        setCreated(response.data.created);
      } catch (error) {
        console.error("Ошибка при получении моих NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyNFTs();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );

  const renderNFTs = (nfts) =>
    nfts.map((nft) => {
      const imageUrl = `${mediaUrl}${nft.image}`;

      return (
        <Grid item xs={12} sm={6} md={4} key={nft.id}>
          <Card
            component={Link}
            to={`/nfts/${nft.id}`}
            sx={{
              backgroundColor: "#3b3b3b",
              color: "white",
              textDecoration: "none",
              borderRadius: "20px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 0 12px rgba(255,255,255,0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={nft.name}
              sx={{
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {nft.name}
              </Typography>
              <Typography variant="body2" color="gray">
                Автор: {nft.creator_username}
              </Typography>
              <Typography variant="body1" color="primary">
                Цена: {nft.price}
              </Typography>
              <Typography variant="caption">Статус: {nft.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <>
      <NavBar isAuthenticated={!!localStorage.getItem("access_token")} />
      <Container sx={{ mt: { xs: 3, md: 5 }, mb: 4 }}>
        <Typography variant="h4" color="white" gutterBottom>
          My NFTS
        </Typography>

        <Typography variant="h6" color="white" mt={3} mb={2}>
          💻 Created
        </Typography>
        <Grid container spacing={3}>
          {created.length > 0 ? (
            renderNFTs(created)
          ) : (
            <Typography color="gray" ml={2}>
              Вы пока ничего не создавали.
            </Typography>
          )}
        </Grid>

        <Typography variant="h6" color="white" mt={5} mb={2}>
          👜 Purchased
        </Typography>
        <Grid container spacing={3}>
          {owned.length > 0 ? (
            renderNFTs(owned)
          ) : (
            <Typography color="gray" ml={2}>
              У вас пока нет купленных NFT.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default MyNFTs;
