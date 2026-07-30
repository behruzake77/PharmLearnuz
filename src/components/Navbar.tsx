import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { scrollToSection } from '../App';

const navLinks = [
  { label: 'Imkoniyatlar', href: '#features' },
  { label: 'Kurslar', href: '#courses' },
  { label: 'Testimon.', href: '#testimonials' },
  { label: 'Narxlar', href: '#pricing' },
];

interface NavbarProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard' | 'admin') => void;
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
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
      {/* Premium Floating Navbar - Premium style */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
      >
        <div
          className={`
            pointer-events-auto w-full max-w-[1240px] flex items-center justify-between gap-4
            px-3 sm:px-4 lg:px-5 h-[56px] sm:h-[60px] rounded-full
            transition-all duration-500
            ${scrolled
              ? 'frosted-pill shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] border border-dark-900/[0.06]'
              : 'bg-transparent border border-transparent shadow-none'
            }
          `}
        >
          {/* Logo */}
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group flex-shrink-0 cursor-pointer">
            <div className="relative w-9 h-9 rounded-full bg-dark-900 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:rotate-[-8deg]">
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm animate-pulse" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[16px] font-display font-bold tracking-[-0.02em] text-dark-900">
                Pharm<span className="text-dark-500 font-[600]">Learn</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-dark-400 -mt-0.5">PREMIUM • 2026</span>
            </div>
          </button>

          {/* Center pill navigation - Premium floating nav */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-dark-900/[0.03] border border-dark-900/[0.04]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-[7px] rounded-full text-[13px] font-[550] tracking-tight text-dark-600 hover:text-dark-900 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Desktop authenticated */}
            {isAuthenticated ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-dark-100 shadow-sm hover:shadow-md hover:border-dark-200 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-dark-900 flex items-center justify-center text-white text-[11px] font-bold">
                    {initials}
                  </div>
                  <span className="text-[13px] font-semibold tracking-tight text-dark-900">{user?.fullName?.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-dark-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.22,1,0.36,1] }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-[20px] border border-dark-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-2 z-50 overflow-hidden"
                      >
                        <div className="px-3 py-3 rounded-[12px] bg-dark-50 mb-2">
                          <p className="text-[13px] font-semibold text-dark-900">{user?.fullName}</p>
                          <p className="text-[11px] text-dark-400 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => { setProfileOpen(false); onNavigate('dashboard'); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-dark-700 hover:text-dark-900 hover:bg-dark-50 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Chiqish
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 rounded-full text-[13px] font-[600] tracking-tight text-dark-600 hover:text-dark-900 hover:bg-dark-50 transition-colors cursor-pointer"
                >
                  Kirish
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="group relative px-5 py-2 rounded-full text-[13px] font-[600] tracking-tight text-white bg-dark-900 hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                >
                  Boshlash <span className="w-5 h-5 rounded-full bg-white text-dark-900 flex items-center justify-center text-[10px] group-hover:rotate-45 transition-transform">↗</span>
                </button>
              </div>
            )}

            {/* Admin dot */}
            <button
              onClick={() => onNavigate('admin')}
              className="hidden lg:flex w-9 h-9 rounded-full bg-white border border-dark-100 items-center justify-center text-dark-400 hover:text-dark-900 hover:border-dark-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              title="Admin"
            >
              <span className="text-[11px]">⚙</span>
            </button>

            {/* Mobile burger - premium circle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-dark-900 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu - Premium slide panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark-900/10 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', scale: 0.96 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: '100%', scale: 0.96 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 z-[45] w-[86%] max-w-[360px] bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.12)] lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pt-7">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-dark-900 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold tracking-tight">PharmLearn</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-dark-50 flex items-center justify-center text-dark-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isAuthenticated && user && (
                <div className="mx-6 p-4 rounded-[18px] bg-dark-900 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-sm font-bold">{initials}</div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate">{user.fullName}</p>
                    <p className="text-[11px] text-white/60 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="flex-1 px-6 py-8 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                    onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToSection(link.href.replace('#','')); }}
                    className="px-4 py-3.5 rounded-[14px] text-[15px] font-[550] tracking-tight text-dark-700 hover:bg-dark-50 hover:text-dark-900 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => { setMobileOpen(false); onNavigate('dashboard'); }} className="w-full py-3.5 rounded-full bg-dark-900 text-white text-[14px] font-semibold">Dashboard</button>
                    <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="w-full py-3.5 rounded-full bg-red-50 text-red-600 text-[14px] font-semibold">Chiqish</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setMobileOpen(false); onNavigate('login'); }} className="w-full py-3.5 rounded-full border border-dark-200 text-dark-700 text-[14px] font-semibold">Kirish</button>
                    <button onClick={() => { setMobileOpen(false); onNavigate('register'); }} className="w-full py-3.5 rounded-full bg-dark-900 text-white text-[14px] font-semibold shadow-lg">Bepul boshlash — Premium</button>
                  </>
                )}
                <p className="text-center text-[11px] text-dark-400 mt-2">Premium motion • 2026 Premium Edition</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
