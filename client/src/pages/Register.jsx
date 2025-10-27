import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "donor",
  });
<<<<<<< Updated upstream
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create user in Firebase Authentication
=======
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // 🔍 Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!/^[A-Za-z ]{3,}$/.test(form.name.trim()))
      newErrors.name = "Name must be at least 3 letters long.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address.";

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        form.password
      )
    )
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, number, and special character.";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // 1️⃣ Create user in Firebase
>>>>>>> Stashed changes
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

<<<<<<< Updated upstream
      // 2️⃣ Save extra details to MongoDB via backend
=======
      // 2️⃣ Save details to backend (MongoDB)
>>>>>>> Stashed changes
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        }),
      });

      if (res.ok) {
<<<<<<< Updated upstream
        // ✅ Show success toast
        setToastMessage("Registration successful! Redirecting to login...");
        setShowToast(true);

        // ✅ Reset form fields
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "donor",
        });

        // ✅ Redirect to Login after 2 seconds
=======
        setToastMessage("🎉 Registration successful! Redirecting to login...");
        setShowToast(true);
        setForm({ name: "", email: "", password: "", phone: "", role: "donor" });
>>>>>>> Stashed changes
        setTimeout(() => {
          setShowToast(false);
          navigate("/login");
        }, 2000);
      } else {
        const data = await res.json();
        setToastMessage("Error: " + data.message);
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("Error: " + err.message);
      setShowToast(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card">
          <h3 className="auth-title">Create Your ShareBite Account</h3>

<<<<<<< Updated upstream
          <form onSubmit={handleSubmit}>
=======
          <form onSubmit={handleSubmit} noValidate>
>>>>>>> Stashed changes
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control auth-input"
                placeholder="Enter your full name"
<<<<<<< Updated upstream
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
=======
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
>>>>>>> Stashed changes
            </div>

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
                placeholder="Create a password"
<<<<<<< Updated upstream
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
=======
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
>>>>>>> Stashed changes
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control auth-input"
                placeholder="Enter your phone number"
<<<<<<< Updated upstream
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
=======
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
>>>>>>> Stashed changes
            </div>

            <div className="mb-3">
              <label className="form-label">Select Role</label>
              <select
                className="form-select auth-input"
                value={form.role}
<<<<<<< Updated upstream
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
=======
                onChange={(e) => setForm({ ...form, role: e.target.value })}
>>>>>>> Stashed changes
              >
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn auth-btn w-100">
              Register
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => navigate("/login")}>
                Login here
              </a>
            </p>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* ===== Bootstrap Toast (Success/Error Message) ===== */}
=======
>>>>>>> Stashed changes
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

export default Register;
