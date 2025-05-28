const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
require('./config'); // Assumes mongoose.connect() is inside config.js

// Middleware
app.use(cors({
  origin: 'https://benevolent-choux-edb785.netlify.app', // Must match your frontend domain
  credentials: true
}));

app.use(express.json());

// Routes
const userRoutes = require('./Route/userRoute');
const authRoutes = require('./Route/authRoutes');
const productRoutes = require('./Route/productRoute');
const wishlistRoutes = require('./Route/wishlistRoute');

// Use modular routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.send('✅ Server is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
