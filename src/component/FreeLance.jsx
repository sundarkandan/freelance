    import React from 'react';
    import { useState,useRef,useEffect } from 'react';

    import Img from './sundar.jpeg'
    import AIBuilder from './AIBuilder.png'
    import att from './attendance.png'
    import movie from './movie.png'
   import AOS from 'aos';
   import About from "./about.jpeg"
    import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
    const FreeLance = () => {
        // AOS Initialization
    useEffect(() => {
        AOS.init({
            duration: 1000,
       
           
        });
    }, []);
        const [isMenuOpen, setIsMenuOpen] = useState(false)
    const form = useRef();
    const TypedText = ({ words }) => {
    const [index, setIndex] = React.useState(0);
    const [subIndex, setSubIndex] = React.useState(0);
    const [reverse, setReverse] = React.useState(false);

    // Typing logic
    React.useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
        setTimeout(() => setReverse(true), 2000); // Wait before deleting
        return;
        }

        if (subIndex === 0 && reverse) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
        }

        const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150); // Typing speed vs Deleting speed

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return <span>{`${words[index].substring(0, subIndex)}`}</span>;
    };
    return (
        <>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
    

        {/* Navigation */}
        <nav data-aos="fade" data-aos- className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Logo - Left Side */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sundar K
            </div>
            
            {/* Desktop Menu - Pushed to the Right */}
            <div className="hidden md:flex items-center gap-8"> 
                <div className="flex space-x-8 font-medium text-slate-600">
                    <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
                    <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
                    <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
                    <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
                    <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                </div>

            
            </div>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-b border-slate-200 shadow-xl`}>
            <div className="px-6 py-6 flex flex-col gap-4">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900">Home</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900">About</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900">Projects</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900">Pricing</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-900">Contact</a>
            </div>
        </div>
    </nav>

        {/* Home Section */}
        <section id="home" className="pt-32 pb-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left z-10">
                        <span data-aos="zoom-out" data-aos-delay='200' className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
                            AVAILABLE FOR NEW PROJECTS
                        </span>
                        <h1  data-aos="zoom-out" data-aos-delay='400' className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Building Digital <br />
                            <span className="text-blue-600">Experiences That</span> <br />
                            Scale Your Business.
                        </h1>
                        <p  data-aos="zoom-out" data-aos-delay='800'  className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
                            I specialize in creating high-performance, responsive, and aesthetically pleasing websites using the latest MERN stack technologies.
                        </p>
                       
                    </div>
                    
                    <div className="relative" data-aos="zoom-out" data-aos-delay='1000'>
                        <div className="w-full aspect-square rounded-3xl bg-slate-100 overflow-hidden relative z-10 border-8 border-white shadow-2xl">
                            <img 
                                src={Img}
                                alt="Profile" 
                                className="w-full borders h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/40 rounded-full blur-3xl -z-0"></div>
                        
                        <div className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce delay-700 z-20">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Tech Stack</div>
                                <div className="text-sm font-bold">MERN Expert</div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse z-20">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 text-xl font-bold">
                                $
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Availability</div>
                                <div className="text-sm font-bold text-green-600">Open for Hire</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative"  data-aos="fade-up">
                        <div className="w-full aspect-square rounded-3xl bg-slate-100 overflow-hidden relative z-10 border-8 border-white shadow-2xl">
                            <img 
                                src={About}
                                alt="Profile" 
                                className="w-full borders h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100 rounded-3xl -z-0"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-50 rounded-full -z-0"></div>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className="text-4xl font-bold mb-6">Hi, I am sundar a Professional</h2>
                        {/* About Section-la intha edathula update pannunga */}
    <div className="text-3xl font-mono font-bold text-blue-600 mb-6 flex items-center">
        <TypedText words={["Full Stack Developer", "MERN Stack Expert", "Freelance Web Builder"]} />
        <span className="typing-cursor"></span>
    </div>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            With over 1 years of experience in the MERN stack, I transform complex business requirements into elegant web solutions. I focus on clean code, performance optimization, and user-centric design.
                        </p>
                    
                    </div>
                </div>
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-slate-50">
    <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-slate-600">A selection of my recent works across different industries.</p>
            </div>
            
            {/* View All Projects Link */}
            <Link 
                to="/projects" 
                className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
                View All Projects
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
            {[
                {name:"AI Powered Website Designer", img:AIBuilder, dis:"Build Your Website Designs"}, 
                {name:"Movie Ticket Booking", img:movie, dis:"book your tickets and manage the booked tickets"}, 
                {name:"college attendance system", img:att, dis:"Manage the students attendace"}
            ].map((item, idx) => (
                <div 
                    data-aos="fade-up" 
                    data-aos-delay={idx * 200} 
                    key={item.name} 
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                    <div className="h-56 bg-slate-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                        <div className="flex gap-2 mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-blue-50 text-blue-600 rounded">React</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-slate-100 text-slate-600 rounded">Node.js</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-slate-600 text-sm mb-4">{item.dis}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

        {/* Pricing Section */}
        {/* Pricing Section */}
    <section id="pricing" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-slate-600">Transparent pricing for every stage of your business.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
            
            {/* Basic Plan */}
            <div className="price-card p-8 rounded-3xl border border-slate-200 bg-white group hover:border-blue-400" data-aos="fade-up"  >
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Landing Page</h3>
                <div className="text-4xl font-black mb-6">₹499  <span className="text-sm font-medium text-slate-400">+hosting charges</span></div>
                <ul className="space-y-4 mb-8 text-slate-600 text-sm text-left">
                    <li className="flex items-center"><span className="mr-2 text-blue-400">✓</span>Dark Mode Light Mode Support</li>
                    <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Fully Responsive Design</li>
                    <li className="flex items-center"><span className="mr-2 text-green-500">✓</span>unlimited pages</li>
                </ul>
            
            </div>

            {/* Featured Plan (MERN) */}
            <div  data-aos="fade-up"  data-aos-delay={200} className="price-card overflow-hidden p-8 rounded-3xl bg-slate-900 text-white shadow-2xl scale-105 relative z-10 border-2 border-blue-500">
                <div className="absolute top-0 right-0 bg-blue-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest animate-pulse">Most Popular</div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">Portfolio</h3>
                <div className="text-4xl font-black mb-6">₹199</div>
                <ul className="space-y-4 mb-8 text-slate-300 text-sm text-left">
                    <li className="flex items-center"><span className="mr-2 text-blue-400">✓</span>Single Page</li>
                    <li className="flex items-center"><span className="mr-2 text-blue-400">✓</span>Responsive Design</li>
                    <li className="flex items-center"><span className="mr-2 text-blue-400">✓</span>Dark Mode Light Mode Support</li>
                   
                </ul>
            
            </div>
            {/* Enterprise Plan */}
            <div  data-aos="fade-up"  data-aos-delay={300} className="price-card p-8 rounded-3xl border border-slate-200 bg-white group hover:border-indigo-400">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">Full Stack</h3>
                <div className="text-4xl font-black mb-6">₹999 <span className="text-sm font-medium text-slate-400">+hosting charges</span></div>
                <ul className="space-y-4 mb-8 text-slate-600 text-sm text-left">
                    <li className="flex items-center"><span className="mr-2 text-indigo-500">✓</span> Unlimited Pages</li>
                    <li className="flex items-center"><span className="mr-2 text-indigo-500">✓</span>Custom Admin Dashboard</li>
                    <li className="flex items-center"><span className="mr-2 text-indigo-500">✓</span> Database Setup (MongoDB)</li>
                    <li className="flex items-center"><span className="mr-2 text-indigo-500">✓</span> 6 month support</li>
                </ul>
            
            </div>
            
        </div>
    </section>

    {/* Compact Contact Section */}
    {/* Contact Section - Added scroll-mt-32 for perfect alignment */}
    {/* Contact Section - Compact & Better Fit */}
    <section id="contact" className="py-16 px-6 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto"  data-aos="zoom-in" > {/* Max-width kuraichuruken for better look */}
            <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center">
                
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[12px] font-bold mb-4">
                        LET'S CONNECT
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                        Ready to start your <br />
                        <span className="text-blue-600">next big project?</span>
                    </h2>

                    <p className="text-base text-slate-500 mb-8 max-w-xl mx-auto">
                        I'm currently looking for new opportunities. 
                        Reach out via call or email!
                    </p>

                    {/* Contact Cards - Side by Side on Desktop */}
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {/* Call Card */}
                        <a href="tel:+919597732047" className="group p-6 bg-slate-900 rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg hover:-translate-y-1">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <h3 className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-white">Quick Call</h3>
                            <p className="text-white text-lg font-bold">+91 95977 32047</p>
                        </a>

                        {/* Email Card */}
                        <a href="mailto:sundarkandan23506@gmail.com" className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-blue-600">Send Email</h3>
                            <p className="text-slate-800 text-sm font-bold truncate">sundarkandan23506@gmail.com</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-xl font-bold text-slate-900">Sundar K</div>
                <div className="text-slate-500 text-sm">© 2024 Freelance Portfolio. All rights reserved.</div>
                <div className="flex gap-6 text-slate-400">
                    <p onClick={()=>{
                        window.open('https://www.linkedin.com/in/sundar-kandan/')
                    }} className="text-blue-600 transition-colors underline decoration-slate-200 pointer">LinkedIn</p>
                    
                    <p onClick={()=>{
                        window.open('https://github.com/sundarkandan')
                    }} className="text-blue-600 transition-colors underline decoration-slate-200 pointer">Github</p>

                    <p onClick={()=>{
                        window.open('https://www.instagram.com/sundardev_2006/')
                    }} className="text-blue-600 transition-colors underline decoration-slate-200 pointer">Instagram</p>
                </div>
            </div>
        </footer>
    </div>
        </>
    );
    };

    export default FreeLance;