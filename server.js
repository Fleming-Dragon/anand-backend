const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config/config");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
require("dotenv").config();

// Connect to database
connectDB();

const app = express();
const PORT = config.PORT;

// Middleware
app.use(helmet());

// CORS Configuration with multiple allowed origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (config.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Rate limiting
app.use(apiLimiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin/orders", require("./routes/admin"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Anand Agro Industry API is running" });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Anand Agro Industry API server running on port ${PORT}`);
  console.log(`📱 Environment: ${config.NODE_ENV}`);
  console.log(`🌐 CORS enabled for: ${config.ALLOWED_ORIGINS.join(", ")}`);
});
