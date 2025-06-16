import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main/Main";
import Profile from "./components/Profile";
import Register from "./components/Register";
import NFTDetail from "./components/NFT/nftDetail";
import NFTList from "./components/NFT/nftList";
import PrivateRoute from "./components/PrivateRoute";
import NFTCreate from "./components/NFT/NFTCreate";
import MyNFTs from "./components/NFT/MyNFT";

const App = () => {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
    setAccuracy(null);
    navigate("/login");
  };
  const handleLoginSuccess = () => {
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${apiUrl}/user/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data) => {
          setUserRole(data.role);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleFaceRecognition = (role, accuracy) => {
    setUserRole(role);
    setAccuracy(accuracy);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nfts/:id" element={<NFTDetail />} />
        <Route
          path="/nfts"
          element={
            <PrivateRoute>
              <NFTList />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-nfts"
          element={
            <PrivateRoute>
              <MyNFTs />
            </PrivateRoute>
          }
        />
        <Route
          path="/nfts/create"
          element={
            <PrivateRoute>
              <NFTCreate />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
