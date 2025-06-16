import React from "react";
import styles from "../Subscribe/Subscribe.module.css";
import Image from "../../../assets/Main/Subscribe/Photo.png";

const Subscribe = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subscribeContent}>
        <div className={styles.subscribeImg}>
          <img src={Image} alt="" className={styles.subscribeImg} />
        </div>
        <div className={styles.subscribeInfo}>
          <div className="subscribeInfoText">
            <div className={styles.subscribeLabel}>Join Our Weekly Digest</div>
            <div className={styles.subscribeText}>
              Get Exclusive Promotions & Updates Straight To Your Inbox.
            </div>
          </div>

          <div className={styles.subscribeIForm}>
            <input
              type="email"
              placeholder="Enter your email here"
              className={styles.subscribeInput}
            />

            <div className={styles.subscribeButton}>Subscribe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
