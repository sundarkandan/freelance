import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ExternalLink, Globe, Loader2 } from 'lucide-react'; // Added Loader2 icon

// Imports for images
import advocate from './portfolio_advocate.png'
import AIBuilder from './AIBuilder.png';
import att from './attendance.png';
import movie from './movie.png';
import mern_Portfolio from "./mern_portfolio.png"
import food_landing from "./food_landing.png"
import coffee from "./coffee.png"
import editor from "./editor.png"
import gym from "./gym.png"
import hair from "./hair.png"
import mech from "./mech.png"
import shoe from "./shoe.png"
import theatre from "./theatre.png"
import college from "./college.png"
import photo from "./photo_graphy.png"
import icecream from "./ice cream.jpg"

const AllProjects = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    
    // --- LOADING STATES ---
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const theme = {
        bg: darkMode ? "#0a0f0a" : "#f0f9f0", 
        card: darkMode ? "#161d16" : "#ffffff",
        text: darkMode ? "#e2e8f0" : "#0f172a",
        border: darkMode ? "#242c24" : "#e2e8f0",
        accent: "#22c55e", 
    };

    const allProjects = [
        { id: 1, name: "Landing page for movie Theatre", img: theatre, dis: "Immersive cinematic experience for modern movie discovery.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://singular-selkie-1eb9fc.netlify.app/" },
        { id: 2, name: "Portfoio website for Photographer", img: photo, dis: "Elegant visual gallery showcasing professional photographic mastery.", tags: ["html", "Tailwind"], category: "Portfolio", demoLink: "https://fancy-melba-fa3b19.netlify.app/" },
        { id: 3, name: "Developer Portfolio", img: mern_Portfolio, dis: "Sleek digital stage for full-stack technical excellence.", tags: ["html", "Tailwind"], category: "Portfolio", demoLink: "https://phenomenal-piroshki-2d6071.netlify.app/" },
        { id: 4, name: "Portfolio for Video Editor", img: editor, dis: "High-impact gallery spotlighting cinematic storytelling skills.", tags: ["html", "Tailwind"], category: "Portfolio", demoLink: "https://incomparable-frangollo-559c21.netlify.app/" },
        { id: 5, name: "Coffee Shop Landing Page", img: coffee, dis: "Immersive digital experience for modern coffee connoisseurs.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://resilient-vacherin-853bc8.netlify.app/" },
        { id: 6, name: "Landing page for Saloon", img: hair, dis: "Refined digital concierge for luxury grooming services.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://gorgeous-starship-134b4e.netlify.app/" },
        { id: 7, name: "Portfolio for Advocate", img: advocate, dis: "Authoritative digital presence tailored for legal professionals.", tags: ["html", "Tailwind"], category: "Portfolio", demoLink: "https://luminous-souffle-3499c1.netlify.app/" },
        { id: 8, name: "Landing page for GYM", img: gym, dis: "High-energy interface engineered to drive fitness memberships.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://astonishing-granita-4062e4.netlify.app/" },
        { id: 9, name: "AI Website Designer", img: AIBuilder, dis: "Intelligent engine generating production-ready landing pages.", tags: ["MongoDB", "React", "Node"], category: "Full Stack", demoLink: null },
        { id: 10, name: "Movie Booking Pro", img: movie, dis: "Sophisticated reservation system with real-time seat mapping.", tags: ["React", "Express", "Node"], category: "Full Stack", demoLink: null },
        { id: 11, name: "Attendance Master", img: att, dis: "Advanced tracking system with automated student analytics.", tags: ["MongoDB", "Node", "Tailwind"], category: "Full Stack", demoLink: null },
        { id: 12, name: "Gourmet Shop", img: food_landing, dis: "Stunning culinary storefront with conversion-optimized UI.", tags: ["html", "tailwind"], category: "Landing Page", demoLink: null },
        { id: 13, name: "Landing page for Shoe Shop", img: shoe, dis: "Premium retail experience for modern footwear enthusiasts.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://astounding-monstera-550d6f.netlify.app/" },
        { id: 14, name: "Landing page for College", img: college, dis: "Modern academic portal fostering seamless student engagement.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://regal-concha-3b58ea.netlify.app/" },
        { id: 15, name: "Landing page for Ice Cream Parlour", img: icecream, dis: "Vibrant digital storefront for premium dessert discovery.", tags: ["html", "Tailwind"], category: "Landing Page", demoLink: "https://magenta-stroopwafel-b36ac6.netlify.app/" }
    ];

    // --- EFFECT FOR PRELOADING IMAGES ---
    useEffect(() => {
        window.scrollTo(0, 0);

        // Filter projects that actually have an image source loaded
        const imagesToLoad = allProjects.map(p => p.img).filter(Boolean);
        let loadedCount = 0;

        if (imagesToLoad.length === 0) {
            setImagesLoaded(true);
            return;
        }

        imagesToLoad.forEach((src) => {
            const img = new Image();
            img.src = src;
            
            // Success handler
            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / imagesToLoad.length) * 100));
                if (loadedCount === imagesToLoad.length) {
                    setTimeout(() => setImagesLoaded(true), 600); // Small buffer for smooth exit animation
                }
            };

            // Error handler (in case an image path fails, it won't get stuck)
            img.onerror = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / imagesToLoad.length) * 100));
                if (loadedCount === imagesToLoad.length) {
                    setTimeout(() => setImagesLoaded(true), 600);
                }
            };
        });
    }, []);

    const handleOrderClick = (projectName) => {
        const phoneNumber = "919597732047";
        const message = `Hello Sundar! I'm interested in your project: *${projectName}*. Could you provide more details about the features and pricing?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Full Stack", "Landing Page", "Portfolio"];

    return (
        <div 
            className="min-h-screen transition-colors duration-500 font-sans relative"
            style={{ backgroundColor: theme.bg, color: theme.text }}
        >
            {/* --- ANIMATED LOADING SCREEN --- */}
            <AnimatePresence>
                {!imagesLoaded && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
                        style={{ backgroundColor: theme.bg }}
                    >
                        <div className="flex flex-col items-center gap-6 max-w-xs w-full px-4">
                            {/* Animated Lucide Icon */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                            >
                                <Loader2 size={44} style={{ color: theme.accent }} />
                            </motion.div>

                            {/* Loading Info Text */}
                            <div className="text-center">
                                <h2 className="text-xl font-black tracking-tight mb-1" style={{ color: theme.text }}>
                                    Loading Gallery
                                </h2>
                                <p className="text-xs opacity-50 uppercase tracking-widest font-semibold">
                                    Optimizing Asset Quality {loadingProgress}%
                                </p>
                            </div>

                            {/* Progress Bar Container */}
                            <div 
                                className="w-full h-1.5 rounded-full overflow-hidden"
                                style={{ backgroundColor: darkMode ? "#1c251c" : "#e2ede2" }}
                            >
                                <motion.div 
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: theme.accent }}
                                    animate={{ width: `${loadingProgress}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN MAIN APP CONTENT --- */}
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
                        <div className="hidden md:block text-[11px] font-black tracking-[0.3em] uppercase opacity-40">total Project count : {allProjects.length}</div>
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

                                    <div className="mt-auto flex flex-col gap-3">
                                        {project.demoLink ? (
                                            <motion.a 
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ 
                                                    scale: 1.03,
                                                    boxShadow: `0 15px 30px -10px ${theme.accent}aa`,
                                                    filter: "brightness(1.1)"
                                                }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all text-white"
                                                style={{ 
                                                    backgroundColor: theme.accent,
                                                }}
                                            >
                                                <Globe size={16} />
                                                View Live Demo
                                                <ExternalLink size={14} />
                                            </motion.a>
                                        ) : (
                                            <div 
                                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm opacity-40 border-2 border-dashed"
                                                style={{ borderColor: theme.border, color: theme.text }}
                                            >
                                                Preview not Available
                                            </div>
                                        )}

                                        <motion.button 
                                            onClick={() => handleOrderClick(project.name)}
                                            whileHover={{ 
                                                scale: 1.03,
                                                backgroundColor: "#25D366",
                                                color: "#ffffff" 
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm transition-all border-2"
                                            style={{ 
                                                borderColor: "#25D366", 
                                                color: "#25D366",
                                                backgroundColor: "transparent" 
                                            }}
                                        >
                                            Inquire via WhatsApp
                                        </motion.button>
                                    </div>
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