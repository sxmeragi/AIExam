import React from "react";
import Brush from "../../../assets/Main/Categories/Icons/PaintBrush.svg";
import Collect from "../../../assets/Main/Categories/Icons/Swatches.svg";
import Note from "../../../assets/Main/Categories/Icons/MusicNotes.svg";
import Camera from "../../../assets/Main/Categories/Icons/Camera.svg";

import Art from "../../../assets/Main/Categories/Random/Art.jpg";
import Collectibles from "../../../assets/Main/Categories/Random/Collect.jpg";
import Music from "../../../assets/Main/Categories/Random/Music.jpg";
import Photo from "../../../assets/Main/Categories/Random/Photo.jpg";

import styles from "../Categories/Categories.module.css";

const Categories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesContent}>
        <div className={styles.categoriesLabel}>
          <h3 className={styles.categoriesLabelText}>Browse Categories</h3>
        </div>
        <div className={styles.categoriesGrid}>
          <div className={styles.categoriesGridRow}>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Art}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Brush} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Art</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Collectibles}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Collect} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Collectibles</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Music}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Note} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Music</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Photo}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Camera} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Photography</h5>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.categoriesGridRow}>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Art}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Brush} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Art</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Collectibles}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Collect} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Collectibles</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Music}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Note} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Music</h5>
                </div>
              </div>
            </a>
            <a href="">
              <div className={styles.categoriesCard}>
                <div className={styles.categoriesCardImgBackDiv}>
                  <img
                    src={Photo}
                    alt="blurred"
                    className={styles.categoriesCardImgBack}
                  />
                  <div className={styles.iconContainer}>
                    <img src={Camera} alt="icon" className={styles.iconImg} />
                  </div>
                </div>
                <div className={styles.categoriesCardName}>
                  <h5>Photography</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
