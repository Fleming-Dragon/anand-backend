// Format validation error messages
const formatValidationErrors = (errors) => {
  return errors.map((error) => ({
    field: error.param,
    message: error.msg,
    value: error.value,
  }));
};

// Generate slug from string
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Format price for display
const formatPrice = (price, currency = "₹") => {
  return `${currency}${price.toFixed(2)}`;
};

// Calculate pagination metadata
const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
  };
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
  return input;
};

// Generate random string
const generateRandomString = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Check if string is valid email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Convert string to boolean
const stringToBoolean = (str) => {
  if (typeof str === "boolean") return str;
  if (typeof str === "string") {
    return str.toLowerCase() === "true";
  }
  return false;
};

// Format date for display
const formatDate = (date, locale = "en-IN") => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Calculate average rating
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

// Generate API response
const apiResponse = (success, message, data = null, pagination = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

module.exports = {
  formatValidationErrors,
  generateSlug,
  formatPrice,
  getPaginationMeta,
  sanitizeInput,
  generateRandomString,
  isValidEmail,
  stringToBoolean,
  formatDate,
  calculateAverageRating,
  apiResponse,
};
