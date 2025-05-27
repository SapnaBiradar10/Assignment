const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS with expanded options
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON requests
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Register route
app.post('/register', (req, res) => {
  console.log('Register request received:', req.body);
  
  const { uname, email, password } = req.body;
  console.log('Register attempt:', { uname, email });
  
  // Simple validation
  if (!uname || !email || !password) {
    console.log('Validation failed:', { uname, email, passwordProvided: !!password });
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Success response
  console.log('Registration successful');
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;
  console.log('Login attempt:', { email });
  
  // Simple validation
  if (!email || !password) {
    console.log('Login validation failed:', { email, passwordProvided: !!password });
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Success response
  console.log('Login successful');
  res.json({ token: 'test-token-123', userId: '123' });
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log('To access from another PC, use your computer\'s IP address');
});