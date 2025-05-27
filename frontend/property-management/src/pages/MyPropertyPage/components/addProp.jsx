import React, { useState } from "react";
import axios from "axios";
import styles from "./addProp.module.css";

function AddProp() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "residential", // Default category
    price: "",
    location: "",
    images: "",
    status: "available", // Default status
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post(
        "http://localhost:3000/api/property/new_property",
        { ...formData, images: formData.images.split(",") }, // Convert images to an array
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Property added:", response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "residential",
        price: "",
        location: "",
        images: "",
        status: "available",
      });
    } catch (err) {
      console.error("Error adding property:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add property");
    }
  };

  return (
    <div className={styles.addPropContainer}>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Property Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="villa">Villa</option>
        </select>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Images (comma-separated URLs):</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        <button type="submit">Add Property</button>
      </form>

      {success && (
        <p className={`${styles.successMessage} visible`}>
          Property added successfully!
        </p>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default AddProp;