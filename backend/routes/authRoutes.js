import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import authenticateToken from "../middleware/authMiddleware.js"; // Import the middleware

dotenv.config();

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
