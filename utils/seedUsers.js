const mongoose = require('mongoose');
const User = require('../models/User');
const config = require('../config/config');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to database
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      // Create default admin user
      const adminUser = new User({
        username: 'admin',
        email: 'admin@anandagro.com',
        password: 'Admin@123', // Will be hashed automatically
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '9876543210'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@anandagro.com');
      console.log('🔑 Password: Admin@123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'user@anandagro.com' });
    if (!existingUser) {
      // Create default regular user
      const regularUser = new User({
        username: 'testuser',
        email: 'user@anandagro.com',
        password: 'User@123', // Will be hashed automatically
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        phone: '9876543211'
      });

      await regularUser.save();
      console.log('✅ Test user created successfully');
      console.log('📧 Email: user@anandagro.com');
      console.log('🔑 Password: User@123');
    } else {
      console.log('ℹ️  Test user already exists');
    }

    console.log('\n🎉 User seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@anandagro.com / Admin@123');
    console.log('User:  user@anandagro.com / User@123');

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedUsers();
