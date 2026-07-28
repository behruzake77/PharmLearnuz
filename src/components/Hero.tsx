import { motion } from 'framer-motion';
import { Play, ArrowRight, Star, Users, BookOpen, Sparkles } from 'lucide-react';
import { scrollToSection } from '../App';

interface HeroProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onShowVideo?: () => void;
}

export default function Hero({ onNavigate, onShowVideo }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-grid noise-overlay">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/30 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-[150px]" />
        
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-[15%] w-16 h-16 border-2 border-primary-200/40 rounded-2xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-[10%] w-12 h-12 bg-emerald-100/50 rounded-xl"
        />
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[60%] right-[8%] w-8 h-8 bg-primary-200/40 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">
                #1 Farmasevtlar uchun platforma
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-dark-900 mb-6"
            >
              Farmatsevtika{' '}
              <span className="gradient-text-hero">bilimingizni</span>{' '}
              yangi bosqichga olib chiqing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-dark-500 leading-relaxed mb-8 max-w-lg"
            >
              Zamonaviy interaktiv kurslar, ekspert mentorlar va amaliy mashg'ulotlar orqali kasbiy malakangizni oshiring. 10,000+ farmasevtlarga ishonch bildirgan platforma.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <button
                onClick={() => onNavigate('register')}
                className="shimmer-btn group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Bepul boshlash
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onShowVideo}
                className="group inline-flex items-center gap-2.5 px-6 py-4 text-base font-medium text-dark-700 hover:text-primary-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-lg shadow-black/[0.08] flex items-center justify-center group-hover:shadow-primary-500/20 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-5 h-5 text-primary-600 ml-0.5" />
                </div>
                Videoni ko'rish
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 sm:gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    'https://images.pexels.com/photos/32315949/pexels-photo-32315949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-dark-400 font-medium">10,000+ talaba</span>
                </div>
              </div>
              <div className="h-8 w-px bg-dark-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <BookOpen className="w-4 h-4 text-primary-500" />
                <span className="font-semibold text-dark-800">200+</span> kurs
              </div>
              <div className="h-8 w-px bg-dark-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <Users className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-dark-800">50+</span> ekspert
              </div>
            </motion.div>
          </div>

          {/* Right: Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10">
                <img
                  src="https://images.pexels.com/photos/8667961/pexels-photo-8667961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Pharmacists learning"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-900">Farmakologiya asoslari</p>
                      <p className="text-xs text-dark-500">12 modul · 48 dars · Sertifikat</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-dark-800">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">98%</p>
                    <p className="text-xs text-dark-400">Muvaffaqiyat</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <span className="text-xl">📚</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">200+</p>
                    <p className="text-xs text-dark-400">Kurslar</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
