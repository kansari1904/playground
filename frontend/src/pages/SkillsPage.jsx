import React, { useEffect, useState } from "react";
import api from "../api/axios";

const SkillsPage = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get("/skills/top");
                
                setSkills(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Failed to fetch skills", err);
                setSkills([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center animate-pulse">
                <h2 className="h-6 w-32 bg-gray-300 rounded mx-auto mb-6"></h2>
                <div className="flex flex-wrap gap-3 justify-center">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-8 w-20 bg-gray-300 rounded-full"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Top Skills
                </h2>

                {skills.length === 0 ? (
                    <p className="text-gray-500">No skills found</p>
                ) : (
                    <div className="flex flex-wrap gap-3 justify-center">
                        {skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillsPage;
