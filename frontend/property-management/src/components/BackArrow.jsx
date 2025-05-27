import React from "react";
import styles from "../pages/signUpPage/SignUpForm.module.css";

function BackArrow() {
  return (
    <button className={styles.backArrowButton}>
      <svg
        width="33"
        height="61"
        viewBox="0 0 33 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.backArrow}
      >
        <path
          d="M30.4697 59L1.9394 30.4697"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30.5466 1.93933L2.0163 30.4697"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default BackArrow;
