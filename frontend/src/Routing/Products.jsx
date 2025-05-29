import React, { useState, useEffect } from "react";
import api from "../axios-config";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching products");
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        console.log("Couldn’t reach server – using fallback data.");
        setProducts([
          { id: 1, name: "iPhone 15", category: "Mobile", price: "$999", quantity: 10 },
          { id: 2, name: "Samsung Galaxy S23", category: "Mobile", price: "$899", quantity: 15 },
          { id: 3, name: "Dell XPS 13", category: "Laptop", price: "$1199", quantity: 8 },
          { id: 4, name: "Sony WH-1000XM5", category: "Headphones", price: "$399", quantity: 20 },
          { id: 5, name: "MacBook Air M2", category: "Laptop", price: "$1249", quantity: 6 },
          { id: 6, name: "Apple Watch Series 9", category: "Wearables", price: "$399", quantity: 25 },
          { id: 7, name: "iPad Pro 11″", category: "Tablet", price: "$799", quantity: 12 },
          { id: 8, name: "Canon EOS R7", category: "Camera", price: "$1499", quantity: 4 },
          { id: 9, name: "Logitech MX Master 3S", category: "Accessories", price: "$99", quantity: 40 },
          { id:10, name: "Nintendo Switch OLED", category: "Console", price: "$349", quantity: 18 },
          { id:11, name: "Bose SoundLink Flex", category: "Speaker", price: "$149", quantity: 22 },
          { id:12, name: "Kindle Paperwhite", category: "E-reader", price: "$139", quantity: 30 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const resetForm = () => setForm({ name: "", category: "", price: "", quantity: "" });

  const generateId = () =>
    products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity } = form;
    if (!name || !price || !quantity)
      return alert("Please fill Name, Price & Quantity");

    const payload = {
      ...form,
      price: String(price),
      quantity: Number(quantity),
    };

    try {
      if (editId === null) {
        const newItem = { id: generateId(), ...payload };
        try {
          const { data } = await api.post("/products", newItem);
          setProducts((prev) => [...prev, data]);
        } catch {
          setProducts((prev) => [...prev, newItem]);
        }
      } else {
        const updatedItem = { id: editId, ...payload };
        try {
          await api.put(`/products/${editId}`, updatedItem);
        } catch {}
        setProducts((prev) =>
          prev.map((p) => (p.id === editId ? updatedItem : p))
        );
        setEditId(null);
      }
      resetForm();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
    } catch {}
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editId === id) {
      setEditId(null);
      resetForm();
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "30px",
          fontSize: "2rem",
          textShadow: "1px 1px 2px #fff",
        }}
      >
        Inventory Management (CRUD)
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "30px", textAlign: "center" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Price *"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity *"
          value={form.quantity}
          onChange={handleChange}
          style={{ ...styles.input, width: "100px" }}
          required
          min="0"
        />
        <button type="submit" style={styles.button}>
          {editId === null ? "Add Product" : "Update Product"}
        </button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              resetForm();
            }}
            style={{ ...styles.button, backgroundColor: "#95a5a6", marginLeft: 8 }}
          >
            Cancel
          </button>
        )}
      </form>

      <div
        style={{
          overflowX: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#34495e", color: "#fff" }}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No products available.
                </td>
              </tr>
            )}
            {products.map((product, index) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ecf0f1",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d1f0ff")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "#ecf0f1")
                }
              >
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.category}</td>
                <td style={styles.td}>{product.price}</td>
                <td style={styles.td}>{product.quantity}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={styles.actionButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={styles.actionButtonDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  th: {
    padding: "14px",
    fontSize: "1rem",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    fontSize: "0.95rem",
    borderBottom: "1px solid #ddd",
  },
  input: {
    padding: "8px 10px",
    marginRight: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "9px 18px",
    fontSize: "1rem",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  actionButton: {
    marginRight: "8px",
    padding: "5px 10px",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  actionButtonDelete: {
    padding: "5px 10px",
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;
