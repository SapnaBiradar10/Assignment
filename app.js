const express = require('express');
const cors = require('cors');
const app = express();

// Connect to MongoDB
require('./config');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./Route/userRoute');
const authRoutes = require('./Route/authRoutes');
const productRoutes = require('./Route/productRoute');
const wishlistRoutes = require('./Route/wishlistRoute');

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', wishlistRoutes);

// Simple health check route
app.get('/health', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
