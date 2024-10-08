import { Router } from "express";
const authRouter = Router();
import { sendOTP, verifyOTP } from "../controllers/auth.controller";
import { validateLoginDto, validateRegisterDto } from "../utils/validation/validation";

// all routes of order module
authRouter.post('/send-otp', /* validateLoginDto, */ sendOTP);
authRouter.post('/verify-otp', /* validateRegisterDto, */ verifyOTP);

export default authRouter;