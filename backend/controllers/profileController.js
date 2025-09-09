const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");



exports.createOrUpdateProfile = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const profile = await Profile.findOneAndUpdate(
        { email },
        req.body,
        { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(profile);
});


exports.getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({});
    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }
    res.json(profile);
});



exports.getProjects = asyncHandler(async (req, res) => {
    const { skill } = req.query;
    const profile = await Profile.findOne();

    if (!profile) return res.status(404).json([]);

    let projects = profile.projects || [];

    if (skill) {
        projects = projects.filter((p) =>
            Array.isArray(p.skills) &&
            p.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
        );
    }

    res.json(projects);
});


exports.getTopSkills = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({});
    if (!profile) {
        return res.status(404).json([]);
    }

    const skillCount = {};

    
    if (Array.isArray(profile.skills)) {
        profile.skills.forEach((s) => {
            skillCount[s] = (skillCount[s] || 0) + 1;
        });
    }

    
    if (Array.isArray(profile.projects)) {
        profile.projects.forEach((project) => {
            if (Array.isArray(project.skills)) {
                project.skills.forEach((s) => {
                    skillCount[s] = (skillCount[s] || 0) + 1;
                });
            }
        });
    }

    const sortedSkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .map(([skill, count]) => skill);

    res.json(sortedSkills);
});


exports.searchProfile = asyncHandler(async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json([]);

    const results = await Profile.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    
    res.json(Array.isArray(results) ? results : []);
});


exports.healthCheck = asyncHandler(async (req, res) => {
    res.json({ status: "ok" });
});
