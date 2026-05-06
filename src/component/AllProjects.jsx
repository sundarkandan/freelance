import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ExternalLink, Globe } from 'lucide-react'; // Added icons

// Imports for images
import AIBuilder from './AIBuilder.png';
import att from './attendance.png';
import movie from './movie.png';
import mern_Portfolio from "./mern_portfolio.png"
import food_landing from "./food_landing.png"

const AllProjects = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const theme = {
        bg: darkMode ? "#0a0f0a" : "#f0f9f0", 
        card: darkMode ? "#161d16" : "#ffffff",
        text: darkMode ? "#e2e8f0" : "#0f172a",
        border: darkMode ? "#242c24" : "#e2e8f0",
        accent: "#22c55e", 
    };

    const allProjects = [
        { 
            id: 1, 
            name: "AI Website Designer", 
            img: AIBuilder, 
            dis: "High-performance AI engine generating professional landing pages via prompts.", 
            tags: ["MongoDB", "React", "Node"], 
            category: "Full Stack",
            demoLink: "https://your-demo-link.com" // Live Link
        },
        { 
            id: 2, 
            name: "Movie Booking Pro", 
            img: movie, 
            dis: "Real-time seat selection and ticket management system with secure checkout.", 
            tags: ["React", "Express", "Node"], 
            category: "Full Stack",
            demoLink: null // Not Available
        },
        { 
            id: 3, 
            name: "Attendance Master", 
            img: att, 
            dis: "Smart student tracking system with automated reporting and analytics.", 
            tags: ["MongoDB", "Node", "Tailwind"], 
            category: "Full Stack",
            demoLink: "https://your-demo-link.com" 
        },
        { 
            id: 4, 
            name: "Gourmet Shop", 
            img: food_landing, 
            dis: "Premium food delivery landing page with high-conversion UI elements.", 
            tags: ["React", "tailwind"], 
            category: "Landing Page",
            demoLink: "https://your-demo-link.com"
        },
        { 
            id: 5, 
            name: "Developer Portfolio", 
            img: mern_Portfolio, 
            dis: "A sleek, dark-themed showcase for full-stack developers and creators.", 
            tags: ["React", "Tailwind"], 
            category: "Portfolio",
            demoLink: null 
        }
    ];

    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Full Stack", "Landing Page", "Portfolio"];

    return (
        <div 
            className="min-h-screen transition-colors duration-500 font-sans"
            style={{ backgroundColor: theme.bg, color: theme.text }}
        >
            <nav 
                className="sticky top-0 z-50 backdrop-blur-xl border-b-2 transition-colors duration-500"
                style={{ backgroundColor: `${theme.card}cc`, borderColor: theme.border }}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                        <div 
                            className="p-2 rounded-xl transition-all"
                            style={{ backgroundColor: theme.text, color: theme.bg }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span style={{ color: theme.text }}>Back</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-[11px] font-black tracking-[0.3em] uppercase opacity-40">SundarDev</div>
                        <button 
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-3 rounded-full transition-all hover:scale-110 active:scale-95 border"
                            style={{ backgroundColor: theme.card, borderColor: theme.border }}
                        >
                            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <header className="mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl md:text-7xl font-black tracking-tighter mb-4"
                    >
                        Project <span style={{ color: theme.accent }}>Gallery</span>
                    </motion.h1>
                    <p className="opacity-60 font-medium text-lg">Detailed overview of my technical implementations.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
                    <div 
                        className="flex p-1.5 rounded-2xl gap-1 transition-colors"
                        style={{ backgroundColor: darkMode ? "#1c251c" : "#e2ede2" }}
                    >
                        {categories.map((tab) => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveCategory(tab)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    activeCategory === tab 
                                    ? "shadow-md scale-105" 
                                    : "opacity-50 hover:opacity-100"
                                }`}
                                style={{ 
                                    backgroundColor: activeCategory === tab ? theme.card : "transparent",
                                    color: activeCategory === tab ? theme.accent : theme.text
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search by title..."
                            className="w-full border-2 rounded-2xl px-6 py-3.5 text-sm transition-all outline-none shadow-sm"
                            style={{ 
                                backgroundColor: theme.card, 
                                borderColor: theme.border,
                                color: theme.text
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div 
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -8 }}
                                className="group rounded-[2.5rem] overflow-hidden border-2 shadow-sm transition-all duration-400 flex flex-col h-full"
                                style={{ 
                                    backgroundColor: theme.card, 
                                    borderColor: theme.border 
                                }}
                            >
                                <div className="p-3">
                                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-black/5">
                                        <img 
                                            src={project.img} 
                                            alt={project.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <span 
                                                className="backdrop-blur text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white"
                                                style={{ backgroundColor: `${theme.accent}cc` }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-10 pt-4 flex flex-col flex-grow">
                                    <h3 
                                        className="text-2xl font-black tracking-tight mb-3 transition-colors"
                                        style={{ color: theme.text }}
                                    >
                                        {project.name}
                                    </h3>
                                    <p className="opacity-60 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                                        {project.dis}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map(tag => (
                                            <span 
                                                key={tag} 
                                                className="text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-colors"
                                                style={{ 
                                                    backgroundColor: darkMode ? "#1c251c" : "#f1f5f1",
                                                    borderColor: theme.border,
                                                    color: theme.accent
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* --- NEW BUTTON SECTION --- */}
                                    <div className="mt-auto">
                                        {project.demoLink ? (
                                            <a 
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-95 text-white"
                                                style={{ backgroundColor: theme.accent }}
                                            >
                                                <Globe size={16} />
                                                Live Demo
                                                <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <button 
                                                disabled
                                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm opacity-50 cursor-not-allowed border-2 transition-all"
                                                style={{ 
                                                    borderColor: theme.border,
                                                    color: theme.text,
                                                    backgroundColor: darkMode ? "#1c251c" : "#f1f5f1"
                                                }}
                                            >
                                                Demo Not Available
                                            </button>
                                        )}
                                    </div>
                                    {/* -------------------------- */}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <footer className="py-20 text-center border-t-2 mt-20" style={{ borderColor: theme.border }}>
                <p className="opacity-40 font-black text-[10px] uppercase tracking-[0.4em]">© 2026 Crafted by Sundar</p>
            </footer>
        </div>
    );
};

export default AllProjects;