import { Link } from "react-router-dom"

const bidsPlaced = [
  { id: 1, auctionTitle: "Vintage Camera", bidAmount: 450, bidDate: "2023-06-15", status: "Winning" },
  { id: 2, auctionTitle: "Antique Clock", bidAmount: 200, bidDate: "2023-06-18", status: "Outbid" },
  { id: 3, auctionTitle: "Rare Stamp Collection", bidAmount: 800, bidDate: "2023-06-20", status: "Winning" },
]

function BidsPlaced() {
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
            {bidsPlaced.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.auctionTitle}</td>
                <td>${bid.bidAmount}</td>
                <td>{bid.bidDate}</td>
                <td>
                  <span className={`badge ${bid.status === "Winning" ? "bg-success" : "bg-danger"}`}>{bid.status}</span>
                </td>
                <td>
                  <Link to={`/auction-details/${bid.id}`} className="btn btn-sm btn-primary">
                    View Auction
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BidsPlaced

