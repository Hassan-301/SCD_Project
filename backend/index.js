const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow the frontend URL from the environment variable
    credentials: true
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api", router);

// Default port or environment variable
const PORT = process.env.PORT || 5000;  // Ensure default to 5000, as it should be the backend port

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to DB");
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to DB", err);
        process.exit(1);  // Exit process with failure code
    });

// Ensure that environment variables are set (this is useful for debugging in production)
if (!process.env.FRONTEND_URL) {
    console.error("Error: FRONTEND_URL environment variable is not set.");
    process.exit(1);
}

