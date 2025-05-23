import React from "react";
import Image from "../../../assets/Ranking/hacker.png";
import styles from "./Creators.module.css";
const Creators = () => {
  return (
    <div className={styles.container}>
      <div className={styles.creatorsContent}>
        <div className={styles.creatorsLabel}>
          <div className="creatorsLabelText">
            <h3 className={styles.creatorsH3}>Top Creators</h3>
            <p className={styles.creatorsP}>Checkout Top Rated Creators</p>
          </div>
          <button className={styles.creatorsButton}>View Rankings</button>
        </div>
        <div className={styles.creatorsGrid}>
          <div className={styles.creatorsGridRow}>
            <a href="" className="">
              <div className={styles.creatorCard}>
                <div className={styles.creatorAvatar}>
                  <img src={Image} alt="" className={styles.creatorAvatarImg} />
                </div>
                <div className={styles.creatorInfo}>
                  <h5>seemmmyq</h5>
                  <div className="additionalInfo">
                    <p>
                      <span className={styles.additionalInfoText}>
                        Total sales:{" "}
                      </span>
                      34.53 ETH
                    </p>
                  </div>
                  {/* <div className="rankingNumber"></div> */}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creators;
