import express from "express";
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Route to get user profile
router.get('/profile', auth, userController.getUserProfile);

// Route to update user details
router.put('/update', auth, userController.updateUserDetails);

module.exports = router;
