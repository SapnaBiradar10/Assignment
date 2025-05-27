import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  // ✅ Just get the token directly (no JSON.parse!)
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/auth" />;
}

export default ProtectedRoute;
