import { UserModel } from "../models";
import express from "express";

// Update User Details
exports.updateUserDetails = async (req:express.Request, res:express.Response) => {
  const userId = req.user.id; // Assume auth middleware sets req.user
  const updates = req.body;

  try {
    let user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    const allowedUpdates = ['firstName', 'lastName', 'email', 'profilePic', 'vendorDetails', 'deliveryBoyDetails'];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        user[field] = updates[field];
      }
    });

    await user.save();

    return res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

// Get User Profile
exports.getUserProfile = async (req:express.Request, res:express.Response) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId).select('-otp -otpExpiresAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};
