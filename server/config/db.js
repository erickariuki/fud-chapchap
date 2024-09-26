import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect('mongodb+srv://EricKariuki:ericko2023@food.to45k.mongodb.net/');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
