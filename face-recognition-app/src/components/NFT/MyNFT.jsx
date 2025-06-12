import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
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
        console.log(response.data.owned);
        setCreated(response.data.created);
      } catch (error) {
        console.error("Ошибка при получении моих NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyNFTs();
  }, []);

  if (loading) return <CircularProgress sx={{ color: "white", mt: 4 }} />;

  const renderNFTs = (nfts) =>
    nfts.map((nft) => {
      const imageUrl = `${mediaUrl}${nft.image}`;

      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={nft.id}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#3b3b3b",
            "&:hover": {
              boxShadow: "0 0 10px rgba(255,255,255,0.2)",
            },
          }}
        >
          <Card
            component={Link}
            to={`/nfts/${nft.id}`}
            sx={{
              color: "white",
              textDecoration: "none",
              borderRadius: "20px",
            }}
          >
            <CardMedia
              component="img"
              height="210"
              image={imageUrl}
              alt={nft.name}
              sx={{
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            />
            <CardContent>
              <Typography variant="h6">{nft.name}</Typography>
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
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" color="white" gutterBottom>
          Мои NFT
        </Typography>

        <Typography variant="h6" color="white" mt={2} mb={1}>
          💻 Created
        </Typography>
        <Grid container spacing={3}>
          {renderNFTs(created)}
        </Grid>

        <Typography variant="h6" color="white" mt={4} mb={1}>
          👜 Purchased
        </Typography>
        <Grid container spacing={3}>
          {renderNFTs(owned)}
        </Grid>
      </Container>
    </>
  );
};

export default MyNFTs;
