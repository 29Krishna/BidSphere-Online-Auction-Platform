import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in"); // Redirect to sign-in if no token is found
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch user data");
        setLoading(false);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/sign-in"); // Redirect to sign-in on error
      });
  }, [navigate]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to your Dashboard, {user?.username}!</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Auctions</h5>
              <p className="card-text">You have 3 active auctions.</p>
              <a href="/my-auctions" className="btn btn-primary">
                View Auctions
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bids Placed</h5>
              <p className="card-text">You have placed 5 bids.</p>
              <a href="/bids-placed" className="btn btn-primary">
                View Bids
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Won Auctions</h5>
              <p className="card-text">You have won 2 auctions.</p>
              <a href="/auctions-won" className="btn btn-primary">
                View Won Items
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;