const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sapnabiradar506:I1MSs08h0SQoezZM@inventary-management-db.iuwq4j3.mongodb.net/?retryWrites=true&w=majority&appName=Inventary-management-DB';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    console.log("⚠️ Continuing without MongoDB connection");
  });

module.exports = mongoose;
