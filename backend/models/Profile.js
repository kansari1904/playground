const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        skills: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        links: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { _id: false } 
);

const workSchema = new mongoose.Schema(
    {
        company: { type: String, trim: true },
        role: { type: String, trim: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, trim: true },
    },
    { _id: false }
);

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        education: { type: String, trim: true },
        skills: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        projects: [projectSchema],
        work: [workSchema],
        links: {
            github: { type: String, trim: true },
            linkedin: { type: String, trim: true },
            portfolio: { type: String, trim: true },
        },
    },
    { timestamps: true }
);


profileSchema.index({
    name: "text",
    "projects.title": "text",
    "projects.description": "text",
});


module.exports = mongoose.model("Profile", profileSchema);
