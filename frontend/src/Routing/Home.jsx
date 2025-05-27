import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductHome() {
  const navigate = useNavigate();

  const gotoProducts = () => {
    navigate('/pro');       
  };

  return (
    <div
      style={{
        background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)', 
        minHeight: '100vh',
        padding: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1
          style={{
            color: '#2c3e50',
            marginBottom: '1rem',
            fontSize: '2rem',
            textShadow: '1px 1px 2px #ccc',
          }}
        >
          Welcome to the Inventory Management System
        </h1>
        <p
          style={{
            color: '#555',
            fontSize: '1.2rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}
        >
          Add, edit, and keep track of all products in one convenient place.
        </p>
        <button
          onClick={gotoProducts}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          View Products
        </button>
      </div>
    </div>
  );
}

export default ProductHome;
