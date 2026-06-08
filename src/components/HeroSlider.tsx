import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { ChevronLeft, ChevronRight, Compass, ArrowDownCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSliderProps {
  isNight: boolean;
  onExploreClick: () => void;
}

export default function HeroSlider({ isNight, onExploreClick }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: 'Hunza Valley',
      region: 'Karakoram Range',
      desc: 'Behold pristine terraced orchards in the shadow of majestic 7,000-meter pinnacles.',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Shangrila Skardu',
      region: 'Baltistan Highlands',
      desc: 'Traverse the highest high-altitude cold desert sands cradled by pristine alpine lakes.',
      image: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Fairy Meadows',
      region: 'Nanga Parbat Sanctuary',
      desc: 'Rest in magical alpine meadows reflecting the immense face of the giant mountain.',
      image: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Badshahi Mosque',
      region: 'Mughal Heartland Lahore',
      desc: 'Marvel closely at magnificent pink sandstone domes guarding centuries of cultural legacy.',
      image: 'https://eagleeye.com.pk/pttl/wp-content/uploads/2016/03/Badshahi-Mosque.jpg',
    },
    {
      title: 'Clifton Beach',
      region: 'Sindh Coastal Estuary',
      desc: 'Gaze into the silver-grey horizons of the grand Arabian Sea at twilight.',
      image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=1920&q=80',
    }
  ];

  const resetAutoplay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resetAutoplay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoplay();
  };

  return (
    <div id="hero-slider-surface" className="relative w-full h-[95vh] min-h-[550px] overflow-hidden flex items-center justify-center">
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover select-none pointer-events-none"
        >
          <source 
            src="https://media.pixverse.ai/pixverse%2Fmp4%2Fmedia%2Fweb%2Fori%2F9319c192-f738-4e62-8dcf-525202d41d50_seed0.mp4" 
            type="video/mp4" 
          />
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </video>

        {/* 2. CINEMATIC DAY/NIGHT SHADING OVERLAY */}
        {isNight ? (
          <div className="absolute inset-0 bg-black/60 transition-all duration-1000" />
        ) : (
          <div className="absolute inset-0 bg-transparent transition-all duration-1000" />
        )}
      </div>

      {/* 3. FLOATING CLOUDS / MIST SYSTEM */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none h-60 z-10 overflow-hidden opacity-40">
        <div className="absolute w-[200%] h-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)] animate-[spin_40s_linear_infinite] origin-center -bottom-1/2 left-[-50%]" />
        <div className="absolute w-[250%] h-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_60%)] animate-[spin_60s_linear_infinite] origin-center -bottom-2/3 left-[-75%] " />
      </div>

      {/* 4. PASSING FLOATING STARS / SUN LIGHT PARTICLES (Canvas drawing) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="w-full h-full">
          {Array.from({ length: isNight ? 45 : 15 }).map((_, i) => {
            const delay = i * 0.4;
            const x = Math.sin(i * 123) * 50 + 50; // pseudo-coord percent
            const y = Math.cos(i * 456) * 45 + 45;
            const duration = 5 + (i % 6) * 2.5;

            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r={isNight ? (i % 2 === 0 ? 1.5 : 1) : 0.8}
                fill={isNight ? '#ffffff' : '#fbbf24'}
                className="animate-pulse"
                style={{
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  opacity: isNight ? 0.45 : 0.25,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* 5. HERO INNER CONTENT LAYOUT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-2.5xl space-y-6">
          
          {/* Tag Header */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-emerald-500 rounded" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/30">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Pakistan Luxury Port
            </span>
          </div>

          {/* Animated Big Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-extrabold font-sans tracking-tight text-white leading-[1.05]">
              Discover The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Beauty of Pakistan
              </span>
            </h1>
            <p className="text-base md:text-xl text-zinc-300 max-w-xl font-light leading-relaxed">
              Explore ancient historical forts, warm local markets, high-altitude deserts, and epic glacial lakes cradled by giant K2 range pinnacles.
            </p>
          </div>

          {/* Buttons Area */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="py-3.5 px-7 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold tracking-wide cursor-pointer transition-all duration-300 shadow-xl shadow-emerald-950/20 hover:shadow-emerald-600/20 transform hover:-translate-y-0.5"
            >
              Begin Expedition
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('map-atlas-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold tracking-wider uppercase border border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300"
            >
              Interact with Map
            </button>
          </div>
        </div>
      </div>

      {/* 7. SCROLL INDICATOR BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-70 animate-bounce cursor-pointer"
           onClick={onExploreClick}>
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Scroll down</span>
        <ArrowDownCircle className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}
