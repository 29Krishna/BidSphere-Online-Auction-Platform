import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import authenticateToken from "../middleware/authMiddleware.js"; // Import the middleware

dotenv.config();

const router = express.Router();

//User signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received signup request:", { username, email, password }); // Log the request body

  try {
    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists with email:", email); // Log duplicate email
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log("User created successfully:", newUser); // Log successful user creation

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message }); // Include error message in response
  }
});



// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", { email, password }); // Log the request body

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email); // Log user not found
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Log the exact password being compared
    console.log("Plain text password:", password);
    console.log("Stored hashed password:", user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email); // Log password mismatch
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Login successful for user:", email); // Log successful login

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message }); // Include error message in response
  }
});


// Route to fetch authenticated user's data
router.get("/me", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  });

export default router;
