import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, LogOut, User, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { scrollToSection } from '../App';

const navLinks = [
  { label: 'Imkoniyatlar', href: '#features' },
  { label: 'Kurslar', href: '#courses' },
  { label: 'Afzalliklar', href: '#benefits' },
  { label: 'Fikrlar', href: '#testimonials' },
  { label: 'Narxlar', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

interface NavbarProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace('#', '');
  scrollToSection(id);
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    onNavigate('landing');
  };

  const initials = user?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'PL';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/[0.03]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-dark-900 tracking-tight">
                Pharm<span className="gradient-text">Learn</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-lg hover:bg-primary-50/60 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA / User */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-dark-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {initials}
                    </div>
                    <div className="text-left hidden xl:block">
                      <p className="text-sm font-semibold text-dark-900 leading-none">{user?.fullName}</p>
                      <p className="text-[11px] text-dark-400 mt-0.5">{user?.role}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-dark-100 shadow-2xl shadow-black/10 py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-dark-100">
                            <p className="text-sm font-semibold text-dark-900">{user?.fullName}</p>
                            <p className="text-xs text-dark-400 mt-0.5">{user?.email}</p>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => { setProfileOpen(false); onNavigate('dashboard'); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-dark-700 hover:text-primary-600 hover:bg-primary-50/50 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Chiqish
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-4 py-2.5 text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors"
                  >
                    Kirish
                  </button>
                  <button
                    onClick={() => onNavigate('register')}
                    className="shimmer-btn px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Bepul boshlash
                  </button>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="px-3 py-2 text-xs font-medium text-dark-400 hover:text-primary-400 border border-dark-200 hover:border-primary-300 rounded-xl transition-all"
                    title="Admin panel"
                  >
                    ⚙
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-dark-600 hover:bg-dark-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[calc(100%-3rem)] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                {/* User info in mobile */}
                {isAuthenticated && user && (
                  <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-primary-50/50 border border-primary-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-900">{user.fullName}</p>
                      <p className="text-xs text-dark-400">{user.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection(link.href.replace('#', '')); }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="px-4 py-3 text-base font-medium text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => { setMobileOpen(false); onNavigate('dashboard'); }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-lg shadow-primary-500/25"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => { setMobileOpen(false); handleLogout(); }}
                        className="w-full px-4 py-3 text-center text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        Chiqish
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setMobileOpen(false); onNavigate('login'); }}
                        className="w-full px-4 py-3 text-center text-sm font-medium text-dark-600 border border-dark-200 rounded-xl hover:border-primary-300 transition-colors"
                      >
                        Kirish
                      </button>
                      <button
                        onClick={() => { setMobileOpen(false); onNavigate('register'); }}
                        className="w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-lg shadow-primary-500/25"
                      >
                        Bepul boshlash
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
