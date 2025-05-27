const express = require('express');
const cors = require('cors');
const app = express();

// Route imports
const userR = require('./Route/userRoute');
const authRoutes = require('./Route/authRoutes');
const productR = require('./Route/productRoute');
const WishlistR = require('./Route/wishlistRoute');

// Connect to MongoDB
require("./config");

// Middleware
app.use(cors({
  origin: '*',  // Allow all origins (adjust in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Use Routes
app.use("/", userR);
app.use("/", authRoutes);
app.use("/", productR);
app.use("/", WishlistR);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '43.243.81.251', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
