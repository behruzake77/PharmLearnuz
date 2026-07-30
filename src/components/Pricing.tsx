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
    description: 'Tanishib chiqish uchun',
    monthlyPrice: 0,
    yearlyPrice: 0,
    isFree: true,
    accent: 'from-slate-700 to-slate-900',
    features: [
      { text: '5 ta bepul kurs', included: true },
      { text: 'Asosiy video darslar', included: true },
      { text: 'Hamjamiyat forumi', included: true },
      { text: 'Mobil ilova', included: true },
      { text: 'Premium sertifikatlar', included: false },
      { text: 'Shaxsiy mentor', included: false },
    ],
    cta: 'Bepul boshlash',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Eng mashhur tanlov',
    monthlyPrice: 99000,
    yearlyPrice: 79000,
    accent: 'from-primary-600 to-violet-600',
    features: [
      { text: 'Barcha kurslar cheksiz', included: true },
      { text: '4K sifat video darslar', included: true },
      { text: 'Hamjamiyat + sharhlar', included: true },
      { text: 'Premium mobil', included: true },
      { text: 'Rasmiy sertifikatlar', included: true },
      { text: 'Mentor + AI yordamchi', included: true },
    ],
    cta: 'Professional tanlash',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Jamoalar va tashkilotlar',
    monthlyPrice: 199000,
    yearlyPrice: 159000,
    accent: 'from-emerald-600 to-teal-600',
    features: [
      { text: 'Barcha kurslar + API', included: true },
      { text: '4K video + maxsus kontent', included: true },
      { text: 'Jamoa boshqaruvi', included: true },
      { text: 'White-label mobil', included: true },
      { text: 'Sertifikat + branding', included: true },
      { text: 'Shaxsiy mentor', included: true },
    ],
    cta: 'Enterprise',
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
      <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[600px] mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-5"
          >
            <Crown className="w-3 h-3" />
            Narxlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="font-display text-[30px] sm:text-[44px] font-[700] leading-[0.96] tracking-[-0.03em] text-slate-900"
          >
            Sizga mos <span className="gradient-text">tarifni tanlang</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-[14px] leading-[1.6] text-slate-500"
          >
            7 kun bepul, 30 kun kafolat. Istalgan vaqtda bekor qilishingiz mumkin.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className={`text-[12.5px] font-medium ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Oylik</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${isYearly ? 'bg-slate-900' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isYearly ? 'translate-x-[26px]' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-[12.5px] font-medium ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Yillik</span>
          {isYearly && <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full">20% tejash</span>}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22,1,0.36,1] }}
              className={`relative rounded-[24px] bg-white border p-[1px] transition-all duration-300 no-flicker
                ${plan.popular ? 'border-slate-300 shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:scale-[1.03] lg:-translate-y-2' : 'border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-slate-300'}`}
            >
              <div className="relative rounded-[23px] bg-white p-6 sm:p-7 h-full flex flex-col">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase shadow-md">
                      <Star className="w-3 h-3 fill-white" /> Mashhur
                    </div>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="font-display font-bold text-[18px] tracking-tight text-slate-900">{plan.name}</h3>
                  <p className="text-[11.5px] text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.isFree ? (
                    <span className="font-display text-[36px] font-[800] tracking-tight text-slate-900">Bepul</span>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[36px] font-[800] tracking-tight text-slate-900">{formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}</span>
                        <span className="text-[13px] text-slate-400 font-medium ml-1">so'm/oy</span>
                      </div>
                      {isYearly && (
                        <p className="text-[10.5px] font-semibold text-emerald-700 mt-1 px-2.5 py-1 rounded-full bg-emerald-50 w-fit">
                          {formatPrice((plan.monthlyPrice - plan.yearlyPrice) * 12)} so'm tejash
                        </p>
                      )}
                    </>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('register')}
                  className={`group/btn flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[12.5px] tracking-tight transition-all cursor-pointer mb-6 no-flicker
                    ${plan.popular ? 'bg-slate-900 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] hover:translate-y-[-1px]' : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900'}`}
                >
                  {plan.cta}
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover/btn:rotate-45 ${plan.popular ? 'bg-white text-slate-900' : 'bg-slate-900 text-white group-hover/btn:bg-white group-hover/btn:text-slate-900'}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <div className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      {f.included ? (
                        <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" /></div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0"><X className="w-3 h-3 text-slate-400" /></div>
                      )}
                      <span className={`text-[12px] leading-[1.4] ${f.included ? 'text-slate-700 font-[500]' : 'text-slate-400'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] font-medium text-slate-400 mt-8">🔒 30 kun kafolat • Istalgan vaqtda bekor qilish</p>
      </div>
    </section>
  );
}
