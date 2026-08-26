import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import villaImg from "../landingPage/images/villa.webp";
import styles from "./propertyDetails.module.css";
import { API_BASE_URL } from "../../config/api";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/property/propertybyid/${id}`);
        if (active) setProperty(response.data.property);
      } catch (requestError) {
        console.error("Error fetching property:", requestError.response?.data || requestError.message);
        if (active) setError("This property could not be found.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProperty();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <main className={styles.state}>Loading property...</main>;
  if (error) {
    return (
      <main className={styles.state}>
        <p>{error}</p>
        <Link to="/listings">Back to listings</Link>
      </main>
    );
  }

  const image = property.images?.[0] || villaImg;

  return (
    <main className={styles.page}>
      <Link to="/listings" className={styles.backLink}>Back to listings</Link>
      <article className={styles.details}>
        <img
          src={image}
          alt={property.title || "Property"}
          className={styles.image}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = villaImg;
          }}
        />
        <div className={styles.content}>
          <p className={styles.category}>{property.category}</p>
          <h1>{property.title}</h1>
          <p className={styles.price}>₹{property.price}</p>
          <p className={styles.location}>{property.location}</p>
          <p className={styles.description}>{property.description}</p>
          <p className={styles.status}>{property.status}</p>
        </div>
      </article>
    </main>
  );
}

export default PropertyDetails;