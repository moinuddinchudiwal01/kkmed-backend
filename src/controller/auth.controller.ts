import { UserModel } from "../models";
import express from "express";
import { sendSMS } from "../utils/smsService";
import jwt from "jsonwebtoken";

// Generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Register / Send OTP
exports.sendOTP = async (req:express.Request, res:express.Response) => {
  const { mobileNumber } = req.body;

  try {
    let user = await UserModel.findOne({ mobileNumber });

    if (!user) {
      // Create a new user with mobile number
      user = new UserModel({ mobileNumber });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    user.isVerified = false;

    await user.save();

    // Send OTP via SMS (implement sendSMS function)
    const smsResponse = await sendSMS(mobileNumber, `Your OTP is ${otp}`);

    if (smsResponse.success) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

// Verify OTP
exports.verifyOTP = async (req:express.Request, res:express.Response) => {
  const { mobileNumber, otp } = req.body;

  try {
    const user = await UserModel.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // if (user.otpExpiresAt < Date.now()) {
    //   return res.status(400).json({ message: 'OTP has expired' });
    // }

    // Verify user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    // Optionally, you can set dummy details here if it's a new user
    if (!user.firstName || !user.lastName) {
      user.firstName = 'John';
      user.lastName = 'Doe';
      user.email = 'john.doe@example.com';
      user.profilePic = 'https://example.com/default-profile-pic.png';
    }

    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ message: 'OTP verified successfully', token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

