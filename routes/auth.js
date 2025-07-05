const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const { authenticate, requireAdmin } = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Public routes
router.post('/register', 
  rateLimiter.authLimiter,
  authValidator.validateRegister,
  authController.register
);

router.post('/login', 
  rateLimiter.authLimiter,
  authValidator.validateLogin,
  authController.login
);

// Protected routes (require authentication)
router.use(authenticate);

router.get('/profile', authController.getProfile);
router.put('/profile', 
  authValidator.validateUpdateProfile,
  authController.updateProfile
);
router.put('/change-password', 
  authValidator.validateChangePassword,
  authController.changePassword
);
router.post('/logout', authController.logout);

// Admin only routes
router.get('/users', requireAdmin, authController.getAllUsers);

module.exports = router;
