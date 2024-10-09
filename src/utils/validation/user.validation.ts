import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Role } from '../../enums/role.enum';
import { HttpStatusCode } from '../../constants/statusCode';

const createUserSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'any.required': 'Mobile number is required',
            'string.empty': 'Mobile number cannot be empty',
            'string.pattern.base': 'Mobile number must be 10 digits',
        }),
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Invalid email format'
    }),
    profileImage: Joi.string().optional(),
    role: Joi.string().valid(Role).default(Role.USER).optional(),
    isActive: Joi.boolean().default(true).optional(),
});

const updateUserSchema = Joi.object({
    phone: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        'string.email': 'Invalid email format'
    }),
    profileImage: Joi.string().optional(),
    role: Joi.string().valid(Role).optional(),
    isActive: Joi.boolean().optional(),
});

const getUserByIdSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'User ID is required',
        'string.empty': 'User ID cannot be empty'
    }),
});

const deleteUserSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'User ID is required',
        'string.empty': 'User ID cannot be empty'
    }),
});

export const validateCreateUserDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message,
        });
    }
    next();
};

export const validateUpdateUserDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message,
        });
    }
    next();
};

export const validateGetUserByIdDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = getUserByIdSchema.validate(req.params);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message,
        });
    }
    next();
};

export const validateDeleteUserDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = deleteUserSchema.validate(req.params);
    if (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: error.details[0].message,
        });
    }
    next();
};
