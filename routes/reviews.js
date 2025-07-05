const express = require("express");
const router = express.Router();
const {
  getProductReviews,
  createReview,
  getAllReviews,
} = require("../controllers/reviewController");
const { validateReview } = require("../validators/reviewValidator");
const { reviewLimiter, apiLimiter } = require("../middleware/rateLimiter");

// Apply general rate limiting
router.use(apiLimiter);

// @route   GET /api/reviews/product/:productId
// @desc    Get reviews for a specific product
// @access  Public
router.get("/product/:productId", getProductReviews);

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Public
router.post("/", reviewLimiter, validateReview, createReview);

// @route   GET /api/reviews
// @desc    Get all reviews (admin only)
// @access  Private
router.get("/", getAllReviews);

module.exports = router;
