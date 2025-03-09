import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostAuction from "./pages/PostAuction";
import AuctionDetails from "./pages/AuctionDetails";
import MyAuctions from "./pages/MyAuctions";
import BidsPlaced from "./pages/BidsPlaced";
import AuctionsWon from "./pages/AuctionsWon";
import PlaceBids from "./pages/PlaceBids";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if the user is signed in on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  // Handle sign-in
  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header isSignedIn={isSignedIn} onSignOut={handleSignOut} />
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<LandingPage isSignedIn={isSignedIn} onSignOut={handleSignOut} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/sign-in"
              element={<SignIn onSignIn={handleSignIn} />}
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/post-auction" element={<PostAuction />} />
            <Route path="/auction-details" element={<AuctionDetails />} />
            <Route path="/my-auctions" element={<MyAuctions />} />
            <Route path="/bids-placed" element={<BidsPlaced />} />
            <Route path="/auctions-won" element={<AuctionsWon />} />
            <Route path="/place-bids" element={<PlaceBids />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;