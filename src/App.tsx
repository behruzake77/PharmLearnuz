import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { VideoLessonPlayer } from './components/VideoLesson';
import AIFloatingAssistant from './components/AIFloatingAssistant';
import AdminPanel from './components/admin/AdminPanel';
import { BannerCarousel, NewsSection } from './components/promo/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Courses from './components/Courses';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/auth/Dashboard';

type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'admin';

export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showVideo, setShowVideo] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showVideoLesson, setShowVideoLesson] = useState(false);

  // Global event listener for video lesson
  useEffect(() => {
    const handler = () => setShowVideoLesson(true);
    window.addEventListener('open-video-lesson', handler);
    return () => window.removeEventListener('open-video-lesson', handler);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-dark-900 font-sans antialiased">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar onNavigate={handleNavigate} />
            <main>
              <Hero onNavigate={handleNavigate} onShowVideo={() => setShowVideo(true)} />
              <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BannerCarousel />
              </section>
              <SocialProof />
              <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                  So'nggi yangiliklar
                </h2>
                <NewsSection />
              </section>
              <Features />
              <Courses onNavigate={handleNavigate} onShowAll={() => setShowAllCourses(true)} />
              <Benefits onNavigate={handleNavigate} />
              <Testimonials />
              <Pricing onNavigate={handleNavigate} />
              <FAQ />
              <CTA onNavigate={handleNavigate} />
            </main>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage
              onNavigate={handleNavigate}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          </motion.div>
        )}

        {currentPage === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterPage onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard
              onNavigate={handleNavigate}
              onEditProfile={() => setShowProfileEdit(true)}
            />
          </motion.div>
        )}

        {currentPage === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminPanel onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-dark-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary-600 to-emerald-600">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">PharmLearn — Ta'lim Videosi</h3>
                  <p className="text-primary-100/70">Platformamiz haqida qisqacha video</p>
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/60">
                    <span>🎬 2:34 daqiqa</span>
                    <span>⭐ 4.9 reyting</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Courses Modal */}
      <AnimatePresence>
        {showAllCourses && <AllCoursesModal onClose={() => setShowAllCourses(false)} onNavigate={handleNavigate} />}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />}
      </AnimatePresence>

      {/* Profile Edit Modal */}
      <AnimatePresence>
        {showProfileEdit && <ProfileEditModal onClose={() => setShowProfileEdit(false)} />}
      </AnimatePresence>

      {/* Video Lesson Player (full screen) */}
      {showVideoLesson && <VideoLessonPlayer onClose={() => setShowVideoLesson(false)} />}

      {/* Global AI Floating Assistant — available on all pages */}
      <AIFloatingAssistant />
    </div>
  );
}

export default function App() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <AppContent />
    </AuthContext.Provider>
  );
}

/* ===== ALL COURSES MODAL ===== */
const allCoursesList = [
  { title: 'Farmakologiya asoslari', modules: 12, lessons: 48, level: "Boshlang'ich", duration: '40 soat', rating: 4.9, students: 3240 },
  { title: 'Klinik farmatsiya', modules: 16, lessons: 64, level: "O'rta", duration: '56 soat', rating: 4.8, students: 2180 },
  { title: 'Farmatsevtik texnologiya', modules: 14, lessons: 56, level: "Ilg'or", duration: '48 soat', rating: 4.9, students: 1850 },
  { title: 'Farmakognostika', modules: 10, lessons: 40, level: "Boshlang'ich", duration: '32 soat', rating: 4.7, students: 1520 },
  { title: 'GMP standartlari', modules: 8, lessons: 32, level: "O'rta", duration: '28 soat', rating: 4.8, students: 980 },
  { title: 'Dori vositalari sifat nazorati', modules: 18, lessons: 72, level: "Ilg'or", duration: '60 soat', rating: 4.9, students: 1240 },
  { title: 'Farmatsevtik kimyo', modules: 15, lessons: 60, level: "O'rta", duration: '50 soat', rating: 4.7, students: 890 },
  { title: 'Biotexnologiya va farmatsiya', modules: 11, lessons: 44, level: "Ilg'or", duration: '36 soat', rating: 4.6, students: 670 },
  { title: 'Dorixona menejmenti', modules: 9, lessons: 36, level: "Boshlang'ich", duration: '24 soat', rating: 4.5, students: 2100 },
];

