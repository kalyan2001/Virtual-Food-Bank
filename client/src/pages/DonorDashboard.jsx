import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // If user not logged in, redirect to login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "donor") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">
          Welcome, Food Donor! 🍱
        </h2>
        <p className="text-center mb-5 lead">
          Thank you for helping reduce food waste and feed those in need.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">➕ Add New Donation</h5>
                <p className="card-text">
                  Donate surplus food by filling in item details, expiry, and pickup location.
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
                <h5 className="card-title text-primary">📦 My Donations</h5>
                <p className="card-text">
                  Track your active and past food donations and their statuses.
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
                <h5 className="card-title text-primary">📊 Impact Stats</h5>
                <p className="card-text">
                  View your total donations, meals shared, and overall impact.
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

export default DonorDashboard;
