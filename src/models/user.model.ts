import mongoose, { Document, Schema } from 'mongoose';
import { Role } from '../enums/role.enum';

export interface IUser extends Document {
    phone: string,
    otp: string,
    otpExpiredAt: number,
    isVerified: boolean,
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
    role: string,
    address: string,
    isActive: boolean,
    lastLogin: Date,
}

// Define schema
const userSchema = new Schema<IUser>({
    phone: { type: String, required: true, unique: true, trim: true },
    otp: { type: String },
    otpExpiredAt: { type: Number },
    isVerified: { type: Boolean, default: false },
    firstName: {
        type: String, required: true, default: 'John'
    },
    lastName: {
        type: String, required: true, default: 'Doe'
    },
    email: {
        type: String, required: true, default: 'john.doe@example.com', lowercase: true
    },
    profileImage: { type: String, default: "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png" },
    role: { type: String, required: true, default: Role.USER },
    isActive: { type: Boolean, required: true, default: true },
    lastLogin: { type: Date, required: false, default: new Date() }
}, { timestamps: true });

// Create model
export const User = mongoose.model<IUser>('users', userSchema);