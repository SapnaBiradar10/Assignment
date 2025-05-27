import React, { useState } from "react";
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

  const navigate = useNavigate();

  const registerUrl = "http://localhost:5000/register";
  const loginUrl = "http://localhost:5000/login";

  // Regex
  const nameRegex = /^[A-Za-z ]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;

  const inputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const lHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      alert("Please enter email and password ❗");
      return;
    }

    if (!emailRegex.test(login.email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    try {
      const res = await axios.post(loginUrl, login);
      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      navigate("/pro");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields ❗");
      return;
    }

    if (!nameRegex.test(name)) {
      alert("Name must contain only letters/spaces and be at least 2 characters long ❌");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters and include:\n- 1 uppercase\n- 1 lowercase\n- 1 number\n- 1 special character");
      return;
    }

    try {
      const res = await axios.post(registerUrl, { name, email, password });
      alert(res.data.message);
      setShowLogin(true);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully ✅");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      {/* Home button */}
      <div className="mb-3">
        <button className="btn btn-outline-info fw-bold" onClick={() => navigate("/")}>⬅ Home</button>
      </div>

      {/* Toggle buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${showLogin ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn ${!showLogin ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setShowLogin(false)}
        >
          Signup
        </button>
      </div>

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
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-success w-50 fw-bold">Login</button>
              </div>
              {localStorage.getItem("token") && (
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger w-50 fw-bold mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
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
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-primary w-50 fw-bold">Sign Up</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForm;