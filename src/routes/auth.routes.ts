import { Router } from "express";
const authRouter = Router();
import { sendOTP, verifyOTP } from "../controllers/auth.controller";
import { validateSendOTPDto, validateVerifyOTPDto } from "../utils/validation/validation";

// all routes of order module
authRouter.post('/send-otp', validateSendOTPDto, sendOTP);
authRouter.post('/verify-otp', validateVerifyOTPDto, verifyOTP);

export default authRouter;