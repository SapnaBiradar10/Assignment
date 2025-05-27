const express = require('express');
const app = express();
const cors = require('cors');

// Configure CORS - Allow all origins for now
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON request body
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('Health check passed');
});

// Try to connect to MongoDB, but don't stop server if it fails
try {
  require('./config');
  console.log('MongoDB connection initialized');
} catch (err) {
  console.error('Could not connect to MongoDB:', err.message);
  console.log('Server will continue without database connection');
}

// Simple test routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Try to load routes, but don't crash if they fail
try {
  const userR = require('./Route/userRoute');
  const authRoutes = require('./Route/authRoutes');
  const productR = require('./Route/productRoute');
  const WishlistR = require('./Route/wishlistRoute');
  
  app.use("/", userR);
  app.use("/", authRoutes);
  app.use("/", productR);
  app.use("/", WishlistR);
  console.log('Routes loaded successfully');
} catch (err) {
  console.error('Error loading routes:', err.message);
  console.log('Server will continue with basic routes only');
}

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server - IMPORTANT: Use process.env.PORT for Render deployment
const PORT = process.env.PORT || 5000;

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});