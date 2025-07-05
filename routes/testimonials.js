const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  getAllTestimonials
} = require('../controllers/testimonialController');
const { validateTestimonial } = require('../validators/testimonialValidator');
const { testimonialLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Apply general rate limiting
router.use(apiLimiter);

// @route   GET /api/testimonials
// @desc    Get all approved testimonials
// @access  Public
router.get('/', getTestimonials);

// @route   GET /api/testimonials/featured
// @desc    Get featured testimonials for homepage
// @access  Public
router.get('/featured', getFeaturedTestimonials);

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Public
router.post('/', testimonialLimiter, validateTestimonial, createTestimonial);

// @route   GET /api/testimonials/admin
// @desc    Get all testimonials (admin only)
// @access  Private
router.get('/admin', getAllTestimonials);

module.exports = router;
