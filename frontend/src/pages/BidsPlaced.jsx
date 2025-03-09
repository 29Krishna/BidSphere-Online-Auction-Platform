import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BidsPlaced() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auctions/bids-placed", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBids(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error.response?.status, error.response?.data);
        setError(error.response?.data?.message || "Failed to fetch bids.");
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bids Placed</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Auction</th>
              <th>Bid Amount</th>
              <th>Bid Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <tr key={bid._id}>
                  <td>{bid.auctionId.title}</td>
                  <td>${bid.bidAmount}</td>
                  <td>{new Date(bid.bidDate).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${bid.status === "Winning" ? "bg-success" : "bg-danger"}`}>
                      {bid.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/auction-details/${bid.auctionId._id}`} className="btn btn-sm btn-primary">
                      View Auction
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No bids placed yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BidsPlaced;