import React from "react";
import styles from "../Subscribe/Subscribe.module.css";

const Subscribe = () => {
  return (
    <div className="container">
      <div className="subscribeContent">
        <div className="subscribeImg"></div>
        <div className="subscribeInfo">
          <div className="subscribeInfoText">
            <div className="subscribeLabel"></div>
            <div className="subscribeText"></div>
          </div>

          <div className="subscribeInput"></div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
