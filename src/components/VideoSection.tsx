import React, { useState, useEffect } from 'react';
import { Video, ShieldAlert, Crosshair, Cpu, Eye, Hourglass, Landmark } from 'lucide-react';

interface VideoSectionProps {
  isNight: boolean;
}

export default function VideoSection({ isNight }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState({
    altitude: 12500,
    speed: 45,
    gimbalPitch: -20,
    compass: 'N-NE'
  });

  // Cycle flight telemetry metrics for active immersive feel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        altitude: prev.altitude + Math.floor(Math.random() * 50) - 20,
        speed: prev.speed + Math.floor(Math.random() * 4) - 2,
        gimbalPitch: Math.max(-45, Math.min(0, prev.gimbalPitch + (Math.random() * 2) - 1)),
        compass: prev.altitude % 2 === 0 ? 'N-NW' : 'N-NE'
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div id="drone-video-showcase" className="space-y-6">
      {/* SECTION HEADER */}
      <div>
        <span className={`text-[10px] font-mono uppercase tracking-widest ${isNight ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Drone stream
        </span>
        <h3 className={`text-xl font-bold font-sans tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
          Cinematic Aerial Showcase
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Explore automated drone flight logs recording breathtaking overhead views of glacier ridges and historical sanctuaries.
        </p>
      </div>

      {/* FULL WIDTH HUD SCREEN */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border shadow-2xl bg-zinc-950 border-zinc-800/80">
        {/* Dynamic sliding drone background view */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80" 
            alt="Drone flight over misty mountain valleys"
            className={`w-full h-full object-cover transition-transform duration-[30s] ease-linear ${
              isPlaying ? 'scale-110 translate-y-0' : 'scale-100'
            }`}
          />
          {/* Dynamic dark mode overlay layer for isNight */}
          {isNight ? (
            <div className="absolute inset-0 bg-black/60 transition-all duration-1000" />
          ) : (
            <div className="absolute inset-0 bg-black/0 transition-all duration-1000" />
          )}
          {/* Base gradient elements to maintain readability of bottom controls/HUD overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* DRONE FLIGHT DECK HEADS-UP DISPLAY (HUD) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none select-none font-mono">
          
          {/* Top HUD bar */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl text-[10px] text-emerald-400 border border-emerald-500/20">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>LIVE HDR DECK</span>
            </div>

            <div className="flex items-center gap-4 text-right text-[10px] text-zinc-300 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/5">
              <div>
                <span className="block opacity-50">HEADING</span>
                <span className="font-bold text-emerald-400">{telemetry.compass}</span>
              </div>
              <div className="border-l border-zinc-800 pl-3">
                <span className="block opacity-50">SAT LINK</span>
                <span className="font-bold text-sky-400">99%</span>
              </div>
            </div>
          </div>

          {/* Center Target crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 flex items-center justify-center">
            <Crosshair className="w-16 h-16 text-emerald-500 animate-pulse" />
          </div>

          {/* Bottom HUD metrics telemetry grids */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-end w-full">
            <div className="bg-black/55 backdrop-blur-md p-4 rounded-xl text-[10px] text-zinc-300 border border-white/5 space-y-1 w-full sm:w-44 select-none">
              <span className="text-[9px] text-emerald-400 font-bold block border-b border-zinc-800 pb-1 mb-1 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-400" />
                TELEMETRY STATUS
              </span>
              <div className="flex justify-between gap-4">
                <span>ALTITUDE:</span>
                <span className="text-white font-bold">{telemetry.altitude} FT</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>SPEED:</span>
                <span className="text-white font-bold">{telemetry.speed} KM/H</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>PITCH:</span>
                <span className="text-white font-bold">{telemetry.gimbalPitch.toFixed(1)}°</span>
              </div>
            </div>

            {/* Flight feeds descriptions details */}
            <div className="text-left sm:text-right max-w-sm sm:ml-auto pointer-events-auto flex flex-col items-start sm:items-end gap-2">
              <p className="text-[11px] leading-relaxed text-zinc-300 font-light pr-2 select-text italic hidden md:block">
                Overhead drone flight record surveying Pass 541 over Karimabad terraces and ancient Baltit towers. Space-dust filter highlights peak ranges naturally.
              </p>
              
              {/* Play / pause triggers */}
              <div className="flex justify-end gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer pointer-events-auto transition active:scale-95 w-full sm:w-auto text-center"
                >
                  {isPlaying ? 'Pause Feed' : 'Keep Playing'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
