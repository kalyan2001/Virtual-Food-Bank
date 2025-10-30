import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AddFood() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const donorId = storedUser?.uid || storedUser?._id;

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    street: "",
    city: "",
    postalCode: "",
    province: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image.");
      return;
    }

    // ✅ Combine full address
    const fullAddress = `${form.street}, ${form.city}, ${form.postalCode}, ${form.province}`;

    const formData = new FormData();
    formData.append("donorId", donorId);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("quantity", form.quantity);
    formData.append("expiryDate", form.expiryDate);
    formData.append("pickupAddress", fullAddress);
    formData.append("image", form.image);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/food/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Food added successfully!");
        navigate("/donor-dashboard");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert("❌ Error adding food: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">🍱 Add Food Donation</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Food Name</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
              required
            />
          </div>

          {/* 🏠 Structured Address Fields */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 220 Evens Pond Crescent"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Kitchener"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. N2E 4C1"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Province</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. ON"
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Food Donation"}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default AddFood;
