import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoDBConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.warn('Database connected successfully...');
    } catch (error: any) {
        console.error('Database connection error:', error.message);
        throw error;
    }
};

export default mongoDBConfig;