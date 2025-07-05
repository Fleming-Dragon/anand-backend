const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductsByCategory,
  getFeaturedProducts,
} = require("../controllers/productController");
const { apiLimiter } = require("../middleware/rateLimiter");

// Apply rate limiting to all product routes
router.use(apiLimiter);

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get("/featured", getFeaturedProducts);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get("/category/:category", getProductsByCategory);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get("/:id", getProduct);

module.exports = router;
