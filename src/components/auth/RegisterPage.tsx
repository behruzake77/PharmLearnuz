import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, User,
  Phone, AlertCircle, CheckCircle2, Loader2, Sparkles,
  BookOpen, Shield, Award, Star, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface RegisterPageProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const specializations = [
  'Klinik farmasevt',
  'Dorixona farmasevti',
  'Sanoat farmasevti',
  'Farmakolog',
  'Sifat nazorati',
  'Ilmiy tadqiqotchi',
  'Talaba',
  'Boshqa',
];

function getPasswordStrength(password: string): { score: number; label: string; color: string; checks: { label: string; passed: boolean }[] } {
  const checks = [
    { label: 'Kamida 8 ta belgi', passed: password.length >= 8 },
    { label: 'Katta harf mavjud', passed: /[A-Z]/.test(password) },
    { label: 'Kichik harf mavjud', passed: /[a-z]/.test(password) },
    { label: 'Raqam mavjud', passed: /\d/.test(password) },
    { label: 'Maxsus belgi mavjud', passed: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const score = checks.filter((c) => c.passed).length;

  if (score <= 1) return { score, label: 'Juda zaif', color: 'bg-red-500', checks };
  if (score === 2) return { score, label: 'Zaif', color: 'bg-orange-500', checks };
  if (score === 3) return { score, label: 'O\'rtacha', color: 'bg-amber-500', checks };
  if (score === 4) return { score, label: 'Kuchli', color: 'bg-emerald-500', checks };
  return { score, label: 'Juda kuchli', color: 'bg-emerald-600', checks };
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { register, socialLogin, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeNews, setAgreeNews] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showSpecDropdown, setShowSpecDropdown] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (error) setError('');
  }, [fullName, email, phone, password, confirmPassword]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = (p: string) => !p || /^\+?\d{9,13}$/.test(p.replace(/\s/g, ''));

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const nameError = touched.fullName && fullName.length > 0 && fullName.length < 3 ? 'Kamida 3 ta belgi' : '';
  const emailError = touched.email && email && !isValidEmail(email) ? 'Email formati noto\'g\'ri' : '';
  const phoneError = touched.phone && phone && !isValidPhone(phone) ? 'Telefon raqam noto\'g\'ri' : '';
  const confirmError = touched.confirmPassword && confirmPassword && password !== confirmPassword ? 'Parollar mos kelmayapti' : '';

  const step1Valid = fullName.length >= 3 && isValidEmail(email) && (!phone || isValidPhone(phone));
  const step2Valid = password.length >= 8 && passwordStrength.score >= 3 && password === confirmPassword && agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (step1Valid) setStep(2);
      return;
    }

    if (!step2Valid) return;

    setError('');
    const result = await register({
      fullName,
      email,
      password,
      phone: phone || undefined,
      specialization: specialization || undefined,
      agreeTerms,
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => onNavigate('dashboard'), 1200);
    } else {
      setError(result.error || 'Xatolik yuz berdi');
    }
  };

  const handleSocialRegister = async (provider: string) => {
    setSocialLoading(provider);
    await new Promise((r) => setTimeout(r, 1000));

    const names: Record<string, { name: string; email: string }> = {
      Google: { name: 'Ali Valiyev', email: `ali.v${Date.now().toString().slice(-4)}@gmail.com` },
      Facebook: { name: 'Zebo Karimova', email: `zebo.k${Date.now().toString().slice(-4)}@facebook.com` },
    };

    const data = names[provider];
    if (!data) return;

    const result = await socialLogin(provider, data.name, data.email);

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
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/10 rounded-full blur-[80px]" />

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
              Bugunoq o'z karyerangizni boshlang
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-emerald-100/70 text-lg leading-relaxed mb-10"
            >
              Ro'yxatdan o'ting va 200+ professional kurslar, ekspert mentorlar va sertifikatlash imkoniyatlariga kirish huquqini qo'lga kiriting.
            </motion.p>

            {/* Step indicators */}
            <div className="space-y-3">
              {[
                { icon: BookOpen, text: '7 kun bepul sinov davri', delay: 0.4 },
                { icon: Award, text: 'Kredit karta talab qilinmaydi', delay: 0.5 },
                { icon: Shield, text: '30 kunlik pulni qaytarish kafolati', delay: 0.6 },
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

          {/* Bottom counter */}
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
              "Ro'yxatdan o'tish juda oson va tez edi. Bir necha daqiqada birinchi darsni boshlashim mumkin bo'ldi."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-sm font-semibold text-white/90">Jasur Alimov</p>
                <p className="text-xs text-white/50">Dorixona mudiri</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-50/40 rounded-full blur-[100px] pointer-events-none" />

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

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  s < step
                    ? 'bg-emerald-500 text-white'
                    : s === step
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-dark-100 text-dark-400'
                }`}>
                  {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${s === step ? 'text-dark-800' : 'text-dark-400'}`}>
                  {s === 1 ? 'Shaxsiy ma\'lumotlar' : 'Xavfsizlik'}
                </span>
                {s < 2 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${s < step ? 'bg-emerald-500' : 'bg-dark-200'}`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Header */}
          <div className="text-center lg:text-left mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-700 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bepul ro'yxatdan o'tish
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-3xl font-extrabold text-dark-900 tracking-tight mb-2"
            >
              {step === 1 ? 'Hisob yarating' : 'Parol o\'rnating'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-dark-400"
            >
              Hisobingiz bormi?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Kirish
              </button>
            </motion.p>
          </div>

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

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm text-emerald-700 font-medium">Muvaffaqiyatli ro'yxatdan o'tdingiz! 🎉</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Social Register */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      disabled={socialLoading !== null}
                      onClick={() => handleSocialRegister('Google')}
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
                      type="button"
                      disabled={socialLoading !== null}
                      onClick={() => handleSocialRegister('Facebook')}
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
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-dark-200" />
                    <span className="text-xs font-medium text-dark-400 uppercase tracking-wider">yoki</span>
                    <div className="flex-1 h-px bg-dark-200" />
                  </div>

                  {/* Full name */}
                  <div>
                    <label htmlFor="reg-name" className="block text-sm font-semibold text-dark-700 mb-1.5">
                      To'liq ismingiz <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                      <input
                        id="reg-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
                        placeholder="Ism Familiya"
                        autoComplete="name"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white transition-all duration-200 outline-none ${
                          nameError
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-dark-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                        }`}
                      />
                      {fullName.length >= 3 && (
                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-500" />
                      )}
                    </div>
                    {nameError && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {nameError}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reg-email" className="block text-sm font-semibold text-dark-700 mb-1.5">
                      Email manzil <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                      <input
                        id="reg-email"
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
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {emailError}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="reg-phone" className="block text-sm font-semibold text-dark-700 mb-1.5">
                      Telefon raqam <span className="text-dark-300 font-normal">(ixtiyoriy)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                      <input
                        id="reg-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                        placeholder="+998 90 123 45 67"
                        autoComplete="tel"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white transition-all duration-200 outline-none ${
                          phoneError
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-dark-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {phoneError}
                      </motion.p>
                    )}
                  </div>

                  {/* Specialization */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-dark-700 mb-1.5">
                      Mutaxassislik <span className="text-dark-300 font-normal">(ixtiyoriy)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSpecDropdown(!showSpecDropdown)}
                      className="w-full flex items-center justify-between pl-4 pr-4 py-3.5 rounded-xl border border-dark-200 text-sm font-medium bg-dark-50/50 hover:bg-white focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none"
                    >
                      <span className={specialization ? 'text-dark-900' : 'text-dark-300'}>
                        {specialization || 'Tanlang...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${showSpecDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showSpecDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-dark-200 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto"
                        >
                          {specializations.map((spec) => (
                            <button
                              key={spec}
                              type="button"
                              onClick={() => { setSpecialization(spec); setShowSpecDropdown(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                                specialization === spec
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-dark-700 hover:bg-dark-50'
                              }`}
                            >
                              {spec}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Next button */}
                  <button
                    type="submit"
                    disabled={!step1Valid}
                    className={`group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 mt-2 ${
                      step1Valid
                        ? 'bg-gradient-to-r from-primary-600 to-emerald-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.01] active:scale-[0.99]'
                        : 'bg-dark-200 text-dark-400 cursor-not-allowed'
                    }`}
                  >
                    Davom etish
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Password */}
                  <div>
                    <label htmlFor="reg-password" className="block text-sm font-semibold text-dark-700 mb-1.5">
                      Parol yarating <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, password: true }))}
                        placeholder="Kuchli parol yarating"
                        autoComplete="new-password"
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-dark-200 text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
                        aria-label={showPassword ? 'Yashirish' : 'Ko\'rsatish'}
                      >
                        {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                    </div>

                    {/* Password strength meter */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                  i < passwordStrength.score
                                    ? passwordStrength.color
                                    : 'bg-dark-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-xs font-semibold ${
                            passwordStrength.score <= 2 ? 'text-red-500' :
                            passwordStrength.score === 3 ? 'text-amber-500' : 'text-emerald-600'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>

                        {/* Checklist */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {passwordStrength.checks.map((check) => (
                            <div key={check.label} className="flex items-center gap-1.5">
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                                check.passed ? 'bg-emerald-500' : 'bg-dark-200'
                              }`}>
                                {check.passed && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <span className={`text-[11px] font-medium ${check.passed ? 'text-emerald-700' : 'text-dark-400'}`}>
                                {check.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label htmlFor="reg-confirm" className="block text-sm font-semibold text-dark-700 mb-1.5">
                      Parolni tasdiqlang <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400 pointer-events-none" />
                      <input
                        id="reg-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, confirmPassword: true }))}
                        placeholder="Parolni qayta kiriting"
                        autoComplete="new-password"
                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl border text-sm font-medium text-dark-900 placeholder:text-dark-300 bg-dark-50/50 focus:bg-white transition-all duration-200 outline-none ${
                          confirmError
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-dark-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                      {confirmPassword && password === confirmPassword && (
                        <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-500" />
                      )}
                    </div>
                    {confirmError && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {confirmError}
                      </motion.p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 mt-0.5 flex-shrink-0 ${
                          agreeTerms
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-dark-300 hover:border-primary-400'
                        }`}
                      >
                        {agreeTerms && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                      </button>
                      <span className="text-sm text-dark-600">
                        <button type="button" onClick={() => onNavigate('landing')} className="text-primary-600 hover:underline font-medium">Foydalanish shartlari</button>{' '}
                        va{' '}
                        <button type="button" onClick={() => onNavigate('landing')} className="text-primary-600 hover:underline font-medium">Maxfiylik siyosati</button>ga rozilik bildiraman <span className="text-red-400">*</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAgreeNews(!agreeNews)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 mt-0.5 flex-shrink-0 ${
                          agreeNews
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-dark-300 hover:border-primary-400'
                        }`}
                      >
                        {agreeNews && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                      </button>
                      <span className="text-sm text-dark-600">
                        Yangiliklar va maxsus takliflar haqida xabar olishni xohlayman
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-xl border border-dark-200 text-sm font-semibold text-dark-700 hover:bg-dark-50 transition-all duration-200"
                    >
                      Orqaga
                    </button>
                    <button
                      type="submit"
                      disabled={!step2Valid || isLoading || success}
                      className={`shimmer-btn group flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        step2Valid && !isLoading && !success
                          ? 'bg-gradient-to-r from-primary-600 to-emerald-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.01] active:scale-[0.99]'
                          : 'bg-dark-200 text-dark-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Yaratilmoqda...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Tayyor!
                        </>
                      ) : (
                        <>
                          Ro'yxatdan o'tish
                          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-dark-400 mt-6"
          >
            🔒 Ma'lumotlaringiz xavfsiz va shifrlangan holda saqlanadi
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
