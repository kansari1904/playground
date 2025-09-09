const express = require("express");
const router = express.Router();
const {
    createOrUpdateProfile,
    getProfile,
    getProjects,
    getTopSkills,
    searchProfile,
    healthCheck,
} = require("../controllers/profileController");

// Profile CRUD
router.post("/profile", createOrUpdateProfile);
router.get("/profile", getProfile);

// Projects & Skills
router.get("/projects", getProjects);
router.get("/skills/top", getTopSkills);

// Search
router.get("/search", searchProfile);

// Health
router.get("/health", healthCheck);

module.exports = router;
