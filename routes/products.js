const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductsByCategory,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const productValidator = require("../validators/productValidator");
const { authenticate, requireAdmin } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Apply rate limiting to all product routes
router.use(apiLimiter);

// Public routes
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

// Admin routes (require authentication and admin role)
// @route   GET /api/products/all
// @desc    Get all products (for admin)
// @access  Admin only
router.get("/all", authenticate, requireAdmin, getAllProducts);

// @route   POST /api/products
// @desc    Create new product
// @access  Admin only
router.post("/", 
  authenticate, 
  requireAdmin, 
  productValidator.validateCreateProduct,
  createProduct
);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Admin only
router.put("/:id", 
  authenticate, 
  requireAdmin, 
  productValidator.validateUpdateProduct,
  updateProduct
);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Admin only
router.delete("/:id", authenticate, requireAdmin, deleteProduct);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get("/:id", getProduct);

module.exports = router;
