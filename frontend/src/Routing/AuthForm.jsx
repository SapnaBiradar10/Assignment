import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthForm() {
  const [showLogin, setShowLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use environment variable for API URL if available
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const registerUrl = `${apiUrl}/register`;
  const loginUrl = `${apiUrl}/login`;

  const nameRegex = /^[A-Za-z ]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const inputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const lHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setError("");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setError("Please enter email and password ❗");
      return;
    }

    if (!emailRegex.test(login.email)) {
      setError("Please enter a valid email address ❌");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(loginUrl, login);
      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      setIsLoggedIn(true);
      setLogin({ email: "", password: "" });
      navigate("/pro"); // Redirect to /pro after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields ❗");
      return;
    }

    if (!nameRegex.test(name)) {
      setError("Name must contain only letters/spaces and be at least 2 characters long ❌");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address ❌");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and include:\n- 1 uppercase\n- 1 lowercase\n- 1 number\n- 1 special character");
      return;
    }

    try {
      setLoading(true);
      setError("");
      // Fixed: Changed 'name' to 'uname' to match backend model
      const res = await axios.post(registerUrl, { uname: name, email, password });
      alert(res.data.message);
      setShowLogin(true);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully ✅");
    setShowLogin(true);
    setLogin({ email: "", password: "" });
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    navigate("/");
  };

  return (
    <div className="container mt-5 position-relative">
      {/* Home button */}
      <div className="mb-3">
        <button
          className="btn btn-outline-info fw-bold"
          onClick={() => navigate("/")}
        >
          ⬅ Home
        </button>
      </div>

      {/* Logout button at top-right if logged in */}
      {isLoggedIn && (
        <button
          className="btn btn-danger fw-bold position-absolute top-0 end-0 m-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

      {/* Toggle buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${showLogin ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowLogin(true)}
          disabled={loading}
        >
          Login
        </button>
        <button
          className={`btn ${!showLogin ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setShowLogin(false)}
          disabled={loading}
        >
          Signup
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="alert alert-danger text-center mb-3">
          {error}
        </div>
      )}

      {/* Card */}
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px", borderRadius: "20px" }}>
        {showLogin ? (
          <>
            <h4 className="text-center mb-4 text-success fw-bold">🔐 Login</h4>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={lHandler}
                  className="form-control"
                  placeholder="Enter email"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={lHandler}
                  className="form-control"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-success w-50 fw-bold" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h4 className="text-center mb-4 text-primary fw-bold">📝 Signup</h4>
            <form onSubmit={signupHandler}>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={inputHandler}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={inputHandler}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={inputHandler}
                  className="form-control"
                  placeholder="Create a password"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={inputHandler}
                  className="form-control"
                  placeholder="Re-enter your password"
                  required
                  disabled={loading}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-primary w-50 fw-bold" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForm;