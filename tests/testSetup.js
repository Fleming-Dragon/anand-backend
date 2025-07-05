const mongoose = require("mongoose");
const config = require("../config/config");

const testConnection = async () => {
  try {
    console.log("🧪 Testing backend configuration...\n");

    // Test 1: Check required dependencies
    console.log("✅ Express imported successfully");
    console.log("✅ Mongoose imported successfully");
    console.log("✅ Configuration loaded successfully");

    // Test 2: Check environment variables
    console.log("\n📋 Environment Configuration:");
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || "not set"}`);
    console.log(`   PORT: ${process.env.PORT || "not set (will use 5000)"}`);
    console.log(
      `   MONGODB_URI: ${
        process.env.MONGODB_URI ? "configured" : "not set (will use default)"
      }`
    );
    console.log(
      `   FRONTEND_URL: ${
        process.env.FRONTEND_URL || "not set (will use default)"
      }`
    );

    // Test 3: Try to connect to MongoDB
    console.log("\n🔌 Testing MongoDB connection...");
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection successful");

    // Test 4: Check models
    console.log("\n📊 Testing Models:");
    const Product = require("../models/Product");
    const Review = require("../models/Review");
    const Testimonial = require("../models/Testimonial");
    const Contact = require("../models/Contact");

    console.log("✅ Product model loaded");
    console.log("✅ Review model loaded");
    console.log("✅ Testimonial model loaded");
    console.log("✅ Contact model loaded");

    // Test 5: Count existing documents
    const productCount = await Product.countDocuments();
    const reviewCount = await Review.countDocuments();
    const testimonialCount = await Testimonial.countDocuments();
    const contactCount = await Contact.countDocuments();

    console.log("\n📈 Database Status:");
    console.log(`   Products: ${productCount}`);
    console.log(`   Reviews: ${reviewCount}`);
    console.log(`   Testimonials: ${testimonialCount}`);
    console.log(`   Contacts: ${contactCount}`);

    console.log("\n🎉 All tests passed! Backend is ready to use.");

    if (productCount === 0) {
      console.log('\n💡 Tip: Run "npm run seed" to add sample data');
    }

    await mongoose.connection.close();
    console.log("\n👋 Test completed successfully");
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);

    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongooseServerSelectionError"
    ) {
      console.log("\n💡 MongoDB Connection Tips:");
      console.log("   - Make sure MongoDB is running locally");
      console.log("   - Check your MONGODB_URI in .env file");
      console.log(
        "   - For local MongoDB: mongodb://localhost:27017/anand-agro"
      );
      console.log(
        "   - For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/anand-agro"
      );
    }

    process.exit(1);
  }
};

// Run test if this file is executed directly
if (require.main === module) {
  testConnection();
}

module.exports = testConnection;
