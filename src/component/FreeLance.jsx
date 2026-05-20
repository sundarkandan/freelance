import { useState, useEffect, useRef } from "react";
import Profile from "./sundar.jpeg"
import About from "./about.jpeg"
import { useNavigate } from "react-router-dom";
import students from "./attendance.png"
import movie from "./movie.png"
import AIBuilder from "./AIBuilder.png"
import food from "./food_landing.png"
import portfolio from "./mern_portfolio.png"
import advocate from "./portfolio_advocate.png"
import Resume from "./K_Sundar_MERN_Stack_Developer_Resume.pdf"
// ─── Theme ────────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#080d08", bgSecondary: "#0c170c", bgCard: "#101a10",
    border: "#1c381c", text: "#e4f4e4", textMuted: "#5a825a", textSecondary: "#9ab89a",
    accent: "#22c55e", accentDim: "#16a34a", accentLight: "#4ade80",
    accentGlow: "rgba(34,197,94,0.13)", accentGlowStrong: "rgba(34,197,94,0.32)",
    surface: "rgba(8,13,8,0.85)", gradientHero: "linear-gradient(135deg,#080d08 0%,#0c170c 60%,#080d08 100%)",
    scrollTrack: "#0c170c", scrollThumb: "rgba(34,197,94,0.45)", scrollThumbHover: "#22c55e",
    navBg: "rgba(8,13,8,0.92)",
  },
  light: {
    bg: "#f2fbf2", bgSecondary: "#e6f7e6", bgCard: "#ffffff",
    border: "#b3ecc3", text: "#0d2410", textMuted: "#4a724a", textSecondary: "#2a602a",
    accent: "#16a34a", accentDim: "#15803d", accentLight: "#22c55e",
    accentGlow: "rgba(22,163,74,0.10)", accentGlowStrong: "rgba(22,163,74,0.22)",
    surface: "rgba(242,251,242,0.90)", gradientHero: "linear-gradient(135deg,#f2fbf2 0%,#dcfce7 60%,#f2fbf2 100%)",
    scrollTrack: "#d1fae5", scrollThumb: "rgba(22,163,74,0.50)", scrollThumbHover: "#16a34a",
    navBg: "rgba(242,251,242,0.95)",
  },
};

// ─── Images ───────────────────────────────────────────────────────────────────
const PROFILE_IMG = Profile;
const ABOUT_IMG   = About
const PROJECT_IMGS = [
  movie,
  students,
 AIBuilder,
  food,
  portfolio,
  advocate
  
];
const ALL_IMAGES = [PROFILE_IMG, ABOUT_IMG, ...PROJECT_IMGS];

