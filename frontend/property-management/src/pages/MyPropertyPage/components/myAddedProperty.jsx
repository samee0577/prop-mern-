import React, { useEffect, useState } from "react";
import axios from "axios";
import Style from "./myAddedProperty.module.css"; // Import the CSS module for styling

function MyAddedProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProperty, setEditProperty] = useState(null); // State to hold the property being edited
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/property/all_properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched properties:", response.data.properties);

        // Filter properties to only include those added by the logged-in user
        const myProperties = response.data.properties.filter(
          (property) => property.ownerId && property.ownerId._id === response.data.userId
        );

        console.log("My properties:", myProperties);
        setProperties(myProperties);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err.response?.data || err.message);
        setError("Failed to load properties");
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/property/delete/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted property from the state
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );

      alert("Property deleted successfully!");
    } catch (err) {
      console.error("Error deleting property:", err.response?.data || err.message);
      alert("Failed to delete property. Please try again.");
    }
  };

  const handleEdit = (property) => {
    setEditProperty(property); // Set the property to be edited
    setEditForm({
      title: property.title,
      description: property.description,
      category: property.category,
      price: property.price,
      location: property.location,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/property/update/${editProperty._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the property in the state
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === editProperty._id ? { ...property, ...editForm } : property
        )
      );

      alert("Property updated successfully!");
      setEditProperty(null); // Close the edit modal
    } catch (err) {
      console.error("Error updating property:", err.response?.data || err.message);
      alert("Failed to update property. Please try again.");
    }
  };

  if (loading) return <p>Loading your properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={Style.myAddedPropertyContainer}>
      <h2>My Properties</h2>
      <div className={Style.propertyGrid}>
        {properties.map((property) => (
          <div key={property._id} className={Style.gridItem}>
            <div className={Style.propertyImageContainer}>
              <img
                src={property.images?.[0] || "https://via.placeholder.com/300"}
                alt={property.title}
                className={Style.propertyImage}
              />
            </div>
            <div className={Style.content}>
              <div className={Style.gridItemTitle}>{property.title}</div>
              <div className={Style.gridItemCategory}>Category: {property.category}</div>
              <div className={Style.gridItemAddress}>Location: {property.location}</div>
              <div className={Style.gridItemPrice}>Price: ₹{property.price}</div>
              <button
                className={Style.editButton}
                onClick={() => handleEdit(property)}
              >
                Edit
              </button>
              <button
                className={Style.deleteButton}
                onClick={() => handleDelete(property._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editProperty && (
        <div className={Style.editModal}>
          <div className={Style.modalContent}>
            <h3>Edit Property</h3>
            <form onSubmit={handleEditSubmit}>
              <label>Title:</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
              <label>Description:</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                required
              ></textarea>
              <label>Category:</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="villa">Villa</option>
              </select>
              <label>Price:</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                required
              />
              <label>Location:</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                required
              />
              <button type="submit" className={Style.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={Style.cancelButton}
                onClick={() => setEditProperty(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAddedProperty;