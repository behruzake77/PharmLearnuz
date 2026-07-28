import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 right-[20%] w-20 h-20 border border-white/10 rounded-2xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-[15%] w-14 h-14 bg-white/5 rounded-xl hidden lg:block"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-primary-100 mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Bugunoq boshlang
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          Farmatsevtika karyerangizni{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            hozir boshlang
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-primary-100/80 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          10,000 dan ortiq farmasevtlarga qo'shiling va bugunoq o'z karyerangizni yangi bosqichga olib chiqing. Birinchi 7 kuningiz bepul!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate('register')}
            className="shimmer-btn group inline-flex items-center gap-2.5 px-10 py-4.5 text-base font-semibold text-primary-700 bg-white rounded-2xl shadow-xl shadow-black/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Bepul ro'yxatdan o'ting
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4.5 text-base font-medium text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-2xl hover:bg-white/5 transition-all duration-200"
          >
            Batafsil ma'lumot
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-primary-200/60 mt-8"
        >
          ✓ Kredit karta talab qilinmaydi &nbsp;·&nbsp; ✓ 30 kunlik kafolat &nbsp;·&nbsp; ✓ Istalgan vaqtda bekor qilish
        </motion.p>
      </div>
    </section>
  );
}
