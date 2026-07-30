import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, X, Crown, Star, ArrowRight, Zap } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const plans = [
  {
    name: 'Starter',
    description: 'Premium motion bilan tanishing',
    monthlyPrice: 0,
    yearlyPrice: 0,
    isFree: true,
    accent: 'from-dark-700 to-dark-900',
    features: [
      { text: '5 ta bepul kurs — Orbit preview', included: true },
      { text: 'Basic video darslar', included: true },
      { text: 'Hamjamiyat forumi', included: true },
      { text: 'Mobil ilova', included: true },
      { text: 'Premium sertifikatlar', included: false },
      { text: 'Mentor orbit', included: false },
    ],
    cta: 'Bepul boshlash',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'To‘liq premium ekotizim',
    monthlyPrice: 99000,
    yearlyPrice: 79000,
    accent: 'from-primary-600 to-violet-600',
    features: [
      { text: 'Barcha kurslar — Orbit cheksiz', included: true },
      { text: '4K + Premium motion darslar', included: true },
      { text: 'Hamjamiyat + Stack testimonial', included: true },
      { text: 'Premium mobil', included: true },
      { text: 'Rasmiy sertifikatlar — glass', included: true },
      { text: 'Mentor + AI orbit yordamchi', included: true },
    ],
    cta: 'Professional — Premium',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Jamoalar uchun Premium scale',
    monthlyPrice: 199000,
    yearlyPrice: 159000,
    accent: 'from-emerald-600 to-teal-600',
    features: [
      { text: 'Barcha kurslar — cheksiz + API', included: true },
      { text: '4K video + custom motion', included: true },
      { text: 'Jamoa forumi + orbit', included: true },
      { text: 'White-label mobil', included: true },
      { text: 'Sertifikatlar + branding', included: true },
      { text: 'Shaxsiy mentor + orbit AI', included: true },
    ],
    cta: 'Enterprise — Scale',
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
    <section id="pricing" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-[#fcfdff]">
      <div className="absolute inset-0 bg-grid opacity-[0.25]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/40 to-violet-100/30 rounded-full blur-[100px]" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900 text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-5"
          >
            <Crown className="w-3.5 h-3.5" />
            Premium pricing • Narxlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[32px] sm:text-[46px] font-[700] leading-[0.95] tracking-[-0.04em] text-dark-900"
          >
            Sizga mos <span className="gradient-text">tarifni tanlang</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-4 text-[15px] leading-[1.6] text-dark-500"
          >
            Premium motion — 7 kun bepul, 30 kun kafolat. Orbit kabi silliq yangilang.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className={`text-[13px] font-medium tracking-tight ${!isYearly ? 'text-dark-900' : 'text-dark-400'}`}>Oylik</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer ${isYearly ? 'bg-dark-900' : 'bg-dark-200'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isYearly ? 'translate-x-[30px]' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-[13px] font-medium tracking-tight ${isYearly ? 'text-dark-900' : 'text-dark-400'}`}>Yillik</span>
          {isYearly && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-[11px] font-bold rounded-full shadow-sm">20% tejash — Orbit</span>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.22,1,0.36,1] }}
              className={`relative rounded-[28px] bg-white border p-[1px] transition-all duration-500 group
                ${plan.popular
                  ? 'border-primary-200 shadow-[0_20px_60px_rgba(26,109,245,0.10)] lg:scale-[1.04] lg:-translate-y-2'
                  : 'border-dark-900/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-dark-900/[0.10]'
                }
              `}
            >
              <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${plan.accent} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`} />
              <div className="relative rounded-[27px] bg-white p-7 sm:p-8 h-full flex flex-col">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-dark-900 text-white text-[11px] font-bold tracking-widest uppercase shadow-lg">
                      <Star className="w-3 h-3 fill-white" /> Eng mashhur • Premium
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-bold text-[20px] tracking-tight text-dark-900">{plan.name}</h3>
                  <p className="text-[12px] text-dark-400 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.isFree ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[40px] font-[800] tracking-tight text-dark-900">Bepul</span>
                      <span className="text-[13px] text-dark-400">• Premium preview</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[40px] font-[800] tracking-tight text-dark-900">{formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}</span>
                        <span className="text-[14px] text-dark-400 font-medium ml-1">so'm/oy</span>
                      </div>
                      {isYearly && (
                        <p className="text-[11px] font-semibold text-emerald-600 mt-1 px-2.5 py-1 rounded-full bg-emerald-50 w-fit">
                          {formatPrice((plan.monthlyPrice - plan.yearlyPrice) * 12)} so'm tejaysiz — Orbit tejash
                        </p>
                      )}
                    </>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('register')}
                  className={`group/btn flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[13px] tracking-tight transition-all duration-300 cursor-pointer mb-7
                    ${plan.popular ? 'bg-dark-900 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:translate-y-[-1px]' : 'bg-white border border-dark-200 text-dark-900 hover:bg-dark-900 hover:text-white hover:border-dark-900'}`}
                >
                  {plan.cta}
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover/btn:rotate-45 ${plan.popular ? 'bg-white text-dark-900' : 'bg-dark-900 text-white group-hover/btn:bg-white group-hover/btn:text-dark-900'}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <div className="space-y-3 mt-auto">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <div className="w-5 h-5 rounded-full bg-dark-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-dark-50 border border-dark-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-dark-300" />
                        </div>
                      )}
                      <span className={`text-[12.5px] leading-[1.4] tracking-tight ${f.included ? 'text-dark-700 font-[500]' : 'text-dark-400'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-[12px] font-medium tracking-tight text-dark-400 mt-8 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5" /> 🔒 30 kun kafolat • Premium silliqlik • Istalgan vaqtda bekor qilish — Premium orbit
        </motion.p>
      </div>
    </section>
  );
}
