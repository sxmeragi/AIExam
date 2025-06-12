import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import axiosInstance from "../../utils/axiosInstance";

const NFTList = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axiosInstance.get("/nfts/");
        setNfts(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) return <CircularProgress sx={{ color: "white", mt: 4 }} />;

  return (
    <>
      <NavBar isAuthenticated={!!localStorage.getItem("access_token")} />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" color="white" gutterBottom>
          NFT Marketplace
        </Typography>
        <Grid container spacing={3}>
          {nfts.map((nft) => (
            <Grid item xs={12} sm={6} md={4} key={nft.id}>
              <Card
                sx={{
                  backgroundColor: "#2d2d2d",
                  color: "white",
                  textDecoration: "none",
                }}
                component={Link}
                to={`/nfts/${nft.id}`}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={nft.image}
                  alt={nft.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{nft.title}</Typography>
                  <Typography variant="body2" color="gray">
                    Автор: {nft.creator_username}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Цена: {nft.price}
                  </Typography>
                  <Typography variant="caption">
                    Статус: {nft.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default NFTList;
