import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { HttpStatusCode } from '../constants/statusCode';
import { catchAsyncError } from '../utils/catchAsyncWrapper';
import { MESSAGE } from '../constants/message';

// Get User by ID
export const getUserById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'User not found');
        }

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'User details fetched successfully',
            data: user,
        });
    }
);

export const createUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { phone, firstName, lastName, email, profileImage, role, isActive } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ phone });

        if (existingUser) {
            throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.PHONE_EXIST);
        }

        // Create a new user
        const newUser = new User({
            phone,
            firstName,
            lastName,
            email,
            profileImage,
            role,
            isActive,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(HttpStatusCode.CREATED).json({
            status: true,
            statusCode: HttpStatusCode.CREATED,
            message: MESSAGE.AUTH.USER_CREATED,
            data: newUser,
        });
    }
);

// Update User by ID
export const updateUserById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'User not found');
        }

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
);

// Delete User by ID
export const deleteUserById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'User not found');
        }

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'User deleted successfully',
        });
    }
);

// Get All Users
export const getAllUsers = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const users = await User.find();

        if (!users.length) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'No users found');
        }

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'Users fetched successfully',
            data: users,
        });
    }
);
