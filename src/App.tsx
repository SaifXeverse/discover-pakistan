import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import ThreeDGlobe from './components/ThreeDGlobe';
import InteractiveMap from './components/InteractiveMap';
import ParallaxStory from './components/ParallaxStory';
import TravelPlanner from './components/TravelPlanner';
import HotelList from './components/HotelList';
import PhotoGallery from './components/PhotoGallery';
import StatsCounter from './components/StatsCounter';
import VideoSection from './components/VideoSection';
import { Destination } from './types';
import { DESTINATIONS } from './data/destinations';

import { 
  Sun, Moon, Globe, Compass, Mail, Navigation, Phone, 
  MapPin, Heart, Share2, Instagram, Facebook, Twitter, ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isNight, setIsNight] = useState<boolean>(true); // Night by default for high visual contrast
  const [selectedDestId, setSelectedDestId] = useState<string>('hunza');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Organic luxury loader increment progression
  useEffect(() => {
    let active = true;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (active) setLoading(false);
          }, 850);
          return 100;
        }
        // Premium random counts progression
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // Track page scroll to apply header backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGlobeSelect = (markerName: string) => {
    // Match globe marker click (e.g. "Hunza" or "Karachi") to our DESTINATIONS
    const matchingDest = DESTINATIONS.find(d => 
      d.name.toLowerCase().includes(markerName.toLowerCase()) || 
      d.id.toLowerCase().includes(markerName.toLowerCase())
    );
    if (matchingDest) {
      setSelectedDestId(matchingDest.id);
      // Optional: Smooth scroll to map details when clicked from Globe
      const mapEl = document.getElementById('map-atlas-anchor');
      if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDestinationSelect = (dest: Destination) => {
    setSelectedDestId(dest.id);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailAddress.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmailSubscribed(false);
        setEmailAddress('');
      }, 5000);
    }
  };

  const handleMainExploreClick = () => {
    const el = document.getElementById('interactive-exploration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Find currently active destination object
  const activeDest = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  return (
    <>
      {/* LUXURY PRELOADER OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -45, scale: 1.01, filter: 'blur(15px)' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none"
          >
            {/* Top HUD decoration */}
            <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Karakoram Voyager v2.6</span>
              </div>
              <div>LOC: PAKISTAN EXPEDITIONS</div>
            </div>

            {/* Centered Main Brand / Compass Animation */}
            <div className="flex flex-col items-center justify-center space-y-6 max-w-sm mx-auto my-auto text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center p-3 relative"
              >
                <div className="absolute inset-1 border border-dotted border-white/5 rounded-full" />
                <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
              </motion.div>

              <div className="space-y-1.5">
                <motion.h2 
                  initial={{ opacity: 0, letterSpacing: '0.1em' }}
                  animate={{ opacity: 1, letterSpacing: '0.2em' }}
                  className="text-lg sm:text-xl font-black uppercase text-white tracking-widest font-sans"
                >
                  Discover Pakistan
                </motion.h2>
                <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block h-4">
                  {progress < 30 ? 'ELEVATING ORCHARD CHRONICLES...' : progress < 65 ? 'OPTIMIZING PASS PASSAGES...' : progress < 90 ? 'CURATING ALPS SANCTUARIES...' : 'PORTAL LOCKED. WELCOME.'}
                </span>
              </div>
            </div>

            {/* Bottom Progress numeric & bar */}
            <div className="space-y-4 max-w-lg mx-auto w-full">
              <div className="flex items-end justify-between font-mono">
                <span className="text-[9px] text-zinc-600 tracking-wider">SECURE EXPEDITION CREDENTIALS</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-450 to-amber-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen font-sans transition-all duration-1000 ${
        isNight ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-50 text-stone-800'
      }`}>
        
        {/* 1. APP FIXED STICKY NAVIGATION HEADER */}
        <header
          id="app-navigation-header"
          className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
            scrolled 
              ? isNight 
                ? 'bg-zinc-950/85 backdrop-blur-md border-b border-white/5 py-4' 
                : 'bg-white/85 backdrop-blur-md border-b border-stone-200/50 py-4 shadow-sm'
              : 'bg-transparent py-6'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Brand Logo & Compass indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/20">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ animationDuration: '60s' }} />
              </div>
              <span className={`text-sm xs:text-base sm:text-lg font-extrabold font-sans tracking-tight uppercase ${isNight ? 'text-white' : 'text-stone-900'}`}>
                Discover Pakistan
              </span>
            </div>

          {/* Quick theme toggles and direct planner scroll button */}
          <div className="flex items-center gap-4">
            {/* Day/Night visual switcher */}
            <button
              onClick={() => setIsNight(!isNight)}
              className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                isNight 
                  ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800' 
                  : 'bg-stone-100 border-stone-200 text-indigo-900 hover:bg-stone-200'
              }`}
              title={isNight ? 'Switch to Golden Hour Day' : 'Switch to Celestial Night'}
            >
              {isNight ? (
                <>
                  <Sun className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline">Golden Hour</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 fill-indigo-900 text-indigo-900" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase hidden sm:inline">Midnight Stars</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('travel-planner-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:inline-flex py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer tracking-wider uppercase transition-all shadow-md shadow-emerald-500/10"
            >
              AI Expedition Planner
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CORE HERO SLIDER PRESENTATION */}
      <HeroSlider isNight={isNight} onExploreClick={handleMainExploreClick} />

      {/* 3. CORE ADVENTURE WRAPPER FOR GUEST SITES */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
        
        {/* SECTION 1: GLOBAL ATLAS TRACKING GRID */}
        <motion.section 
          id="interactive-exploration" 
          className="space-y-8 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
              Interactive Geographical Terminal
            </span>
            <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
              The World-Class Expedition Atlas
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              Examine coordinates on our high-fps rotating 3D particle globe or select pinpoint locations on the vector topography map to review regional details instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* 3D GLOBE IN CONTAINER (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <ThreeDGlobe isNight={isNight} onSelectMarker={handleGlobeSelect} />
            </div>

            {/* ARTISTIC MAP IN CONTAINER (7 cols) */}
            <div id="map-atlas-anchor" className="lg:col-span-7 scroll-mt-24">
              <InteractiveMap 
                isNight={isNight} 
                selectedId={selectedDestId} 
                onSelectDestination={handleDestinationSelect} 
              />
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: BENTO RECORDS FOR STATISTICS SUITES */}
        <motion.section 
          id="statistics-bento" 
          className="scroll-mt-24 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Numerical Records & Facts
            </span>
            <h3 className={`text-xl md:text-2xl font-bold font-sans tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
              Pakistan Tourism In Superlative Ratios
            </h3>
          </div>
          <StatsCounter isNight={isNight} />
        </motion.section>

        {/* SECTION 3: THREE-LAYER PARALLAX STORYBOARD */}
        <motion.section 
          id="parallax-cinematic-depth" 
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <ParallaxStory isNight={isNight} />
        </motion.section>

        {/* SECTION 4: SERVER-SIDE GEMINI EXPEDITION TRAVEL PLANNER */}
        <motion.section 
          id="ai-travel-planner" 
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <TravelPlanner isNight={isNight} selectedId={selectedDestId} />
        </motion.section>

        {/* SECTION 5: RECOMMENDED STAYS (HOTELS SECTOR) */}
        <motion.section 
          id="hotels-lodging" 
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <HotelList isNight={isNight} selectedId={selectedDestId} />
        </motion.section>

        {/* SECTION 6: DRONE FLIGHT LOGS HUD PANEL */}
        <motion.section 
          id="cinematic-aerials"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <VideoSection isNight={isNight} />
        </motion.section>

        {/* SECTION 7: BESPOKE PHOTO GALLERY AND LIGHTBOXES */}
        <motion.section 
          id="journals-gallery" 
          className="scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhotoGallery isNight={isNight} />
        </motion.section>

        {/* SECTION 8: NEWSLETTER SUBSCRIPTION AND CAMPAIGNS */}
        <motion.section 
          id="newsletter-campaign" 
          className={`rounded-3xl p-8 md:p-12 border relative overflow-hidden transition-all duration-750 ${
            isNight 
              ? 'bg-zinc-950/90 border-zinc-900 shadow-2xl shadow-zinc-900/10' 
              : 'bg-emerald-950 border-emerald-900 text-white shadow-lg'
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background visuals */}
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80" 
              alt="Background Newsletter" 
              className="w-full h-full object-cover"
            />
            {/* Dynamic dark mode overlay layer for isNight */}
            <div className={`absolute inset-0 transition-all duration-1000 bg-black/55 ${isNight ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-zinc-100'}`}>
                Access the Majestic Karakoram Club
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed max-w-md mx-auto ${isNight ? 'text-zinc-400 font-light' : 'text-zinc-300'}`}>
                Receive unique route maps, low-carbon expedition reports, hotel promotions, and safety guidelines for Gilgit corridors twice per month.
              </p>
            </div>

            {/* Newsletter input submission */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Secure email registry (e.g. explorer@domain.com)"
                className="flex-1 px-4 py-3 rounded-xl text-xs font-mono font-medium focus:outline-none bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
              >
                Join Expedition Club
              </button>
            </form>

            <AnimatePresence>
              {emailSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-emerald-400 font-mono font-bold"
                >
                  🎉 Success! Welcoming coordinates sent to your mailbox.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

      </main>

      {/* 4. PREMIUM FOOTER MODULE */}
      <footer 
        id="app-curated-footer" 
         className={`pt-12 pb-8 border-t transition-all duration-750 ${
           isNight 
             ? 'bg-zinc-950 border-zinc-900 text-zinc-400' 
             : 'bg-stone-100 border-stone-200 text-stone-600'
         }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* brand col (4 cols) */}
            <div className="md:col-span-12 lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <span className={`text-base font-bold font-sans uppercase tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
                  Discover Pakistan
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                Bespoke, premium digital gateway designed meticulously to highlight the natural majesty, deep histories, and high-peaks tourism of Pakistan. Built safely using full-stack capabilities.
              </p>
              <div className="flex items-center gap-3 text-emerald-500">
                <a href="#" className="w-8 h-8 rounded-full border border-gray-500/10 flex items-center justify-center hover:scale-110 transition"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-500/10 flex items-center justify-center hover:scale-110 transition"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-500/10 flex items-center justify-center hover:scale-110 transition"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>

            {/* destinations links (4 cols) */}
            <div className="md:col-span-6 lg:col-span-4 space-y-4">
              <h4 className={`text-xs uppercase font-mono tracking-widest font-extrabold ${isNight ? 'text-white' : 'text-stone-900'}`}>
                Expedition Coordinates
              </h4>
              <ul className="text-xs space-y-2.5">
                {DESTINATIONS.map(d => (
                  <li key={d.id}>
                    <button
                      onClick={() => handleGlobeSelect(d.id)}
                      className="hover:text-emerald-500 transition-colors cursor-pointer text-left capitalize font-serif"
                    >
                      {d.name.split(' (')[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* tourism advisory contact (4 cols) */}
            <div className="md:col-span-6 lg:col-span-4 space-y-4">
              <h4 className={`text-xs uppercase font-mono tracking-widest font-extrabold ${isNight ? 'text-white' : 'text-stone-900'}`}>
                Tourism Advisory Desk
              </h4>
              <ul className="text-xs space-y-2.5 space-y-3 font-mono">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Karakoram Way, Gilgit Headquarters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>+92 (5811) 555-ELITE</span>
                </li>
                <li className="flex items-center gap-2 text-sky-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero-carbon carbon-offsetting partner</span>
                </li>
              </ul>
            </div>
          </div>

          {/* down copyright bar */}
          <div className="border-t border-gray-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
            <span>&copy; {new Date().getFullYear()} Discover Pakistan Luxury Portal. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-500">Security Rules</a>
              <a href="#" className="hover:text-emerald-500">Karakoram Guidelines</a>
              <a href="#" className="hover:text-emerald-500 font-bold uppercase text-emerald-400">Zero Carbon Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
