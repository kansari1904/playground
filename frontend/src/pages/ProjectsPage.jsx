import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [skill, setSkill] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProjects = async (skillFilter = "") => {
        try {
            setLoading(true);
            const res = await api.get("/projects", {
                params: { skill: skillFilter || undefined },
            });

            // ✅ Ensure projects is always an array
            const data = Array.isArray(res.data) ? res.data : [];
            setProjects(data);
            setError("");
        } catch (err) {
            setError("Failed to fetch projects");
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProjects(skill);
    };

    // ✅ Skeleton loader
    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 animate-pulse">
                <div className="h-8 w-1/3 bg-gray-300 rounded mb-6"></div>
                <div className="grid md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-40 bg-gray-200 rounded-xl shadow-sm"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error)
        return <p className="text-red-500 text-center font-medium">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    Projects
                </h1>

                {/* Skill filter */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3 mb-10 justify-center"
                >
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        placeholder="Filter by skill (e.g. React)"
                        className="flex-1 sm:max-w-md border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>

                {/* Results */}
                {projects.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No projects found
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-gray-600 mb-3">
                                    {project.description}
                                </p>

                                {/* Project Skills */}
                                <div className="flex flex-wrap gap-2 mb-3">
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
                                    <div className="flex flex-wrap gap-3">
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
