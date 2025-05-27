const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sapnabiradar506:I1MSs08h0SQoezZM@inventary-management-db.iuwq4j3.mongodb.net/?retryWrites=true&w=majority&appName=Inventary-management-DB')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));
