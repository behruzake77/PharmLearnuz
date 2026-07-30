import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, TrendingUp, Target, ArrowUpRight } from 'lucide-react';

interface BenefitsProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const benefits = [
  'Zamonaviy interfeys — silliq va tez',
  'Tajribali farmasevt mentorlar bilan aloqa',
  'Rasmiy premium sertifikatlar',
  '100% o‘zbek tilida, aniq tipografika',
  'Doimiy yangilanadigan kontent',
  'Amaliy virtual laboratoriya',
];

const stats = [
  { value: '98%', label: 'Qoniqish', sub: 'Foydalanuvchilar fikri', icon: Target, gradient: 'from-violet-500 to-primary-500' },
  { value: '3x', label: 'Maosh o‘sishi', sub: 'O‘rtacha o‘sish', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
  { value: '200+', label: 'Kurs', sub: 'Katalogdagi darslar', icon: CheckCircle2, gradient: 'from-amber-500 to-orange-500' },
];

export default function Benefits({ onNavigate }: BenefitsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="benefits" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[100%] rounded-full opacity-[0.08] blur-[80px] bg-gradient-to-br from-primary-500 to-violet-600" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[80%] rounded-full opacity-[0.06] blur-[80px] bg-gradient-to-br from-emerald-500 to-cyan-500" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute inset-0 bg-grid-dark opacity-[0.2]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-[0.12em] uppercase text-white/70 mb-6"
            >
              Afzalliklar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-[700] leading-[0.95] tracking-[-0.03em] text-white"
            >
              Nima uchun aynan{' '}
              <span className="bg-gradient-to-r from-primary-300 to-emerald-300 bg-clip-text text-transparent">PharmLearn?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-white/60 max-w-[480px]"
            >
              Har bir detal foydalanuvchi tajribasiga qaratilgan — tez yuklanish, aniq navigatsiya va chuqur kontent.
            </motion.p>

            <div className="mt-10 space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.05 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-slate-900" />
                  </div>
                  <span className="text-[13.5px] tracking-tight text-white/75 group-hover:text-white transition-colors">{b}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => onNavigate('register')}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-[13px] font-semibold tracking-tight shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              Hozir boshlash <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="space-y-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="group relative rounded-[20px] p-[1px] bg-gradient-to-br from-white/10 to-white/[0.02]"
              >
                <div className="rounded-[19px] bg-white/[0.06] backdrop-blur border border-white/[0.06] p-5 flex items-center gap-4 group-hover:bg-white/[0.08] transition-colors no-flicker">
                  <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-[800] text-[30px] leading-none tracking-tight text-white">{stat.value}</span>
                      <span className="text-[11px] font-medium text-white/50">{stat.sub}</span>
                    </div>
                    <div className="text-[12px] font-medium text-white/60 mt-1">{stat.label}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-[20px] overflow-hidden h-[180px] group no-flicker"
            >
              <img src="https://images.pexels.com/photos/7594201/pexels-photo-7594201.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800" alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-primary-900/30" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] font-bold tracking-widest uppercase text-slate-900 w-fit mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE CAMPUS
                </div>
                <p className="font-display font-semibold text-[17px] leading-tight tracking-tight text-white max-w-[260px]">
                  Kelajak farmatsevtlari shu yerda o'qiydi
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
