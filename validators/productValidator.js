const { body } = require("express-validator");

const validateCreateProduct = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Product name must be between 1 and 100 characters"),

  body("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category is required"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*.url")
    .optional()
    .isURL()
    .withMessage("Invalid image URL"),

  body("images.*.alt")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Image alt text must be between 1 and 100 characters"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),
];

const validateUpdateProduct = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Product name must be between 1 and 100 characters"),

  body("category")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category cannot be empty"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*.url")
    .optional()
    .isURL()
    .withMessage("Invalid image URL"),

  body("images.*.alt")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Image alt text must be between 1 and 100 characters"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),
];

// Legacy validators for backward compatibility
const validateProduct = validateCreateProduct;
const validateProductUpdate = validateUpdateProduct;

module.exports = {
  validateProduct,
  validateProductUpdate,
  validateCreateProduct,
  validateUpdateProduct,
};
