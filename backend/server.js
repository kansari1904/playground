const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoute");
const connectDB = require("./config/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const allowedOrigins = [
    "http://localhost:5173",
    "https://playground-eosin-xi.vercel.app"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // allow tools like Postman
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(helmet());
app.use(morgan("combined"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(res.statusCode || 500).json({
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
