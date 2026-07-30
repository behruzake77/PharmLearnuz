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
    description: 'Professional 4K format, real farm-stendlar va jonli tushuntirishlar.',
    size: 'large',
    gradient: 'from-blue-500 to-primary-600',
    bg: 'bg-blue-50/50',
  },
  {
    icon: Brain,
    kicker: 'AI POWERED',
    title: 'AI yordamchi tizim',
    description: 'Shaxsiy o‘quv rejasi, avtomatik test va tavsiyalar.',
    size: 'medium',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50/60',
  },
  {
    icon: Award,
    kicker: 'CERTIFIED',
    title: 'Rasmiy sertifikatlar',
    description: 'Tasdiqlangan hujjatlar bilan portfelingizni kuchaytiring.',
    size: 'medium',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50/60',
  },
  {
    icon: HeartPulse,
    kicker: 'VIRTUAL LAB',
    title: 'Amaliy laboratoriya',
    description: 'Xavfsiz virtual muhitda retsept va doza mashqlari.',
    size: 'small',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Smartphone,
    kicker: 'MOBILE FIRST',
    title: 'Premium mobil tajriba',
    description: 'iOS va Android’da tezkor, offline qo‘llab.',
    size: 'small',
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
  },
  {
    icon: BarChart3,
    kicker: 'ANALYTICS',
    title: 'Taraqqiyot tahlili',
    description: 'Progress, vaqt va bilim xaritasini kuzating.',
    size: 'small',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Users,
    kicker: 'MENTORSHIP',
    title: 'Mentor yordami',
    description: 'Top farmatsevtlar bilan 1:1 jonli sessiyalar.',
    size: 'medium',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50/70',
  },
  {
    icon: Shield,
    kicker: 'TRUSTED',
    title: 'Kafolatlangan sifat',
    description: 'SSV standartlari, ekspertlar tomonidan tekshirilgan kontent.',
    size: 'medium',
    gradient: 'from-slate-600 to-slate-800',
    bg: 'bg-slate-50',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-[#fcfdff]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[40px] bg-gradient-to-br from-primary-200 to-violet-200 no-flicker" style={{ transform: 'translateZ(0)' }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-5"
            >
              <Zap className="w-3 h-3" />
              Imkoniyatlar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-display text-[30px] sm:text-[42px] lg:text-[48px] font-[700] leading-[0.96] tracking-[-0.03em] text-slate-900"
            >
              O‘rganish uchun <br />
              <span className="gradient-text">barcha vositalar</span> bir joyda
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-[15px] sm:text-[16px] leading-[1.6] text-slate-500 max-w-[380px] lg:text-right"
          >
            Silliq UI, tezkor sahifalar va aniq kontent — o‘qish jarayoni chalg‘itmasdan, diqqat markazda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(220px,auto)]">
          {features.map((feat, i) => {
            const isLarge = feat.size === 'large';
            const isMedium = feat.size === 'medium';
            const spanClass = isLarge ? 'lg:col-span-7 lg:row-span-2' : isMedium ? 'lg:col-span-5' : 'lg:col-span-3';

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.04, ease: [0.22,1,0.36,1] }}
                className={`
                  group relative rounded-[20px] sm:rounded-[24px] p-6
                  bg-white border border-slate-200/70
                  shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_rgba(15,23,42,0.03)]
                  hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)] hover:border-slate-300/80 hover:translate-y-[-2px]
                  transition-all duration-300 cursor-default overflow-hidden flex flex-col no-flicker
                  ${spanClass}
                `}
              >
                <div className={`absolute inset-0 ${feat.bg} opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[9px] font-bold tracking-[0.12em] uppercase w-fit">
                        {feat.kicker}
                      </span>
                      <div className={`w-11 h-11 rounded-[12px] bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-sm group-hover:scale-[1.05] transition-transform duration-300`}>
                        <feat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:rotate-45 transition-transform duration-300">
                      <span className="text-[11px]">↗</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display font-[600] text-[18px] leading-[1.2] tracking-[-0.015em] text-slate-900">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-slate-500">
                      {feat.description}
                    </p>

                    {isLarge && (
                      <div className="mt-5 flex items-center gap-2">
                        <div className="flex-1 h-[36px] rounded-full bg-slate-900 flex items-center px-1.5 gap-2">
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[10px]">▶</div>
                          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-[68%] bg-white rounded-full" />
                          </div>
                          <span className="text-[11px] font-semibold text-white pr-2">68%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
