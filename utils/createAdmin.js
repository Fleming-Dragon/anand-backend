const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const createOrUpdateAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if there's already an admin role user
    const existingAdminRole = await User.findOne({ role: "admin" });

    if (existingAdminRole) {
      console.log("✅ Admin user already exists:");
      console.log(`📧 Email: ${existingAdminRole.email}`);
      console.log(`👤 Username: ${existingAdminRole.username}`);
      return;
    }

    // Check if user with username "admin" exists
    const existingAdminUser = await User.findOne({ username: "admin" });

    if (existingAdminUser) {
      console.log(
        'Found existing user with username "admin" but role is not admin'
      );
      console.log("Updating their role to admin...");

      // Update the existing user to admin role
      existingAdminUser.role = "admin";
      existingAdminUser.email = "admin@anandagro.com";
      existingAdminUser.firstName = "Admin";
      existingAdminUser.lastName = "User";

      await existingAdminUser.save();
      console.log("✅ Existing user updated to admin successfully");
      console.log("📧 Email: admin@anandagro.com");
      console.log("👤 Username: admin");
    } else {
      // Create new admin user with different username
      const adminUser = new User({
        username: "superadmin",
        email: "admin@anandagro.com",
        password: "Admin@123",
        firstName: "Super",
        lastName: "Admin",
        role: "admin",
        phone: "9876543210",
      });

      await adminUser.save();
      console.log("✅ New admin user created successfully");
      console.log("📧 Email: admin@anandagro.com");
      console.log("👤 Username: superadmin");
      console.log("🔑 Password: Admin@123");
    }

    console.log("\n🎉 Admin user setup completed successfully!");
  } catch (error) {
    console.error("❌ Error setting up admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the function
createOrUpdateAdmin();
