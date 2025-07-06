const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const listUsers = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Find all users
    const users = await User.find({}, "username email role firstName lastName");

    console.log("\n📋 Current Users in Database:");
    console.log("================================");

    if (users.length === 0) {
      console.log("No users found in database");
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log("   ---");
      });
    }
  } catch (error) {
    console.error("❌ Error listing users:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the list function
listUsers();
