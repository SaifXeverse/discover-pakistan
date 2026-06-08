import React, { useState } from 'react';
import { Camera, Layers, Image as ImageIcon, ZoomIn, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoItem {
  id: string;
  category: 'mountains' | 'cities' | 'historical' | 'beaches';
  title: string;
  location: string;
  url: string;
}

const GALLERY_IMAGES: PhotoItem[] = [
  {
    id: 'g1',
    category: 'mountains',
    title: 'Rakaposhi Mountain',
    location: 'Nagar, Hunza Valley',
    url: 'https://i.pinimg.com/736x/6e/c5/fc/6ec5fc93e821f4866ecbf795d93a333d.jpg',
  },
  {
    id: 'g2',
    category: 'historical',
    title: 'Sheesh Mahal mirror Mosaic',
    location: 'Lahore Fort, Punjab',
    url: 'https://i.pinimg.com/736x/fb/75/0a/fb750aa9cb08ff5feceb3c6c952bfc49.jpg',
  },
  {
    id: 'g3',
    category: 'beaches',
    title: 'Astola Island Cliffs',
    location: 'Balochistan Coastline',
    url: 'https://i.pinimg.com/1200x/40/bf/65/40bf65c7ce1e83ee3adcf120cede568d.jpg',
  },
  {
    id: 'g4',
    category: 'mountains',
    title: 'Nanga Parbat base reflect',
    location: 'Fairy Meadows, Gilgit-Baltistan',
    url: 'https://i.pinimg.com/1200x/ad/e2/01/ade2011cd252d7e139b88282cc21c83b.jpg',
  },
  {
    id: 'g5',
    category: 'cities',
    title: 'Faisal Mosque foothill',
    location: 'Islamabad Capital',
    url: 'https://i.pinimg.com/1200x/cc/11/ea/cc11ea9eddaa3e31bc17b68326560a82.jpg',
  },
  {
    id: 'g6',
    category: 'historical',
    title: 'Badshahi Stone Courtyard',
    location: 'Shahi Qila, Lahore',
    url: 'https://eagleeye.com.pk/pttl/wp-content/uploads/2016/03/Badshahi-Mosque.jpg',
  },
  {
    id: 'g7',
    category: 'mountains',
    title: 'Attabad Glacier stream',
    location: 'Hunza Valley',
    url: 'https://i.pinimg.com/1200x/ed/64/d6/ed64d635235ab920283ee5cc2b75e805.jpg',
  },
  {
    id: 'g8',
    category: 'beaches',
    title: 'Camel ride sunset horizon',
    location: 'Clifton Coast Karachi',
    url: 'https://i.pinimg.com/1200x/69/3e/bb/693ebb25fffef6699cb85e212c4405c5.jpg',
  }
];

interface PhotoGalleryProps {
  isNight: boolean;
}

export default function PhotoGallery({ isNight }: PhotoGalleryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'mountains' | 'cities' | 'historical' | 'beaches'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeTab === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div id="masonry-photo-gallery" className="space-y-6">
      {/* Category Tabs list */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-500/10 pb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-500" />
          <span className={`text-base font-bold ${isNight ? 'text-white' : 'text-stone-900'}`}>
            Bespoke Photo Journal
          </span>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-black/10 dark:bg-black/30 rounded-xl border border-gray-500/5">
          {['all', 'mountains', 'cities', 'historical', 'beaches'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                  : isNight
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              onClick={() => setLightboxIndex(idx)}
              className={`relative group h-72 rounded-2xl overflow-hidden cursor-zoom-in border ${
                isNight ? 'bg-zinc-900 border-zinc-800/60' : 'bg-stone-50 border-stone-200'
              }`}
            >
              {/* Image asset */}
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dynamic dark mode overlay layer for isNight */}
              <div className={`absolute inset-0 pointer-events-none transition-all duration-500 bg-black/45 ${isNight ? 'opacity-100' : 'opacity-0'}`} />

              {/* Fog Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
              
              {/* Interaction icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Description */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-300 font-bold block mb-1">
                  {img.category}
                </span>
                <h4 className="text-sm font-bold font-sans tracking-tight">
                  {img.title}
                </h4>
                <p className="text-[10px] text-zinc-300 font-serif leading-tight mt-0.5">
                  {img.location}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX POPUP SCREEN */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Bar controls */}
            <div className="flex justify-between items-center text-white select-none pointer-events-auto w-full">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono tracking-wider text-zinc-300">
                  Image {lightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex-1 flex items-center justify-center relative my-2 w-full min-h-0 bg-black/10 rounded-2xl"
            >
              <button 
                onClick={handlePrev}
                className="absolute left-1 sm:left-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-900/80 border border-zinc-800 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 z-10 hover:bg-zinc-800"
              >
                <ArrowLeft className="w-5 h-5 text-emerald-400" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center pointer-events-none p-3 select-none relative max-h-[36vh] sm:max-h-[50vh] md:max-h-[64vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    src={filteredImages[lightboxIndex].url}
                    alt={filteredImages[lightboxIndex].title}
                    className="max-h-full max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/5 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent clicking background closure
                  />
                </AnimatePresence>
              </div>

              <button 
                onClick={handleNext}
                className="absolute right-1 sm:right-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-900/80 border border-zinc-800 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 z-10 hover:bg-zinc-800"
              >
                <ArrowRight className="w-5 h-5 text-emerald-400" />
              </button>
            </div>

            {/* Downward Description card */}
            <div className="text-center text-white space-y-1.5 pointer-events-none select-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2.5 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20 inline-block">
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 className="text-lg md:text-xl font-bold font-sans tracking-tight pt-1">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-xs text-zinc-400 font-serif">
                {filteredImages[lightboxIndex].location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
