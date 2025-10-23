import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function RecipientDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not recipient
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "recipient") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">
          Welcome, Food Recipient! 🥗
        </h2>
        <p className="text-center mb-5 lead">
          Browse available donations and request food assistance near you.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">🍞 Browse Donations</h5>
                <p className="card-text">
                  View available food items donated by local partners and individuals.
                </p>
                <button className="btn btn-primary w-100" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">📩 My Requests</h5>
                <p className="card-text">
                  Track your active food requests and their approval status.
                </p>
                <button className="btn btn-outline-primary w-100" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">🏡 Profile</h5>
                <p className="card-text">
                  Update your profile and delivery address for easier coordination.
                </p>
                <button className="btn btn-outline-primary w-100" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default RecipientDashboard;
