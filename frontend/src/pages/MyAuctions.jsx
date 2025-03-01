import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auctions created by the logged-in user
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your auctions.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auctions/my-auctions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuctions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch auctions.");
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Auctions</h1>
      <div className="row">
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">Current Bid: ${auction.currentBid}</p>
                  <p className="card-text">End Date: {new Date(auction.endDate).toLocaleDateString()}</p>
                  <Link to={`/auction-details/${auction._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No auctions found.</p>
        )}
      </div>
    </div>
  );
}

export default MyAuctions;