import React from "react";
import gifImage from "../../../assets/Main/Hero/framegif.gif";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>
            Discover <br />
            Digital Art & <br />
            Collect Nfts
          </h1>
          <p className={styles.heroPText}>
            Explore the Future of Ownership Trade digital art. Own rare assets.
            Join the NFT revolution.{" "}
          </p>
          <button
            className={styles.heroButton}
            onClick={() => {
              navigate("/nfts");
            }}
          >
            Get Started
          </button>
          <div className={styles.heroStat}>
            <div className={styles.heroSale}>
              <h4>240k+</h4>
              <p>Total Sale</p>
            </div>
            <div className={styles.heroSale}>
              <h4>100K+</h4>
              <p>Auctions</p>
            </div>
            <div className={styles.heroSale}>
              <h4>240K+</h4>
              <p>Users</p>
            </div>
          </div>
        </div>
        <img src={gifImage} alt="QWE" className={styles.heroImg} />
      </div>
    </div>
  );
};
