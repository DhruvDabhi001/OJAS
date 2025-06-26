// authRoutes.js
const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  verifyOtp,
  forgotPassword,
} = require('../controllers/authController');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);

module.exports = router;