const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    try {
        const existEmail = await userModel.findOne({ email });
        if (existEmail) {
            return res.json({
                success: false,
                message: "Email Already existing!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json({
            success: true,
            message: "User created successfully",
        });
    } catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Error occurred" });
    }
};

const handlelogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields required!" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid password!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({
            success: true,
            message: "User successfully login!",
        });
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }
};

const handlelogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({
            success: true,
            message: "User successfully logout!",
        });
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: error.message });
    }
};

module.exports = { handleRegister, handlelogin, handlelogout };
