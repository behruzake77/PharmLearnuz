import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Video, Award, Users, Brain, Smartphone,
  BarChart3, Shield, Zap, Globe, HeartPulse,
} from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Interaktiv video darslar',
    description: 'HD sifatdagi professional video darslar real vaqtda farmatsevtika amaliyotlarini o\'rgating.',
    color: 'from-blue-500 to-primary-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Brain,
    title: 'AI yordamchi tizim',
    description: 'Sun\'iy intellekt texnologiyasi yordamida shaxsiylashtirilgan ta\'lim rejasi va tavsiyalar.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Award,
    title: 'Rasmiy sertifikatlar',
    description: 'Kurslarni tugatganingizdan so\'ng tan olingan sertifikatlar bilan kasbiy profilingizni boyiting.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Users,
    title: 'Mentor qo\'llab-quvvatlashi',
    description: 'Tajribali farmasevt mentorlar bilan to\'g\'ridan-to\'g\'ri aloqa va maslahat olish.',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: HeartPulse,
    title: 'Amaliy laboratoriya',
    description: 'Virtual laboratoriya muhitida xavfsiz tajribalar o\'tkazing va amaliy ko\'nikmalar hosil qiling.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Smartphone,
    title: 'Mobil ilova',
    description: 'Istalgan vaqt va joyda o\'rganing — iOS va Android ilovalar orqali to\'liq kirish imkoniyati.',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: BarChart3,
    title: 'Taraqqiyot tahlili',
    description: 'Batafsil statistika va vizualizatsiyalar orqali o\'z rivojlanishingizni real vaqtda kuzating.',
    color: 'from-primary-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Globe,
    title: 'O\'zbek tilidagi kontent',
    description: 'Barcha materiallar o\'zbek tilida tayyorlangan — tushunarli va qulay o\'rganish tajribasi.',
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Shield,
    title: 'Kafolatlangan sifat',
    description: 'Davlat standartlariga mos keladigan, ekspertlar tomonidan tekshirilgan yuqori sifatli kurslar.',
    color: 'from-slate-500 to-gray-700',
    bgColor: 'bg-slate-50',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* BG Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-sm font-medium text-primary-700 mb-5"
          >
            <Zap className="w-4 h-4" />
            Imkoniyatlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-5"
          >
            O'rganish uchun{' '}
            <span className="gradient-text">barcha vositalar</span>{' '}
            bir joyda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-500 leading-relaxed"
          >
            Zamonaviy texnologiyalar va ilg'or pedagogik yondashuvlar bilan jihozlangan platformamiz orqali farmatsevtika sohasida professional darajaga erishing.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-dark-100 hover:border-primary-200 shadow-sm hover:shadow-xl hover:shadow-primary-500/[0.06] transition-all duration-500 cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl ${feat.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-7 h-7 bg-gradient-to-br ${feat.color} rounded-lg flex items-center justify-center`}>
                  <feat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark-900 mb-2.5 group-hover:text-primary-700 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-dark-500 leading-relaxed">
                {feat.description}
              </p>
              {/* Hover border gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
