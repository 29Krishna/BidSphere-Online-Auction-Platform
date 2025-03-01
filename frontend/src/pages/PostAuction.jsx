import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostAuction() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    startingPrice: "",
    endDate: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to post an auction.");
        navigate("/sign-in");
        return;
      }

      // Send the auction data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/auctions/post",
        {
          title: formData.itemName,
          description: formData.description,
          startingBid: parseFloat(formData.startingPrice),
          endDate: formData.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Auction posted successfully!");
      navigate("/my-auctions"); // Redirect to the "My Auctions" page
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post auction.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Post a New Auction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="startingPrice" className="form-label">
            Starting Price
          </label>
          <input
            type="number"
            className="form-control"
            id="startingPrice"
            value={formData.startingPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post Auction
        </button>
      </form>
    </div>
  );
}

export default PostAuction;