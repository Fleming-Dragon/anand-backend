module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database Configuration
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:<db_password>@anandagro.8wocett.mongodb.net/anand-agro?retryWrites=true&w=majority&appName=anandagro",

  // CORS Configuration
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  ALLOWED_ORIGINS: [
    "http://localhost:3000", // Traditional React dev server
    "http://localhost:5173", // Vite dev server
    "http://localhost:5174", // Vite dev server (alternate port)
    "http://localhost:4173", // Vite preview
    ...(process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
      : []), // Environment variable URLs
    ...(process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((url) => url.trim())
      : []), // Additional allowed origins
  ].filter(Boolean), // Remove any undefined values

  // JWT Configuration
  JWT_SECRET:
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",

  // Email Configuration (for contact form)
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@anandagro.com",

  // File Upload Configuration
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],

  // Rate Limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100, // max requests per window

  // API Configuration
  API_PREFIX: "/api",
  API_VERSION: "v1",

  // Business Configuration
  COMPANY_INFO: {
    name: "Anand Agro Industry",
    founded: "2023-08-15",
    location: "Nashik, Maharashtra, India",
    email: "info@anandagro.com",
    phone: "+91-XXXXXXXXXX",
  },
};
