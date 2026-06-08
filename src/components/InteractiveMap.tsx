import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { MapPin, Thermometer, Wind, CloudSun, Calendar, Zap, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeDCard from './ThreeDCard';

interface InteractiveMapProps {
  isNight: boolean;
  selectedId: string;
  onSelectDestination: (dest: Destination) => void;
}

export default function InteractiveMap({ isNight, selectedId, onSelectDestination }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const activeDest = DESTINATIONS.find(d => d.id === selectedId) || DESTINATIONS[0];

  // Helper to select a destination by name (e.g. from the Globe trigger)
  const handleMarkerClick = (dest: Destination) => {
    onSelectDestination(dest);
  };

  const regions = [
    { name: 'Gilgit-Baltistan & Northern Areas', coords: 'M 220 20 L 320 10 L 360 80 L 300 110 L 250 80 Z', color: 'rgba(16, 185, 129, 0.08)' },
    { name: 'Khyber Pakhtunkhwa (Swat/Peshawar)', coords: 'M 160 50 L 220 30 L 250 80 L 200 130 L 150 120 Z', color: 'rgba(245, 158, 11, 0.06)' },
    { name: 'Punjab Heartland (Lahore/Islamabad)', coords: 'M 200 130 L 250 80 L 300 110 L 290 230 L 190 260 L 170 190 Z', color: 'rgba(59, 130, 246, 0.06)' },
    { name: 'Balochistan Highlands & Coast', coords: 'M 20 200 L 170 190 L 190 260 L 140 370 L 60 350 Z', color: 'rgba(236, 72, 153, 0.05)' },
    { name: 'Sindh & Indus River Delta', coords: 'M 140 370 L 190 260 L 250 310 L 190 440 L 110 430 Z', color: 'rgba(139, 92, 246, 0.05)' }
  ];

  return (
    <div id="interactive-map-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* MAP GRID (7 COLS) */}
      <div 
        id="map-canvas-container"
        className={`lg:col-span-7 rounded-3xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-750 ${
          isNight 
            ? 'bg-zinc-950/80 border border-zinc-800/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
            : 'bg-white/80 border border-stone-200/80 shadow-md shadow-stone-100'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-[10px] uppercase font-mono tracking-widest ${isNight ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Telemetry: Interactive Grid
            </span>
          </div>
          <h3 className={`text-xl font-bold font-sans tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
            Click Destination Hotspots
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm">
            Hover over provinces to observe territorial regions or select pins to load local details.
          </p>
        </div>

        {/* VECTOR SVG CONTAINER */}
        <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center">
          <svg 
            viewBox="0 0 420 460" 
            className="w-full h-full max-w-[420px] filter drop-shadow-xl select-none"
          >
            {/* Outline Grid Ring */}
            <circle cx="210" cy="230" r="220" fill="none" stroke={isNight ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} strokeWidth="1" />
            <circle cx="210" cy="230" r="180" fill="none" stroke={isNight ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} strokeWidth="1" strokeDasharray="3,6" />

            {/* Provinces/Regions rendering */}
            <g id="map-province-regions">
              {regions.map((reg) => (
                <path
                  key={reg.name}
                  d={reg.coords}
                  fill={hoveredRegion === reg.name ? reg.color.replace('0.05', '0.2').replace('0.06', '0.2').replace('0.08', '0.25') : reg.color}
                  stroke={isNight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
                  strokeWidth={hoveredRegion === reg.name ? '1.5' : '1'}
                  className="transition-all duration-300 cursor-help"
                  onMouseEnter={() => setHoveredRegion(reg.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              ))}
            </g>

            {/* Indus River Flow (Animated blue line) */}
            <path
              id="indus-river-flow"
              d="M 315 70 Q 250 100 215 150 T 200 250 T 170 330 T 120 425"
              fill="none"
              stroke={isNight ? '#0ea5e9' : '#0284c7'}
              strokeWidth="2.5"
              strokeOpacity="0.7"
              className="animate-pulse"
              style={{ strokeDasharray: '4,4' }}
            />

            {/* Karakoram Highway Trek (Pulsing line) */}
            <path
              id="karakoram-highway"
              d="M 210 145 L 245 105 L 275 60 L 315 25"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />

            {/* Glowing Map Coordinate Indicators */}
            {DESTINATIONS.map((dest) => {
              // Convert percentages to layout coordinate parameters
              const posX = (dest.coordinates.x / 100) * 420;
              const posY = (dest.coordinates.y / 100) * 400 + 40; // adjusting for layout padding
              const isActive = dest.id === selectedId;

              return (
                <g 
                  key={dest.id}
                  className="cursor-pointer group"
                  onClick={() => handleMarkerClick(dest)}
                >
                  {/* Outer Pulsar Circle */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r={isActive ? 16 : 8}
                    fill={dest.id === 'clifton-beach' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(16, 185, 129, 0.15)'}
                    className="animate-ping"
                    style={{ animationDuration: isActive ? '1.8s' : '3s' }}
                  />

                  {/* Medium Halo */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r={isActive ? 10 : 5}
                    fill="none"
                    stroke={isActive ? '#10b981' : 'rgba(16, 185, 129, 0.4)'}
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />

                  {/* Core Pin Dot */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r="4"
                    fill={isActive ? '#ffffff' : '#10b981'}
                    stroke={isActive ? '#10b981' : '#ffffff'}
                    strokeWidth="2.5"
                    className="transition-all duration-300 shadow-lg"
                  />

                  {/* Tooltip text anchor */}
                  <rect
                    x={posX - 35}
                    y={posY - 26}
                    width="70"
                    height="18"
                    rx="4"
                    fill={isNight ? 'rgba(24, 24, 27, 0.85)' : 'rgba(255, 255, 255, 0.9)'}
                    stroke={isActive ? '#10b981' : 'rgba(16, 185, 129, 0.2)'}
                    strokeWidth="1"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <text
                    x={posX}
                    y={posY - 14}
                    textAnchor="middle"
                    className={`text-[8px] font-sans font-bold capitalize select-none pointer-events-none ${
                      isActive 
                        ? 'fill-emerald-500' 
                        : isNight 
                          ? 'fill-zinc-300' 
                          : 'fill-stone-800'
                    }`}
                  >
                    {dest.id === 'lahore-fort' ? 'Lahore' : dest.id === 'clifton-beach' ? 'Karachi' : dest.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floater for Hovering Province Status */}
          <div className="absolute bottom-2 left-2 hidden sm:flex flex-col pointer-events-none">
            <span className="text-[10px] font-mono tracking-wider opacity-60 uppercase">Currently Hovering:</span>
            <span className={`text-xs font-bold font-sans ${isNight ? 'text-white' : 'text-stone-800'}`}>
              {hoveredRegion || 'General Topography Grid'}
            </span>
          </div>
        </div>

        {/* Legend Panel and Compass Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-4 border-t border-dashed border-gray-500/10 text-[10px] font-mono tracking-wider opacity-90">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Mountain Valley</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span>Historical Forts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" />
              <span>Sea beaches</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sky-400">
            <span className="w-5 h-0.5 border-t-2 border-dashed border-sky-400 inline-block" />
            <span>Indus River Route</span>
          </div>
        </div>
      </div>

      {/* DETAIL CONSOLE CARD (5 COLS) */}
      <div 
        id="map-detail-console"
        className="lg:col-span-5 flex flex-col justify-between"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <ThreeDCard
              isNight={isNight}
              glowColor="from-emerald-500 via-teal-400 to-indigo-500"
              className={`overflow-hidden flex-1 flex flex-col transition-all duration-750 ${
                isNight 
                  ? 'bg-zinc-900 border border-zinc-800' 
                  : 'bg-stone-50 border border-stone-200 shadow-md shadow-stone-100'
              }`}
            >
              {/* Splash Banner */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={activeDest.imageUrl} 
                  alt={activeDest.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
                />
                {/* Dynamic dark mode overlay layer for isNight */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 bg-black/45 ${isNight ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                
                {/* Image Tags */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider font-extrabold bg-emerald-600/95 text-white rounded-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                    {activeDest.category === 'northern' ? 'Northern Area' : activeDest.category === 'historical' ? 'Historical Site' : 'Pristine Beach'}
                  </span>
                  <span className="px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider font-extrabold bg-black/60 backdrop-blur-md text-zinc-100 rounded-md">
                    {activeDest.bestTime}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase block select-none">
                    {activeDest.mapCoords}
                  </span>
                  <h4 className="text-lg font-bold font-sans tracking-tight line-clamp-1">
                    {activeDest.name}
                  </h4>
                </div>
              </div>

              {/* Inner Stats Grid */}
              <div className={`grid grid-cols-3 border-b text-center py-3 select-none ${isNight ? 'border-zinc-800 bg-zinc-950/40' : 'border-stone-200 bg-stone-100/50'}`}>
                <div className="border-r border-dashed border-gray-500/10">
                  <span className={`block text-xs font-mono font-bold flex items-center justify-center gap-1 ${isNight ? 'text-white' : 'text-stone-800'}`}>
                    <Thermometer className="w-3.5 h-3.5 text-amber-500 inline" />
                    {activeDest.weather.temp}°C
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">Live Sim</span>
                </div>
                <div className="border-r border-dashed border-gray-500/10">
                  <span className={`block text-[11px] font-semibold truncate px-1 ${isNight ? 'text-zinc-200' : 'text-stone-700'}`}>
                    {activeDest.weather.condition}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">Condition</span>
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold truncate text-sky-400">
                    <Wind className="w-3.5 h-3.5 text-sky-400 inline mr-0.5" />
                    {activeDest.weather.humidity}%
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">Humidity</span>
                </div>
              </div>

              {/* Descriptions & Attractions Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className={`text-xs leading-relaxed font-sans ${isNight ? 'text-zinc-300' : 'text-stone-600'}`}>
                    {activeDest.longDescription}
                  </p>
                  
                  {/* Attractions Bullet List */}
                  <div className="space-y-1.5">
                    <span className={`text-[10px] uppercase font-mono tracking-widest block font-bold flex items-center gap-1 ${isNight ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      <Zap className="w-3.5 h-3.5" />
                      Key Attractions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDest.attractions.map((att) => (
                        <span 
                          key={att}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-serif ${
                            isNight 
                              ? 'bg-zinc-800 text-zinc-300 border border-zinc-700/40' 
                              : 'bg-white text-stone-700 border border-stone-200 shadow-sm'
                          }`}
                        >
                          {att}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className={`p-3.5 rounded-xl border border-dashed ${
                  isNight 
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200' 
                    : 'bg-emerald-50/50 border-emerald-200/50 text-emerald-800'
                }`}>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold block mb-1">
                    💡 Explorer Travel Tip:
                  </span>
                  <p className="text-[11px] leading-relaxed font-medium italic">
                    "{activeDest.travelTips[0]}"
                  </p>
                </div>
              </div>

              {/* Direct Booking or Custom CTA Footer */}
              <div className={`p-4 border-t flex justify-between items-center bg-zinc-950/20 ${isNight ? 'border-zinc-800' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500">Best Season</span>
                  <span className={`text-xs font-bold ${isNight ? 'text-zinc-200' : 'text-stone-700'}`}>
                    {activeDest.bestTime}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('travel-planner-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md shadow-emerald-900/10"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Plan Custom Trip
                </button>
              </div>
            </ThreeDCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
