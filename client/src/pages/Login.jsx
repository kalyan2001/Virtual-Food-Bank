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

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format.";

    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setToastMessage("✅ Login successful! Redirecting...");
        setShowToast(true);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          setShowToast(false);
          if (data.user.role === "admin") navigate("/admin-dashboard");
          else if (data.user.role === "donor") navigate("/donor-dashboard");
          else navigate("/recipient-dashboard");
        }, 2000);
      } else {
        setToastMessage("❌ Invalid credentials or token");
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("❌ Error: " + err.message);
      setShowToast(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card">
          <h3 className="auth-title">Login to ShareBite</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control auth-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <button type="submit" className="btn auth-btn w-100">
              Login
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don’t have an account?{" "}
              <a href="#" onClick={() => navigate("/register")}>
                Register here
              </a>
            </p>
            <p>
              Forgot password?{" "}
              <a href="#" onClick={() => alert("Password reset coming soon!")}>
                Reset now
              </a>
            </p>
          </div>
        </div>

        {showToast && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1055 }}
          >
            <div
              className="toast align-items-center text-bg-primary show"
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body">{toastMessage}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setShowToast(false)}
                ></button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Login;

