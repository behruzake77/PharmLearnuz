import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, Star, Users, BookOpen, GraduationCap } from 'lucide-react';
import { VideoLessonPlayer } from '../components/VideoLesson';

interface VideoLessonPageProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const allLessons = [
  {
    id: 1,
    title: 'Лоратадин — Антигистамин препаратлар',
    subtitle: 'Лораталь (Loratal) — H1-блокатор 2-авлод',
    image: '/video-content/slide-01-title.png',
    duration: '24:30',
    slides: 10,
    level: "Boshlang'ich",
    category: 'Антигистаминные',
    rating: 4.9,
  },
];

export default function VideoLessonPage({ onNavigate }: VideoLessonPageProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<typeof allLessons[0] | null>(null);

  const handlePlay = (lesson: typeof allLessons[0]) => {
    setSelectedLesson(lesson);
    setShowPlayer(true);
  };

  if (showPlayer) {
    return <VideoLessonPlayer onClose={() => setShowPlayer(false)} />;
  }

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header */}
      <div className="bg-white border-b border-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-sm text-dark-500 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboardга қайтиш
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900">Видео дарслар</h1>
              <p className="text-sm text-dark-400">Фармакология бўйича видео дарслар тўплами</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-3xl border border-dark-100 overflow-hidden hover:shadow-2xl hover:border-primary-200 transition-all duration-500"
            >
              <div className="relative h-48 bg-dark-50 overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handlePlay(lesson)}
                    className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 group/btn"
                  >
                    <Play className="w-7 h-7 text-primary-600 ml-1 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
                <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                    {lesson.level}
                  </span>
                  <span className="text-[11px] text-dark-400">{lesson.category}</span>
                </div>
                <h3 className="text-base font-bold text-dark-900 mb-1 group-hover:text-primary-700 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-dark-400 mb-3">{lesson.subtitle}</p>
                <div className="flex items-center justify-between pt-3 border-t border-dark-100">
                  <div className="flex items-center gap-3 text-xs text-dark-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {lesson.rating}
                    </span>
                    <span>{lesson.slides} слайд</span>
                  </div>
                  <button
                    onClick={() => handlePlay(lesson)}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    Кўриш
                    <Play className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Кўпроқ видео дарслар тайёрланмоқда 🎬</h3>
          <p className="text-white/70 max-w-xl mx-auto">
            Ҳар бир дарс учун: 10+ слайд, наррация, тест саволлари ва асосий хулосалар.
            Навбатдаги дарслар: Алер-G (Цетиризин), Вольтарен (Диклофенак), Эссенциале форте Н
          </p>
        </div>
      </div>
    </div>
  );
}
