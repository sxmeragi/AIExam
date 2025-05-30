import React from "react";
import styles from "../Auction/Auction.module.css";
import Image from "../../../assets/Main/Auction/1.jpg";

const Auction = () => {
  return (
    <div className={styles.auctionHighlight}>
      <div className={styles.auctionGradient}>
        <div className={styles.container}>
          <div className={styles.auctionContent}>
            <div className={styles.auctionInfo}>
              <div className={styles.auctionAbout}>
                <div className={styles.auctionAuthor}>
                  <img src={Image} alt="" className={styles.auctionAuthorPfp} />
                  <p className={styles.auctionAuthorName}>Name</p>
                </div>
                <div className="auctionLabel">
                  <h2 className={styles.auctionLabelText}>Magic Mashrooms</h2>
                </div>
                <button className={styles.auctionButton}>See NFT</button>
              </div>
              <div className={styles.auctionTimer}>
                <div className={styles.auctionTimerLabel}>Auction ends in:</div>
                <div className={styles.auctionTimerTime}>
                  <div className={styles.auctionTimerHours}>
                    <span className={styles.auctionTimerHoursLabel}>59</span>
                    <span className={styles.auctionTimerHoursText}>Hours</span>
                  </div>
                  <div className="auctionTimerSpace">
                    <span className={styles.auctionTimerSpaceText}>:</span>
                  </div>
                  <div className={styles.auctionTimerMinutes}>
                    <span className={styles.auctionTimerHoursLabel}>59</span>
                    <span className={styles.auctionTimerHoursText}>
                      Minutes
                    </span>
                  </div>
                  <div className="auctionTimerSpace">
                    <span className={styles.auctionTimerSpaceText}>:</span>
                  </div>
                  <div className={styles.auctionTimerSeconds}>
                    <span className={styles.auctionTimerHoursLabel}>59</span>
                    <span className={styles.auctionTimerHoursText}>
                      Seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
