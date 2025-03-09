import { Link } from "react-router-dom";

function Header({ isSignedIn, onSignOut }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span
            className="fw-bold"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(45deg, #4a90e2, #50e3c2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BidSphere
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/place-bids" className="nav-link">
                    Place Bids
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/post-auction" className="nav-link">
                    Post Auction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-auctions" className="nav-link">
                    My Auctions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bids-placed" className="nav-link">
                    Bids Placed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auctions-won" className="nav-link">
                    Auctions Won
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={onSignOut} className="btn btn-outline-primary">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/sign-in" className="btn btn-outline-primary me-2">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/sign-up" className="btn btn-primary">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;