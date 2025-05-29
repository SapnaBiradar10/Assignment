import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Assuming JWT stored here

  // Fetch wishlist items
  const fetchWishlist = async () => {
    try {
      const res = await fetch('http://localhost:5000/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (id) => {
    try {
      await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWishlist(wishlist.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (!token) {
    return <p>Please login to view your wishlist.</p>;
  }

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ul>
          {wishlist.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong> - {item.price} Rs.
              <button onClick={() => removeFromWishlist(item._id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
