import { useState, useEffect } from "react";
import axios from "axios";

function PlaceBids() {
  const [auctions, setAuctions] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [error, setError] = useState(null);

  // Fetch active auctions
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auctions/active-auctions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuctions(response.data);
      } catch (error) {
        setError("Failed to fetch auctions.");
      }
    };

    fetchAuctions();
  }, []);

  // Handle bid input changes
  const handleInputChange = (auctionId, value) => {
    setBidAmounts({ ...bidAmounts, [auctionId]: value });
  };

  // Handle bid submission
  const handlePlaceBid = async (auctionId, currentBid) => {
    const bidAmount = parseFloat(bidAmounts[auctionId]);

    if (isNaN(bidAmount)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (bidAmount <= currentBid) {
      alert("Bid amount must be greater than the current bid.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place a bid.");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/auctions/place-bid/${auctionId}`,
        { bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Bid placed successfully!");
      window.location.reload(); // Refresh the page to reflect the new bid
    } catch (error) {
      alert("Failed to place bid. Try again.");
    }
  };

  if (error) return <div className="container mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Place Bids</h1>
      <div className="row">
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">Current Bid: ${auction.currentBid}</p>
                  <p className="card-text">Ends: {new Date(auction.endDate).toLocaleString()}</p>

                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter your bid"
                    value={bidAmounts[auction._id] || ""}
                    onChange={(e) => handleInputChange(auction._id, e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePlaceBid(auction._id, auction.currentBid)}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No active auctions available.</p>
        )}
      </div>
    </div>
  );
}

export default PlaceBids;