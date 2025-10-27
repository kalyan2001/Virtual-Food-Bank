<<<<<<< Updated upstream
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Handle PWA install prompt
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  let deferredPrompt;

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // Handle PWA install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
  }, []);
>>>>>>> Stashed changes

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") alert("✅ App installed successfully!");
      deferredPrompt = null;
    } else {
      alert("App already installed or not supported in this browser");
    }
  };

<<<<<<< Updated upstream
=======
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

>>>>>>> Stashed changes
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a
          className="navbar-brand fw-bold text-primary"
          href="#"
          onClick={() => navigate("/")}
        >
          🍎 ShareBite
        </a>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
<<<<<<< Updated upstream
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
=======
>>>>>>> Stashed changes
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
<<<<<<< Updated upstream
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn btn-outline-primary mx-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-primary mx-2"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary mx-2" onClick={handleInstall}>
                📲 Download App
              </button>
            </li>
=======
          <ul className="navbar-nav align-items-center">
            {!user ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={handleInstall}
                  >
                    📲 Download App
                  </button>
                </li>
              </>
            ) : (
              <>


              
                {user.role === "donor" && (
  <li className="nav-item">
    <button
      className="btn btn-outline-success mx-2"
      onClick={() => navigate("/donor-dashboard")}
    >
      🏠 Donor Dashboard
    </button>
  </li>
)}

{user.role === "recipient" && (
  <li className="nav-item">
    <button
      className="btn btn-outline-success mx-2"
      onClick={() => navigate("/recipient-dashboard")}
    >
      🥗 Recipient Dashboard
    </button>
  </li>
)}

{user.role === "admin" && (
  <li className="nav-item">
    <button
      className="btn btn-outline-success mx-2"
      onClick={() => navigate("/admin-dashboard")}
    >
      ⚙️ Admin Dashboard
    </button>
  </li>
)}


                <li className="nav-item d-flex align-items-center mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <span className="fw-semibold text-primary">
                    {user.name || "User"}
                  </span>
                </li>

                {user.role === "donor" && (
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={() => navigate("/add-food")}
                    >
                    ➕ Add Food
                    </button>
                  </li>
                )}


                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
>>>>>>> Stashed changes
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
