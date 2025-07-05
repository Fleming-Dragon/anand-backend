const Review = require("../models/Review");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const skip = (page - 1) * limit;

    const reviews = await Review.find({
      product: productId,
      isApproved: true,
    })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .select("-email -__v");

    const total = await Review.countDocuments({
      product: productId,
      isApproved: true,
    });

    // Get rating statistics
    const ratingStats = await Review.aggregate([
      { $match: { product: product._id, isApproved: true } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        reviews,
        ratingStats,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { product, name, email, rating, title, comment } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ product, email });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create review
    const review = await Review.create({
      product,
      name,
      email,
      rating,
      title,
      comment,
    });

    // Update product rating statistics
    await updateProductRating(product);

    res.status(201).json({
      success: true,
      message:
        "Review submitted successfully. It will be visible after approval.",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// @desc    Get all reviews (for admin)
// @route   GET /api/reviews
// @access  Private (Admin)
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, product } = req.query;

    const filter = {};
    if (status) filter.isApproved = status === "approved";
    if (product) filter.product = product;

    const skip = (page - 1) * limit;

    const reviews = await Review.find(filter)
      .populate("product", "name category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments(filter);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Helper function to update product rating
const updateProductRating = async (productId) => {
  try {
    const stats = await Review.aggregate([
      { $match: { product: productId, isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        reviewCount: stats[0].reviewCount,
      });
    }
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
};

module.exports = {
  getProductReviews,
  createReview,
  getAllReviews,
};
