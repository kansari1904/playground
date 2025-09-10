# Candidate Profile Playground

A tiny playground to store a personal candidate profile, expose a small API, and provide a minimal frontend to query and view the data.
Designed to be simple to run locally, easy to deploy, and friendly for demos / interviews.

## Quick summary

Backend: Node.js + Express + Mongoose

Frontend: React + Tailwind CSS (minimal)

DB: MongoDB

Features: CRUD profile, project queries, top skills, search, health endpoint

Goal: Seed with your real profile data and push the repo to GitHub + optionally host the frontend + backend.

# Demo / Hosted URLs

Backend API: https://your-backend.example.com/api

Frontend: https://your-frontend.example.com

Health: https://your-backend.example.com/api/health

Live Status (Acceptance)

GET /api/health → 200 OK with body { "status": "ok" }

Seed data visible in UI

Query endpoints return expected filtered results

# Architecture

.
├── backend

│   ├── config
│   │   └── database.js

│   ├── controllers
│   │   ├── authControllers.js
│   │   └── profileControllers.js

│   ├── middleware
│   │   └── userAuth.js

│   ├── models
│   │   ├── profile.js
│   │   └── userModel.js

│   ├── routes
│   │   ├── authRoute.js
│   │   └── profileRoute.js

│   ├── seed.js

│   ├── server.js

│   └── .env
│
├── frontend
│   └── src

│       ├── api
│       │   ├── axios.js
│       │   └── profile.js

│       ├── components
│       │   ├── HealthBadge.jsx
│       │   ├── Navbar.jsx
│       │   └── SearchBar.jsx

│       ├── pages
│       │   ├── ProfileForm.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── ProjectsPage.jsx
│       │   ├── SkillsPage.jsx
│       │   └── WorkPage.jsx

│       └── App.jsx
│
├── README.md

└── package.json

# Tech Stack

Node.js (Express)

MongoDB (Mongoose)

React + Tailwind CSS (frontend)

Axios (frontend HTTP client)

dotenv for env vars

# API Endpoints

Base: /api

Profile
POST /api/profile — Create or update profile (body: profile object)

GET /api/profile — Get the single stored profile


# Projects & Skills

GET /api/projects — list all projects

GET /api/projects?skill=python — projects containing python skill

GET /api/skills/top — list top skills ordered by frequency

Search
GET /api/search?q=frontend — full text search (profile + projects)

Health

GET /api/health — returns { "status": "ok" }

## Auth:

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

## Indexes / Notes

Create text index for search:
db.profiles.createIndex({
  name: "text",
  "projects.title": "text",
  "projects.description": "text",
  "skills": "text",
  "education.school": "text"
});

Seed Data:

node seed.js

git clone https://github.com/kansari1904/playground.git

cd /backend

npm install

.env

PORT=5000

MONGO_URI=mongodb://localhost:27017/profile-playground

SECRET_KEY=your_jwt_secret

NODE_ENV=development

node seed.js

npm run dev

 or

node server.js


Local Setup (frontend)

cd frontend

npm install

Configure api/axios.js baseURL:
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"
});

npm run dev

Resume: https://drive.google.com/file/d/12YbIqNcsPGtvfGkl15mpUWQtLYuVye3I/view?usp=drive_link














