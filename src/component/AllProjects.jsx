import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
const AllProjects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
 const server=import.meta.env.VITE_SERVER

   
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");


    const [allProjects,setProjects]=useState([])
    

    const filteredProjects = allProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
 useEffect(()=>{
        axios.get(server).then(res=>{
            setProjects(res.data)
            console.log(res.data)
        })
    },[])
    const categories = ["All", "full_stack", "landing_page", "portfolio"];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="group flex items-center gap-3 text-sm font-bold text-slate-800 uppercase tracking-tight">
                        <div className="p-2 bg-slate-900 text-white rounded-xl group-hover:bg-blue-600 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        Back
                    </Link>
                    <div className="text-[11px] font-black tracking-[0.3em] uppercase text-slate-400">Total project count is :{allProjects.length}</div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <header className="mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4"
                    >
                        Project <span className="text-blue-600">Gallery</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-lg">Detailed overview of my technical implementations.</p>
                </header>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
                    <div className="flex p-1.5 bg-slate-200/50 rounded-2xl gap-1">
                        {categories.map((tab) => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveCategory(tab)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    activeCategory === tab 
                                    ? "bg-white text-blue-600 shadow-md" 
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search by title..."
                            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-3.5 text-sm focus:border-blue-500 transition-all outline-none shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
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
                                className="group bg-white rounded-[2.5rem] overflow-hidden border-2 border-slate-200 hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-400"
                            >
                                {/* Image Section */}
                                <div className="p-3">
                                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100">
                                        <img 
                                            src={project.img} 
                                            alt={project.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="px-8 pb-10 pt-4">
                                    <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                                        {project.dis}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <footer className="py-20 text-center border-t-2 border-slate-100 mt-20">
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">© 2026 Crafted by Sundar</p>
            </footer>
        </div>
    );
};

export default AllProjects;