import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignInPage({ onSignIn }) {  // Accept onSignIn as a prop
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", data.token);
      onSignIn();  // Update isSignedIn state in App.jsx
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{ background: "linear-gradient(45deg, #4a90e2, #50e3c2)" }}>
      <div className="bg-white p-5 rounded shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-3">Welcome Back</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-decoration-none text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
