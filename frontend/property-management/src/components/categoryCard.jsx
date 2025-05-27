import React from "react";
// import styles from "../../pages/InputDesign.module.css";

function AccommodationCard({ image, title }) {
  return (
    <article className={styles.accommodationCard}>
      <img
        src={image}
        alt={title}
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>{title}</h3>
    </article>
  );
}

export default AccommodationCard;