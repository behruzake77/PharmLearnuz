import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Newspaper, Pin, Sparkles } from 'lucide-react';
import { getBanners, Banner, getPublishedNews, NewsItem } from '../../data/adminData';
import { scrollToSection } from '../../App';

export function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>(getBanners().filter(b => b.isActive).sort((a,b) => a.order - b.order));
  const [current, setCurrent] = useState(0);

  useEffect(() => { setBanners(getBanners().filter(b => b.isActive).sort((a,b) => a.order - b.order)); }, []);

  if (banners.length === 0) return null;

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const b = banners[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className={`relative h-40 sm:h-48 rounded-2xl bg-gradient-to-br ${b?.bgColor || 'from-primary-600 to-emerald-600'} p-6 sm:p-8 flex flex-col justify-center overflow-hidden cursor-pointer`}
          onClick={() => { if (b?.linkUrl?.startsWith('#')) scrollToSection(b.linkUrl.replace('#', '')); }}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.08]" />
          <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">{b?.subtitle || ''}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1">{b?.title || ''}</p>
          <p className="text-sm text-white/70 mt-1 max-w-md">{b?.description || ''}</p>
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/40'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NewsTicker() {
  const news = getPublishedNews().filter(n => n.isPinned);
  if (news.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600/10 to-emerald-600/10 border border-primary-200/20 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          {news.slice(0, 2).map(n => (
            <div key={n.id} className="flex items-center gap-2 text-sm">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                n.category === 'yangilik' ? 'bg-blue-500/20 text-blue-400' :
                n.category === 'e\'lon' ? 'bg-amber-500/20 text-amber-400' :
                n.category === 'chegirma' ? 'bg-rose-500/20 text-rose-400' :
                n.category === 'video' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {n.category === 'yangilik' ? '📰' : n.category === 'e\'lon' ? '📢' : n.category === 'chegirma' ? '🏷' : n.category === 'video' ? '🎬' : '📝'}
              </span>
              <span className="text-dark-300 font-medium truncate">{n.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useEffect(() => { setNews(getPublishedNews().sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())); }, []);

  if (news.length === 0) return null;

  const categoryStyles: Record<string, string> = {
    'yangilik': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'e\'lon': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'maqola': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'video': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'chegirma': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const categoryIcons: Record<string, string> = {
    'yangilik': '📰', 'e\'lon': '📢', 'maqola': '📝', 'video': '🎬', 'chegirma': '🏷',
  };

  return (
    <div className="space-y-3">
      {news.slice(0, 4).map(n => (
        <div key={n.id} className="bg-dark-50/50 border border-dark-100 rounded-2xl p-5 hover:border-primary-200 transition-all group">
          <div className="flex items-start gap-3">
            <div className={`text-sm px-2 py-0.5 rounded-lg border ${categoryStyles[n.category] || 'bg-dark-100 text-dark-500'}`}>
              {categoryIcons[n.category] || '📄'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-dark-900 text-sm group-hover:text-primary-700 transition-colors">{n.title}</h3>
                {n.isPinned && <Pin className="w-3 h-3 text-amber-500" />}
              </div>
              <p className="text-xs text-dark-400 mt-0.5">{n.summary}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-dark-400">
                <span>{new Date(n.createdAt).toLocaleDateString('uz-UZ', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                <span>👁 {n.views}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
