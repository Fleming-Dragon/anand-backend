const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authenticate } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Apply rate limiting
router.use(apiLimiter);

// All order routes require authentication
router.use(authenticate);

// @route   GET /api/orders/my-orders
// @desc    Get user's orders
// @access  Private
router.get("/my-orders", async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 orders

    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// @route   GET /api/orders/:orderId
// @desc    Get specific order details
// @access  Private
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).populate("items.product", "name images weight");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Get order details error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order details",
      error: error.message,
    });
  }
});

module.exports = router;
