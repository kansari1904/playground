const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const profileRoutes = require("./routes/profileRoutes");
const authRouter = require("./routes/authRoute.js")
const connectDB = require("./config/database.js");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();



// Middleware
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api", profileRoutes);


// Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(res.statusCode || 500).json({
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});


app.listen(PORT, ()=>{
    console.log(`Server is started at PORT ${PORT}`)
})
