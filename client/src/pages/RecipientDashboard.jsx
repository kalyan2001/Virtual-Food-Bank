import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function RecipientDashboard() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  //const [freshOnly, setFreshOnly] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/food/available");
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const today = new Date();

  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">
          🥗 Available Donations
        </h2>

        {loading && <p className="text-center">Loading donations...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && foods.length === 0 && (
          <p className="text-center text-muted">
            No donations available right now.
          </p>
        )}

        {/* 🔍 Filter Controls */}
        <div className="card shadow-sm border-0 p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by city or postal code..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value.toLowerCase())}
              />
            </div>

            {/* <div className="col-md-4 d-flex align-items-center">
              <input
                type="checkbox"
                id="freshOnly"
                className="form-check-input me-2"
                checked={freshOnly}
                onChange={(e) => setFreshOnly(e.target.checked)}
              />
              <label htmlFor="freshOnly" className="form-check-label">
                Show only fresh (non-expired) items
              </label>
            </div> */}
          </div>
        </div>

        {/* 🧾 Food Cards */}
        <div className="row g-4">
          {foods
            .filter((food) => {
              const expiry = new Date(food.expiryDate);
              const isExpired = expiry < today;

              const matchesSearch =
                food.name.toLowerCase().includes(searchQuery) ||
                food.category.toLowerCase().includes(searchQuery);

              const matchesLocation = food.pickupAddress
                .toLowerCase()
                .includes(locationQuery);

              return (
                matchesSearch && matchesLocation && food.status === "available"
              );
            })
            .map((food) => {
              const expiry = new Date(food.expiryDate);
              const isExpired = expiry < today;

              return (
                <div className="col-md-4" key={food._id}>
                  <div className="card shadow-sm border-0 h-100">
                    <img
                      src={food.imageURL}
                      alt={food.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-primary">{food.name}</h5>
                      <p className="card-text text-muted small mb-2">
                        {food.description}
                      </p>
                      <p className="card-text small">
                        <strong>Category:</strong> {food.category} <br />
                        <strong>Quantity:</strong> {food.quantity} <br />
                        <strong>
                          Expires:
                        </strong> {expiry.toLocaleDateString()} <br />
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            isExpired ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {isExpired ? "Expired" : "Available"}
                        </span>
                      </p>

                      {/* 📍 Formatted Address */}
                      <p className="card-text mt-2">
                        <strong>Pickup Location:</strong> <br />
                        {/* <span className="text-muted">
                          📍 {food.pickupAddress}
                        </span> */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            food.pickupAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-muted"
                        >
                          📍 {food.pickupAddress}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default RecipientDashboard;
