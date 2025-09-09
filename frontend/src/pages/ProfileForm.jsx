import React, { useState, useEffect } from "react";
import { saveProfile, getProfile } from "../api/profile";

const ProfileForm = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        education: "",
        skills: "",
    });

    const [message, setMessage] = useState("");

    // Load profile if it exists
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    education: data.education || "",
                    skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
                });
            } catch {
                console.log("No profile found, create new one");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...profile,
                skills: profile.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };

            await saveProfile(payload);
            setMessage("Profile saved successfully");
        } catch (err) {
            console.error("Save failed:", err.response?.data || err.message);
            setMessage("Failed to save profile");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                    Create/Update Profile
                </h1>

                {message && (
                    <div
                        className={`mb-6 p-3 text-center rounded-lg font-medium ${message.includes("✅")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Education
                        </label>
                        <input
                            type="text"
                            name="education"
                            value={profile.education}
                            onChange={handleChange}
                            placeholder="e.g. B.Tech in CSE"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skills
                        </label>
                        <input
                            type="text"
                            name="skills"
                            value={profile.skills}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter skills separated by commas
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
