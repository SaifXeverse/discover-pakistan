import React, { useState } from 'react';
import { HOTELS } from '../data/destinations';
import { Hotel } from '../types';
import { Star, Shield, ArrowUpRight, BedDouble, Coins, Heart, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeDCard from './ThreeDCard';

interface HotelListProps {
  isNight: boolean;
  selectedId: string;
}

export default function HotelList({ isNight, selectedId }: HotelListProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Group hotels placing currently selected destination top-most then everything else
  const sortedHotels = [...HOTELS].sort((a, b) => {
    if (a.destinationId === selectedId && b.destinationId !== selectedId) return -1;
    if (a.destinationId !== selectedId && b.destinationId === selectedId) return 1;
    return b.rating - a.rating;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleBooking = (hotelName: string) => {
    setBookingSuccess(hotelName);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 4000);
  };

  return (
    <div id="hotel-inventory-section" className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${isNight ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Elite Stays
          </span>
          <h3 className={`text-xl font-bold font-sans tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
            Recommended Luxury Retreats
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Hand-selected, zero-carbon partners providing magnificent views of peak ranges and quiet shorelines.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wide text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10">
          <Shield className="w-3.5 h-3.5" />
          <span>Verified Local Partners</span>
        </div>
      </div>

      {/* RENDER SUCCESS NOTIFICATION OVERLAY */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-sans px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/10"
          >
            <CheckCircle className="w-5 h-5 text-yellow-300 animate-bounce" />
            <div className="text-left select-none">
              <span className="text-xs font-mono font-extrabold block uppercase tracking-wider">Reservation request sent!</span>
              <span className="text-xs font-light">Partner lodge at <strong>{bookingSuccess}</strong> will contact you shortly.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LANDSCAPE / SLIDE VIEW COMPONENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHotels.map((hotel) => {
          const isSelectedTarget = hotel.destinationId === selectedId;
          const isFav = favorites.includes(hotel.id);

          return (
            <ThreeDCard
              key={hotel.id}
              isNight={isNight}
              glowColor="from-emerald-500 via-teal-400 to-amber-300"
              className={`overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                isNight
                  ? 'bg-zinc-950/80 border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]'
                  : 'bg-white border-stone-200 shadow-md shadow-stone-100'
              } ${isSelectedTarget ? 'ring-2 ring-emerald-500/90' : ''}`}
            >
              {/* Image box with favorites trigger and badges */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl ">
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Image overlay color filter */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-500 bg-black/40 ${isNight ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Selected location flag */}
                {isSelectedTarget && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] uppercase font-mono tracking-widest font-extrabold bg-emerald-600 text-white rounded-md flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 animate-pulse" />
                    Spotlight Match
                  </span>
                )}

                {/* Favorites love tab */}
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-90 transition-all ${
                    isFav ? 'text-red-500' : 'text-zinc-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Informative Grid Context */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Location label and star index */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500 truncate max-w-xs">{hotel.location}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {hotel.rating}
                    </span>
                  </div>

                  {/* Resort name */}
                  <h4 className={`text-base font-bold font-sans tracking-tight leading-tight line-clamp-1 ${isNight ? 'text-white' : 'text-stone-900'}`}>
                    {hotel.name}
                  </h4>

                  {/* Feature bubbles */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {hotel.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className={`text-[9px] px-2.5 py-0.5 rounded-full ${
                          isNight ? 'bg-zinc-900 text-zinc-300' : 'bg-stone-50 border border-stone-150 text-stone-700'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing tags and CTA triggers */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-500/10">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500">Estimated stay</span>
                    <span className={`text-base font-extrabold font-mono flex items-center gap-0.5 ${isNight ? 'text-white font-bold' : 'text-stone-900 font-black'}`}>
                      <Coins className="w-3.5 h-3.5 text-emerald-500" />
                      ${hotel.price} <span className="text-xs font-normal text-gray-500">/ night</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleBooking(hotel.name)}
                    className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1 hover:scale-105 active:scale-95 shadow-md shadow-emerald-900/10"
                  >
                    Request Stay
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>
    </div>
  );
}
