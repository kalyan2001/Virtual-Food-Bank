import React from "react";
<<<<<<< Updated upstream

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Food Donation App</h1>
      <p>Welcome to the Food Donation PWA APP</p>
    </div>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AddFood from "./pages/AddFood";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
        <Route path="/add-food" element={<AddFood />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
