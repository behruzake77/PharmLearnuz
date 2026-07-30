import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { scrollToSection } from '../App';

const navLinks = [
  { label: 'Imkoniyatlar', href: '#features' },
  { label: 'Kurslar', href: '#courses' },
  { label: 'Sharhlar', href: '#testimonials' },
  { label: 'Narxlar', href: '#pricing' },
];

interface NavbarProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard' | 'admin') => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
      >
        <div
          className={`
            pointer-events-auto w-full max-w-[1240px] flex items-center justify-between gap-3
            px-3 sm:px-4 h-[56px] sm:h-[60px] rounded-full
            transition-all duration-300 no-flicker
            ${scrolled ? 'premium-nav' : 'bg-white/70 backdrop-blur-[8px] border border-slate-200/60 shadow-[0_2px_16px_rgba(0,0,0,0.04)]'}
          `}
          style={{ willChange: 'transform' }}
        >
          {/* Logo */}
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group flex-shrink-0 cursor-pointer no-flicker">
            <div className="relative w-8.5 h-8.5 w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <GraduationCap className="w-[18px] h-[18px] text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[15.5px] font-display font-bold tracking-[-0.02em] text-slate-900">
                Pharm<span className="font-[600] text-slate-600">Learn</span>
              </span>
              <span className="text-[9.5px] font-[600] tracking-[0.12em] uppercase text-slate-400 -mt-0.5">O'zbekiston • 2026</span>
            </div>
          </button>

          {/* Center */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.04]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href.replace('#','')); }}
                className="px-3.5 py-[6px] rounded-full text-[12.5px] font-[550] tracking-tight text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer no-flicker"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold">
                    {initials}
                  </div>
                  <span className="text-[12.5px] font-semibold tracking-tight text-slate-900">{user?.fullName?.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: [0.22,1,0.36,1] }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-[16px] border border-slate-200 shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-1.5 z-50 overflow-hidden no-flicker"
                      >
                        <div className="px-3 py-2.5 rounded-[10px] bg-slate-50 mb-1">
                          <p className="text-[12.5px] font-semibold text-slate-900">{user?.fullName}</p>
                          <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => { setProfileOpen(false); onNavigate('dashboard'); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12.5px] font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> Chiqish
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-1.5">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 rounded-full text-[12.5px] font-[600] tracking-tight text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Kirish
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="group relative px-4.5 py-2 rounded-full text-[12.5px] font-[600] tracking-tight text-white bg-slate-900 hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-200 cursor-pointer flex items-center gap-1.5 no-flicker"
                >
                  Boshlash <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center text-[10px] group-hover:rotate-45 transition-transform">↗</span>
                </button>
              </div>
            )}

            <button
              onClick={() => onNavigate('admin')}
              className="hidden lg:flex w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
              title="Admin"
            >
              <span className="text-[11px]">⚙</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md active:scale-[0.96] transition-transform cursor-pointer no-flicker"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 z-[45] w-[84%] max-w-[340px] bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.12)] lg:hidden flex flex-col no-flicker"
              style={{ willChange: 'transform' }}
            >
              <div className="flex items-center justify-between p-6 pt-7">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold tracking-tight text-slate-900">PharmLearn</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isAuthenticated && user && (
                <div className="mx-5 p-3 rounded-[14px] bg-slate-900 text-white flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-[12px] font-bold">{initials}</div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold truncate">{user.fullName}</p>
                    <p className="text-[10.5px] text-white/60 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="flex-1 px-5 py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => { setMobileOpen(false); scrollToSection(link.href.replace('#','')); }}
                    className="text-left px-3 py-3 rounded-[12px] text-[14px] font-[520] tracking-tight text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="p-5 pt-0 mt-auto flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => { setMobileOpen(false); onNavigate('dashboard'); }} className="w-full py-3 rounded-full bg-slate-900 text-white text-[13px] font-semibold cursor-pointer">Dashboard</button>
                    <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="w-full py-3 rounded-full bg-red-50 text-red-600 text-[13px] font-semibold cursor-pointer">Chiqish</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setMobileOpen(false); onNavigate('login'); }} className="w-full py-3 rounded-full border border-slate-200 text-slate-700 text-[13px] font-semibold cursor-pointer">Kirish</button>
                    <button onClick={() => { setMobileOpen(false); onNavigate('register'); }} className="w-full py-3 rounded-full bg-slate-900 text-white text-[13px] font-semibold shadow-md cursor-pointer">Bepul boshlash</button>
                  </>
                )}
                <p className="text-center text-[10px] text-slate-400 mt-2">© 2026 PharmLearn • Premium ta'lim</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
