import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavBar from "../Main/NavBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";

const WhiteToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: "white",
  borderColor: "white",
  "&.Mui-selected": {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
}));

const NFTList = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("on_sale");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchNFTs = async (status) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/nfts/?status=${status}`);
      setNfts(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs(statusFilter);
  }, [statusFilter]);

  const handleFilterChange = (_, newStatus) => {
    if (newStatus !== null) {
      setStatusFilter(newStatus);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );

  return (
    <>
      <NavBar isAuthenticated={!!localStorage.getItem("access_token")} />
      <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 3 } }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          color="white"
          gutterBottom
          textAlign={isMobile ? "center" : "left"}
        >
          NFT Marketplace
        </Typography>

        <Box
          display="flex"
          justifyContent={isMobile ? "center" : "flex-start"}
          mb={3}
        >
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={handleFilterChange}
          >
            <WhiteToggleButton value="on_sale">On Sale</WhiteToggleButton>
            <WhiteToggleButton value="sold">Sold</WhiteToggleButton>
            <WhiteToggleButton value=" ">All</WhiteToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {nfts.map((nft) => (
            <Grid
              item
              key={nft.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  backgroundColor: "#3b3b3b",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "20px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                component={Link}
                to={`/nfts/${nft.id}`}
              >
                <CardMedia
                  component="img"
                  image={nft.image}
                  alt={nft.name}
                  sx={{
                    height: 210,
                    objectFit: "cover",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {nft.name}
                  </Typography>
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
