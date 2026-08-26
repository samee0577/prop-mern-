import React from "react";
import { Link } from "react-router-dom";
import Profile from "../images/profile.png";
import Profile_b from "../images/profile_black.png";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.brandName}>PROP-EASE</div>
      <div className={styles.navActions}>
        {localStorage.getItem("token") ? (
          <div className={styles.profileContainer}>
            <Link to="/profile" aria-label="Open profile" title="Open profile">
              <img
                src={Profile_b}
                alt="profile"
                className={styles.profilePicture}
              />
            </Link>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/signup">
              <div className={styles.signupButton}>Sign-up</div>
            </Link>
            <Link to="/login">
              <div className={styles.loginButton}>Log In</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
