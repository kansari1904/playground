const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database successfully connected...")

    } catch (err) {
        console.log("Database connection is failed", err)
    }
}


module.exports= connectDB;