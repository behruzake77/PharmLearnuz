import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Video, Award, Users, Brain, Smartphone,
  BarChart3, Shield, Zap, HeartPulse,
} from 'lucide-react';

const features = [
  {
    icon: Video,
    kicker: 'HD STREAMING',
    title: 'Interaktiv video darslar',
    description: 'Professional 4K videolar, real vaqtda farmatsevtika amaliyotlari. Jitter motion kabi silliq animatsiyalar.',
    size: 'large',
    gradient: 'from-blue-500 via-primary-500 to-violet-500',
    bg: 'bg-blue-50/50',
    accent: '#1a6df5',
  },
  {
    icon: Brain,
    kicker: 'AI POWERED',
    title: 'AI yordamchi tizim',
    description: 'Shaxsiylashtirilgan tavsiyalar va o\'qish rejasi sun\'iy intellekt bilan.',
    size: 'medium',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50/60',
    accent: '#8b5cf6',
  },
  {
    icon: Award,
    kicker: 'CERTIFIED',
    title: 'Rasmiy sertifikatlar',
    description: 'Tan olingan sertifikatlar bilan profilingizni boyiting.',
    size: 'medium',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50/60',
    accent: '#f59e0b',
  },
  {
    icon: HeartPulse,
    kicker: 'VIRTUAL LAB',
    title: 'Amaliy laboratoriya',
    description: 'Virtual muhitda tajribalar — xavfsiz va professional.',
    size: 'small',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    accent: '#ec4899',
  },
  {
    icon: Smartphone,
    kicker: 'MOBILE FIRST',
    title: 'Premium mobil ilova',
    description: 'iOS va Android’da Jitter silliqligida ishlaydigan app.',
    size: 'small',
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    accent: '#06b6d4',
  },
  {
    icon: BarChart3,
    kicker: 'ANALYTICS',
    title: 'Taraqqiyot tahlili',
    description: 'Batafsil statistika, heatmap va progress vizuallari.',
    size: 'small',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    accent: '#10b981',
  },
  {
    icon: Users,
    kicker: 'MENTORSHIP',
    title: 'Mentor qo\'llab quvvatlashi',
    description: 'Top farmasevt mentorlar bilan 1:1 sessiyalar.',
    size: 'medium',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50/70',
    accent: '#059669',
  },
  {
    icon: Shield,
    kicker: 'TRUSTED',
    title: 'Kafolatlangan sifat',
    description: 'Davlat standartlari, ekspertlar tomonidan tekshirilgan kontent.',
    size: 'medium',
    gradient: 'from-slate-600 to-dark-800',
    bg: 'bg-slate-50',
    accent: '#1a1f2e',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" ref={ref} className="py-20 sm:py-32 relative overflow-hidden bg-[#fcfdff]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] bg-gradient-to-br from-primary-100 to-violet-100 opacity-50"
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Jitter editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900 text-white text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
            >
              <Zap className="w-3.5 h-3.5" />
              Jitter motion • Imkoniyatlar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-[700] leading-[0.95] tracking-[-0.04em] text-dark-900"
            >
              O'rganish uchun <br />
              <span className="relative inline-block">
                <span className="gradient-text">barcha vositalar</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.22,1,0.36,1] }}
                  className="absolute left-0 -bottom-1 w-full h-[6px] bg-primary-100 rounded-full origin-left"
                />
              </span>{' '}
              bir joyda
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[16px] sm:text-[17px] leading-[1.6] tracking-[-0.01em] text-dark-500 max-w-[420px] lg:text-right lg:ml-auto"
          >
            Jitter.video template laridan ilhomlangan premium motion tizimi bilan jihozlangan,
            zamonaviy texnologiyalar gig ekotizim.
          </motion.p>
        </div>

        {/* Bento Grid - Jitter style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(220px,auto)]">
          {features.map((feat, i) => {
            const isLarge = feat.size === 'large';
            const isMedium = feat.size === 'medium';
            const spanClass = isLarge
              ? 'lg:col-span-7 lg:row-span-2'
              : isMedium
                ? 'lg:col-span-5'
                : 'lg:col-span-3';

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease: [0.22,1,0.36,1] }}
                className={`
                  group relative rounded-[24px] sm:rounded-[28px] p-6 sm:p-7
                  bg-white border border-dark-900/[0.06] 
                  shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_rgba(15,23,42,0.03)]
                  hover:shadow-[0_12px_40px_rgba(15,23,42,0.08),0_24px_80px_rgba(15,23,42,0.04)]
                  hover:border-dark-900/[0.10] hover:translate-y-[-3px]
                  transition-all duration-500 cursor-default overflow-hidden flex flex-col
                  ${spanClass}
                `}
              >
                {/* Accent line top - Jitter */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Subtle mesh inside */}
                <div className={`absolute inset-0 ${feat.bg} opacity-[0.4] group-hover:opacity-[0.6] transition-opacity`} />
                <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full blur-[50px] opacity-[0.08] group-hover:opacity-[0.14] transition-opacity">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${feat.gradient}`} />
                </div>

                <div className="relative flex flex-col h-full">
                  {/* Top meta */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase w-fit">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        {feat.kicker}
                      </span>
                      <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.12)] group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-500`}>
                        <feat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Mini chart / indicator like Jitter template */}
                    <div className="flex items-center gap-1">
                      <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-dark-100 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-semibold tracking-tight text-dark-600">LIVE</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white border border-dark-100 flex items-center justify-center shadow-sm group-hover:rotate-45 transition-transform duration-300">
                        <span className="text-[12px]">↗</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className="font-display font-[600] text-[19px] sm:text-[20px] leading-[1.2] tracking-[-0.02em] text-dark-900 group-hover:text-black transition-colors">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.55] tracking-[-0.01em] text-dark-500 group-hover:text-dark-600 transition-colors">
                      {feat.description}
                    </p>

                    {/* Bottom bar like Jitter progress */}
                    {isLarge && (
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex-1 h-[36px] rounded-full bg-dark-900 flex items-center px-1.5 gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                            <span className="text-[10px]">▶</span>
                          </div>
                          <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isVisible ? { width: '68%' } : {}}
                              transition={{ duration: 1.4, delay: 0.8 + i * 0.05 }}
                              className="h-full bg-white rounded-full"
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-white px-2">68%</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-dark-50 border border-dark-100 flex items-center justify-center">
                          <span className="text-[14px]">⚡</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${feat.gradient} opacity-[0] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-[12px] font-medium text-dark-400"
        >
          <span className="w-6 h-px bg-dark-200" />
          Jitter premium templates dan ilhomlangan • Vector motion • Orbit system
          <span className="w-6 h-px bg-dark-200" />
        </motion.div>
      </div>
    </section>
  );
}
