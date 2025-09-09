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
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (process.env.NODE_ENV === "production") {
                return callback(null, true);
            } else {
                if (!origin || allowedOrigins.includes(origin)) {
                    return callback(null, true);
                } else {
                    return callback(new Error("Not allowed by CORS"));
                }
            }
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
