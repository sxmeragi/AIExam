import React from "react";
import Image1 from "../../../assets/Main/Collection/1.jpg";
import Image2 from "../../../assets/Main/Collection/2.jpg";
import Image3 from "../../../assets/Main/Collection/3.jpg";

import styles from "./Collection.module.css";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.collectionContent}>
        <div className={styles.collectionLabel}>
          <h3>Trending Collection</h3>
          <p className={styles.collectionText}>
            Checkout our weekly updated trending collection.
          </p>
        </div>

        <div className={styles.collectionItems}>
          <Link to="/nfts">
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
                  <img
                    src={Image1}
                    alt=""
                    className={styles.collectionLogoImg}
                  />
                  <p className={styles.collectionText}>Name</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/nfts">
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
                  <img
                    src={Image2}
                    alt=""
                    className={styles.collectionLogoImg}
                  />
                  <p className={styles.collectionText}>Name</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/nfts">
            <div className={styles.collectionItem}>
              <img src={Image3} alt="" className={styles.mainImage} />
              <div className={styles.collectionMicroImgs}>
                <img src={Image3} alt="" className={styles.secondImage} />
                <img src={Image3} alt="" className={styles.secondImage} />
                <button className={styles.collectionButton}>1025+</button>
              </div>
              <div className={styles.collectionInfo}>
                <h5>Inazuma</h5>
                <div className={styles.collectionLogo}>
                  <img
                    src={Image3}
                    alt=""
                    className={styles.collectionLogoImg}
                  />
                  <p className={styles.collectionText}>Name</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Collection;
