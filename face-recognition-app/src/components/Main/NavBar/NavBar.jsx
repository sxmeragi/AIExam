import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavBar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brand}>MyBrand</span>
      </div>
      <div className={styles.right}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/nfts" className={styles.link}>
          Marketplace
        </Link>
        <Link to="/nfts/create" className={styles.link}>
          Create NFT
        </Link>
        <Link to="/my-nfts" className={styles.link}>
          My NFTS
        </Link>
        {isAuthenticated ? (
          <button className={styles.signupButton} onClick={handleProfileClick}>
            Profile
          </button>
        ) : (
          <button className={styles.signupButton} onClick={handleLoginClick}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
