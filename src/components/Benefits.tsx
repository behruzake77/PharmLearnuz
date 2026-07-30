import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, TrendingUp, Target, ArrowUpRight, Sparkles } from 'lucide-react';

interface BenefitsProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const benefits = [
  'Premium orbit motion kabi silliq va zamonaviy UI',
  'Tajribali farmasevt mentorlar bilan bevosita aloqa',
  'Rasmiy sertifikatlar — premium glass dizayn',
  '100% o‘zbek tilida, premium tipografika',
  'Doimiy yangilanadigan motion content',
  'Amaliy virtual lab — The Stack uslubi',
];

const stats = [
  { value: '98%', label: 'Qoniqish', sub: 'Premium feedback', icon: Target, gradient: 'from-violet-500 to-primary-500' },
  { value: '3x', label: 'Maosh o‘ish', sub: 'Avg karyera o‘sishi', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
  { value: '200+', label: 'Kurs', sub: 'Orbit cards katalogi', icon: CheckCircle2, gradient: 'from-amber-500 to-orange-500' },
];

export default function Benefits({ onNavigate }: BenefitsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="benefits" ref={ref} className="py-20 sm:py-32 relative overflow-hidden bg-dark-950">
      {/* Premium gradient loop dark */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[40%] -left-[20%] w-[80%] h-[140%] rounded-full blur-[130px] opacity-[0.12] bg-gradient-to-br from-primary-500 to-violet-600"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[120%] rounded-full blur-[140px] opacity-[0.10] bg-gradient-to-br from-emerald-500 to-cyan-500"
        />
        <div className="absolute inset-0 bg-grid-dark opacity-[0.25]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold tracking-[0.12em] uppercase text-primary-200 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Premium • Afzalliklar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-[700] leading-[0.95] tracking-[-0.04em] text-white"
            >
              Nima uchun aynan{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-300 to-emerald-300 bg-clip-text text-transparent">PharmLearn?</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22,1,0.36,1] }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary-400 to-emerald-400 rounded-full origin-left"
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-5 text-[15px] sm:text-[16px] leading-[1.6] tracking-[-0.01em] text-white/60 max-w-[480px]"
            >
              Premium motion template larning eng yaxshi pattern lari — The Stack, Orbit, Gradient Loop —
              bitta premium ekotizimda jamlandi. Har bir pixel silliq motion bilan.
            </motion.p>

            <div className="mt-10 space-y-3.5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark-900 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:text-dark-900" />
                  </div>
                  <span className="text-[14px] tracking-tight text-white/80 group-hover:text-white transition-colors">{b}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              onClick={() => onNavigate('register')}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-dark-900 text-[13px] font-semibold tracking-tight shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Hozir boshlash — Premium <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right - Orbit stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 24, rotate: 1 }}
                animate={isVisible ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22,1,0.36,1] }}
                className="group relative rounded-[22px] p-[1px] bg-gradient-to-br from-white/10 to-white/[0.02] hover:from-white/15 hover:to-white/[0.05] transition-all duration-500"
              >
                <div className="rounded-[21px] bg-white/[0.06] backdrop-blur-xl border border-white/[0.06] p-6 flex items-center gap-5 group-hover:bg-white/[0.08] transition-colors">
                  <div className={`w-14 h-14 rounded-[14px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-500`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-[800] text-[36px] leading-none tracking-tight text-white">{stat.value}</span>
                      <span className="text-[12px] font-medium tracking-tight text-white/50">{stat.sub}</span>
                    </div>
                    <div className="text-[13px] font-medium tracking-tight text-white/70 mt-1">{stat.label}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative rounded-[22px] overflow-hidden h-[180px] group"
            >
              <img src="https://images.pexels.com/photos/7594201/pexels-photo-7594201.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800" alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 to-primary-900/40" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold tracking-widest uppercase text-dark-900 w-fit mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE CAMPUS
                </div>
                <p className="font-display font-semibold text-[18px] leading-tight tracking-tight text-white max-w-[280px]">
                  Kelajakdagi farmatsevtlar shu yerda o'qiydi 🚀
                </p>
              </div>
              {/* Premium watermark */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">✦</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
