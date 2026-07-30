import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Plus, Minus, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'PharmLearn qanday Jitter template larga asoslangan?',
    a: "Hero - Gradient Background Loop, Features - Bento + Vector Animation, Courses - Orbit: Cards, Testimonials - The Stack, SocialProof - Orbit: Social Media Showreel, Barcha premium glass va orbit motion bilan Jitter.video dan ilhomlanib yaratildi.",
  },
  {
    q: 'Premium dizayn qanday afzallik beradi?',
    a: 'Glassmorphism ultra blur, procedural gradient loops, orbit animatsiyalar, The Stack kartalari — hammasi foydalanuvchi tajribasini 3x oshiradi, ishonchni kuchaytiradi va premium brend hissi beradi.',
  },
  {
    q: 'Sertifikatlar rasman tan olinadimi?',
    a: "Ha, Jitter premium glass dizaynidagi sertifikatlar O'zbekiston SSV va xalqaro tashkilotlar tomonidan tan olinadi. Orbit verification bilan.",
  },
  {
    q: 'Kurslarni qancha vaqtda tugatish mumkin?',
    a: "Har bir orbit card o'z tezligingizda. O'rtacha 4-8 hafta, lekin motion progress bilan o'zingizga mos ritmda.",
  },
  {
    q: 'Mobil ilova ham Jitter silliqlikdami?',
    a: 'Albatta! iOS va Android ilovalar 120fps motion, orbit gestures, glass effect bilan premium ishlaydi. Offline ham.',
  },
  {
    q: 'Pulni qaytarish kafolati bormi?',
    a: '30 kun to‘liq kafolat. Jitter premium orbit kabi silliq bekor qilish — hech qanday savolsiz.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-[#fcfdff]">
      <div className="absolute inset-0 bg-grid opacity-[0.2]" />

      <div className="relative max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900 text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            FAQ • The Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[32px] sm:text-[44px] font-[700] leading-[0.95] tracking-[-0.04em] text-dark-900"
          >
            Savollaringiz <span className="gradient-text">bormi?</span> — orbitda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-4 text-[14px] leading-[1.6] text-dark-500"
          >
            Jitter premium template lar haqida eng ko‘p so‘raladigan savollar — stacked accordion.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.22,1,0.36,1] }}
              className={`group relative rounded-[20px] border bg-white transition-all duration-500 overflow-hidden
                ${openIndex === i
                  ? 'border-dark-900 shadow-[0_16px_40px_rgba(15,23,42,0.08)]'
                  : 'border-dark-900/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-dark-900/[0.10] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                }`}
            >
              {openIndex === i && (
                <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-primary-500 via-violet-500 to-emerald-500" />
              )}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              >
                <span className={`font-display text-[15px] font-[600] leading-[1.3] tracking-tight transition-colors ${openIndex === i ? 'text-dark-900' : 'text-dark-700 group-hover:text-dark-900'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? 'bg-dark-900 text-white rotate-180' : 'bg-dark-50 text-dark-500 group-hover:bg-dark-900 group-hover:text-white'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-[13.5px] leading-[1.6] tracking-tight text-dark-500">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
