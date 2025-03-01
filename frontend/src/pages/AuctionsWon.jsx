import { Link } from "react-router-dom"

const auctionsWon = [
  { id: 1, title: "Vintage Guitar", finalPrice: 1200, winDate: "2023-06-10", status: "Paid" },
  { id: 2, title: "Rare Coin", finalPrice: 500, winDate: "2023-06-12", status: "Pending Payment" },
  { id: 3, title: "Antique Furniture", finalPrice: 800, winDate: "2023-06-14", status: "Shipped" },
]

function AuctionsWon() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Auctions Won</h1>
      <div className="row">
        {auctionsWon.map((auction) => (
          <div key={auction.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{auction.title}</h5>
                <p className="card-text">Final Price: ${auction.finalPrice}</p>
                <p className="card-text">Win Date: {auction.winDate}</p>
                <p className="card-text">
                  Status:
                  <span
                    className={`ms-2 badge ${auction.status === "Paid" ? "bg-success" : auction.status === "Shipped" ? "bg-primary" : "bg-warning"}`}
                  >
                    {auction.status}
                  </span>
                </p>
                <Link to={`/auction-details/${auction.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuctionsWon

