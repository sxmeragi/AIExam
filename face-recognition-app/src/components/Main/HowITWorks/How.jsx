import React from "react";
import styles from "../HowITWorks/How.module.css";
import Image from "../../../assets/Main/HowItWorks/Icon.svg";
import Image2 from "../../../assets/Main/HowItWorks/Icon2.svg";
import Image3 from "../../../assets/Main/HowItWorks/Icon3.svg";
const How = () => {
  return (
    <div className={styles.container}>
      <div className={styles.howContent}>
        <div className={styles.howLabel}>
          <h3 className={styles.howLabelH3}>How It Works</h3>
          <p className={styles.howLabelText}>Find Out How To Get Started</p>
        </div>
        <div className={styles.howSteps}>
          <div className={styles.HowStepsItem}>
            <div>
              <img src={Image} alt="" />
            </div>
            <div className={styles.howStepsItemInfo}>
              <div className={styles.howStepsItemLabel}>Setup Your Wallet</div>
              <div className={styles.howStepsItemText}>
                Set up your wallet of choice. Connect it to the Animarket by
                clicking the wallet icon in the top right corner.
              </div>
            </div>
          </div>
          <div className={styles.HowStepsItem}>
            <div>
              <img src={Image2} alt="" />
            </div>
            <div className={styles.howStepsItemInfo}>
              <div className={styles.howStepsItemLabel}>Create Collection</div>
              <div className={styles.howStepsItemText}>
                Upload your work and setup your collection. Add a description,
                social links and floor price.
              </div>
            </div>
          </div>
          <div className={styles.HowStepsItem}>
            <div>
              <img src={Image3} alt="" />
            </div>
            <div className={styles.howStepsItemInfo}>
              <div className={styles.howStepsItemLabel}>Start Earning</div>
              <div className={styles.howStepsItemText}>
                Choose between auctions and fixed-price listings. Start earning
                by selling your NFTs or trading others.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
