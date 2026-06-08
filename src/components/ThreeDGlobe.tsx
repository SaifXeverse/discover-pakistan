import React, { useRef, useEffect, useState } from 'react';
import { Compass, Globe, Navigation } from 'lucide-react';

interface GlobeMarker {
  name: string;
  lat: number;   // -90 to 90
  lon: number;   // -180 to 180
  label: string;
  color: string;
}

// Interactive pins for Pakistan's destinations
const PAKISTAN_MARKERS: GlobeMarker[] = [
  { name: 'Hunza', lat: 36.3167, lon: 74.6500, label: 'Hunza Valley', color: '#10b981' },
  { name: 'Skardu', lat: 35.3000, lon: 75.6333, label: 'Skardu Capital', color: '#3b82f6' },
  { name: 'Islamabad', lat: 33.6844, lon: 73.0479, label: 'Islamabad HQ', color: '#fbbf24' },
  { name: 'Lahore', lat: 31.5204, lon: 74.3587, label: 'Mughal Lahore', color: '#f87171' },
  { name: 'Karachi', lat: 24.8607, lon: 67.0011, label: 'Karachi Beach', color: '#ec4899' },
];

interface ThreeDGlobeProps {
  isNight: boolean;
  onSelectMarker?: (name: string) => void;
}

