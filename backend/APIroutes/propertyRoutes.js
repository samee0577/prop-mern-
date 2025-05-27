import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";
import bcrypt from "bcryptjs";
import Property from "../database/models/property.js";
import User from "../database/models/user.js"; // Import the User model

const router = express.Router();

//APIS
// get all properties
// get property by id
// create property POST
// update property PUT
// delete property DELETE

// get all properties
router.get("/all_properties", authMiddleware, async (req, res) => {
  try {
    const { title, category } = req.query;
    let filter = {};

    // Filter based on title
    if (title) {
      filter.title = new RegExp(title, "i");
    }

    // Filter based on category
    if (category) {
      filter.category = category;
    }

    // Fetch properties
    const properties = await Property.find(filter).populate("ownerId", "_id name email"); // Populate owner details if needed

    // Include the logged-in user's ID in the response
    res.json({ properties, userId: req.user.userId });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create property
router.post("/new_property", authMiddleware, async (req, res) => {
  try {
    const { ...property } = req.body;
    const userId = req.user.userId; // Extract user ID from the token

    // Add the ownerId to the property object
    property.ownerId = userId;

    // Create the new property
    const new_property = new Property(property);
    await new_property.save();

    // Check if the user is already an owner
    const user = await User.findById(userId);
    if (user.role !== "owner") {
      // Update the user's role to "owner"
      user.role = "owner";
      await user.save();
    }

    res.json({ new_property });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Internal server error in creating new property" });
  }
});

// Update Property
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.userId;

    // Find the property
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Check if the user is the owner
    if (property.ownerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this property" });
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(id, updates, { new: true });

    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Internal server error while updating property" });
  }
});

// Delete Property
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find the property
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Check if the user is the owner
    if (property.ownerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this property" });
    }

    // Delete the property
    await Property.findByIdAndDelete(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal server error while deleting property" });
  }
});

// Get property by ID for the product detail page
router.get("/propertybyid/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ property });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in fetching property" });
  }
});

export default router;