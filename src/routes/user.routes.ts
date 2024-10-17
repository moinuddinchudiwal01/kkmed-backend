import { Router } from 'express';
import { getAllUsers, getUserById, updateUserById, deleteUserById, createUser } from '../controllers/user.controller';
const userRouter = Router();
import { validateCreateUserDto, validateDeleteUserDto, validateGetUserByIdDto, validateUpdateUserDto } from "../utils/validation/validation";
import { isAdmin } from '../middlewares/auth.middleware';

// Route to get all users
userRouter.get('/', getAllUsers);

// Create User
userRouter.post('/', validateCreateUserDto, createUser);

// Route to update a user by ID
userRouter.put('/:id', validateUpdateUserDto, updateUserById);

// Route to get a user by ID
userRouter.get('/:id', validateGetUserByIdDto, getUserById);

// Route to delete a user by ID
userRouter.delete('/:id', validateDeleteUserDto, deleteUserById);

export default userRouter;
