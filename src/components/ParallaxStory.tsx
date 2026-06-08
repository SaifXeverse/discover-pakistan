import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Trees, Compass, Eye, Move } from 'lucide-react';
import { motion } from 'motion/react';

interface ParallaxStoryProps {
  isNight: boolean;
}

export default function ParallaxStory({ isNight }: ParallaxStoryProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monitor client scroll manually to feed the translation coordinates
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much the component is scrolled into view (0 to 1)
      const visibleStart = rect.top - viewportHeight;
      const visibleRange = rect.height + viewportHeight;
      const position = -visibleStart / visibleRange;
      const progress = Math.max(0, Math.min(1, position));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute translation pixel positions based on scroll progress
  // Back moves slightly, Middle moves medium, Foreground content moves fast.
  const backY = (scrollProgress - 0.5) * -120; // slow drift
  const midY = (scrollProgress - 0.5) * -60;    // medium drift
  const riverDashOffset = (scrollProgress * 200); // animating rivers

  return (
    <div id="parallax-story-stage" className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            <span>Multi-Layer Parallax Simulation</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
            Cinematic Depth Landscapes
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mt-1">
            Scroll down the page or hover over the interactive stage below to experience the layered alignment of mountain heights, pine forests, and moving rivers.
          </p>
        </div>

        {/* Interactive progress manual tester */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 w-full md:w-auto ${isNight ? 'bg-zinc-900/60 border-zinc-800' : 'bg-stone-50 border-stone-200'}`}>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-mono text-gray-500 font-extrabold flex items-center gap-1.5">
              <Move className="w-3 h-3 text-emerald-500" />
              Manual Depth Controller
            </span>
            <span className="text-xs font-semibold">{Math.round(scrollProgress * 100)}% Scroll</span>
          </div>
          <input 
            type="range"
            min="0"
            max="100"
            value={Math.round(scrollProgress * 100)}
            onChange={(e) => setScrollProgress(Number(e.target.value) / 100)}
            className="w-32 h-1.5 bg-emerald-500/20 accent-emerald-500 rounded-lg appearance-none cursor-ew-resize focus:outline-none"
          />
        </div>
      </div>

      {/* THREE-LAYER STAGE WINDOW */}
      <div 
        ref={containerRef}
        id="interactive-parallax-viewport"
        className={`relative h-[580px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-1000 ${
          isNight 
            ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-emerald-950' 
            : 'bg-gradient-to-b from-sky-200 via-amber-50 to-stone-50'
        }`}
      >
        {/* Layer 0: Sun/Stars Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isNight ? (
            // Star fields and mystical moon
            <div className="absolute top-12 left-[15%] w-16 h-16 rounded-full bg-indigo-100/10 blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-100/90" />
            </div>
          ) : (
            // Warm dawn sunrise sun
            <div className="absolute top-16 left-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 blur-[2px] opacity-80 shadow-[0_0_80px_rgba(251,191,36,0.3)]" />
          )}
        </div>

        {/* LAYER 1: BACKGROUND MOUNTAINS SLIDES */}
        <div 
          className="absolute inset-x-0 bottom-16 h-80 z-10 transition-transform duration-200 pointer-events-none"
          style={{ transform: `translateY(${backY}px)` }}
        >
          <svg viewBox="0 0 800 300" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            {/* Mountain 1 Far Back */}
            <path 
              d="M -30 300 L 250 80 L 510 300 Z" 
              fill={isNight ? '#12122b' : '#c7bd9d'} 
              opacity="0.8" 
            />
            {/* Mountain 2 Far Back */}
            <path 
              d="M 330 300 L 580 50 L 830 300 Z" 
              fill={isNight ? '#0b0c1e' : '#bcb394'} 
              opacity="0.9" 
            />
          </svg>
        </div>

        {/* LAYER 2: MIDDLE PINES FOREST & RIVER LAYOUT */}
        <div 
          className="absolute inset-x-0 bottom-0 h-60 z-20 transition-transform duration-100 pointer-events-none"
          style={{ transform: `translateY(${midY}px)` }}
        >
          <svg viewBox="0 0 800 220" className="w-full h-full" preserveAspectRatio="none">
            {/* Foothill slopes */}
            <path 
              d="M -20 220 Q 200 130 450 170 T 820 220 Z" 
              fill={isNight ? '#0a1a15' : '#738356'} 
            />
            
            {/* Flowing River winding from valleys */}
            <path
              d="M 450 170 Q 380 185 300 200 T 50 220"
              fill="none"
              stroke={isNight ? '#0284c7' : '#0284c7'}
              strokeWidth="10"
              strokeDasharray="10, 10"
              strokeDashoffset={riverDashOffset}
            />

            {/* Pine forest clusters drawn dynamically */}
            <g id="parallax-forest-outline" opacity="0.95" fill={isNight ? '#040b08' : '#4d5c31'}>
              {[50, 120, 180, 260, 480, 560, 640, 710].map((cx, idx) => (
                <polygon 
                  key={idx}
                  points={`${cx},220 ${cx - 15},160 ${cx - 20},165 ${cx - 10},120 ${cx - 15},125 ${cx},70 ${cx + 15},125 ${cx + 10},120 ${cx + 20},165 ${cx + 15},160`}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* LAYER 3: FOREGROUND LAND & FLOATING CARDS (Interactive layer) */}
        <div className="absolute inset-0 z-30 p-4 sm:p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-black/40 backdrop-blur-md text-emerald-400 border border-emerald-500/10`}>
              Section IV: Parallax Atlas
            </span>
            <div className="flex items-center gap-1.5 text-zinc-300 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono">
              <Compass className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Scroll or drag slider to reveal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end pointer-events-auto">
            <div className="md:col-span-12 lg:col-span-5 bg-black/55 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/5 space-y-3 shadow-2xl">
              <span className="text-[9px] uppercase font-mono tracking-widest text-teal-400 font-extrabold block">
                Timeless Karakoram Corridors
              </span>
              <h4 className="text-lg font-bold font-sans tracking-tight text-white">
                Fairy Meadows & Raikot Base
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                As the dawn sun creeps above Kashmir, the forest below Nanga Parbat wakes in cool turquoise shadows. Parallax shifting mimics human optics, matching the true magnitude of towering mountain corridors.
              </p>
            </div>

            <div className="md:col-span-12 lg:col-span-7 hidden sm:flex flex-wrap gap-2 justify-end">
              <div className="bg-emerald-950/50 backdrop-blur-md px-4 py-3 rounded-xl border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                <span className="block font-bold">Base Slope:</span>
                <span className="text-white">2,600m Altitude</span>
              </div>
              <div className="bg-amber-950/40 backdrop-blur-md px-4 py-3 rounded-xl border border-amber-500/20 text-amber-300 text-xs font-mono">
                <span className="block font-bold">Snow Line:</span>
                <span className="text-white">Permanently over 4,500m</span>
              </div>
              <div className="bg-sky-950/40 backdrop-blur-md px-4 py-3 rounded-xl border border-sky-500/10 text-sky-300 text-xs font-mono">
                <span className="block font-bold">Rivers Fed:</span>
                <span className="text-white">Glacial Indine flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
