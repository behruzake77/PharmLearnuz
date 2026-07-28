import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, LogOut, BookOpen, Award, Clock, TrendingUp,
  Play, Star, ChevronRight, Bell, Settings, Search,
  BarChart3, Target, Flame, Calendar, User,
  Menu, X, CheckCircle2, BookMarked, Bot, Sparkles,
  Pill, HeartPulse, Shield, Activity, Zap,
  ChevronDown, Globe, Filter,
  LayoutGrid, ArrowUpRight, CircleCheckBig,
  Palette, Droplets, Sparkles as SparklesIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AIAssistant from '../AIAssistant';
import { realDrugsData } from '../../data/drugData';
import { ParticleField, GlassCard, FloatingElement, Pill3D } from '../GlassEffects';

// ===== REAL DATA =====
const drugCourses = realDrugsData.map(d => ({
  id: d.id,
  title: d.title,
  subtitle: d.subtitle,
  image: d.image,
  progress: Math.floor(Math.random() * 80) + 10,
  lessons: `${Math.floor(Math.random() * d.lessons)}/${d.lessons}`,
  nextLesson: d.topics[0] || d.activeSubstance,
  rating: d.rating,
  modules: d.modules,
  category: d.category,
  drugForm: d.drugForm,
  manufacturer: d.manufacturer,
  country: d.country,
  price: d.price,
  activeSubstance: d.activeSubstance,
  level: d.level,
}));

const activities = [
  { text: 'Лораталь — H1-блокаторлар, 12-дарс тугатилди', time: '2 соат олдин', emoji: '📖', color: 'text-blue-300' },
  { text: 'Алер-G тест натижаси: 92% ✅', time: '4 соат олдин', emoji: '🎯', color: 'text-emerald-300' },
  { text: 'Янги курс: Вольтарен (Диклофенак)', time: 'Кеча', emoji: '💊', color: 'text-amber-300' },
  { text: '7 кунлик ўрганиш серияси 🔥', time: 'Бугун', emoji: '🔥', color: 'text-rose-300' },
  { text: 'Сертификатга 8 дарс қолди', time: '1 кун олдин', emoji: '🏆', color: 'text-purple-300' },
  { text: 'Эссенциале форте Н — Гепатопротекторлар', time: '3 кун олдин', emoji: '🎬', color: 'text-cyan-300' },
];

