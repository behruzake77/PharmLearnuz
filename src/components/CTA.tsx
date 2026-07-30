import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-950 p-[1px] no-flicker"
        >
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-slate-700/30 via-slate-600/10 to-slate-500/20 opacity-60" />

          <div className="relative rounded-[27px] sm:rounded-[31px] bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-[70%] h-[100%] rounded-full blur-[60px] bg-gradient-to-br from-primary-600/15 to-violet-600/10" style={{ transform: 'translateZ(0)' }} />
              <div className="absolute -bottom-1/2 -right-1/4 w-[70%] h-[100%] rounded-full blur-[60px] bg-gradient-to-br from-emerald-600/10 to-cyan-600/10" style={{ transform: 'translateZ(0)' }} />
              <div className="absolute inset-0 bg-grid-dark opacity-[0.25]" />
            </div>

            <div className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-[0.12em] uppercase text-white/70 mb-6"
              >
                Boshlash vaqti
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.06 }}
                className="font-display text-[30px] sm:text-[42px] lg:text-[50px] font-[700] leading-[0.95] tracking-[-0.03em] text-white max-w-[640px] mx-auto"
              >
                Farmatsevtika karyerangizni{' '}
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">hozir boshlang</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 text-[14px] sm:text-[16px] leading-[1.6] text-white/55 max-w-[520px] mx-auto"
              >
                10 000+ mutaxassislar qatoriga qo‘shiling — 7 kun bepul, 30 kun kafolat.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <button
                  onClick={() => onNavigate('register')}
                  className="group inline-flex items-center gap-2 pl-6 pr-1.5 py-1.5 rounded-full bg-white text-slate-900 text-[13.5px] font-semibold tracking-tight shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] hover:translate-y-[-1px] active:translate-y-[0] transition-all cursor-pointer no-flicker"
                >
                  Bepul ro'yxatdan o'tish
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <a href="#features" className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.10] text-[12.5px] font-medium tracking-tight transition-all cursor-pointer">
                  Batafsil
                </a>
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium tracking-tight text-white/40">
                <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Karta shart emas</span>
                <span className="w-px h-3 bg-white/15" />
                <span>30 kun kafolat</span>
                <span className="w-px h-3 bg-white/15" />
                <span>Istalgan vaqtda bekor</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
