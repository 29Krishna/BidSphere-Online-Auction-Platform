import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
    bidAmount: { type: Number, required: true },
    bidDate: { type: Date, default: Date.now }
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid; // Use export default
