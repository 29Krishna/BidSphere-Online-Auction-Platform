import { Link } from "react-router-dom";

function LandingPage() {
  // Check if user is authenticated (JWT token stored in localStorage)
  const isSignedIn = localStorage.getItem("token") !== null;

  return (
    <div className="bg-light">
      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="container-fluid py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose BidSphere?</h2>
          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-search-heart fs-1 text-primary"></i>
                  <h5 className="card-title mt-3">Discover Unique Items</h5>
                  <p className="card-text text-secondary">
                    Explore a wide range of unique and rare items from around the world.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-gem fs-1 text-primary"></i>
                  <h5 className="card-title mt-3">Win Amazing Deals</h5>
                  <p className="card-text text-secondary">
                    Place your bids and win items at unbeatable prices.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-shield-check fs-1 text-primary"></i>
                  <h5 className="card-title mt-3">Secure & Reliable</h5>
                  <p className="card-text text-secondary">
                    Enjoy a secure and reliable bidding experience with our trusted platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-primary rounded-circle p-3 fs-4 mb-3">1</span>
                  <h5 className="card-title">Sign Up</h5>
                  <p className="card-text text-secondary">
                    Create an account to start bidding on exciting auctions.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-primary rounded-circle p-3 fs-4 mb-3">2</span>
                  <h5 className="card-title">Place Your Bid</h5>
                  <p className="card-text text-secondary">
                    Browse active auctions and place your bids on items you love.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4 text-center">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-primary rounded-circle p-3 fs-4 mb-3">3</span>
                  <h5 className="card-title">Win & Enjoy</h5>
                  <p className="card-text text-secondary">
                    If you win, complete the payment and enjoy your new item!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container-fluid py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
          <div className="row g-4">
            {/* Testimonial 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="card-text text-secondary">
                    "BidSphere is amazing! I won a vintage watch at an incredible price. Highly
                    recommended!"
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">Happy Bidder</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="card-text text-secondary">
                    "I love how easy it is to post auctions and manage them. Great platform!"
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0">Jane Smith</h6>
                      <small className="text-muted">Auction Seller</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="card-text text-secondary">
                    "The bidding process is so much fun, and I’ve found some real treasures here."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User"
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0">Alice Johnson</h6>
                      <small className="text-muted">Frequent Bidder</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;