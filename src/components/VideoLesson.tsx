import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Maximize, Minimize, ChevronRight, ChevronLeft, List, X,
  Clock, GraduationCap,
} from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  duration: number; // seconds
}

interface VideoLessonProps {
  onClose: () => void;
}

const slides: Slide[] = [
  { image: '/video-content/slide-01-title.png', title: 'Kirish', duration: 8 },
  { image: '/video-content/slide-02-allergy.png', title: 'Аллергия', duration: 10 },
  { image: '/video-content/slide-03-classification.png', title: 'Классификация', duration: 12 },
  { image: '/video-content/slide-04-mechanism.png', title: 'Таъсир механизми', duration: 14 },
  { image: '/video-content/slide-05-pharmacokinetics.png', title: 'Фармакокинетика', duration: 12 },
  { image: '/video-content/slide-06-indications.png', title: 'Қўлланилиши', duration: 10 },
  { image: '/video-content/slide-07-dosage.png', title: 'Дозалаш', duration: 10 },
  { image: '/video-content/slide-08-side-effects.png', title: 'Ножўя таъсирлар', duration: 10 },
  { image: '/video-content/slide-09-interactions.png', title: 'Дорилар ўзаро таъсири', duration: 10 },
  { image: '/video-content/slide-10-conclusion.png', title: 'Хулоса', duration: 12 },
];

export function VideoLessonPlayer({ onClose }: VideoLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate total duration
  const totalDuration = slides.reduce((acc, s) => acc + s.duration, 0);
  const elapsed = slides.slice(0, currentSlide).reduce((acc, s) => acc + s.duration, 0) + progress;

  useEffect(() => {
    if (isPlaying) {
      const currentSlideDuration = slides[currentSlide].duration;
      const step = 0.1; // 100ms
      
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          const next = prev + step;
          if (next >= currentSlideDuration) {
            // Next slide
            if (currentSlide < slides.length - 1) {
              setCurrentSlide(s => s + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return currentSlideDuration;
            }
          }
          return next;
        });
      }, step * 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSlide]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    setIsPlaying(false);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-black flex flex-col" ref={containerRef}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-950 text-white z-10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold">Лораталь (Лоратадин) — Видео дарс</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Clock className="w-3 h-3" />
          <span>{formatTime(elapsed)} / {formatTime(totalDuration)}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-dark-900 overflow-y-auto flex-shrink-0 border-r border-dark-700"
            >
              <div className="p-3">
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-2">Дарс бўлимлари</h3>
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                      currentSlide === i
                        ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                        : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      currentSlide === i ? 'bg-primary-600 text-white' : 'bg-dark-700 text-white/40'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{slide.title}</p>
                      <p className="text-[10px] text-white/40">{formatTime(slide.duration)}</p>
                    </div>
                    {i < currentSlide && (
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-dark-950">
          {/* Slide */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <motion.img
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />
            
            {/* Slide number badge */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5 text-white text-xs font-medium">
              {currentSlide + 1} / {slides.length}
            </div>

            {/* Play/Pause overlay */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 py-4 bg-dark-900/80 backdrop-blur-sm">
            {/* Progress bar */}
            <div className="flex gap-2 mb-3">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    i < currentSlide
                      ? 'bg-primary-500'
                      : i === currentSlide
                      ? 'bg-primary-500 relative'
                      : 'bg-dark-600'
                  }`}
                >
                  {i === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-primary-300 rounded-full"
                      style={{ width: `${(progress / slide.duration) * 100}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    showSidebar ? 'bg-primary-600/20 text-primary-400' : 'text-white/50 hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 transition-all"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/30"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 transition-all"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={toggleFullscreen}
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
