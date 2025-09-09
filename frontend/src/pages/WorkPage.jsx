import React, { useEffect, useState } from "react";
import api from "../api/axios";

const WorkPage = () => {
    const [work, setWork] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const res = await api.get("/profile");
                setWork(res.data.work || []);
                setError("");
            } catch (err) {
                setError("Failed to fetch work experience");
            } finally {
                setLoading(false);
            }
        };
        fetchWork();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-pulse">
                <h1 className="h-8 w-1/3 bg-gray-300 rounded mb-6"></h1>
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-24 bg-gray-200 rounded-lg mb-4"
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                     Work Experience
                </h1>

                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : work.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No work experience found
                    </p>
                ) : (
                    <div className="space-y-6">
                        {work.map((job, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {job.title}
                                        </h2>
                                        <p className="text-blue-600 font-medium">
                                            {job.company}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                                        {job.startDate} – {job.endDate || "Present"}
                                    </p>
                                </div>

                                {job.description && (
                                    <p className="mt-3 text-gray-700 leading-relaxed">
                                        {job.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkPage;
