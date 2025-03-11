import express from "express";
import User from "../models/User.js";  // ✅ Use import instead of require
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, userId, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ firstName, lastName, email, phoneNumber, userId, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  console.log("Login request received:", req.body);  // 🛠️ Debugging log


  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    console.log("User role from DB:", user.role);
    console.log("Role in request:", role);

    // Verify the role
    if (user.role !== role) {
      return res.status(400).json({ message: `You are not a ${role}` });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("🔥 Error during login:", error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// module.exports = router;

export default router;
