import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import image from "../../../assets/Main/Nav/card.png";

const NavBar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src={image} alt="Logo" className={styles.logo} />
        <span className={styles.brand}>AWGE</span>
      </div>

      <div className={styles.burger} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`${styles.right} ${menuOpen ? styles.open : ""}`}>
        <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/nfts"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Marketplace
        </Link>
        <Link
          to="/nfts/create"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Create NFT
        </Link>
        <Link
          to="/my-nfts"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
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
