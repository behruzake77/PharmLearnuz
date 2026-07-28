import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, TrendingUp, Target } from 'lucide-react';

interface BenefitsProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const benefits = [
  'Har qanday joydan va istalgan vaqtda o\'rganing',
  'Tajribali farmatsevt mentorlar bilan bevosita bog\'laning',
  'Rasmiy sertifikatlar bilan karyerangizni rivojlantiring',
  'O\'zbek tilidagi sifatli kontent',
  'Doimiy yangilanadigan zamonaviy materiallar',
  'Amaliy laboratoriya mashg\'ulotlari',
];

const stats = [
  { value: '98%', label: 'Talabalar qoniqishi', icon: Target },
  { value: '3x', label: 'Maosh o\'sishi', icon: TrendingUp },
  { value: '200+', label: 'Professional kurslar', icon: CheckCircle2 },
];

export default function Benefits({ onNavigate }: BenefitsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="benefits" ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950" />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-primary-300 mb-6"
            >
              <TrendingUp className="w-4 h-4" />
              Afzalliklar
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6"
            >
              Nima uchun aynan{' '}
              <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
                PharmLearn?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-dark-300 leading-relaxed mb-10"
            >
              Biz shunchaki kurslar taqdim etmaymiz — biz sizning kasbiy o'sishingiz uchun to'liq ekotizim yaratamiz. Har bir qadam ishonchli va samarali bo'lishi uchun biz siz bilan birgamiz.
            </motion.p>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-dark-200">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => onNavigate('register')}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-emerald-500 rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Hozir boshlang
            </motion.button>
          </div>

          {/* Right: Stats + Visual */}
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="glass-dark rounded-2xl p-6 sm:p-8 group hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative image card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-48 sm:h-56"
            >
              <img
                src="https://images.pexels.com/photos/7594201/pexels-photo-7594201.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Student learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/40 to-emerald-600/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-bold text-xl sm:text-2xl text-center px-6">
                  Kelajakdagi farmatsevtlar shu yerda o'qiydi 🚀
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
