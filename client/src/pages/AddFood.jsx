import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddFood() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    pickupAddress: "",
    imageFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", success: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.imageFile) {
    setToast({ show: true, message: "Please upload an image.", success: false });
    return;
  }

  try {
    setIsSubmitting(true);

    // Use FormData to send image + other fields
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("donorId", user.uid);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("quantity", form.quantity);
    formData.append("expiryDate", form.expiryDate);
    formData.append("pickupAddress", form.pickupAddress);
    formData.append("image", form.imageFile);

    const res = await fetch("http://localhost:5000/api/food/add", {
      method: "POST",
      body: formData, // no headers needed; browser handles multipart
    });

    if (res.ok) {
      setToast({ show: true, message: "✅ Food added successfully!", success: true });
      setForm({
        name: "",
        description: "",
        category: "",
        quantity: "",
        expiryDate: "",
        pickupAddress: "",
        imageFile: null,
      });
    } else {
      const data = await res.json();
      setToast({ show: true, message: "❌ " + data.message, success: false });
    }
  } catch (err) {
    setToast({ show: true, message: "❌ Error: " + err.message, success: false });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      <Navbar />
      <section className="container py-5">
        <h2 className="text-center text-primary mb-4">🍱 Add Food Donation</h2>

        <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Food Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pickup Address</label>
            <textarea
              className="form-control"
              name="pickupAddress"
              value={form.pickupAddress}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Submit Donation"}
          </button>
        </form>

        {toast.show && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1055 }}
          >
            <div
              className={`toast align-items-center text-bg-${
                toast.success ? "primary" : "danger"
              } show`}
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setToast({ ...toast, show: false })}
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

export default AddFood;
