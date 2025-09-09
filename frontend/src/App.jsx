import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import SkillsPage from "./pages/SkillsPage";
import WorkPage from "./pages/WorkPage";
import SearchBar from "./components/SearchBar";
import ProfileForm from "./pages/ProfileForm";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Profile view */}
          <Route path="/" element={<ProfilePage />} />

          {/* Projects list */}
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Profile create/update form */}
          <Route path="/profile/edit" element={<ProfileForm />} />

          {/* Skills */}
          <Route path="/skills" element={<SkillsPage />} />

          {/* Work */}
          <Route path="/work" element={<WorkPage />} />

          {/* Search */}
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
