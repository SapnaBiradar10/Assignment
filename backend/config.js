const mongoose = require('mongoose');

// Use environment variable if available, otherwise use the hardcoded URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sapnabiradar506:I1MSs08h0SQoezZM@inventary-management-db.iuwq4j3.mongodb.net/?retryWrites=true&w=majority&appName=Inventary-management-DB';

// Add connection options to handle deprecation warnings and improve reliability
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000,
  // Allow connections from any IP (for development only)
  // In production, you should whitelist specific IPs
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    // Don't crash the server if MongoDB connection fails
    console.log("Continuing without MongoDB connection");
  });

module.exports = mongoose;