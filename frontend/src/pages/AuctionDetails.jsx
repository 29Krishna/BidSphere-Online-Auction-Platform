function AuctionDetails() {
    return (
      <div className="container mt-5">
        <h1 className="mb-4">Auction Details</h1>
        <div className="row">
          <div className="col-md-6">
            <img src="/placeholder.svg?height=400&width=600" alt="Item" className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h2>Vintage Watch</h2>
            <p className="lead">Current Bid: $500</p>
            <p>Time Left: 2 days, 3 hours</p>
            <p>Description: A beautiful vintage watch from the 1950s. In excellent condition.</p>
            <form>
              <div className="mb-3">
                <label htmlFor="bidAmount" className="form-label">
                  Your Bid
                </label>
                <input type="number" className="form-control" id="bidAmount" required />
              </div>
              <button type="submit" className="btn btn-primary">
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  export default AuctionDetails
  
  