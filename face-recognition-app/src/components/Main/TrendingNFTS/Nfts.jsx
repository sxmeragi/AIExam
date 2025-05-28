import React from "react";
import styles from "../TrendingNFTS/Nfts.module.css";

import Image1 from "../../../assets/Main/TrendingNfts/X.jpg";
import Image2 from "../../../assets/Main/TrendingNfts/Y.jpg";
import Image3 from "../../../assets/Main/TrendingNfts/Z.jpg";

const Nfts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nftsContent}>
        <div className={styles.nftsLabel}>
          <div className={styles.nftsLabelText}>
            <h3 className={styles.nftsH3}>Discover More Nfts</h3>
            <p className={styles.nftsP}>Checkout Explore New Trending Nfts</p>
          </div>
          <button className={styles.nftsButton}>See All</button>
        </div>
        <div className={styles.nftsItems}>
          <div className={styles.nftsItem}>
            <div className={styles.nftsItemImgDiv}>
              <img src={Image1} alt="" className={styles.nftsItemImg} />
            </div>
            <div className={styles.nftsItemText}>
              <div className={styles.nftsItemTextInfo}>
                <h5 className={styles.nftsItemTextInfoH5}>Choujin X</h5>
                <div className={styles.nftsItemTextAuthor}>
                  <img
                    src={Image1}
                    alt=""
                    className={styles.nftsItemTextAuthorImg}
                  />
                  <p className={styles.nftsItemTextAuthorName}>Sui Ishida</p>
                </div>
              </div>
              <div className={styles.nftsItemTextPrice}>
                <div className={styles.ItemTextPriceInfo}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Price
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      1.63 ETH
                    </span>
                  </p>
                </div>
                <div className={styles.nftsItemTextPriceHigh}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Highest Bid
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      0.33 wETH
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.nftsItem}>
            <div className={styles.nftsItemImgDiv}>
              <img src={Image2} alt="" className={styles.nftsItemImg} />
            </div>
            <div className={styles.nftsItemText}>
              <div className={styles.nftsItemTextInfo}>
                <h5 className={styles.nftsItemTextInfoH5}>Choujin X</h5>
                <div className={styles.nftsItemTextAuthor}>
                  <img
                    src={Image2}
                    alt=""
                    className={styles.nftsItemTextAuthorImg}
                  />
                  <p className={styles.nftsItemTextAuthorName}>Sui Ishida</p>
                </div>
              </div>
              <div className={styles.nftsItemTextPrice}>
                <div className={styles.ItemTextPriceInfo}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Price
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      1.63 ETH
                    </span>
                  </p>
                </div>
                <div className={styles.nftsItemTextPriceHigh}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Highest Bid
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      0.33 wETH
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.nftsItem}>
            <div className={styles.nftsItemImgDiv}>
              <img src={Image3} alt="" className={styles.nftsItemImg} />
            </div>
            <div className={styles.nftsItemText}>
              <div className={styles.nftsItemTextInfo}>
                <h5 className={styles.nftsItemTextInfoH5}>Choujin X</h5>
                <div className={styles.nftsItemTextAuthor}>
                  <img
                    src={Image3}
                    alt=""
                    className={styles.nftsItemTextAuthorImg}
                  />
                  <p className={styles.nftsItemTextAuthorName}>Sui Ishida</p>
                </div>
              </div>
              <div className={styles.nftsItemTextPrice}>
                <div className={styles.ItemTextPriceInfo}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Price
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      1.63 ETH
                    </span>
                  </p>
                </div>
                <div className={styles.nftsItemTextPriceHigh}>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoLabel}>
                      Highest Bid
                    </span>
                  </p>
                  <p>
                    <span className={styles.nftsItemTextPriceInfoValue}>
                      0.33 wETH
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nfts;