export default function ThreeDGlobe({ isNight, onSelectMarker }: ThreeDGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<GlobeMarker | null>(null);
  const [selectedPin, setSelectedPin] = useState<string>('Hunza');

  // Globe rotation angles
  const rotationX = useRef<number>(0.3); // Slight tilt
  const rotationY = useRef<number>(1.2); // Start looking towards South Asia
  const isDragging = useRef<boolean>(false);
  const prevMouseX = useRef<number>(0);
  const prevMouseY = useRef<number>(0);
  
  // Animation frames
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 450;
    let height = 450;

    // Handle resizing dynamically based on Container
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container) {
        const size = Math.min(container.clientWidth, 450);
        canvas.width = size;
        canvas.height = size;
        width = size;
        height = size;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate pseudo-geography dots for Earth
    // We generate some continents for a structured visual look
    const numDots = 320;
    const dots: { x: number; y: number; z: number; isLand: boolean }[] = [];
    
    for (let i = 0; i < numDots; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (numDots - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = 2.399963 * i; // Golden angle in radians
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Convert to spherical coords to determine land simulation (Rough map outline)
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);

      // Simple continent shape simulation
      let isLand = false;
      // Eurasia & Africa
      if (lon > -20 && lon < 140 && lat > -35 && lat < 70) {
        isLand = true;
      }
      // Americas
      if (lon > -130 && lon < -40 && lat > -50 && lat < 75) {
        isLand = true;
      }
      // Australia
      if (lon > 110 && lon < 155 && lat > -40 && lat < -10) {
        isLand = true;
      }
      
      dots.push({ x, y, z, isLand });
    }

    // Convert lat/lon coordinates of markers to 3D Cartesian coordinates
    const getCartesian = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -Math.sin(phi) * Math.sin(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.cos(theta)
      };
    };

    const markers3D = PAKISTAN_MARKERS.map(m => {
      const pos = getCartesian(m.lat, m.lon);
      return { ...m, pos };
    });

    // Main render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radius3D = width * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 400;

      // Auto rotation when not dragging
      if (!isDragging.current) {
        rotationY.current += 0.003;
      }

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      // Draw background space aura
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius3D * 0.8, centerX, centerY, radius3D * 1.3);
      if (isNight) {
        glowGrad.addColorStop(0, 'rgba(30, 27, 75, 0.25)'); // Indigo glow
        glowGrad.addColorStop(0.6, 'rgba(8, 47, 73, 0.15)'); // Ocean deep
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(120, 113, 108, 0.15)'); // Stone warm aura
        glowGrad.addColorStop(0.6, 'rgba(217, 119, 6, 0.05)'); // Sunrise orange leak
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw standard Latitude/Longitude mesh circles behind the globe (3D sphere effect)
      ctx.strokeStyle = isNight ? 'rgba(79, 70, 229, 0.08)' : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      for (let angle = 0; angle < Math.PI; angle += Math.PI / 6) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius3D, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render Earth dots
      dots.forEach(dot => {
        // Rotate Y
        let x1 = dot.x * cosY - dot.z * sinY;
        let z1 = dot.x * sinY + dot.z * cosY;

        // Rotate X
        let y2 = dot.y * cosX - z1 * sinX;
        let z2 = dot.y * sinX + z1 * cosX;

        // Depth sorting (only render front half dots, z2 > -0.2 for beautiful see-through back grid)
        const isFront = z2 >= 0;
        const opacity = isFront ? 0.85 : 0.18;

        const scale = focalLength / (focalLength + z2 * radius3D);
        const screenX = centerX + x1 * radius3D * scale;
        const screenY = centerY + y2 * radius3D * scale;

        // Draw dot
        ctx.beginPath();
        ctx.arc(screenX, screenY, (dot.isLand ? 2.5 : 1.2) * scale, 0, Math.PI * 2);

        if (dot.isLand) {
          if (isNight) {
            ctx.fillStyle = `rgba(16, 185, 129, ${opacity * 0.9})`; // Neon EMerald Land
          } else {
            ctx.fillStyle = `rgba(5, 150, 105, ${opacity * 0.8})`; // Warm Emerald Land
          }
        } else {
          ctx.fillStyle = isNight ? `rgba(99, 102, 241, ${opacity * 0.5})` : `rgba(120, 113, 108, ${opacity * 0.4})`;
        }
        ctx.fill();
      });

      // Render special highlighting around Pakistan center coordinate
      // Pakistan center is approx Lat 30.3753, Lon 69.3451
      const pakPos = getCartesian(30.3, 71.0);
      let px1 = pakPos.x * cosY - pakPos.z * sinY;
      let pz1 = pakPos.x * sinY + pakPos.z * cosY;
      let py2 = pakPos.y * cosX - pz1 * sinX;
      let pz2 = pakPos.y * sinX + pz1 * cosX;

      if (pz2 >= 0) {
        const scale = focalLength / (focalLength + pz2 * radius3D);
        const screenX = centerX + px1 * radius3D * scale;
        const screenY = centerY + py2 * radius3D * scale;

        // Pulse wave represent territory boundary
        const pulse = (Date.now() % 1500) / 1500;
        ctx.beginPath();
        ctx.arc(screenX, screenY, 18 * scale + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.8 - pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(screenX, screenY, 6 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw custom connecting lines from Pakistan's center to pins
      markers3D.forEach(marker => {
        let mx1 = marker.pos.x * cosY - marker.pos.z * sinY;
        let mz1 = marker.pos.x * sinY + marker.pos.z * cosY;
        let my2 = marker.pos.y * cosX - mz1 * sinX;
        let mz2 = marker.pos.y * sinX + mz1 * cosX;

        if (mz2 >= 0) {
          const scale = focalLength / (focalLength + mz2 * radius3D);
          const screenX = centerX + mx1 * radius3D * scale;
          const screenY = centerY + my2 * radius3D * scale;

          // Compute Pakistan center screen cords to lay custom fiber cables
          let pcX = centerX + px1 * radius3D * (focalLength / (focalLength + pz2 * radius3D));
          let pcY = centerY + py2 * radius3D * (focalLength / (focalLength + pz2 * radius3D));

          // Draw neon connecting thread
          ctx.beginPath();
          ctx.moveTo(pcX, pcY);
          ctx.quadraticCurveTo((pcX + screenX) / 2, (pcY + screenY) / 2 - 15, screenX, screenY);
          ctx.strokeStyle = isNight ? 'rgba(16, 185, 129, 0.45)' : 'rgba(5, 150, 105, 0.3)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]); // Reset

          // Draw marker pin points
          const isSelected = selectedPin === marker.name;
          const markerRadius = (isSelected ? 6 : 4) * scale;

          ctx.beginPath();
          ctx.arc(screenX, screenY, markerRadius, 0, Math.PI * 2);
          ctx.fillStyle = marker.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = isSelected ? 2 : 1;
          ctx.stroke();

          // Highlight wave if active/selected
          if (isSelected) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, markerRadius + 6, 0, Math.PI * 2);
            ctx.strokeStyle = marker.color;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Let custom click tracker handle finding close mouse triggers
          // Text labeling
          ctx.fillStyle = isNight ? '#ffffff' : '#1f2937';
          ctx.font = `600 ${Math.max(10, Math.round(11 * scale))}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(marker.name, screenX, screenY - markerRadius - 4);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isNight, selectedPin]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) {
      // Custom mouse hittest to see if orbiting over markers
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Detect hover state
      return;
    }

    const deltaX = e.clientX - prevMouseX.current;
    const deltaY = e.clientY - prevMouseY.current;

    rotationY.current += deltaX * 0.007;
    rotationX.current = Math.max(-1.2, Math.min(1.2, rotationX.current + deltaY * 0.007));

    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Quick switch pin selection handler
  const handleMarkerTrigger = (mName: string) => {
    setSelectedPin(mName);
    if (onSelectMarker) {
      onSelectMarker(mName);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        id="globe-container"
        ref={containerRef} 
        className="relative w-full aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing max-w-[450px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas 
          id="globe-canvas"
          ref={canvasRef} 
          className="rounded-full shadow-2xl transition-all duration-700 pointer-events-auto"
        />

        {/* Ambient Overlay Compass Grid */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[10px] text-emerald-400 font-mono tracking-widest uppercase border border-emerald-500/20">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '40s' }} />
          <span>Orbital Tracking</span>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[10px] text-gray-400 font-mono tracking-widest uppercase border border-white/5">
          <Globe className="w-3.5 h-3.5" />
          <span>Asia - PK Grid</span>
        </div>
      </div>

      {/* Selector pills representing destinations */}
      <div id="globe-markers-navigation" className="mt-6 flex flex-wrap justify-center gap-2 max-w-md px-4">
        {PAKISTAN_MARKERS.map((m) => (
          <button
            key={m.name}
            onClick={() => handleMarkerTrigger(m.name)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedPin === m.name
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400'
                : isNight
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/50'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
            {m.name}
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-[11px] text-center font-sans opacity-60 flex items-center gap-1">
        <Navigation className="w-3 h-3 text-emerald-500" />
        Drag the globe manually to inspect and select major regional hubs.
      </p>
    </div>
  );
}
