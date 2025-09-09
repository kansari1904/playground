const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Profile = require("./models/Profile");
const connectDB = require("./config/database")

dotenv.config();

const seedData = async () => {
    try {
        connectDB()

        await Profile.deleteMany({});
        const profile = await Profile.create({
            name: "Khalid Ansari",
            email: "kansari1904@gmail.com",
            education: "Bachelor of Engineering in Computer Science and Engineering",
            skills: [
                "Java",
                "Javascript",
                "HTML",
                "CSS",
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "MySQL",
                "Redis",
                "Docker"
            ],
            projects: [
                {
                    title: "CodeGyan E-Learning Platform",
                    description:
                        "Designed and developed a full-stack e-learning platform with over 30+ interactive coding tutorials, 50+ challenges and multi- role support for Admin, Instructor, and Student",
                    skills: ["Node js", "Express.js", "Mongodb", "React.js", "Tailwind CSS"],
                    links: ["https://code-gyan.vercel.app/"],
                },
                {
                    title: "URL Shortener Web App",
                    description:
                        " Developed a full-stack URL shortener application that converts long URLs into short, shareable links.",
                    skills: ["Node js", "Express.js", "Mongodb", "EJS", "JWT Auth", "Tailwind CSS"],
                    links: ["https://github.com/kansari1904/URL-Shortener"],
                },
                {
                    title: "Flight Booking Website",
                    description:
                        "Developed a dynamic flight booking web application with a user-friendly interface for searching and filtering flights.",
                    skills: ["React.js", "Tailwind css"],
                    links: ["https://flight-booking-six-theta.vercel.app/"],
                },
                {
                    title: "Guest House Website",
                    description:
                        "A fully responsive and modern website redesign for King Sukh Guest House, built using React.js, Tailwind CSS, and GSAP for smooth animations. The project focuses on enhancing user experience with interactive elements, clean UI design, and mobile-friendly layouts.",
                    skills: ["React.js", "Tailwind css"],
                    links: ["https://guest-house-iota.vercel.app/"],
                },

            ],
            work: [
                {
                    company: " InnoByte Services",
                    role: "Full Stack Developer",
                    startDate: new Date("2025-06-20"),
                    description: "Worked on multiple full-stack projects.",
                },
            ],
            links: {
                github: "https://github.com/kansari1904",
                linkedin: "https://www.linkedin.com/in/kansari1904/",
                portfolio: "",
            },
        });

        console.log("Profile seeded successfully:", profile.name);
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err.message);
        process.exit(1);
    }
};

seedData();
