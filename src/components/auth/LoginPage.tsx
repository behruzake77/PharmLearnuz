import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight,
  AlertCircle, CheckCircle2, Loader2, Sparkles, BookOpen,
  Shield, Users, Star,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onForgotPassword?: () => void;
}

export default function LoginPage({ onNavigate, onForgotPassword }: LoginPageProps) {
  const { login, socialLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    if (error) setError('');
  }, [email, password]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const emailError = touched.email && email && !isValidEmail(email) ? 'Email formati noto\'g\'ri' : '';
  const passwordError = touched.password && password.length > 0 && password.length < 6 ? 'Kamida 6 ta belgi' : '';

  const canSubmit = isValidEmail(email) && password.length >= 6 && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError('');
    const result = await login(email, password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => onNavigate('dashboard'), 1000);
    } else {
      setError(result.error || 'Xatolik yuz berdi');
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);

    const demoName = provider === 'Google' ? 'Ali Valiyev' : 'Zebo Karimova';
    const demoEmail = provider === 'Google' ? 'ali.valiyev@gmail.com' : 'zebo.karimova@facebook.com';

    const result = await socialLogin(provider, demoName, demoEmail);

    setSocialLoading(null);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => onNavigate('dashboard'), 1000);
    } else {
      setError(result.error || 'Xatolik yuz berdi');
    }
  };

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 6,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Panel — Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        {/* BG effects */}
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]" />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-16 w-16 h-16 border border-white/10 rounded-2xl"
        />
        <motion.div
          animate={{ y: [8, -12, 8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-20 w-12 h-12 bg-white/5 rounded-xl"
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 cursor-pointer group text-left">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">PharmLearn</span>
          </button>

          {/* Hero text */}
          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4"
            >
              O'z bilimingizni kengaytirishga tayyor bo'ling
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-primary-100/70 text-lg leading-relaxed mb-10"
            >
              10,000+ farmasevtlar bilan birga zamonaviy ta'lim oling va karyerangizni yangi bosqichga olib chiqing.
            </motion.p>

            {/* Feature cards */}
            <div className="space-y-3">
              {[
                { icon: BookOpen, text: '200+ professional kurslar', delay: 0.4 },
                { icon: Shield, text: 'Rasmiy sertifikatlar', delay: 0.5 },
                { icon: Users, text: 'Ekspert mentorlar bilan aloqa', delay: 0.6 },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-emerald-300" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-5 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]"
          >
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              "PharmLearn orqali farmakologiya kursini tugatib, malakamni oshirdim. Endi ishimda ancha ishonchli his qilaman."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-sm font-semibold text-white/90">Madina Karimova</p>
                <p className="text-xs text-white/50">Klinik farmasevt</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-50/40 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-dark-900 tracking-tight">
                Pharm<span className="gradient-text">Learn</span>
              </span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-xs font-medium text-primary-700 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Xush kelibsiz
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-3xl font-extrabold text-dark-900 tracking-tight mb-2"
            >
              Hisobingizga kiring
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-dark-400"
            >
              Hisobingiz yo'qmi?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Ro'yxatdan o'ting
              </button>
            </motion.p>
          </div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            <button
              onClick={() => handleSocialLogin('Google')}
              disabled={socialLoading !== null}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-dark-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-200 group"
            >
              {socialLoading === 'Google' ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium text-dark-700 group-hover:text-primary-700 transition-colors">Google</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              disabled={socialLoading !== null}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-dark-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-200 group"
            >
              {socialLoading === 'Facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
              ) : (
                <>
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-dark-700 group-hover:text-primary-700 transition-colors">Facebook</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex-1 h-px bg-dark-200" />
            <span className="text-xs font-medium text-dark-400 uppercase tracking-wider">yoki email bilan</span>
            <div className="flex-1 h-px bg-dark-200" />
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm text-emerald-700 font-medium">Muvaffaqiyatli! Yo'naltirilmoqda...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label htmlFor="login-email" className="block text-sm font-semibold text-dark-700 mb-1.5">
                Email manzil
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                  placeholder="siz@example.com"
                  autoComplete="email"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white transition-all duration-200 outline-none ${
                    emailError
                      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-dark-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                  }`}
                />
                {email && isValidEmail(email) && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-500" />
                )}
              </div>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {emailError}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-sm font-semibold text-dark-700">
                  Parol
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Parolni unutdingizmi?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, password: true }))}
                  placeholder="Parolingizni kiriting"
                  autoComplete="current-password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl border text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white transition-all duration-200 outline-none ${
                    passwordError
                      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-dark-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
                  aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {passwordError}
                </motion.p>
              )}
            </motion.div>

            {/* Remember me */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2.5"
            >
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  rememberMe
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-dark-300 hover:border-primary-400'
                }`}
                aria-label="Meni eslab qolish"
              >
                {rememberMe && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </button>
              <span className="text-sm text-dark-600 font-medium">Meni eslab qolish</span>
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={!canSubmit || success}
                className={`shimmer-btn group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  canSubmit && !success
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-dark-200 text-dark-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Tekshirilmoqda...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Muvaffaqiyatli!
                  </>
                ) : (
                  <>
                    Kirish
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Demo account hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100"
          >
            <p className="text-xs text-dark-500 text-center">
              🔑 Demo hisob: <strong>test@pharmlearn.uz</strong> / <strong>test123</strong> — yoki o'zingiz ro'yxatdan o'ting
            </p>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-dark-400 mt-8"
          >
            Kirish orqali siz{' '}
            <button onClick={() => onNavigate('landing')} className="text-primary-600 hover:underline">Foydalanish shartlari</button>
            {' '}va{' '}
            <button onClick={() => onNavigate('landing')} className="text-primary-600 hover:underline">Maxfiylik siyosati</button>
            ga rozilik bildirasiz.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
