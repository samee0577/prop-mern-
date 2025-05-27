import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationSection.module.css";
import resident from "../images/resident.jpg";
import villa from "../images/villa.jpg";
import commercial from "../images/commercial.jpg";


function NavigationSection() {
  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionTitle}>
        seamless travel &amp; experience
      </div>
      <div className={styles.cardContainer}>
        <Link to="/listings">
          <div className={styles.propertyCard}>
            <img
              src={resident}
              alt="Residential"
              className={styles.cardImage}
            />
            <div className={styles.cardTitle}>residential</div>
          </div>
        </Link>
        <Link to="/listings">
          <div className={styles.propertyCard}>
            <img
              src={villa}
              alt="Villa"
              className={styles.cardImage}
            />
            <div className={styles.cardTitle}>villa</div>
          </div>
        </Link>
        <Link to="/listings">
          <div className={styles.propertyCard}>
            <img
              src={commercial}
              alt="Commercial"
              className={styles.cardImage}
            />
            <div className={styles.cardTitle}>commercial</div>
          </div>
        </Link>
        <Link to="/listings">
          <div className={styles.emptyCard} >
            see all
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavigationSection;

