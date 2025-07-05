const Testimonial = require("../models/Testimonial");
const { validationResult } = require("express-validator");

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const { featured, limit = 10 } = req.query;

    const filter = { isApproved: true };
    if (featured === "true") {
      filter.isFeatured = true;
    }

    const testimonials = await Testimonial.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(Number(limit))
      .select("-__v");

    res.json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching testimonials",
      error: error.message,
    });
  }
};

// @desc    Get featured testimonials for homepage
// @route   GET /api/testimonials/featured
// @access  Public
const getFeaturedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isApproved: true,
      isFeatured: true,
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(4)
      .select("-__v");

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured testimonials",
      error: error.message,
    });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
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

    const { name, location, rating, message } = req.body;

    const testimonial = await Testimonial.create({
      name,
      location,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "Testimonial submitted successfully. It will be visible after approval.",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating testimonial",
      error: error.message,
    });
  }
};

// @desc    Get all testimonials (for admin)
// @route   GET /api/testimonials/admin
// @access  Private (Admin)
const getAllTestimonials = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const filter = {};
    if (status) filter.isApproved = status === "approved";

    const skip = (page - 1) * limit;

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Testimonial.countDocuments(filter);

    res.json({
      success: true,
      data: testimonials,
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
      message: "Error fetching testimonials",
      error: error.message,
    });
  }
};

module.exports = {
  getTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  getAllTestimonials,
};
