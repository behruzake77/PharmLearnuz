import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, X, Crown, Star, ArrowRight } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const plans = [
  {
    name: 'Starter',
    description: 'Farmatsevtika yo\'lini boshlayotganlar uchun',
    monthlyPrice: 0,
    yearlyPrice: 0,
    isFree: true,
    features: [
      { text: '5 ta bepul kurs', included: true },
      { text: 'Asosiy video darslar', included: true },
      { text: 'Hamjamiyat forumi', included: true },
      { text: 'Mobil ilova', included: true },
      { text: 'Sertifikatlar', included: false },
      { text: 'Mentor qo\'llab-quvvatlashi', included: false },
      { text: 'AI yordamchi', included: false },
      { text: 'Virtual laboratoriya', included: false },
    ],
    cta: 'Bepul boshlash',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Jiddiy o\'rganish va karyera o\'sishi uchun',
    monthlyPrice: 99000,
    yearlyPrice: 79000,
    features: [
      { text: 'Barcha kurslar — cheksiz', included: true },
      { text: 'HD video darslar', included: true },
      { text: 'Hamjamiyat forumi', included: true },
      { text: 'Mobil ilova', included: true },
      { text: 'Rasmiy sertifikatlar', included: true },
      { text: 'Mentor qo\'llab-quvvatlashi', included: true },
      { text: 'AI yordamchi', included: true },
      { text: 'Virtual laboratoriya', included: false },
    ],
    cta: 'Professional boshlash',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Tashkilotlar va katta jamoalar uchun',
    monthlyPrice: 199000,
    yearlyPrice: 159000,
    features: [
      { text: 'Barcha kurslar — cheksiz', included: true },
      { text: '4K video darslar', included: true },
      { text: 'Hamjamiyat forumi', included: true },
      { text: 'Mobil ilova', included: true },
      { text: 'Rasmiy sertifikatlar', included: true },
      { text: 'Shaxsiy mentor', included: true },
      { text: 'AI yordamchi — ilg\'or', included: true },
      { text: 'Virtual laboratoriya — to\'liq', included: true },
    ],
    cta: 'Enterprise boshlash',
    popular: false,
  },
];

function formatPrice(price: number) {
  return price.toLocaleString('uz-UZ');
}

export default function Pricing({ onNavigate }: PricingProps) {
  const { ref, isVisible } = useScrollReveal();
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" ref={ref} className="py-20 sm:py-28 bg-dark-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-sm font-medium text-primary-700 mb-5"
          >
            <Crown className="w-4 h-4" />
            Narxlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-5"
          >
            Sizga mos <span className="gradient-text">tarifni tanlang</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-500 leading-relaxed"
          >
            Bepul boshlang, keyinroq yangilang. Barcha rejalarda 7 kunlik bepul sinov davri mavjud.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-dark-900' : 'text-dark-400'}`}>
            Oylik
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? 'bg-primary-600' : 'bg-dark-300'}`}
            aria-label="Toggle billing period"
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isYearly ? 'translate-x-[30px]' : 'translate-x-0.5'}`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-dark-900' : 'text-dark-400'}`}>
            Yillik
          </span>
          {isYearly && (
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              20% tejash
            </span>
          )}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className={`relative bg-white rounded-3xl border-2 p-8 transition-all duration-500 ${
                plan.popular
                  ? 'border-primary-500 shadow-2xl shadow-primary-500/10 scale-[1.02] lg:scale-105'
                  : 'border-dark-100 hover:border-primary-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-emerald-500 rounded-full text-white text-xs font-semibold shadow-lg shadow-primary-500/25">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    Eng mashhur
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-dark-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.isFree ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-dark-900">Bepul</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-dark-900">
                      {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                    </span>
                    <span className="text-lg text-dark-400 font-medium ml-1">so'm/oy</span>
                  </div>
                )}
                {!plan.isFree && isYearly && (
                  <p className="text-sm text-emerald-600 font-medium mt-1">
                    Yillik to'lovda {formatPrice((plan.monthlyPrice - plan.yearlyPrice) * 12)} so'm tejaysiz
                  </p>
                )}
              </div>

              <button
                onClick={() => onNavigate('register')}
                className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mb-8 ${
                  plan.popular
                    ? 'shimmer-btn bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-dark-900 text-white hover:bg-dark-800 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    {f.included ? (
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-dark-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-dark-700' : 'text-dark-400'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money back */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-dark-400 mt-10"
        >
          🔒 30 kunlik pulni qaytarish kafolati · Istalgan vaqtda bekor qilish mumkin
        </motion.p>
      </div>
    </section>
  );
}
