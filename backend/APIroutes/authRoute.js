import express from "express"
import jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../database/models/user.js"
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

//APIs
// signup post
// login post

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // Hashing pass
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    res.json({ message: "new user signed in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    // Password checking after hash
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "wrong password" });
    }

    // JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: "user logged in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});


export default router