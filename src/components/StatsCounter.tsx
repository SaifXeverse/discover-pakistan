import React, { useEffect, useState, useRef } from 'react';
import { STATISTICS } from '../data/destinations';
import { Award, Compass, Landmark, Waves } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

interface StatsCounterProps {
  isNight: boolean;
}

// Custom Premium CountUp component
interface AnimatedNumberProps {
  value: string;
}

function AnimatedNumber({ value }: AnimatedNumberProps) {
  const numString = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9,]/g, '');
  const hasComma = value.includes(',');
  const target = parseInt(numString, 10) || 0;
  
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2200; // smooth 2.2 seconds
          const startTime = performance.now();
          
          const step = (now: number) => {
            if (!active) return;
            const progress = Math.min((now - startTime) / duration, 1);
            // Quartic easing out for luxurious feel
            const ease = 1 - Math.pow(1 - progress, 4);
            const val = Math.floor(ease * target);
            setCurrent(val);
            
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [target]);

  const formatted = hasComma 
    ? current.toLocaleString('en-US') 
    : current;

  return (
    <span ref={elementRef}>
      {formatted}{suffix}
    </span>
  );
}

export default function StatsCounter({ isNight }: StatsCounterProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'peaks':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'glaciers':
        return <Waves className="w-5 h-5 text-sky-400" />;
      case 'culture':
        return <Landmark className="w-5 h-5 text-emerald-400" />;
      default:
        return <Compass className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div id="statistics-bento-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATISTICS.map((stat) => (
        <ThreeDCard
          key={stat.id}
          isNight={isNight}
          glowColor={stat.id === 'peaks' ? 'from-amber-500 to-emerald-400' : stat.id === 'glaciers' ? 'from-sky-500 to-teal-400' : 'from-emerald-500 to-teal-400'}
          className={`p-6 border flex flex-col justify-between min-h-[220px] transition-colors duration-500 ${
            isNight
              ? 'bg-zinc-950/60 border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]'
              : 'bg-stone-50 border-stone-200/60 shadow-md shadow-stone-100'
          }`}
        >
          {/* Header icon block */}
          <div className="flex items-center justify-between pointer-events-none">
            <span className={`text-[10px] font-mono uppercase tracking-widest ${isNight ? 'text-zinc-500' : 'text-stone-500'}`}>
              Superlative Record
            </span>
            <div className={`p-2.5 rounded-xl transition-transform duration-300 hover:scale-110 ${isNight ? 'bg-zinc-900' : 'bg-white shadow-sm border border-stone-150'}`}>
              {getIcon(stat.id)}
            </div>
          </div>

          {/* Value display area */}
          <div className="space-y-1 pointer-events-none mt-4">
            <span className="text-3xl md:text-4.5xl font-extrabold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 block line-clamp-1">
              <AnimatedNumber value={stat.value} />
            </span>
            <span className={`text-sm font-bold font-sans block ${isNight ? 'text-zinc-100' : 'text-stone-800'}`}>
              {stat.label}
            </span>
            <p className="text-xs text-zinc-500 leading-tight">
              {stat.subtext}
            </p>
          </div>
        </ThreeDCard>
      ))}
    </div>
  );
}
