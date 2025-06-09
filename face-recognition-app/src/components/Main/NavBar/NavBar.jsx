import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brand}>MyBrand</span>
      </div>
      <div className={styles.right}>
        <Link href="#home" className={styles.link}>
          Home
        </Link>
        <Link href="#about" className={styles.link}>
          About
        </Link>
        <Link href="#services" className={styles.link}>
          Services
        </Link>
        <Link href="#contact" className={styles.link}>
          Contact
        </Link>
        <button className={styles.signupButton} onClick={handleLoginClick}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
