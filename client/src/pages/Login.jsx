import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${form.email}`);
    // Later: connect to backend login API
  };

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card">
          <h3 className="auth-title">Login to ShareBite</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control auth-input"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn auth-btn">
              Login
            </button>
          </form>

          <div className="auth-footer">
            <p>
              New user?{" "}
              <a href="#" onClick={() => navigate("/register")}>
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
