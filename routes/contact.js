const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContact,
  updateContactStatus
} = require('../controllers/contactController');
const { validateContact } = require('../validators/contactValidator');
const { contactLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Apply general rate limiting
router.use(apiLimiter);

// @route   POST /api/contact
// @desc    Create new contact submission
// @access  Public
router.post('/', contactLimiter, validateContact, createContact);

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private
router.get('/', getAllContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact submission (admin only)
// @access  Private
router.get('/:id', getContact);

// @route   PUT /api/contact/:id/status
// @desc    Update contact status (admin only)
// @access  Private
router.put('/:id/status', updateContactStatus);

module.exports = router;
