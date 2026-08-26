import React, { useEffect, useState } from "react";
import styles from "./profileContent.module.css";
import profileImage from "../../landingPage/images/profile_black.png";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const ProfileContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setEditMode(true); // Open the edit modal
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/api/user/profile`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user); // Update the user details in the frontend
      setEditMode(false); // Close the edit modal
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Could not load profile. User not found.</p>;

  return (
    <div>
      <button className={styles.editButton} onClick={handleEditClick}>
        <i className="ti ti-pencil" aria-hidden="true" /> {" "}
        Edit Profile
      </button>

      <div className={styles.contentMain}>
        <div className={styles.profileContentContainer}>
          <img src={profileImage} alt="profile" />
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <button
            onClick={() => {
              const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirmLogout) {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
            }}
            className={styles.editButton}
          >
            <i className="ti ti-logout" aria-hidden="true" /> {" "}
            Logout
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className={styles.editModal}>
          <div className={styles.modalContent}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleEditSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
              <label>Role:</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                required
              >
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className={styles.saveButton}>
                Apply
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;