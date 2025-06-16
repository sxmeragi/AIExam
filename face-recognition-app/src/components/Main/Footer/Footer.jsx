import React from "react";
import styles from "../Footer/Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <div className="footerLogo">
              <div className={styles.footerLogoText}>AWGE</div>
            </div>
            <div className={styles.footerAdditionalInfo}>
              Get Exclusive Promotions & UpdatesStraight To Your Inbox.{" "}
            </div>
          </div>
          <div className={styles.footerExplore}>
            <div className={styles.footerLogoText}>Explore</div>
            <div className={styles.footerExplorePages}>
              <a href="">
                <div className={styles.footerExplorePage}>Home</div>
              </a>
              <a href="">
                <div className={styles.footerExplorePage}>About</div>
              </a>
              <a href="">
                <div className={styles.footerExplorePage}>Services</div>
              </a>
            </div>
          </div>
          <div className={styles.footerSubscribe}>
            <div className={styles.footerSubscribeLabel}>
              Join Our Weekly Digest
            </div>
            <div className={styles.footerSubscribeText}>
              Get Exclusive Promotions & Updates
              <span>Straight To Your Inbox.</span>
            </div>
            <div className={styles.footerSubscribeForm}>
              <input
                type="email"
                placeholder="Enter your email here"
                className={styles.footerSubscribeInput}
              />

              <a href="">
                <div className={styles.footerSubscribeButton}>Subscribe</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.footerLine} />
    </footer>
  );
};

export default Footer;
