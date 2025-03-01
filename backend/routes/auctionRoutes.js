import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import Auction from "../models/Auction.js";

const router = express.Router();

// Route to post a new auction
router.post("/post", authenticateToken, async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;

    // Create a new auction
    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid, // Set currentBid to startingBid initially
      createdBy: req.user.id, // Attach the user ID from the JWT token
      endDate,
    });

    // Save the auction to the database
    await newAuction.save();

    res.status(201).json({ message: "Auction posted successfully!", auction: newAuction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Route to fetch auctions created by the logged-in user
router.get("/my-auctions", authenticateToken, async (req, res) => {
    try {
      const auctions = await Auction.find({ createdBy: req.user.id }).sort({ createdAt: -1 }); // Sort by newest first
      res.json(auctions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  });

export default router;