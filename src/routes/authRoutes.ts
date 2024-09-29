import express from "express";
import { sendOTP, verifyOTP } from "../controller/auth.controller.js";
const router = express.Router();

router.post('/send-otp', sendOTP as any);
router.post('/verify-otp', verifyOTP as any);

export default router;