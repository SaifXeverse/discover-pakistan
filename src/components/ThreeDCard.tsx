import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isNight: boolean;
  onClick?: () => void;
  glowColor?: string; // e.g. "from-emerald-500 via-teal-400 to-indigo-500"
  key?: React.Key;
}

export default function ThreeDCard({ 
  children, 
  className = '', 
  isNight, 
  onClick,
  glowColor = 'from-emerald-500 via-teal-400 to-indigo-500'
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Smooth tilt limit to 6 degrees max
    const rX = ((centerY - y) / centerY) * 6;
    const rY = ((x - centerX) / centerX) * 6;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative w-full h-full transition-all duration-300 rounded-3xl ${onClick ? 'cursor-pointer' : ''} ${className} ${
        isHovered 
          ? isNight 
            ? 'shadow-[0_20px_50px_rgba(16,185,129,0.18)] border-emerald-500/35 z-10' 
            : 'shadow-[0_20px_50px_rgba(16,185,129,0.12)] border-emerald-500/25 z-10'
          : ''
      }`}
    >
      {/* Premium animated glowing border and gradient background wrapper */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-tr ${glowColor} rounded-3xl blur-md pointer-events-none z-0`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col justify-between" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
