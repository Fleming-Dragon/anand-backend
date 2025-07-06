const { body } = require("express-validator");

const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value) return true; // Allow empty values
      // Remove all non-digit characters for validation
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length < 10 || cleaned.length > 15) {
        throw new Error("Phone number must be between 10 and 15 digits");
      }
      return true;
    }),

  body("subject")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Subject must be between 1 and 100 characters"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),

  body("type")
    .optional()
    .isIn(["inquiry", "support", "feedback", "partnership", "other"])
    .withMessage("Invalid contact type"),
];

const validateContactUpdate = [
  body("status")
    .optional()
    .isIn(["new", "in-progress", "resolved", "closed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Invalid priority"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  body("isRead")
    .optional()
    .isBoolean()
    .withMessage("isRead must be a boolean value"),
];

module.exports = {
  validateContact,
  validateContactUpdate,
};
