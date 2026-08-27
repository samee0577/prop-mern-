import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Property_grid.module.css";
import villaImg from "../../landingPage/images/villa.webp"; // Fallback demo image
import Category from "./Category"; // Import the Category component
import { Link } from "react-router-dom"; // Import Link for navigation
import { BACKEND_URL } from "../../../config/api";

function PropGrid() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [categories, setCategories] = useState({
    all: [],
    villa: [],
    commercial: [],
    residential: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/property/all_properties`, {
          timeout: 15000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allProperties = response.data.properties;

        // Categorize properties
        const categorized = {
          all: allProperties,
          villa: allProperties.filter((property) => property.category === "villa"),
          commercial: allProperties.filter((property) => property.category === "commercial"),
          residential: allProperties.filter((property) => property.category === "residential"),
        };

        setCategories(categorized);
        setFilteredProperties(allProperties); // Default to show all properties
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error.response?.data || error.message);
        setError("Properties could not be loaded. Please try again in a moment.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleCategoryChange = (category) => {
    setFilteredProperties(categories[category]);
  };

  const handleSearch = (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchingProperties = categories.all.filter((property) =>
      [property.title, property.location, property.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
    setFilteredProperties(normalizedQuery ? matchingProperties : categories.all);
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      {/* Pass the handleCategoryChange and handleSearch functions to the Category component */}
      <Category onCategoryChange={handleCategoryChange} onSearch={handleSearch} />

      {/* Property Grid */}
      <div className={styles.propertyGrid}>
        {filteredProperties.map((property) => (
          <Card
            key={property._id}
            title={property.title}
            category={property.category}
            price={property.price}
            location={property.location}
            image={property.images?.[0] || villaImg} // Use the first image or fallback to demo image
            propertyId={property._id}
          />
        ))}
        {!filteredProperties.length && <p>No properties match your search.</p>}
      </div>
    </div>
  );
}

function Card({ title, category, price, location, image, propertyId }) {
  return (
    <Link to={`/property_details/${propertyId}`} className={styles.link}>
      <div className={styles.gridItem}>
        <img
          src={image}
          alt={title || "Property"}
          className={styles.propertyImage}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = villaImg;
          }}
        />
        <div className={styles.content}>
          <div className={styles.gridItemTitle}>{title}</div>
          {/* <div className={styles.gridItemDescription}>{description}</div> */}
          <div className={styles.gridItemAddress}>Location: {location}</div>
          <div className={styles.gridItemCategory}>Category: {category}</div>
          <div className={styles.gridItemPrice}>Price: ₹{price}</div>
        </div>
      </div>
    </Link>
  );
}

export default PropGrid;