// ─── Global style injector ────────────────────────────────────────────────────
function useGlobalStyles(t) {
  useEffect(() => {
    // FIX 1: Ensure viewport meta tag exists to prevent zoom on mobile
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

    let el = document.getElementById("sd-global");
    if (!el) { el = document.createElement("style"); el.id = "sd-global"; document.head.appendChild(el); }
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
      html { scroll-behavior:smooth; -webkit-text-size-adjust:100%; text-size-adjust:100%; }
      body { overflow-x:hidden; background:${t.bg}; -webkit-tap-highlight-color:transparent; }
      body.loading { overflow:hidden !important; position:fixed !important; width:100% !important; top:0 !important; left:0 !important; }
      ::selection { background:${t.accentGlow}; color:${t.accent}; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:${t.scrollTrack}; }
      ::-webkit-scrollbar-thumb { background:${t.scrollThumb}; border-radius:3px; }
      ::-webkit-scrollbar-thumb:hover { background:${t.scrollThumbHover}; }
      * { scrollbar-width: thin; scrollbar-color: ${t.scrollThumb} ${t.scrollTrack}; }

      @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:.15} }
      @keyframes blinkCursor  { 0%,100%{opacity:1} 50%{opacity:0}   }
      @keyframes pulse        { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
      @keyframes gridMove     { from{background-position:0 0} to{background-position:60px 60px} }
      @keyframes rotateSlow   { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
      @keyframes rotateSlowR  { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
      @keyframes floatOrb     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,26px)} }
      @keyframes floatCard    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes slideInL     { from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:translateX(0)} }
      @keyframes slideInR     { from{opacity:0;transform:translateX(50px)}  to{opacity:1;transform:translateX(0)} }
      @keyframes fadeInUp     { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
      @keyframes shimmer      { from{background-position:-200% 0} to{background-position:200% 0} }
      @keyframes revealUp     { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
      @keyframes revealLeft   { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
      @keyframes revealRight  { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
      @keyframes revealScale  { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
      @keyframes revealFade   { from{opacity:0} to{opacity:1} }
      @keyframes loadIn       { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

      .reveal { opacity:0; }
      .reveal.visible { animation-fill-mode:both; animation-duration:0.7s; animation-timing-function:cubic-bezier(0.22,1,0.36,1); }
      .reveal-up.visible     { animation-name:revealUp; }
      .reveal-left.visible   { animation-name:revealLeft; }
      .reveal-right.visible  { animation-name:revealRight; }
      .reveal-scale.visible  { animation-name:revealScale; }
      .reveal-fade.visible   { animation-name:revealFade; }

      /* ── TABLET (≤900px) ── */
      @media (max-width:900px){
        .hero-grid  { grid-template-columns:1fr!important; text-align:center; gap:40px!important; }
        /* FIX 2: On mobile, image comes first (order:-1) but below navbar — handled via padding-top on hero */
        .hero-right { order:-1; }
        .hero-btns  { justify-content:center!important; }
        .hero-bdgs  { justify-content:center!important; }
        .about-grid { grid-template-columns:1fr!important; gap:52px!important; }
        .proj-grid  { grid-template-columns:1fr 1fr!important; }
        .price-grid { grid-template-columns:1fr!important; }
        .contact-grid { grid-template-columns:1fr!important; }
        .foot-inner { flex-direction:column!important; align-items:center!important; text-align:center; }
        .nav-links  { display:none!important; }
        .nav-ham    { display:flex!important; }
        /* FIX 3: Float cards hidden on mobile to avoid overflow */
        .hero-float-card { display:none!important; }
      }

      /* ── MOBILE (≤600px) ── */
      @media (max-width:600px){
        .proj-grid  { grid-template-columns:1fr!important; }
        .sec-pad    { padding:72px 16px!important; }
        /* FIX 2: Hero section gets enough top padding so profile pic clears the navbar */
        .hero-sec   { padding:100px 16px 60px!important; min-height:100svh!important; }
        .nav-bar    { padding:12px 16px!important; }
        /* FIX 4: Orbital rings scale down on small screens */
        .pr1        { width:220px!important; height:220px!important; }
        .pr2        { width:185px!important; height:185px!important; }
        .pimg       { width:155px!important; height:155px!important; }
        /* Smaller orb container on mobile */
        .hero-orb-wrap { height:240px!important; }
        .contact-grid { grid-template-columns:1fr!important; max-width:100%!important; }
        /* Pricing adjustments */
        .price-grid > div { transform:none!important; }
      }
    `;
  }, [t]);
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add("visible"), Number(delay));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ progress, done }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#080d08",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 1s ease",
      opacity: done ? 0 : 1,
      pointerEvents: done ? "none" : "all",
    }}>
      <div style={{
        position: "absolute", width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(28px, 6vw, 50px)",
        fontWeight: 700,
        letterSpacing: 2,
        opacity: 0,
        animation: "loadIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
        marginBottom: 10,
      }}>
        <span style={{ color: "#22c55e", textShadow: "0 0 28px rgba(34,197,94,0.55)" }}>Welcome</span>
        
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: 6,
        color: "rgba(34,197,94,0.35)",
        textTransform: "uppercase",
        marginBottom: 56,
        opacity: 0,
        animation: "loadIn 0.7s ease 0.35s forwards",
      }}>
        MERN Stack Developer
      </div>
      <div style={{
        width: "min(240px, 55vw)",
        height: 1,
        background: "rgba(34,197,94,0.08)",
        borderRadius: 1,
        overflow: "hidden",
        opacity: 0,
        animation: "loadIn 0.5s ease 0.5s forwards",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
          borderRadius: 1,
          transition: "width 0.3s ease",
          boxShadow: "0 0 8px rgba(34,197,94,0.8)",
        }} />
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        color: "rgba(34,197,94,0.3)",
        letterSpacing: 3,
        marginTop: 16,
        opacity: 0,
        animation: "loadIn 0.5s ease 0.6s forwards",
      }}>
        {String(Math.round(progress)).padStart(3, "0")}%
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ theme, t, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ["home","about","projects","pricing","contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // FIX 5: Close mobile menu on resize to desktop
  useEffect(() => {
    const h = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // FIX 6: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const goTo = id => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="nav-bar" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        padding: scrolled ? "10px 40px" : "18px 40px",
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all 0.4s ease",
      }}>
        <div onClick={()=>goTo("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:21,fontWeight:700}}>
            <span style={{color:t.accent,textShadow:`0 0 14px ${t.accentGlowStrong}`}}>sundar</span>
           
          </span>
          <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,boxShadow:`0 0 8px ${t.accent}`,animation:"blink 1.5s infinite",flexShrink:0}}/>
        </div>

        {/* Desktop nav */}
        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:28}}>
          {navItems.map(item=>(
            <button key={item} onClick={()=>goTo(item)} style={{
              background:"none",border:"none",cursor:"pointer",
              fontFamily:"'Space Mono',monospace",fontSize:12,letterSpacing:1.2,
              color:activeSection===item?t.accent:t.textMuted,
              textTransform:"uppercase",position:"relative",padding:"4px 0",
              transition:"color 0.3s",
            }}>
              {item}
              {activeSection===item&&(
                <span style={{position:"absolute",bottom:-2,left:0,right:0,height:1,background:t.accent,boxShadow:`0 0 6px ${t.accent}`}}/>
              )}
            </button>
          ))}
        
        </div>
  <button onClick={toggleTheme} style={{
            background:t.accentGlow,border:`1px solid ${t.border}`,
            borderRadius:20,padding:"6px 16px",cursor:"pointer",color:t.accent,
            fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:1,
            transition:"all 0.3s",display:"flex",alignItems:"center",gap:6,
          }}>
            {theme==="dark"?"☀ LIGHT":"◉ DARK"}
          </button>
        {/* Hamburger */}
        <button className="nav-ham" onClick={()=>setMobileOpen(o=>!o)} style={{
          display:"none",flexDirection:"column",gap:5,
          background:"none",border:"none",cursor:"pointer",padding:4,
          // FIX 7: Ensure hamburger is always visible and tappable
          minWidth:32, minHeight:32, alignItems:"center", justifyContent:"center",
          zIndex:201,
        }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{
              display:"block",width:22,height:2,borderRadius:1,background:t.accent,transition:"all 0.3s",
              transform:mobileOpen&&i===0?"rotate(45deg) translate(5px,5px)":mobileOpen&&i===1?"scaleX(0)":mobileOpen&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen&&(
        <div style={{
          position:"fixed",inset:0,zIndex:199,
          background:t.bg,
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:32,
          // FIX 8: Prevent content from going under status bar on iOS
          paddingTop:"env(safe-area-inset-top)",
          paddingBottom:"env(safe-area-inset-bottom)",
        }}>
          {navItems.map(item=>(
            <button key={item} onClick={()=>goTo(item)} style={{
              background:"none",border:"none",cursor:"pointer",
              fontFamily:"'Space Mono',monospace",fontSize:22,letterSpacing:3,
              color:activeSection===item?t.accent:t.text,
              textTransform:"uppercase",
              // FIX 9: Larger tap targets on mobile
              padding:"8px 24px",
            }}>{item}</button>
          ))}
       
        </div>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ t }) {
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer","MERN Specialist","Freelancer","Backend Developer"];
  const [rIdx,setRIdx] = useState(0);
  const [cIdx,setCIdx] = useState(0);
  const [del,setDel] = useState(false);

  useEffect(() => {
    const cur = roles[rIdx];
    const id = setTimeout(() => {
      if (!del) {
        if (cIdx<cur.length) { setTyped(cur.slice(0,cIdx+1)); setCIdx(c=>c+1); }
        else setTimeout(()=>setDel(true),1800);
      } else {
        if (cIdx>0) { setTyped(cur.slice(0,cIdx-1)); setCIdx(c=>c-1); }
        else { setDel(false); setRIdx(r=>(r+1)%roles.length); }
      }
    }, del?38:78);
    return ()=>clearTimeout(id);
  },[cIdx,del,rIdx]);

  const goTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section id="home" className="hero-sec" style={{
      minHeight:"100vh",
      minHeight:"100svh", // FIX 10: Use svh for mobile browsers (accounts for address bar)
      background:t.gradientHero,
      display:"flex",alignItems:"center",
      // FIX 11: Generous top padding so profile image is never hidden under navbar on mobile
      padding:"100px 40px 60px",
      position:"relative",overflow:"hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position:"absolute",inset:0,
        backgroundImage:`linear-gradient(${t.border}66 1px,transparent 1px),linear-gradient(90deg,${t.border}66 1px,transparent 1px)`,
        backgroundSize:"60px 60px",animation:"gridMove 22s linear infinite",
      }}/>

      {/* Orbs - hidden on small mobile via media query to prevent layout issues */}
      {[{w:380,h:380,top:"8%",left:"55%",d:"0s"},{w:240,h:240,top:"62%",left:"8%",d:"1.1s"},{w:160,h:160,top:"28%",left:"78%",d:"0.6s"}].map((o,i)=>(
        <div key={i} style={{
          position:"absolute",width:o.w,height:o.h,borderRadius:"50%",
          background:`radial-gradient(circle,${t.accentGlow} 0%,transparent 70%)`,
          top:o.top,left:o.left,animation:`floatOrb 9s ease-in-out ${o.d} infinite`,
          pointerEvents:"none",
          // FIX 12: Clamp orb size so they don't cause horizontal overflow on mobile
          maxWidth:"60vw", maxHeight:"60vw",
        }}/>
      ))}

      <div className="hero-grid" style={{
        maxWidth:1200,margin:"0 auto",width:"100%",
        display:"grid",gridTemplateColumns:"1fr 1fr",
        gap:72,alignItems:"center",position:"relative",zIndex:1,
      }}>
        {/* Left: Text */}
        <div style={{animation:"slideInL 0.85s ease forwards"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${t.accent}40`,borderRadius:20,padding:"6px 16px",marginBottom:22,background:t.accentGlow,animation:"fadeInUp 0.6s ease 0.2s both"}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:t.accent,boxShadow:`0 0 10px ${t.accent}`,animation:"blink 1.5s infinite",flexShrink:0}}/>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.accent,letterSpacing:2,whiteSpace:"nowrap"}}>AVAILABLE FOR HIRE</span>
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5.8vw,74px)",fontWeight:800,lineHeight:1.05,color:t.text,margin:"0 0 6px",animation:"fadeInUp 0.6s ease 0.3s both"}}>Hi, I'm</h1>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(40px,6.5vw,80px)",fontWeight:800,lineHeight:1,color:t.accent,margin:"0 0 22px",animation:"fadeInUp 0.6s ease 0.4s both",position:"relative",display:"inline-block"}}>
            Sundar
            <span style={{position:"absolute",bottom:-4,left:0,right:0,height:3,borderRadius:2,background:`linear-gradient(90deg,transparent,${t.accent},transparent)`,backgroundSize:"200% 100%",animation:"shimmer 2.4s linear infinite"}}/>
          </h1>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(13px,1.8vw,20px)",color:t.textSecondary,marginBottom:28,minHeight:30,animation:"fadeInUp 0.6s ease 0.5s both"}}>
            <span style={{color:t.accentDim}}>&gt; </span>
            {typed}
            <span style={{display:"inline-block",width:2,height:"0.9em",background:t.accent,marginLeft:2,verticalAlign:"middle",animation:"blinkCursor 0.7s step-end infinite"}}/>
          </div>
          <p style={{color:t.textMuted,fontSize:15,lineHeight:1.85,maxWidth:460,marginBottom:36,fontFamily:"'DM Sans',sans-serif",animation:"fadeInUp 0.6s ease 0.6s both"}}>
            Crafting scalable, production-ready web apps with MongoDB, Express, React &amp; Node.js. From pixel-perfect UI to robust APIs — I build digital products that perform.
          </p>
          <div className="hero-btns" style={{display:"flex",gap:14,flexWrap:"wrap",animation:"fadeInUp 0.6s ease 0.7s both"}}>
            <button onClick={()=>goTo("projects")} style={{background:`linear-gradient(135deg,${t.accent},${t.accentDim})`,border:"none",borderRadius:4,padding:"13px 30px",color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,letterSpacing:1,cursor:"pointer",textTransform:"uppercase",boxShadow:`0 4px 22px ${t.accentGlowStrong}`,transition:"all 0.3s ease"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 32px ${t.accentGlowStrong}`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 4px 22px ${t.accentGlowStrong}`;}}
            >View Projects</button>
            <button onClick={()=>window.open(Resume)} style={{background:"transparent",border:`1px solid ${t.accent}`,borderRadius:4,padding:"13px 30px",color:t.accent,fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,letterSpacing:1,cursor:"pointer",textTransform:"uppercase",transition:"all 0.3s ease"}}
              onMouseEnter={e=>{e.currentTarget.style.background=t.accentGlow;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}
            >Resume</button>
          </div>
          <div className="hero-bdgs" style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:44,animation:"fadeInUp 0.6s ease 0.8s both"}}>
            {["MongoDB","Express","React","Node.js","TypeScript","REST API"].map(tech=>(
              <span key={tech} style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:0.8,color:t.textMuted,border:`1px solid ${t.border}`,borderRadius:2,padding:"4px 10px",background:t.accentGlow}}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Right: Profile image + orbital rings */}
        <div className="hero-right hero-orb-wrap" style={{
          display:"flex",justifyContent:"center",alignItems:"center",
          animation:"slideInR 0.85s ease forwards",position:"relative",
          // FIX 13: Fixed height container so float-cards don't push layout
          height:360,
        }}>
          <div className="pr1" style={{position:"absolute",width:370,height:370,borderRadius:"50%",border:`1px solid ${t.accent}28`,animation:"rotateSlow 22s linear infinite"}}>
            {[0,90,180,270].map(deg=>(
              <span key={deg} style={{position:"absolute",width:9,height:9,borderRadius:"50%",background:t.accent,boxShadow:`0 0 10px ${t.accent}`,top:"50%",left:"50%",transformOrigin:"0 0",transform:`rotate(${deg}deg) translateX(184px) translateY(-50%)`}}/>
            ))}
          </div>
          <div className="pr2" style={{position:"absolute",width:308,height:308,borderRadius:"50%",border:`1px dashed ${t.accent}18`,animation:"rotateSlowR 32s linear infinite"}}/>
          <div className="pimg" style={{width:300,height:300,borderRadius:"50%",overflow:"hidden",border:`3px solid ${t.accent}`,boxShadow:`0 0 0 8px ${t.accentGlow}, 0 0 55px ${t.accentGlowStrong}`,position:"relative",zIndex:1,flexShrink:0}}>
            <img src={PROFILE_IMG} alt="Sundar" style={{width:"100%",height:"100%",objectFit:"cover",filter:"contrast(1.06) saturate(0.92)"}}/>
          </div>

          {/* FIX 14: Float cards have hero-float-card class; hidden on mobile */}
          <div className="hero-float-card" style={{position:"absolute",bottom:"-8%",left:"-10%",background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:8,padding:"12px 18px",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",animation:"floatCard 4s ease-in-out infinite",zIndex:2}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:20,fontWeight:700,color:t.accent}}>0</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:t.textMuted,marginTop:2}}>Projects Delivered</div>
          </div>
          <div className="hero-float-card" style={{position:"absolute",top:"-8%",right:"-10%",background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:8,padding:"12px 18px",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",animation:"floatCard 4s ease-in-out 1.1s infinite",zIndex:2}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:20,fontWeight:700,color:t.accent}}>4yr</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:t.textMuted,marginTop:2}}>Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionDivider({t}){
  return <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${t.accent},transparent)`}}/>;
}
function SectionHeader({number,eyebrow,title,accent,t}){
  return (
    <div className="reveal reveal-up" style={{textAlign:"center",marginBottom:72}}>
      <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.accent,letterSpacing:4}}>{number}. {eyebrow}</span>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4.5vw,54px)",fontWeight:800,color:t.text,margin:"10px 0 0"}}>
        {title} <span style={{color:t.accent}}>{accent}</span>
      </h2>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection({t}){
  const skills=[
    {name:"html / css",pct:95},
    {name:"java script",pct:88},{name:"React Js",pct:85},
    {name:"Node js",pct:90},{name:"Express js",pct:78},{name:"mongoDb",pct:80}
  ];
  return (
    <section id="about" className="sec-pad" style={{padding:"110px 40px",background:t.bgSecondary,position:"relative"}}>
      <SectionDivider t={t}/>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionHeader number="01" eyebrow="WHO I AM" title="About" accent="Me" t={t}/>
        <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
          <div className="reveal reveal-left" style={{position:"relative"}}>
            <div style={{position:"absolute",top:18,left:18,right:-18,bottom:-18,border:`1px solid ${t.accent}35`,borderRadius:4}}/>
            <div style={{borderRadius:4,overflow:"hidden",border:`1px solid ${t.border}`,position:"relative",zIndex:1}}>
              <img src={ABOUT_IMG} alt="About" style={{width:"100%",height:600,objectFit:"cover",display:"block",filter:"contrast(1.04)",transition:"transform 0.5s ease"}}
                onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
                onMouseLeave={e=>e.target.style.transform="scale(1)"}
              />
              <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 55%,${t.bg}bb 100%)`}}/>
            </div>
            <div style={{position:"absolute",bottom:-28,right:-8,zIndex:2,background:t.accent,borderRadius:4,padding:"14px 22px",textAlign:"center"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#fff",lineHeight:1}}>3</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.85)",letterSpacing:1.5,marginTop:4}}>MAJOR PROJECTS</div>
            </div>
          </div>
          <div className="reveal reveal-right" data-delay="100">
            <p style={{color:t.textSecondary,fontSize:16,lineHeight:1.9,fontFamily:"'DM Sans',sans-serif",marginBottom:28}}>
              I'm <strong style={{color:t.accent}}>Sundar</strong>, a passionate MERN Stack Developer from Tirunelveli, India with 2+ years of experience building full-stack web applications. I specialise in transforming complex business requirements into clean, scalable code.
            </p>
            <p style={{color:t.textMuted,fontSize:14,lineHeight:1.8,fontFamily:"'DM Sans',sans-serif",marginBottom:36}}>
              From crafting pixel-perfect React interfaces to designing fault-tolerant Node.js APIs, I bring end-to-end ownership to every project. I thrive in collaborative environments and love turning ideas into real, working products.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {skills.map((s,i)=>(
                <div key={s.name} className="reveal reveal-fade" data-delay={`${i * 80}`}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:t.textSecondary}}>{s.name}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:t.accent}}>{s.pct}%</span>
                  </div>
                  <div style={{height:3,background:t.border,borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${s.pct}%`,background:`linear-gradient(90deg,${t.accentDim},${t.accent})`,borderRadius:2,boxShadow:`0 0 8px ${t.accent}55`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS=[
    {title:"Advocate Portfolio",tech:["html","tailwind css"],img:PROJECT_IMGS[5],tag:"portfolio Website",desc:"Impressive portfolio design for Advocate"},
    {title:"Hotel Landing page",tech:["html","tailwind css"],img:PROJECT_IMGS[3],tag:"landing website",desc:"impressive landing page design for hotel"},
    {title:"Developer Portfolio",tech:["html","tailwind css"],img:PROJECT_IMGS[4],tag:"portfolio website",desc:"Impressive portfolio design for Advocate"},
  
  
];

function ProjectCard({ p, i, t, hov, setHov }) {
  return (
    <div
      className="reveal reveal-scale"
      data-delay={`${i * 100}`}
      onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
      style={{
        background:t.bgCard, border:`1px solid ${hov===i?t.accent:t.border}`,
        borderRadius:6, overflow:"hidden", cursor:"pointer",
        transition:"all 0.32s ease",
        transform:hov===i?"translateY(-8px)":"translateY(0)",
        boxShadow:hov===i?`0 18px 55px ${t.accentGlowStrong}`:"none",
      }}>
      <div style={{height:190,overflow:"hidden",position:"relative"}}>
        <img src={p.img} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease",transform:hov===i?"scale(1.07)":"scale(1)"}}/>
        <div style={{position:"absolute",inset:0,background:hov===i?`linear-gradient(180deg,transparent 20%,${t.accentDim}aa 100%)`:`linear-gradient(180deg,transparent 40%,${t.bg}cc 100%)`,transition:"all 0.32s"}}/>
        <span style={{position:"absolute",top:10,right:10,background:t.accent,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:1,padding:"3px 9px",borderRadius:2}}>{p.tag}</span>
      </div>
      <div style={{padding:"18px 22px 22px"}}>
        <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,color:t.text,margin:"0 0 7px"}}>{p.title}</h3>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:t.textMuted,lineHeight:1.6,margin:"0 0 14px"}}>{p.desc}</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {p.tech.map(tech=>(
            <span key={tech} style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:0.5,color:t.accent,border:`1px solid ${t.accent}40`,borderRadius:2,padding:"3px 7px",background:t.accentGlow}}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({t}){
  const [hov,setHov]=useState(null);
  const navigate= useNavigate();
  const [showAll,setShowAll]=useState(true);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0,3);

  return (
   <section id="projects" className="sec-pad" style={{padding:"110px 40px",background:t.bg,position:"relative"}}>
  <SectionDivider t={t}/>
  <div style={{maxWidth:1200,margin:"0 auto"}}>
    <SectionHeader number="02" eyebrow="WHAT I'VE BUILT" title="Selected" accent="Projects" t={t}/>
    
    <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
      {visibleProjects.map((p,i)=>(
        <ProjectCard key={p.title} p={p} i={i} t={t} hov={hov} setHov={setHov}/>
      ))}
    </div>

    {/* View Projects Button Section */}
    <div className="reveal reveal-up" style={{textAlign:"center", marginTop:52}}>
      <button 
        onClick={() => navigate('/projects')}
        style={{
          padding: "14px 28px",
          backgroundColor: "transparent",
          color: t.accent || "#fff", // Based on your theme
          border: `1px solid ${t.accent || "#fff"}`,
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = t.accentAlpha || "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
        }}
      >
        View All Projects
      </button>
    </div>
  </div>
</section>  
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const PLANS=[
  {name:"landing Page",price:"₹4,000",period:"/ project",badge:null,
   features:["Upto 5 pages website","Responsive design","Basic React frontend","Contact form integration","1 revision round (within 1 week)","5-day delivery"],cta:"Get Started"},
  {name:"Full Stack",price:"₹10,000",period:"/ project",badge:"BEST CHOICE",
   features:["Full MERN stack app","REST API development","MongoDB database design","JWT Authentication","Admin dashboard","3 revision rounds (within 1 month)","14-day delivery","1 month free support"],cta:"Start Project"},
  {name:"Portfolio",price:"₹2000",period:"/ project",badge:null,
   features:["Single Page Website","Tailwind Design","Basic React Frontend","Contact form integration","Use netlify for Hosting (free)"],cta:"Let's Talk"},
];

function PricingSection({t}){
  const [hov,setHov]=useState(null);
  const goContact=()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
  return (
    <section id="pricing" className="sec-pad" style={{padding:"110px 40px",background:t.bgSecondary,position:"relative"}}>
      <SectionDivider t={t}/>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionHeader number="03" eyebrow="INVESTMENT" title="Pricing" accent="Plans" t={t}/>
        <p className="reveal reveal-fade" style={{color:t.textMuted,textAlign:"center",marginTop:-44,marginBottom:56,fontFamily:"'DM Sans',sans-serif",fontSize:14}}>
          Transparent pricing, no hidden fees. Pick what fits your project.
        </p>
        <div className="price-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22,alignItems:"stretch"}}>
          {PLANS.map((plan,i)=>{
            const isPop=plan.badge==="MOST POPULAR";
            const isH=hov===i;
            return (
              <div key={i}
                className="reveal reveal-up"
                data-delay={`${i * 120}`}
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                style={{
                  background:isPop?`linear-gradient(155deg,${t.accentDim}18,${t.accent}0a)`:t.bgCard,
                  border:`1px solid ${isPop||isH?t.accent:t.border}`,
                  borderRadius:8,padding:"38px 30px",position:"relative",overflow:"hidden",
                  transition:"all 0.32s ease",
                  boxShadow:isPop?`0 0 0 1px ${t.accent}40,0 28px 70px ${t.accentGlowStrong}`:isH?`0 14px 44px ${t.accentGlow}`:"none",
                }}>
                {isPop&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${t.accentDim},${t.accent},${t.accentLight})`,boxShadow:`0 0 14px ${t.accent}`}}/>}
                {plan.badge&&<div style={{position:"absolute",top:18,right:18,background:t.accent,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:1.5,padding:"4px 9px",borderRadius:2}}>{plan.badge}</div>}
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:t.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>{plan.name}</div>
                <div style={{marginBottom:28}}>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,color:t.text}}>{plan.price}</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:t.textMuted,marginLeft:4}}>{plan.period}</span>
                </div>
                <div style={{height:1,background:t.border,marginBottom:24}}/>
                <ul style={{listStyle:"none",padding:0,margin:"0 0 32px"}}>
                  {plan.features.map(f=>(
                    <li key={f} style={{display:"flex",alignItems:"center",gap:9,marginBottom:10,fontFamily:"'DM Sans',sans-serif",fontSize:13,color:t.textSecondary}}>
                      <span style={{width:15,height:15,borderRadius:"50%",background:t.accentGlow,border:`1px solid ${t.accent}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:t.accent,flexShrink:0}}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={goContact} style={{
                  width:"100%",
                  background:isPop?`linear-gradient(135deg,${t.accent},${t.accentDim})`:"transparent",
                  border:`1px solid ${t.accent}`,borderRadius:4,padding:"13px",
                  color:isPop?"#fff":t.accent,
                  fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,
                  letterSpacing:1,cursor:"pointer",textTransform:"uppercase",transition:"all 0.3s",
                  boxShadow:isPop?`0 4px 18px ${t.accentGlowStrong}`:"none",
                }}
                  onMouseEnter={e=>{if(!isPop)e.currentTarget.style.background=t.accentGlow;}}
                  onMouseLeave={e=>{if(!isPop)e.currentTarget.style.background="transparent";}}
                >{plan.cta} →</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection({t}){
  const email="sundarkandan23506@gmail.com";
  const wa="https://wa.me/919597732047?text=Hi%20Sundar!%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.";
  return (
    <section id="contact" className="sec-pad" style={{padding:"110px 40px",background:t.bg,position:"relative"}}>
      <SectionDivider t={t}/>
      <div style={{maxWidth:780,margin:"0 auto",textAlign:"center"}}>
        <div className="reveal reveal-up">
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.accent,letterSpacing:4}}>04. GET IN TOUCH</span>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(30px,5vw,58px)",fontWeight:800,color:t.text,margin:"10px 0 18px"}}>
            Let's Build<br/><span style={{color:t.accent}}>Something Great</span>
          </h2>
          <p style={{color:t.textMuted,fontSize:15,lineHeight:1.85,fontFamily:"'DM Sans',sans-serif",maxWidth:500,margin:"0 auto 52px"}}>
            Have a project in mind? Whether it's a startup MVP, a complex platform, or just an idea — I'd love to hear about it.
          </p>
        </div>
        <div className="contact-grid reveal reveal-scale" data-delay="150" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,maxWidth:520,margin:"0 auto 48px"}}>
          <a href={`mailto:${email}`} style={{textDecoration:"none",background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:8,padding:"28px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:10,transition:"all 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 10px 36px ${t.accentGlowStrong}`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:t.accentGlow,border:`1px solid ${t.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>✉</div>
            <div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>Email Me</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:t.textSecondary,wordBreak:"break-all"}}>{email}</div>
            </div>
          </a>
          <a href={wa} target="_blank" rel="noreferrer" style={{textDecoration:"none",background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:8,padding:"28px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:10,transition:"all 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#25D366";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(37,211,102,0.18)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div>
            <div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#25D366",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>WhatsApp</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:t.textSecondary}}>+91 95977 32047</div>
            </div>
          </a>
        </div>
        <div className="reveal reveal-fade" data-delay="250" style={{display:"inline-flex",alignItems:"center",gap:9,border:`1px solid ${t.border}`,borderRadius:24,padding:"9px 22px",background:t.accentGlow}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:t.accent,boxShadow:`0 0 9px ${t.accent}`,animation:"blink 1.5s infinite",flexShrink:0}}/>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:t.textSecondary,letterSpacing:0.8}}>Currently available for new projects</span>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({t}){
  return (
    <footer style={{padding:"26px 40px",background:t.bgSecondary,borderTop:`1px solid ${t.border}`}}>
      <div className="foot-inner reveal reveal-fade" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:14,fontWeight:700,color:t.accent}}>sundar</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:t.textMuted}}>© 2025 Sundar. All rights reserved.</span>
        <div style={{display:"flex",gap:16}}>
          {[{text:"GitHub" ,urls:"https://github.com/sundarkandan/"},{text:"LinkedIn",urls:"https://www.linkedin.com/in/sundar-kandan/"},{text:"Instagram",urls:"https://www.instagram.com/sundar_2006/"}].map(s=>(
            <a className="cursor-pointer" key={s} onClick={()=>window.open(s.urls)} style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textMuted,textDecoration:"none",letterSpacing:1,transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color=t.accent}
              onMouseLeave={e=>e.target.style.color=t.textMuted}>{s.text}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function FreeLance() {
  const [themeKey, setThemeKey] = useState("dark");
  const [progress, setProgress] = useState(0);
  const [loadDone, setLoadDone] = useState(false);
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const t = themes[themeKey];

  

  useGlobalStyles(t);
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add("loading");
    return () => document.body.classList.remove("loading");
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.remove("loading");
      window.scrollTo(0, 0);
    }
  }, [show]);

  useEffect(() => {
    let loaded = 0;
    const total = ALL_IMAGES.length;
    ALL_IMAGES.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) {
          setTimeout(() => { setLoadDone(true); setTimeout(() => setShow(true), 820); }, 350);
        }
      };
      img.src = src;
    });
    setTimeout(() => setProgress(p => Math.max(p, 30)), 500);
  }, []);

  useEffect(() => {
    if (!show) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    ["home","about","projects","pricing","contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [show]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
      <LoadingScreen progress={progress} done={loadDone}/>
      <div style={{fontFamily:"'DM Sans',sans-serif",background:t.bg,color:t.text,minHeight:"100vh",opacity:show?1:0,transition:"opacity 0.65s ease",visibility:show?"visible":"hidden",pointerEvents:show?"all":"none"}}>
        <Navbar theme={themeKey} t={t} toggleTheme={()=>setThemeKey(k=>k==="dark"?"light":"dark")} activeSection={activeSection}/>
        <HeroSection t={t}/>
        <AboutSection t={t}/>
        <ProjectsSection t={t}/>
        <PricingSection t={t}/>
        <ContactSection t={t}/>
        <Footer t={t}/>
      </div>
    </>
  );
}