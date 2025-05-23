import React from "react";
import Image1 from "../../../assets/Collection/1.jpg";
import Image2 from "../../../assets/Collection/2.jpg";

import styles from "./Collection.module.css";

const Collection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.collectionContent}>
        <div className={styles.collectionLabel}>
          <h3>Trending Collection</h3>
          <p>Checkout our weekly updated trending collection.</p>
        </div>

        <div className={styles.collectionItems}>
          <div className={styles.collectionItem}>
            <img src={Image1} alt="" className={styles.mainImage} />
            <div className={styles.collectionMicroImgs}>
              <img src={Image1} alt="" className={styles.secondImage} />
              <img src={Image1} alt="" className={styles.secondImage} />
              <button className={styles.collectionButton}>1025+</button>
            </div>
            <div className={styles.collectionInfo}>
              <h5>Inazuma</h5>
              <div className={styles.collectionLogo}>
                <img src={Image1} alt="" className={styles.collectionLogoImg} />
                <p>Name</p>
              </div>
            </div>
          </div>
          <div className={styles.collectionItem}>
            <img src={Image2} alt="" className={styles.mainImage} />
            <div className={styles.collectionMicroImgs}>
              <img src={Image2} alt="" className={styles.secondImage} />
              <img src={Image2} alt="" className={styles.secondImage} />
              <button className={styles.collectionButton}>1025+</button>
            </div>
            <div className={styles.collectionInfo}>
              <h5>Inazuma</h5>
              <div className={styles.collectionLogo}>
                <img src={Image2} alt="" className={styles.collectionLogoImg} />
                <p>Name</p>
              </div>
            </div>
          </div>
          <div className={styles.collectionItem}>
            <img src={Image1} alt="" className={styles.mainImage} />
            <div className={styles.collectionMicroImgs}>
              <img src={Image1} alt="" className={styles.secondImage} />
              <img src={Image1} alt="" className={styles.secondImage} />
              <button className={styles.collectionButton}>1025+</button>
            </div>
            <div className={styles.collectionInfo}>
              <h5>Inazuma</h5>
              <div className={styles.collectionLogo}>
                <img src={Image1} alt="" className={styles.collectionLogoImg} />
                <p>Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Collection;
