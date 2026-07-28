import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, LogOut, BookOpen, Award, Clock, TrendingUp,
  Play, Star, ChevronRight, Bell, Settings, Search,
  BarChart3, Target, Flame, Calendar, User,
  Menu, X, CheckCircle2, BookMarked, Bot, Sparkles,
  Pill, Syringe, HeartPulse, Shield, Activity, Zap,
  ChevronDown, ChevronLeft, Globe, DollarSign, AlertTriangle,
  RefreshCw, ExternalLink, Filter, SlidersHorizontal, List,
  LayoutGrid, ArrowUpRight, CircleCheckBig,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AIAssistant from '../AIAssistant';
import { realDrugsData, DrugData } from '../../data/drugData';

interface DashboardProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onEditProfile?: () => void;
}

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
  { text: 'Лораталь (Лоратадин) — H1-блокаторлар мавзусида 12-дарсни тугатдингиз', time: '2 соат олдин', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { text: 'Алер-G бўйича тест натижаси: 92% ✅ Аъло!', time: '4 соат олдин', icon: Target, color: 'bg-emerald-100 text-emerald-600' },
  { text: 'Янги курс қўшилди: Вольтарен Эмульгель (Диклофенак)', time: 'Кеча', icon: Star, color: 'bg-amber-100 text-amber-600' },
  { text: '7 кунlik ўрганиш сериянгиз давом этмоқда! 🔥', time: 'Бугун', icon: Flame, color: 'bg-rose-100 text-rose-600' },
  { text: 'Сертификат олишга 8 дарс қолди — Farmakologiya asoslari', time: '1 кун олдин', icon: Award, color: 'bg-purple-100 text-purple-600' },
  { text: 'Эссенциале форте Н — Гепатопротекторлар мавзуси бўйича видео дарс тайёр', time: '3 кун олдин', icon: Play, color: 'bg-primary-100 text-primary-600' },
  { text: 'Нурофен (Ибупрофен) — болалар учун дозалаш бўйича эслатма', time: '3 кун олдин', icon: HeartPulse, color: 'bg-pink-100 text-pink-600' },
];