const sidebarItems = [
  { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
  { icon: Bot, label: 'AI Ёрдамчи', id: 'ai', badge: '🤖' },
  { icon: BookOpen, label: 'Курслар', id: 'courses' },
  { icon: Award, label: 'Сертификатлар', id: 'certificates' },
  { icon: TrendingUp, label: 'Тараққиёт', id: 'progress' },
];

const categoryEmojis: Record<string, string> = {
  'Антигистаминные препараты': '🤧',
  'Обезболивающие и противовоспалительные': '💊',
  'Гепатопротекторы и желчегонные': '🫁',
  'Противопростудные препараты': '🤒',
  'Препараты для лечения горла': '😷',
  'Желудочно-кишечные препараты': '🫃',
  'Витамины и БАДы': '💪',
};

export default function Dashboard({ onNavigate, onEditProfile }: DashboardProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const categories = ['Barchasi', ...new Set(drugCourses.map(c => c.category))];

  const handleLogout = () => { logout(); onNavigate('landing'); };

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PL';

  const stats = useMemo(() => [
    { label: 'Курслар', value: drugCourses.length, icon: BookOpen, suffix: 'та', gradient: 'from-violet-500 to-purple-600' },
    { label: 'Дарслар', value: drugCourses.reduce((s, c) => s + parseInt(c.lessons.split('/')[0] || '0'), 0), icon: Target, suffix: 'та', gradient: 'from-emerald-500 to-teal-600' },
    { label: 'Бахо', value: parseFloat((drugCourses.reduce((s, c) => s + c.rating, 0) / drugCourses.length).toFixed(1)), icon: Star, suffix: '', gradient: 'from-amber-500 to-orange-600' },
    { label: 'Мамлакат', value: new Set(drugCourses.map(c => c.country)).size, icon: Globe, suffix: 'та', gradient: 'from-cyan-500 to-blue-600' },
  ], []);

  const filteredCourses = drugCourses.filter(c => {
    const q = searchQuery.toLowerCase();
    return !q || c.title.toLowerCase().includes(q) || c.activeSubstance.toLowerCase().includes(q) ||
      (selectedCategory === 'Barchasi' || c.category === selectedCategory);
  });

  const displayCourses = showAllCourses ? filteredCourses.slice(0, 6) : filteredCourses.slice(0, 3);
  const displayActivities = showAllActivities ? activities : activities.slice(0, 3);

  const [processedLessons, setProcessedLessons] = useState<Record<number, number>>({});
  const handleContinue = (id: number) => setProcessedLessons(p => ({ ...p, [id]: (p[id] || 0) + 1 }));

  // Анимацияли рақамлар
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  useEffect(() => {
    const timeouts = stats.map((s, i) => 
      setTimeout(() => setAnimatedStats(prev => { const n = [...prev]; n[i] = s.value; return n; }), 200 + i * 300)
    );
    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c1d] via-[#0f1128] to-[#0a1628] text-white flex relative overflow-hidden">
      <ParticleField count={25} colors={['#6366f1', '#0d9488', '#14b8a6', '#8b5cf6', '#06b6d4']} />

      {/* ===== SIDEBAR ===== */}
      <GlassCard className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} !bg-[#0c0c1d]/90 !backdrop-blur-2xl !rounded-none !border-none`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all" style={{ animation: 'float-3d 3s ease-in-out infinite' }}>
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Pharm<span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">Learn</span>
              </span>
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white border border-white/10 shadow-lg backdrop-blur-xl'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className="w-4.5 h-4.5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className="text-sm">{item.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-1">
            <button onClick={onEditProfile} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Settings className="w-4.5 h-4.5" /> Созламалар
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300/70 hover:text-red-300 hover:bg-red-500/10 transition-all">
              <LogOut className="w-4.5 h-4.5" /> Чиқиш
            </button>
          </div>
        </div>
      </GlassCard>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ===== MAIN ===== */}
      <main className="flex-1 min-w-0 relative z-10">
        <header className="sticky top-0 z-20 border-b border-white/5 h-16 flex items-center px-4 sm:px-6 lg:px-8 gap-4 backdrop-blur-2xl bg-[#0c0c1d]/70">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/5">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-violet-400 transition-colors" />
              <input type="text" placeholder="Дори, модда ёки мавзу..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:bg-white/10 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-xl" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors border border-white/5">
                <Bell className="w-4.5 h-4.5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse" />
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-[#0c0c1d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-3 z-50">
                    <p className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Билдиришномалар</p>
                    {[
                      { text: 'Янги курс: "Стрепсилс" қўшилди', time: '5 дақиқа', emoji: '🎬' },
                      { text: 'Лораталь тести 92%', time: '1 соат', emoji: '📊' },
                      { text: 'Эссенциале видео дарси тайёр', time: '3 соат', emoji: '🎯' },
                    ].map((n, i) => (
                      <div key={i} className="px-4 py-2.5 hover:bg-white/5 cursor-pointer transition-colors flex gap-3">
                        <span className="text-lg">{n.emoji}</span>
                        <div>
                          <p className="text-sm text-white/70">{n.text}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-6 w-px bg-white/5" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/20">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white/90 leading-none">{user?.fullName}</p>
                <p className="text-xs text-white/40 mt-0.5">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
          {activeSection === 'dashboard' && (
            <>
              {/* Welcome */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="relative">
                  <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">
                    <span className="bg-gradient-to-r from-white via-violet-200 to-emerald-200 bg-clip-text text-transparent">
                      Хуш келибсиз, {user?.fullName?.split(' ')[0]}
                    </span>
                    <span className="inline-block ml-2" style={{ animation: 'float-3d 2s ease-in-out infinite' }}>👋</span>
                  </h1>
                  <p className="text-white/40 text-sm">Бугун {drugCourses.length} та дори препаратини ўрганишингиз мумкин</p>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <GlassCard className="p-5 group hover:bg-white/[0.08] transition-all duration-500 cursor-default" glow>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <FloatingElement duration={4 + i}>
                          <Pill3D className="w-6 h-6 opacity-30" />
                        </FloatingElement>
                      </div>
                      <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {animatedStats[i]}{stat.suffix}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Filter pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard className="p-1.5 mb-6 flex flex-wrap gap-1">
                  {categories.slice(0, 6).map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-violet-600 to-emerald-600 text-white shadow-lg shadow-violet-500/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}>
                      {cat === 'Barchasi' ? '🏛 Барча' : `${categoryEmojis[cat] || '💊'} ${cat.split(' ').slice(0, 2).join(' ')}`}
                    </button>
                  ))}
                </GlassCard>
              </motion.div>

              {/* Main grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Courses */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold text-white/90">Давом этаётган курслар</h2>
                      <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-medium">{filteredCourses.length} та</span>
                    </div>
                    <button onClick={() => setShowAllCourses(!showAllCourses)}
                      className="text-sm font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                      {showAllCourses ? 'Яшириш' : 'Барчаси'} <ChevronRight className={`w-4 h-4 transition-transform ${showAllCourses ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {filteredCourses.length === 0 && (
                    <GlassCard className="p-12 text-center">
                      <Search className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/50 font-medium">Хеч нарса топилмади</p>
                    </GlassCard>
                  )}

                  <AnimatePresence mode="popLayout">
                    {displayCourses.map((course, i) => (
                      <motion.div key={course.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: i * 0.05 }}>
                        <GlassCard className="group hover:bg-white/[0.08] transition-all duration-500 overflow-hidden">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-44 lg:w-52 h-36 sm:h-auto overflow-hidden flex-shrink-0 relative bg-white/[0.03]">
                              <img src={course.image} alt={course.title} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute top-2 left-2 flex gap-1">
                                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xl text-amber-300 border border-white/10">⭐ {course.rating}</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xl text-white/60 border border-white/10">{course.country}</span>
                              </div>
                            </div>
                            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{course.title}</h3>
                                    <p className="text-[11px] text-white/40 mt-0.5">{course.activeSubstance} · {course.manufacturer}</p>
                                  </div>
                                  <span className="text-xs font-bold text-emerald-400 whitespace-nowrap">{course.price}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <span className="text-[10px] font-medium text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">{course.level}</span>
                                  <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-md">{course.drugForm}</span>
                                  <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-md">{course.modules} модуль</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[11px] font-medium text-white/50">{course.lessons} дарс</span>
                                  <span className="text-[11px] font-bold text-violet-400">{Math.min(course.progress + (processedLessons[course.id] || 0), 100)}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(course.progress + (processedLessons[course.id] || 0), 100)}%` }}
                                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                                    className="h-full bg-gradient-to-r from-violet-500 via-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/20" />
                                </div>
                                <div className="mt-2.5 flex items-center justify-between">
                                  <button onClick={() => handleContinue(course.id)}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 text-white text-[11px] font-semibold rounded-lg transition-all shadow-lg shadow-violet-500/20 active:scale-95">
                                    <Play className="w-3 h-3" />
                                    {course.progress === 0 ? 'Бошлаш' : 'Давом'}
                                  </button>
                                  <span className="text-[10px] text-white/40">Кейинги: <span className="font-medium text-white/60">{course.nextLesson}</span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Activity sidebar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white/90">Сўнгги фаолият</h2>
                    <button onClick={() => setShowAllActivities(!showAllActivities)} className="text-sm font-medium text-violet-400 hover:text-violet-300">
                      {showAllActivities ? 'Яшириш' : 'Барчаси'}
                    </button>
                  </div>

                  <GlassCard className="divide-y divide-white/5 overflow-hidden">
                    {displayActivities.map((a, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                        className="p-3.5 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer group">
                        <span className="text-lg">{a.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/70 leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">{a.text}</p>
                          <p className="text-[10px] text-white/30 mt-1">{a.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </GlassCard>

                  {/* Quick Stats */}
                  <GlassCard className="p-5" glow>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-white/80">Тезкор статистика</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Мамлакатлар', value: new Set(drugCourses.map(c => c.country)).size, gradient: 'from-violet-500 to-purple-600' },
                        { label: 'Ўрт. бахо', value: (drugCourses.reduce((s, c) => s + c.rating, 0) / drugCourses.length).toFixed(1), gradient: 'from-amber-500 to-orange-600' },
                        { label: 'Модуллар', value: drugCourses.reduce((s, c) => s + c.modules, 0), gradient: 'from-emerald-500 to-teal-600' },
                        { label: 'Категория', value: new Set(drugCourses.map(c => c.category)).size, gradient: 'from-rose-500 to-pink-600' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/5">
                          <p className={`text-xl font-extrabold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</p>
                          <p className="text-[10px] text-white/40">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Categories */}
                  <GlassCard className="p-5">
                    <h3 className="text-sm font-bold text-white/80 mb-3">💊 Категориялар</h3>
                    <div className="space-y-2">
                      {Object.entries(categoryEmojis).slice(0, 5).map(([cat, emoji]) => (
                        <div key={cat} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{emoji}</span>
                            <span className="text-xs text-white/50">{cat.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                          <span className="text-[10px] text-white/30 font-medium">{drugCourses.filter(c => c.category === cat).length} та</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Profile */}
                  <GlassCard className="p-5 bg-gradient-to-br from-violet-600/20 to-emerald-600/20 border-violet-500/20" glow>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-violet-500/30 border-2 border-white/20"
                        style={{ animation: 'float-3d 3s ease-in-out infinite' }}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white/90">{user?.fullName}</p>
                        <p className="text-[10px] text-white/50">{user?.email}</p>
                      </div>
                    </div>
                    <button onClick={onEditProfile} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold transition-all border border-white/10">
                      <User className="w-3.5 h-3.5" /> Профилни таҳрирлаш
                    </button>
                  </GlassCard>
                </div>
              </div>
            </>
          )}

          {/* AI */}
          {activeSection === 'ai' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/20"
                    style={{ animation: 'float-3d 3s ease-in-out infinite' }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">AI Фармацевтик Ёрдамчи</h1>
                    <p className="text-sm text-white/40">DeepSeek · Bluesminds API</p>
                  </div>
                </div>
                <AIAssistant isFullPage />
              </GlassCard>
            </motion.div>
          )}

          {/* Other sections */}
          {activeSection !== 'dashboard' && activeSection !== 'ai' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {activeSection === 'courses' && (
                <>
                  <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-6">📚 Курслар</h1>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drugCourses.map((c, i) => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <GlassCard className="overflow-hidden group hover:bg-white/[0.08] transition-all duration-500">
                          <div className="h-40 bg-white/[0.03] p-4 flex items-center justify-center">
                            <img src={c.image} alt={c.title} className="h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className="p-4">
                            <span className="text-[10px] font-medium text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-md">{c.level}</span>
                            <h3 className="font-bold text-white/90 text-sm mt-1.5">{c.title}</h3>
                            <p className="text-[10px] text-white/40 mt-0.5">{c.activeSubstance}</p>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                              <span className="text-xs text-white/40">{c.modules} модуль · {c.lessons.split('/')[1]} дарс</span>
                              <span className="text-xs font-semibold text-amber-300">⭐ {c.rating}</span>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'certificates' && (
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center mb-6"
                    style={{ animation: 'float-3d 3s ease-in-out infinite' }}>
                    <Award className="w-12 h-12 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white/90 mb-2">Сертификатлар</h2>
                  <p className="text-white/40 max-w-md mx-auto mb-8">Курсларни тугатиб, сертификат олинг</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {drugCourses.slice(0, 3).map((c, i) => (
                      <GlassCard key={i} className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/10 flex items-center justify-center mb-4">
                          <Award className="w-8 h-8 text-amber-400" />
                        </div>
                        <p className="font-bold text-white/80 text-sm">{c.title.split(' ').slice(0, 2).join(' ')}</p>
                        <div className="mt-3 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }}
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" />
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'progress' && (
                <div className="max-w-3xl">
                  <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-6">📊 Тараққиёт</h1>
                  <GlassCard className="p-6">
                    <h3 className="font-bold text-white/80 mb-4">Курслар бўйича тараққиёт</h3>
                    <div className="space-y-4">
                      {drugCourses.slice(0, 5).map((c, i) => {
                        const pct = Math.floor(Math.random() * 70 + 15);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-white/70">{c.title}</span>
                              <span className="text-violet-400 font-semibold">{pct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: i * 0.15 }}
                                className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full shadow-lg shadow-violet-500/10" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

interface DashboardProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onEditProfile?: () => void;
}
