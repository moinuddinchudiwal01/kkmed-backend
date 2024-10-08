import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { catchAsyncError } from "../utils/catchAsyncWrapper";
import { MESSAGE } from "../constants/message";
import { HttpStatusCode } from "../constants/statusCode";
import { generateOTP } from "../helper/generateOTP";

// sens OTP to Mobile number
export const sendOTP = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<object> => {
        const body: { phone: string } = req.body;
        const user = await User.findOne({ phone: body.phone });

        if (!body.phone) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.PHONE_REQUIRED);
        if (user) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.PHONE_EXIST);

        const newUser = new User({ phone: body.phone });

        newUser.otp = generateOTP();
        const otpExpiresAt = Date.now() + 10 * 60 * 1000;
        newUser.otpExpiredAt = otpExpiresAt;

        await newUser.save();

        return res.status(HttpStatusCode.CREATED).json({
            status: true,
            statusCode: HttpStatusCode.CREATED,
            message: MESSAGE.AUTH.OTP_SUCCESS,
        });
    }
)

// Verify OTP
export const verifyOTP = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<object> => {
        const body: { phone: string, otp: string } = req.body;

        if (!body.phone || !body.otp) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.PHONE_OTP_REQUIRED);

        const user = await User.findOne({ phone: body.phone });

        if (!user) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.USER_NOT_FOUND);
        if (user.isVerified) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.USER_ALREADY_VERIFY);
        if (user.otp !== body.otp) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.INVALID_OTP);
        if (user.otpExpiredAt && user.otpExpiredAt < Date.now()) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.OTP_EXPIRED);
        if (!user.isActive) throw new ApiError(HttpStatusCode.UNAUTHORIZED, MESSAGE.AUTH.DEACTIVATED);

        user.isVerified = true;
        user.otp = "";
        user.otpExpiredAt = 0;

        await user.save();

        const accessToken: string = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return res.status(HttpStatusCode.OK).json({
            status: true,
            statusCode: HttpStatusCode.OK,
            message: MESSAGE.AUTH.LOGIN_SUCCESS,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
            accessToken,
        });
    }
)

// // login method
// export const login = catchAsyncError(
//     async (req: Request, res: Response, next: NextFunction): Promise<object> => {
//         const body: { email: string, password: string } = req.body;
//         const user = await User.findOne({ email: body.email.trim() });
//         if (!user) {
//             throw new ApiError(HttpStatusCode.UNAUTHORIZED, MESSAGE.AUTH.PASSWORD_INCORRECT);
//         }
//         const isPassword: boolean = await bcrypt.compare(
//             body.password.trim(),
//             user.password
//         );
//         if (!isPassword) {
//             throw new ApiError(HttpStatusCode.UNAUTHORIZED, MESSAGE.AUTH.PASSWORD_INCORRECT);
//         }
//         if (!user.isActive) {
//             throw new ApiError(HttpStatusCode.UNAUTHORIZED, MESSAGE.AUTH.DEACTIVATED);
//         }
//         const accessToken: string = jwt.sign(
//             {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role,
//             },
//             process.env.JWT_SECRET_KEY as string,
//             {
//                 expiresIn: process.env.JWT_EXPIRES_IN,
//             }
//         );

//         return res.status(HttpStatusCode.OK).json({
//             status: true,
//             statusCode: HttpStatusCode.OK,
//             message: MESSAGE.AUTH.LOGIN_SUCCESS,
//             data: {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 role: user.role,
//                 isActive: user.isActive,
//             },
//             accessToken,
//         });
//     }
// );


// // register method
// export const register = catchAsyncError(
//     async (req: Request, res: Response, next: NextFunction): Promise<object> => {
//         const body: { firstName: string, lastName: string, email: string, password: string } = req.body;
//         const user = await User.findOne({ email: body.email.trim() });
//         if (user) {
//             throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.EMAIL_EXIST);
//         }
//         const newUser = new User({
//             firstName: body.firstName,
//             lastName: body.lastName,
//             email: body.email,
//             password: await bcrypt.hash(body.password, 10),
//         });
//         await newUser.save();
//         return res.status(HttpStatusCode.CREATED).json({
//             status: true,
//             statusCode: HttpStatusCode.CREATED,
//             message: MESSAGE.AUTH.REGISTER_SUCCESS,
//         });
//     }
// );