const sidebarItems = [
  { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
  { icon: Bot, label: 'AI Yordamchi', id: 'ai', badge: 'AI' },
  { icon: BookOpen, label: 'Mening kurslarim', id: 'courses' },
  { icon: Award, label: 'Sertifikatlar', id: 'certificates' },
  { icon: TrendingUp, label: 'Taraqqiyot', id: 'progress' },
  { icon: Star, label: 'Sevimlilar', id: 'favorites' },
];

const categoryColors: Record<string, string> = {
  'Антигистаминные препараты': 'from-blue-500 to-indigo-500',
  'Обезболивающие и противовоспалительные': 'from-rose-500 to-red-500',
  'Гепатопротекторы и желчегонные': 'from-emerald-500 to-teal-500',
  'Противопростудные препараты': 'from-amber-500 to-orange-500',
  'Препараты для лечения горла': 'from-cyan-500 to-blue-500',
  'Желудочно-кишечные препараты': 'from-lime-500 to-green-500',
  'Витамины и БАДы': 'from-violet-500 to-purple-500',
};

const categoryEmojis: Record<string, string> = {
  'Антигистаминные препараты': '🤧',
  'Обезболивающие и противовоспалительные': '💊',
  'Гепатопротекторы и желчегонные': '🫁',
  'Противопростудные препараты': '🤒',
  'Препараты для лечения горла': '😷',
  'Желудочно-кишечные препараты': '🫃',
  'Витамины и БАДы': '💪',
};

// ===== COMPONENT =====
export default function Dashboard({ onNavigate, onEditProfile }: DashboardProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const categories = ['Barchasi', ...new Set(drugCourses.map(c => c.category))];

  const handleLogout = () => { logout(); onNavigate('landing'); };

  const initials = user?.fullName
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PL';

  const stats = [
    { label: 'Курслар', value: drugCourses.length.toString(), icon: BookOpen, color: 'from-primary-500 to-primary-600', bg: 'bg-primary-50', suffix: 'та' },
    { label: 'Дарслар', value: drugCourses.reduce((s, c) => s + parseInt(c.lessons.split('/')[0] || '0'), 0).toString(), icon: Target, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', suffix: 'та' },
    { label: 'Бахо', value: (drugCourses.reduce((s, c) => s + c.rating, 0) / drugCourses.length).toFixed(1), icon: Star, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', suffix: '⭐' },
    { label: 'Ишлаб чиқарувчи', value: new Set(drugCourses.map(c => c.country)).size.toString(), icon: Globe, color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50', suffix: 'та' },
  ];

  const filteredCourses = drugCourses.filter(c => {
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.activeSubstance.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Barchasi' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayCourses = showAllCourses ? filteredCourses.slice(0, 6) : filteredCourses.slice(0, 3);
  const displayActivities = showAllActivities ? activities : activities.slice(0, 3);

  const [processedLessons, setProcessedLessons] = useState<Record<number, number>>({});
  const handleContinueLesson = (courseId: number) => {
    setProcessedLessons(prev => ({ ...prev, [courseId]: (prev[courseId] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-dark-50 flex">
      {/* ===== SIDEBAR ===== */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-dark-100 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-dark-100">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-emerald-500 flex items-center justify-center shadow-md shadow-primary-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-dark-900 tracking-tight">
                Pharm<span className="gradient-text">Learn</span>
              </span>
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-dark-400 hover:bg-dark-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeSection === item.id ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-dark-500 hover:text-dark-700 hover:bg-dark-50'}`}>
                <item.icon className="w-4.5 h-4.5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className="px-1.5 py-0.5 bg-gradient-to-r from-primary-500 to-emerald-500 text-white text-[8px] font-bold rounded-full">{item.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-dark-100 space-y-1">
            <button onClick={onEditProfile} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-dark-500 hover:text-dark-700 hover:bg-dark-50 transition-all">
              <Settings className="w-4.5 h-4.5" /> Sozlamalar
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all">
              <LogOut className="w-4.5 h-4.5" /> Chiqish
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ===== MAIN ===== */}
      <main className="flex-1 min-w-0">
        {/* ===== TOP BAR ===== */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-dark-100 h-16 flex items-center px-4 sm:px-6 lg:px-8 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-dark-500 hover:bg-dark-100">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input type="text" placeholder="Дори, модда ёки мавзу бўйича..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-50 border border-dark-200 text-sm text-dark-900 placeholder:text-dark-400 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-9 h-9 flex items-center justify-center rounded-xl text-dark-500 hover:bg-dark-100 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-dark-100 shadow-2xl shadow-black/10 py-3 z-50">
                    <p className="px-4 text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Билдиришномалар</p>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {[
                        { text: 'Янги курс: "Стрепсилс Интенсив" қўшилди', time: '5 дақиқа олдин', emoji: '🎬' },
                        { text: 'Лораталь бўйича тест натижаси 92%', time: '1 соат олдин', emoji: '📊' },
                        { text: 'Эссенциале форте Н видео дарси тайёр', time: '3 соат олдин', emoji: '🎯' },
                        { text: 'Нурофен мавзусида эслатма қўшилди', time: '5 соат олдин', emoji: '💡' },
                        { text: 'AI ёрдамчи янгиланди — DeepSeek моделлари', time: '1 кун олдин', emoji: '🤖' },
                      ].map((n, i) => (
                        <div key={i} className="px-4 py-2 hover:bg-dark-50 cursor-pointer transition-colors flex items-start gap-3">
                          <span className="text-lg">{n.emoji}</span>
                          <div>
                            <p className="text-sm text-dark-700">{n.text}</p>
                            <p className="text-[10px] text-dark-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-6 w-px bg-dark-200 hidden sm:block" />
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-dark-900 leading-none">{user?.fullName}</p>
                <p className="text-xs text-dark-400 mt-0.5">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
          {/* ===== DASHBOARD ===== */}
          {activeSection === 'dashboard' && (
            <>
              {/* Welcome */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-900 mb-1">
                  Хуш келибсиз, {user?.fullName?.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm text-dark-400">Бугун {drugCourses.length} та дори препаратини ўрганишингиз мумкин</p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl border border-dark-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-primary-500/[0.04] transition-all duration-300 group">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <div className={`w-5 h-5 bg-gradient-to-br ${stat.color} rounded-md flex items-center justify-center`}>
                        <stat.icon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-dark-900">{stat.value}</p>
                    <p className="text-xs text-dark-400 mt-0.5">{stat.label} ({stat.suffix})</p>
                  </motion.div>
                ))}
              </div>

              {/* Category pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 mb-6">
                {categories.slice(0, 6).map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' : 'bg-white text-dark-500 border border-dark-200 hover:border-primary-300'}`}>
                    {cat === 'Barchasi' ? '🏛 Барчаси' : `${categoryEmojis[cat] || '💊'} ${cat.split(' ').slice(0, 2).join(' ')}`}
                  </button>
                ))}
              </motion.div>

              {/* Main grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Courses */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold text-dark-900">Давом этаётган курслар</h2>
                      <span className="text-[10px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">{filteredCourses.length} та</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="w-8 h-8 rounded-lg bg-dark-100 flex items-center justify-center text-dark-400 hover:text-dark-600 transition-colors">
                        {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setShowAllCourses(!showAllCourses)} className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
                        {showAllCourses ? 'Яшириш' : 'Барчаси'} <ChevronRight className={`w-4 h-4 transition-transform ${showAllCourses ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {filteredCourses.length === 0 && (
                    <div className="bg-white rounded-2xl border border-dark-100 p-12 text-center">
                      <Search className="w-12 h-12 text-dark-300 mx-auto mb-3" />
                      <p className="text-dark-500 font-medium">Хеч нарса топилмади</p>
                      <p className="text-sm text-dark-400 mt-1">Бошқа қидирув сўзини киритинг</p>
                    </div>
                  )}

                  <AnimatePresence mode="popLayout">
                    {displayCourses.map((course, i) => (
                      <motion.div key={course.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.05 * i }}
                        className="group bg-white rounded-2xl border border-dark-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-44 lg:w-52 h-36 sm:h-auto overflow-hidden flex-shrink-0 relative bg-dark-50">
                            <img src={course.image} alt={course.title} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <span className={`absolute top-2 left-2 text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm ${course.rating >= 4.8 ? 'text-amber-600' : 'text-dark-500'}`}>
                              ⭐ {course.rating}
                            </span>
                            <span className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-dark-500">
                              {course.country}
                            </span>
                          </div>
                          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base font-bold text-dark-900 group-hover:text-primary-700 transition-colors">{course.title}</h3>
                                  <p className="text-[11px] text-dark-400 mt-0.5">{course.activeSubstance} · {course.manufacturer}</p>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">{course.price}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">{course.level}</span>
                                <span className="text-[10px] text-dark-400 bg-dark-50 px-2 py-0.5 rounded-md">{course.drugForm}</span>
                                <span className="text-[10px] text-dark-400 bg-dark-50 px-2 py-0.5 rounded-md">{course.modules} модуль</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-medium text-dark-500">{course.lessons} дарс</span>
                                <span className="text-[11px] font-bold text-primary-600">{Math.min(course.progress + (processedLessons[course.id] || 0), 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(course.progress + (processedLessons[course.id] || 0), 100)}%` }}
                                  transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                                  className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full" />
                              </div>
                              <div className="mt-2.5 flex items-center justify-between">
                                <button onClick={() => handleContinueLesson(course.id)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-semibold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95">
                                  <Play className="w-3 h-3" />
                                  {course.progress === 0 ? 'Бошлаш' : 'Давом этиш'}
                                </button>
                                <div className="flex items-center gap-2">
                                  {processedLessons[course.id] ? (
                                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> +{processedLessons[course.id]} дарс
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-dark-400">Кейинги: <span className="font-medium text-dark-600">{course.nextLesson}</span></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Activity + Quick */}
                <div className="space-y-4">
                  {/* Activities */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-dark-900">Сўнгги фаолият</h2>
                    <button onClick={() => setShowAllActivities(!showAllActivities)} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      {showAllActivities ? 'Яшириш' : 'Барчаси'}
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-dark-100 divide-y divide-dark-100 shadow-sm">
                    {displayActivities.map((a, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                        className="p-3.5 flex gap-3 hover:bg-dark-50/80 transition-colors cursor-pointer group">
                        <div className={`w-8 h-8 rounded-xl ${a.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <a.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-dark-700 leading-snug line-clamp-2">{a.text}</p>
                          <p className="text-[10px] text-dark-400 mt-1">{a.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 rounded-2xl p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-primary-400" />
                      <span className="text-sm font-bold">Тезкор статистика</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Мамлакатлар', value: new Set(drugCourses.map(c => c.country)).size.toString(), color: 'text-primary-300' },
                        { label: 'Бахо', value: (drugCourses.reduce((s, c) => s + c.rating, 0) / drugCourses.length).toFixed(1), color: 'text-amber-300' },
                        { label: 'Модуллар', value: drugCourses.reduce((s, c) => s + c.modules, 0).toString(), color: 'text-emerald-300' },
                        { label: 'Категория', value: new Set(drugCourses.map(c => c.category)).size.toString(), color: 'text-rose-300' },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                          <p className="text-[10px] text-white/50">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dori categories */}
                  <div className="bg-white rounded-2xl border border-dark-100 p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-dark-900 mb-3">💊 Категориялар</h3>
                    <div className="space-y-2">
                      {Object.entries(categoryEmojis).slice(0, 5).map(([cat, emoji]) => (
                        <div key={cat} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{emoji}</span>
                            <span className="text-xs text-dark-600">{cat.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                          <span className="text-[10px] text-dark-400 font-medium">{drugCourses.filter(c => c.category === cat).length} та</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile card */}
                  <div className="bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold shadow-lg border-2 border-white/30">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user?.fullName}</p>
                        <p className="text-[10px] text-white/70">{user?.email}</p>
                      </div>
                    </div>
                    <button onClick={onEditProfile} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-all border border-white/10">
                      <User className="w-3.5 h-3.5" /> Профилни таҳрирлаш
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===== AI SECTION ===== */}
          {activeSection === 'ai' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-dark-900">AI Фармацевтик Ёрдамчи</h1>
                  <p className="text-sm text-dark-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                    Bluesminds API · DeepSeek моделлари
                  </p>
                </div>
              </div>
              <AIAssistant isFullPage />
            </motion.div>
          )}

          {/* ===== OTHER SECTIONS ===== */}
          {activeSection !== 'dashboard' && activeSection !== 'ai' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12">
              {/* Courses page */}
              {activeSection === 'courses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-extrabold text-dark-900">📚 Менинг курсларим</h1>
                      <p className="text-sm text-dark-400">{drugCourses.length} та препарат</p>
                    </div>
                    <button onClick={() => setActiveSection('dashboard')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">← Орқага</button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drugCourses.map((course, i) => (
                      <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="bg-white rounded-2xl border border-dark-100 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all group">
                        <div className="h-40 bg-dark-50 p-4 flex items-center justify-center">
                          <img src={course.image} alt={course.title} className="h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">{course.level}</span>
                          <h3 className="font-bold text-dark-900 text-sm mt-1.5">{course.title}</h3>
                          <p className="text-[10px] text-dark-400 mt-0.5">{course.activeSubstance}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-100">
                            <span className="text-xs text-dark-400">{course.modules} модуль · {course.lessons.split('/')[1]} дарс</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span className="text-xs font-semibold text-dark-700">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {activeSection === 'certificates' && (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-6">
                    <Award className="w-12 h-12 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">Сертификатлар</h2>
                  <p className="text-dark-400 max-w-md mx-auto mb-8">Курсларни тугатиб, расмий сертификатларга эга бўлинг. {drugCourses.length} та курсдан {Math.floor(drugCourses.length * 0.3)} тасини тугатдингиз.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {drugCourses.slice(0, 3).map((c, i) => (
                      <div key={i} className="bg-white border border-dark-100 rounded-2xl p-6 shadow-sm text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-4 shadow-inner">
                          <Award className="w-8 h-8 text-amber-500" />
                        </div>
                        <p className="font-bold text-dark-900 text-sm">{c.title.split(' ').slice(0, 2).join(' ')}</p>
                        <p className="text-[10px] text-dark-400 mt-1">{c.modules} модуль</p>
                        <div className="mt-3 w-full h-1.5 bg-dark-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate('landing')} className="mt-6 px-6 py-3 bg-dark-900 text-white text-sm font-semibold rounded-xl hover:bg-dark-800 transition-all shadow-lg">
                    Барча курсларни кўриш
                  </button>
                </div>
              )}

              {/* Progress */}
              {activeSection === 'progress' && (
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-2xl font-extrabold text-dark-900 mb-6">📊 Тараққиёт</h1>
                  <div className="bg-white rounded-2xl border border-dark-100 p-6 shadow-sm mb-4">
                    <h3 className="font-bold text-dark-900 mb-4">Курслар бўйича умумий тараққиёт</h3>
                    <div className="space-y-4">
                      {drugCourses.slice(0, 5).map((c, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-dark-700">{c.title}</span>
                            <span className="text-primary-600 font-semibold">{Math.floor(Math.random() * 70 + 15)}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-dark-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.floor(Math.random() * 70 + 15)}%` }}
                              transition={{ duration: 1, delay: i * 0.15 }}
                              className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Favorites */}
              {activeSection === 'favorites' && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">Севимлилар</h2>
                  <p className="text-dark-400 max-w-md mx-auto mb-6">Севимли курсларингизни сақланг ва тез кириш имкониятига эга бўлинг.</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {drugCourses.filter((_, i) => i < 3).map((c, i) => (
                      <div key={i} className="bg-white border border-dark-100 rounded-2xl p-4 shadow-sm group hover:shadow-md transition-all">
                        <img src={c.image} alt={c.title} className="h-24 mx-auto object-contain mb-3" />
                        <p className="font-bold text-sm text-dark-900">{c.title}</p>
                        <p className="text-[10px] text-dark-400">⭐ {c.rating}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
