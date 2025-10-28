import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function RecipientDashboard() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <h2 className="text-center text-primary mb-4">🥗 Available Donations</h2>

        {loading && <p className="text-center">Loading donations...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && foods.length === 0 && (
          <p className="text-center text-muted">
            No donations available right now.
          </p>
        )}

        <div className="row g-4">
          {foods.map((food) => {
            const expiry = new Date(food.expiryDate);
            const isExpired = expiry < today;
            if (isExpired) return null; // skip expired items

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
                    <p className="card-text text-muted small">
                      {food.description}
                    </p>
                    <p className="card-text small">
                      <strong>Category:</strong> {food.category} <br />
                      <strong>Quantity:</strong> {food.quantity} <br />
                      <strong>Pickup:</strong> {food.pickupAddress} <br />
                      <strong>Expires:</strong>{" "}
                      {expiry.toLocaleDateString()}
                    </p>
                    <span className="badge bg-success">Available</span>
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
