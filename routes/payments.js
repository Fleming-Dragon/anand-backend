const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getOrderStatus,
  initiateRefund,
} = require("../controllers/paymentController");
const { authenticate } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Apply rate limiting
router.use(apiLimiter);

// All payment routes require authentication
router.use(authenticate);

// @route   POST /api/payments/create-order
// @desc    Create Razorpay order
// @access  Private
router.post("/create-order", createOrder);

// @route   POST /api/payments/verify
// @desc    Verify payment signature
// @access  Private
router.post("/verify", verifyPayment);

// @route   GET /api/payments/order/:orderId
// @desc    Get order status
// @access  Private
router.get("/order/:orderId", getOrderStatus);

// @route   POST /api/payments/refund
// @desc    Initiate refund
// @access  Private
router.post("/refund", initiateRefund);

module.exports = router;
