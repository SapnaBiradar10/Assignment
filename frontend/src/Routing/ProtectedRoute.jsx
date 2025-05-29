import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import api from '../axios-config';

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    
    // Special handling for demo token
    if (token === "demo-token-for-testing") {
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }
    
    // Verify token validity with backend
    const verifyToken = async () => {
      try {
        console.log("Verifying token");
        await api.get("/auth/verify-token");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token verification failed:", error);
        // If it's a network error, still allow access with the token
        // This helps when backend is down but user has a token
        if (error.code === "ERR_NETWORK") {
          console.log("Network error, but allowing access with token");
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    verifyToken();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}

export default ProtectedRoute;
