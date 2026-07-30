import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-dark-950 p-[1px]"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-primary-500/30 via-violet-500/20 to-emerald-500/30" />

          <div className="relative rounded-[31px] sm:rounded-[39px] bg-dark-900 overflow-hidden">
            {/* Mesh */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1/2 -left-1/4 w-[80%] h-[120%] rounded-full blur-[100px] bg-gradient-to-br from-primary-600/20 to-violet-600/20"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1/2 -right-1/4 w-[80%] h-[120%] rounded-full blur-[120px] bg-gradient-to-br from-emerald-600/15 to-cyan-600/15"
              />
              <div className="absolute inset-0 bg-grid-dark opacity-[0.3]" />
            </div>

            {/* Floating cards - Jitter style */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-[20%] w-16 h-16 rounded-[16px] bg-white/[0.06] border border-white/10 backdrop-blur hidden lg:flex items-center justify-center text-white"
            >
              ✦
            </motion.div>

            <div className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-[0.12em] uppercase text-white/80 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Jitter premium • Bugunoq boshlang
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-display text-[32px] sm:text-[44px] lg:text-[56px] font-[700] leading-[0.95] tracking-[-0.04em] text-white max-w-[700px] mx-auto"
              >
                Farmatsevtika karyerangizni{' '}
                <span className="bg-gradient-to-r from-primary-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                  hozir boshlang
                </span>{' '}
                — orbitda
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 text-[15px] sm:text-[17px] leading-[1.6] tracking-[-0.01em] text-white/60 max-w-[560px] mx-auto"
              >
                10,000+ farmasevtlarga qo‘shiling. Jitter.video dan ilhomlangan premium motion,
                orbit cards, gradient loop — 7 kun bepul.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <button
                  onClick={() => onNavigate('register')}
                  className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-white text-dark-900 text-[14px] font-semibold tracking-tight shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] hover:translate-y-[-1px] active:translate-y-[0] transition-all cursor-pointer"
                >
                  Bepul ro'yxatdan o'ting — Premium
                  <span className="w-9 h-9 rounded-full bg-dark-900 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <a href="#features" className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.10] text-[13px] font-medium tracking-tight transition-all">
                  Batafsil — Jitter dizayn
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium tracking-tight text-white/40"
              >
                <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Kredit karta shart emas</span>
                <span className="w-px h-3 bg-white/15" />
                <span>30 kun kafolat</span>
                <span className="w-px h-3 bg-white/15" />
                <span>Jitter silliq bekor qilish</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
