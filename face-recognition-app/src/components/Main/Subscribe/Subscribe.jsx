import React from "react";
import styles from "../Subscribe/Subscribe.module.css";
import Image from "../../../assets/Main/Subscribe/Photo.png";

const Subscribe = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subscribeContent}>
        <div className="subscribeImg">
          <img src={Image} alt="" />
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

            <a href="">
              <div className={styles.subscribeButton}>Subscribe</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
