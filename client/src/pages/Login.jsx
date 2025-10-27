import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
=======
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
>>>>>>> Stashed changes

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
<<<<<<< Updated upstream

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${form.email}`);
    // Later: connect to backend login API
=======
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
>>>>>>> Stashed changes
  };

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card">
          <h3 className="auth-title">Login to ShareBite</h3>

<<<<<<< Updated upstream
          <form onSubmit={handleSubmit}>
=======
          <form onSubmit={handleSubmit} noValidate>
>>>>>>> Stashed changes
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
<<<<<<< Updated upstream
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
=======
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
>>>>>>> Stashed changes
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control auth-input"
                placeholder="Enter your password"
<<<<<<< Updated upstream
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn auth-btn">
=======
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <button type="submit" className="btn auth-btn w-100">
>>>>>>> Stashed changes
              Login
            </button>
          </form>

          <div className="auth-footer">
            <p>
<<<<<<< Updated upstream
              New user?{" "}
              <a href="#" onClick={() => navigate("/register")}>
                Create an account
=======
              Don’t have an account?{" "}
              <a href="#" onClick={() => navigate("/register")}>
                Register here
              </a>
            </p>
            <p>
              Forgot password?{" "}
              <a href="#" onClick={() => alert("Password reset coming soon!")}>
                Reset now
>>>>>>> Stashed changes
              </a>
            </p>
          </div>
        </div>
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
      </section>
      <Footer />
    </>
  );
}

export default Login;
