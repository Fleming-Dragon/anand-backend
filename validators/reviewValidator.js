const { body } = require("express-validator");

const validateReview = [
  body("product").isMongoId().withMessage("Invalid product ID"),

  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Review title must be between 1 and 100 characters"),

  body("comment")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Review comment must be between 10 and 1000 characters"),
];

const validateReviewUpdate = [
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Review title must be between 1 and 100 characters"),

  body("comment")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Review comment must be between 10 and 1000 characters"),

  body("isApproved")
    .optional()
    .isBoolean()
    .withMessage("isApproved must be a boolean value"),
];

module.exports = {
  validateReview,
  validateReviewUpdate,
};
