import express from "express";
const router = express.Router();
const authController = require('../controllers/authController');

// Route to send OTP
router.post('/send-otp', authController.sendOTP);

// Route to verify OTP
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
