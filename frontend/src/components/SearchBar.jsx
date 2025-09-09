import React, { useState } from "react";
import api from "../api/axios";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            const res = await api.get("/search", { params: { q: query } });
            setResults(res.data);
            setError("");
        } catch (err) {
            setError("Search failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Search input */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search profile, projects, skills..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Results */}
            {loading ? (
                <p className="text-gray-500">Searching...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : results.length > 0 ? (
                <div className="space-y-4">
                    {results.map((r, idx) => (
                        <div
                            key={idx}
                            className="p-4 border rounded-lg bg-white shadow-sm"
                        >
                            <h3 className="text-lg font-semibold">{r.name || "Result"}</h3>
                            <p className="text-gray-600">{r.education}</p>

                            {r.projects?.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="font-medium">Projects:</h4>
                                    <ul className="list-disc list-inside text-sm">
                                        {r.projects.map((p, i) => (
                                            <li key={i}>{p.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                query && <p className="text-gray-500">No results found</p>
            )}
        </div>
    );
};

export default SearchBar;
