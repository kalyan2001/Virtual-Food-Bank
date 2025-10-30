import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [form, setForm] = useState({ name: "", quantity: "", expiryDate: "", description: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "donor") {
      navigate("/login");
      return;
    }

    const donorId = storedUser.uid || storedUser._id || storedUser.id;

    const fetchFoods = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/food/donor/${donorId}`);
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [navigate]);

  // 🗑️ Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/food/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFoods(foods.filter((f) => f._id !== id));
        alert("Item deleted successfully!");
      } else {
        alert("Error deleting item");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ✏️ Open Edit Modal
  const handleEditClick = (food) => {
    setSelectedFood(food);
    setForm({
      name: food.name,
      quantity: food.quantity,
      expiryDate: food.expiryDate.split("T")[0],
      description: food.description,
    });
  };

  // ✏️ Save Edit
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/food/${selectedFood._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updated = await res.json();
        setFoods(
          foods.map((f) => (f._id === selectedFood._id ? updated.food : f))
        );
        alert("Food updated successfully!");
        setSelectedFood(null);
      } else {
        alert("Failed to update food.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="container py-5">
        {/* <h2 className="text-center text-primary mb-4">📦 My Food Donations</h2> */}
        <h2 className="text-center mb-4" style={{ fontWeight: 700, color: "#0d6efd" }}>
  📦 My Food Donations
</h2>
<p className="text-center text-muted mb-5">
  Manage your shared meals — edit, update, or remove donations anytime.
</p>


        {loading && <p className="text-center">Loading your donations...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && foods.length === 0 && (
          <p className="text-center text-muted">
            You haven’t added any donations yet.
          </p>
        )}

        <div className="row g-4">
          {foods.map((food) => (
            <div className="col-md-4" key={food._id}>
              <div className="card shadow-sm border-0 h-100">
                <img
                  src={food.imageURL}
                  alt={food.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{food.name}</h5>
                  <p className="card-text text-muted">{food.description}</p>
                  <p className="card-text small mb-1">
                    <strong>Category:</strong> {food.category}
                    <br />
                    <strong>Quantity:</strong> {food.quantity}
                    <br />
                    <strong>Expires:</strong>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                    <br />
                  </p>

                  {/* 🎨 Status Badge with Expiry Check */}
{(() => {
  const today = new Date();
  const expiry = new Date(food.expiryDate);
  const isExpired = expiry < today;

  return (
    <span
      className={`badge ${
        isExpired
          ? "bg-danger"
          : food.status === "available"
          ? "bg-success"
          : "bg-secondary"
      }`}
    >
      {isExpired ? "Expired" : "Available"}
    </span>
  );
})()}



                </div>

                <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEditClick(food)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(food._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🧱 Edit Modal */}
      {selectedFood && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Food</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedFood(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({ ...form, expiryDate: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedFood(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default DonorDashboard;
