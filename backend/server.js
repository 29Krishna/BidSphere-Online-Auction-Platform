import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/dbconnect.js";
import authRoutes from "./routes/authRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
