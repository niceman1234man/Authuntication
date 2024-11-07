import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const url = process.env.MONGO_URI;

export const connectDb = () => {
    if (!url) {
        console.error("Error: MONGO_URL is not defined");
        process.exit(1); // Exit the process if the URL is not defined
    }

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1); // Exit the process in case of a connection error
    });
};