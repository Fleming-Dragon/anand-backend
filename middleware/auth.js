const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

// Basic authentication middleware (for admin routes if needed)
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("❌ Auth: No token provided");
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    console.log("🔑 Auth: Token received:", token.substring(0, 20) + "...");
    console.log(
      "🔧 Auth: Using JWT_SECRET:",
      config.JWT_SECRET ? "✅ Present" : "❌ Missing"
    );

    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("✅ Auth: Token decoded successfully, user ID:", decoded.id);

    // Get user details from database
    const user = await User.findById(decoded.id).select("-password");
    console.log(
      "👤 Auth: User lookup result:",
      user ? `Found: ${user.email}` : "Not found"
    );

    if (!user || !user.isActive) {
      console.log("❌ Auth: User not found or inactive");
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found.",
      });
    }

    console.log(
      "✅ Auth: User authenticated successfully:",
      user.email,
      "Role:",
      user.role
    );
    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Auth: Token verification failed:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Admin role middleware
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// Optional authentication (for routes that work with or without auth)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticate,
  requireAdmin,
  optionalAuth,
};
