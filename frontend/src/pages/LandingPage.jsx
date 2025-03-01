import { Link } from "react-router-dom";

function LandingPage() {
  // Check if user is authenticated (JWT token stored in localStorage)
  const isSignedIn = localStorage.getItem("token") !== null;

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Text Content */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 fw-bold text-primary">Welcome to BidSphere</h1>
            <p className="lead text-secondary">
              Discover unique items and place your bids in our exciting online auction platform.
            </p>
            {isSignedIn ? (
              <div className="d-grid gap-3 d-md-flex">
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  View Your Dashboard
                </Link>
                <Link to="/post-auction" className="btn btn-outline-primary btn-lg">
                  Post Auction
                </Link>
              </div>
            ) : (
              <Link to="/sign-up" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            )}
          </div>

          {/* Right Side - Image */}
          <div className="col-lg-6 text-center">
            <img
              src="landingPage.png"
              alt="Online Auction"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
