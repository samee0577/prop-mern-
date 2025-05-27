import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Property_grid.module.css";
import villaImg from "./propimages/villa.jpg"; // Fallback demo image
import Category from "./Category"; // Import the Category component
import { Link } from "react-router-dom"; // Import Link for navigation

function PropGrid() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [categories, setCategories] = useState({
    all: [],
    villa: [],
    commercial: [],
    residential: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/property/all_properties", {
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

        setProperties(allProperties);
        setCategories(categorized);
        setFilteredProperties(allProperties); // Default to show all properties
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleCategoryChange = (category) => {
    setFilteredProperties(categories[category]);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query); // Update the search query state
    if (query.trim() === "") {
      setFilteredProperties(categories.all); // Reset to all properties if search is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/property/all_properties?title=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFilteredProperties(response.data.properties); // Update filtered properties based on search
    } catch (error) {
      console.error("Error fetching properties:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading properties...</p>;

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
            description={property.description}
            category={property.category}
            price={property.price}
            location={property.location}
            image={property.images?.[0] || villaImg} // Use the first image or fallback to demo image
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, description, category, price, location, image }) {
  return (
    <Link to={`/property_details/${title}`} className={styles.link}>
      <div className={styles.gridItem}>
        <img src={image} alt={title} className={styles.propertyImage} />
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