import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpStatusCode } from '../../constants/statusCode';

const sendOTPSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'any.required': 'Mobile number is required',
            'string.empty': 'Mobile number cannot be empty',
            'string.pattern.base': 'Mobile number must be 10 digits',
        }),
});

export const validateSendOTPDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = sendOTPSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message
        });
    }
    next();
};

const verifyOTPSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'any.required': 'Mobile number is required',
            'string.empty': 'Mobile number cannot be empty',
            'string.pattern.base': 'Mobile number must be 10 digits',
        }),
    otp: Joi.string()
        .length(4)
        .required()
        .messages({
            'any.required': 'OTP is required',
            'string.empty': 'OTP cannot be empty',
            'string.length': 'OTP must be exactly 4 digits',
        }),
});

export const validateVerifyOTPDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = verifyOTPSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message
        });
    }
    next();
};
