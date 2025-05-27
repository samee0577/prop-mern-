import styles from "./Category.module.css";
import React, { useState } from "react";

function Category({ onCategoryChange, onSearch }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Helper function to generate className
  const getButtonClass = (category) => {
    return `${styles.categoryItem} ${activeCategory === category ? styles.activeCat : ""}`;
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category); // Notify the parent component
  };

  const handleSearchInput = (e) => {
    onSearch(e.target.value); // Pass the search query to the parent component
  };

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search properties"
          className={styles.searchInput}
          onChange={handleSearchInput} // Handle search input
        />
      </div>
      <div className={styles.authButtons}>
        <button
          className={getButtonClass("residential")}
          onClick={() => handleCategoryClick("residential")}
        >
          Residential
        </button>
        <button
          className={getButtonClass("commercial")}
          onClick={() => handleCategoryClick("commercial")}
        >
          Commercial
        </button>
        <button
          className={getButtonClass("villa")}
          onClick={() => handleCategoryClick("villa")}
        >
          Villa
        </button>
        <button
          className={getButtonClass("all")}
          onClick={() => handleCategoryClick("all")}
        >
          All
        </button>
      </div>
    </div>
  );
}

export default Category;