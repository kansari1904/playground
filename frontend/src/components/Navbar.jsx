import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import HealthBadge from "./HealthBadge";

const Navbar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const linkClasses = (path) =>
        `block px-4 py-2 rounded-lg text-sm font-medium transition ${pathname === path
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
        }`;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-blue-600 hover:text-blue-700"
                    >
                        Playground
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-4">
                        <Link to="/" className={linkClasses("/")}>
                            Profile
                        </Link>
                        <Link to="/projects" className={linkClasses("/projects")}>
                            Projects
                        </Link>
                        <Link to="/skills" className={linkClasses("/skills")}>
                            Skills
                        </Link>
                        <Link to="/work" className={linkClasses("/work")}>
                            Work
                        </Link>
                        <Link to="/profile/edit" className={linkClasses("/profile/edit")}>
                            Create/Update Profile
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm">Backend:</span>
                        <HealthBadge />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-md">
                    <div className="flex flex-col p-4 space-y-2">
                        <Link to="/" className={linkClasses("/")}>
                            Profile
                        </Link>
                        <Link to="/projects" className={linkClasses("/projects")}>
                            Projects
                        </Link>
                        <Link to="/skills" className={linkClasses("/skills")}>
                            Skills
                        </Link>
                        <Link to="/work" className={linkClasses("/work")}>
                            Work
                        </Link>
                        <Link to="/search" className={linkClasses("/search")}>
                            Search
                        </Link>
                        <Link to="/profile/edit" className={linkClasses("/profile/edit")}>
                            Create/Update Profile
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
