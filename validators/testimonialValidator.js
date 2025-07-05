const { body } = require("express-validator");

const validateTestimonial = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Testimonial message must be between 10 and 500 characters"),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
];

const validateTestimonialUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("message")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Testimonial message must be between 10 and 500 characters"),

  body("isApproved")
    .optional()
    .isBoolean()
    .withMessage("isApproved must be a boolean value"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean value"),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a non-negative integer"),
];

module.exports = {
  validateTestimonial,
  validateTestimonialUpdate,
};
