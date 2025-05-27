const jwt = require('jsonwebtoken');
const Auth = require('../modles/AuthModel');
const SECRET_KEY = "authentication";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required. No token provided." });
    }
    
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Find user
    const user = await Auth.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Add user to request object
    req.user = {
      id: user._id,
      email: user.email,
      name: user.uname
    };
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authMiddleware;