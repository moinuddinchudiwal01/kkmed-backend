import { UserModel } from "../models/index.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Generate a 4-digit OTP
// const generateOTP = (): string => Math.floor(1000 + Math.random() * 9000).toString();

// Send OTP to mobile number
export const sendOTP = async (req: Request, res: Response): Promise<Response> => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    let user = await UserModel.findOne({ mobileNumber });

    if (!user) {
      // Create a new user with the mobile number
      user = new UserModel({ mobileNumber });
    }

    // Generate OTP and set expiry time
    const otp = "2468";
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    user.isVerified = false;

    await user.save();

    // Send OTP via SMS (ensure sendSMS function is implemented and returns a success/failure response)
    // const smsResponse = await sendSMS(mobileNumber, `Your OTP is ${otp}`);

    // if (smsResponse && smsResponse.success) {
    return res.status(200).json({ message: "OTP sent successfully" });
    // } else {
    // return res.status(500).json({ message: "Failed to send OTP" });
    // }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response): Promise<Response> => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res.status(400).json({ message: "Mobile number and OTP are required" });
  }

  try {
    const user = await UserModel.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    // Add default dummy details if this is a new user
    if (!user.firstName || !user.lastName) {
      user.firstName = "John";
      user.lastName = "Doe";
      user.email = "john.doe@example.com";
      user.profilePic = "https://example.com/default-profile-pic.png";
    }

    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "default_secret_key", // Ensure JWT_SECRET is set
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "OTP verified successfully", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};
