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

// create user
export const createUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<object> => {
        const { phone, firstName, lastName, email, profileImage, role, isActive } = req.body;

        const existingUser = await User.findOne({ phone });

        if (existingUser) throw new ApiError(HttpStatusCode.BAD_REQUEST, MESSAGE.AUTH.PHONE_EXIST);

        const newUser = new User({
            phone,
            firstName,
            lastName,
            email,
            profileImage,
            role,
            isActive,
        });

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

        if (!updatedUser) throw new ApiError(HttpStatusCode.NOT_FOUND, 'User not found');

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

        if (!deletedUser) throw new ApiError(HttpStatusCode.NOT_FOUND, 'User not found');

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'User deleted successfully',
        });
    }
);

// Get All Users
export const getAllUsers = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const sortField = req.query.sortField as string || 'createdAt';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const filters: any = {};
        if (req.query.isActive) {
            filters.isActive = req.query.isActive === 'true';
        }
        if (req.query.role) {
            filters.role = req.query.role;
        }

        if (req.query.search) {
            const search = req.query.search.toString();
            filters.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(filters)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        if (!users.length) {
            throw new ApiError(HttpStatusCode.NOT_FOUND, 'No users found');
        }

        const totalUsers = await User.countDocuments(filters);
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(HttpStatusCode.OK).json({
            status: true,
            message: 'Users fetched successfully',
            data: users,
            pagination: {
                totalUsers,
                currentPage: page,
                totalPages,
                limit
            }
        });
    }
);
