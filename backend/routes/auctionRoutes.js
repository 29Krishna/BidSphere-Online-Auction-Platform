import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import Auction from "../models/Auction.js";
import Bid from "../models/Bids.js";

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

//Route for fetching all the active autions
router.get("/active-auctions", authenticateToken, async (req, res) => {
  try {
      const currentDate = new Date();
      const activeAuctions = await Auction.find({ 
          endDate: { $gt: currentDate }, 
          createdBy: { $ne: req.user.id } // Exclude logged-in user's auctions
      }).sort({ endDate: 1 }); // Sort by soonest ending first

      res.json(activeAuctions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
  }
});


// Place a bid on an auction
router.post("/place-bid/:auctionId", authenticateToken, async (req, res) => {
  const { auctionId } = req.params;
  const { bidAmount } = req.body;
  const userId = req.user.id; // Get the user ID from the JWT token

  try {
    // Check if the auction exists
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Check if the bid amount is greater than the current bid
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ message: "Bid amount must be greater than the current bid" });
    }

    // Update the auction's current bid
    auction.currentBid = bidAmount;
    await auction.save();

    // Create a new bid
    const newBid = new Bid({
      userId,
      auctionId,
      bidAmount,
    });
    await newBid.save();

    res.status(201).json({ message: "Bid placed successfully", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch bids placed by the logged-in user
router.get("/bids-placed", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT token

  try {
    const bids = await Bid.find({ userId }).populate("auctionId", "title endDate"); // Populate auction details
    res.json(bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to fetch the count of active auctions created by the logged-in user
router.get("/my-auctions/count", authenticateToken, async (req, res) => {
  try {
    const count = await Auction.countDocuments({
      createdBy: req.user.id, // Filter by the logged-in user
      endDate: { $gt: new Date() }, // Filter by active auctions (endDate > current date)
    });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching active auctions count:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch the count of bids placed by the logged-in user
router.get("/bids-placed/count", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT token

  try {
    const count = await Bid.countDocuments({ userId }); // Count bids placed by the user
    res.json({ count });
  } catch (error) {
    console.error("Error fetching bids placed count:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;