import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import categories from "../data/categories.json";

function AddFood() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const donorId = storedUser?.uid || storedUser?._id;

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
    expiryDate: "",
    quantity: "",
    street: "",
    city: "",
    postalCode: "",
    province: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Postal code validation (Canada format)
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!postalCodePattern.test(form.postalCode)) {
      toast.error("Please enter a valid Canadian postal code (e.g., N2R 0B7).");
      return;
    }

    if (!form.category) return toast.error("Please select a category.");
    if (!form.image) return toast.error("Please upload an image.");

    // Combine structured address
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
        toast.success(data.aiMessage || " Food added successfully!");
        setTimeout(() => navigate("/donor-dashboard"), 1200);
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (err) {
      toast.error("❌ Error adding food: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">Add Food Donation</h2>

        <form onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="mb-3">
            <label className="form-label">Food Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter food name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} – {cat.description}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe the food donation"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          {/* Upload Image */}
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.startsWith("image/")) {
                  toast.error(
                    "Only image files are allowed (JPG, PNG, JPEG, etc.)"
                  );
                  e.target.value = "";
                  return;
                }
                setForm({ ...form, image: file });
              }}
              required
            />
          </div>

          {/* Expiry Date */}
          <input
            type="date"
            className="form-control"
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            value={form.expiryDate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (selectedDate < today) {
                toast.error("Expiry date cannot be in the past.");
                return;
              }
              setForm({ ...form, expiryDate: e.target.value });
            }}
            required
          />

          {/* Quantity */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity"
              min="1"
              value={form.quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 1) {
                  toast.error("Quantity must be at least 1.");
                  return;
                }
                setForm({ ...form, quantity: val });
              }}
              required
            />
          </div>

          {/* Address Fields */}
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
                placeholder="e.g. N2R 0B7"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Food Donation"}
          </button>
        </form>
      </section>
      <ToastContainer position="top-right" autoClose={4000} />
      <Footer />
    </>
  );
}

export default AddFood;