function AllCoursesModal({ onClose, onNavigate }: { onClose: () => void; onNavigate: (page: Page) => void }) {
  const levels = ['Barchasi', "Boshlang'ich", "O'rta", "Ilg'or"];
  const [activeLevel, setActiveLevel] = useState('Barchasi');
  const filtered = activeLevel === 'Barchasi' ? allCoursesList : allCoursesList.filter(c => c.level === activeLevel);

  const [searchQuery, setSearchQuery] = useState('');
  const searched = searchQuery
    ? filtered.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filtered;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b border-dark-100 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold text-dark-900">Barcha kurslar</h2>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-dark-100 flex items-center justify-center hover:bg-dark-200 transition-colors">
              <X className="w-4 h-4 text-dark-500" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Kurs qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setActiveLevel(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeLevel === l ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-500 hover:bg-dark-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searched.length === 0 && (
            <div className="col-span-full text-center py-12 text-dark-400">
              <p className="text-lg font-medium">Hech narsa topilmadi</p>
              <p className="text-sm mt-1">Boshqa qidiruv so'zini kiriting</p>
            </div>
          )}
          {searched.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-dark-50/50 rounded-2xl p-5 border border-dark-100 hover:border-primary-200 hover:shadow-md transition-all group cursor-pointer"
              onClick={() => { onClose(); onNavigate('register'); }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                  course.level === "Boshlang'ich" ? 'bg-emerald-100 text-emerald-700' :
                  course.level === "O'rta" ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'
                }`}>{course.level}</span>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-xs font-semibold text-dark-700">{course.rating}</span>
                </div>
              </div>
              <h3 className="font-bold text-dark-900 mb-1 group-hover:text-primary-700 transition-colors">{course.title}</h3>
              <p className="text-xs text-dark-400 mb-3">{course.modules} modul · {course.lessons} dars · {course.duration}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-dark-400">{course.students.toLocaleString()} talaba</span>
                <span className="text-xs font-semibold text-primary-600 group-hover:translate-x-1 transition-transform">Batafsil →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t border-dark-100 text-center">
          <button
            onClick={() => { onClose(); onNavigate('register'); }}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Bepul boshlash va barcha kurslarga kirish
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== FORGOT PASSWORD MODAL ===== */
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-200">
          <X className="w-4 h-4 text-dark-500" />
        </button>

        {!sent ? (
          <>
            <h3 className="text-2xl font-extrabold text-dark-900 mb-2">Parolni tiklash</h3>
            <p className="text-sm text-dark-400 mb-6">Email manzilingizni kiriting, sizga tiklash havolasini yuboramiz.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="siz@example.com"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-dark-200 text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all mb-4"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Tiklash havolasini yuborish
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-dark-900 mb-2">Havola yuborildi!</h3>
            <p className="text-sm text-dark-400 mb-6">
              <strong className="text-dark-700">{email}</strong> manziliga parolni tiklash havolasi yuborildi.
            </p>
            <button onClick={onClose} className="px-6 py-2.5 bg-dark-900 text-white text-sm font-semibold rounded-xl hover:bg-dark-800 transition-all">
              Tushunarli
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ===== PROFILE EDIT MODAL ===== */
function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-100 flex items-center justify-center hover:bg-dark-200">
          <X className="w-4 h-4 text-dark-500" />
        </button>

        {!saved ? (
          <>
            <h3 className="text-2xl font-extrabold text-dark-900 mb-6">Profilni tahrirlash</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-dark-700 mb-1.5">To'liq ism</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ism Familiya"
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-700 mb-1.5">Telefon</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 rounded-xl border border-dark-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setSaved(true)}
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Saqlash
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-dark-900 mb-2">Profil yangilandi! ✅</h3>
            <button onClick={onClose} className="mt-4 px-6 py-2.5 bg-dark-900 text-white text-sm font-semibold rounded-xl hover:bg-dark-800 transition-all">
              Yopish
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
