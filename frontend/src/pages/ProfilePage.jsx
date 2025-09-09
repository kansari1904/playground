import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/profile");
                setProfile(res.data);
            } catch (err) {
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

   
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-pulse text-center">
                <div className="h-10 w-1/3 bg-gray-300 rounded mx-auto mb-4"></div>
                <div className="h-5 w-1/2 bg-gray-300 rounded mx-auto mb-2"></div>
                <div className="h-5 w-2/3 bg-gray-300 rounded mx-auto mb-6"></div>
                <div className="h-24 w-full bg-gray-300 rounded mb-4"></div>
                <div className="h-24 w-full bg-gray-300 rounded"></div>
            </div>
        );
    }

    if (error)
        return <p className="text-center text-red-500 font-semibold">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {profile?.name}
                    </h1>
                    <p className="text-gray-600">{profile?.email}</p>
                    <p className="text-gray-700 mt-2 italic">{profile?.education}</p>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {profile?.links?.github && (
                            <a
                                href={profile.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition"
                            >
                                GitHub
                            </a>
                        )}
                        {profile?.links?.linkedin && (
                            <a
                                href={profile.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition"
                            >
                                LinkedIn
                            </a>
                        )}
                        {profile?.links?.portfolio && (
                            <a
                                href={profile.links.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition"
                            >
                                Portfolio
                            </a>
                        )}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Skills
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {profile?.skills?.length > 0 ? (
                            profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">No skills available</p>
                        )}
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Projects
                    </h2>
                    <div className="space-y-6">
                        {profile?.projects?.length > 0 ? (
                            profile.projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition bg-gradient-to-br from-white to-gray-50"
                                >
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {project.description}
                                    </p>

                                    {/* Project Skills */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.skills?.map((s, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Links */}
                                    {project.links?.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {project.links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-blue-600 hover:underline"
                                                >
                                                    🔗 Link
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No projects available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
