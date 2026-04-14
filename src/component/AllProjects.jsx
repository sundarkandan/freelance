import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AIBuilder from './AIBuilder.png';
import att from './attendance.png';
import movie from './movie.png';
import mern_Portfolio from "./mern_portfolio.png"
import food_landing from "./food_landing.png"

const AllProjects = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const allProjects = [
        {
            id: 1,
            name: "AI Powered Website Designer",
            img: AIBuilder, 
            dis: "A high-performance AI engine that generates landing pages based on user prompts.",
           tags: ["MONGO DB","Expres.js","react.js","node.js","tailwind.css"],
            category: "Full Stack",
            access:"gitHub"
        },
        {
            id: 2,
            name: "Movie Ticket Booking system",
            img: movie,
            dis: "book your tickets and manage the booked tickets",
            tags: ["MONGO DB","Expres.js","react.js","node.js"],
            category: "Full Stack",
            access:"gitHub"
        },
        {
            id: 3,
            name: "Attendance system",
            img: att,
            dis: "Manage the students attendace",
            tags: ["MONGO DB","Expres.js","react.js","node.js"],
            category: "Full Stack",
            access:"gitHub"
        },
        {
            id: 4,
            name: "Food Shop",
            img: food_landing,
            dis: "Landing page for food shop ",
            tags: ["React","tailwind.css"],
            category: "Landing Page",
            access:"gitHub"
        },
         {
            id: 4,
            name: "Mern stack developer",
            img: mern_Portfolio,
            dis: "Portfolio for mern stack developer ",
            tags: ["React","tailwind.css"],
            category: "Portfolio",
            access:"gitHub"
        }
    ];

    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Full Stack", "Landing Page", "Portfolio"];

    return (
        <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans selection:bg-blue-100">
            {/* Minimal Nav */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </Link>
                    <div className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">Archive / 2026</div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-24">
                {/* Header Section */}
                <header className="max-w-2xl mb-20">
                    <h1 className="text-6xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Selected <br />
                        <span className="text-slate-400 font-medium">Works</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        A curation of projects focused on interaction, interface, and clean architecture.
                    </p>
                </header>

                {/* Professional Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row gap-8 mb-20 items-start lg:items-center justify-between">
                    {/* Segmented Control Filter */}
                    <div className="bg-slate-100/50 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/50">
                        {categories.map((tab) => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveCategory(tab)}
                                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === tab ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {activeCategory === tab && (
                                    <motion.div 
                                        layoutId="activePill"
                                        className="absolute inset-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full lg:w-80 group">
                        <input 
                            type="text" 
                            placeholder="Find a project..."
                            className="w-full bg-slate-100/50 border border-transparent rounded-2xl px-5 py-3 pl-12 text-sm focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-400 font-medium"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div 
                                layout
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="group cursor-pointer"
                            >
                                {/* Subtle Image Card */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 mb-8 border border-slate-200/50">
                                    <img 
                                        src={project.img} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105" 
                                    />
                                    
                                </div>

                                {/* Content Section */}
                                <div className="space-y-4 px-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black tracking-widest uppercase text-blue-600 bg-blue-50/50 px-3 py-1 rounded-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-slate-500 text-base leading-relaxed font-medium line-clamp-2">
                                        {project.dis}
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 pt-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold text-slate-300">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-slate-100">
                <p className="text-slate-400 text-sm font-medium">© 2026 / Crafted by Sundar</p>
            </footer>
        </div>
    );
};

export default AllProjects;