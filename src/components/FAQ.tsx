import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'PharmLearn kimlar uchun mo‘ljallangan?',
    a: "Farmasevtlar, klinik mutaxassislar, talabalar va sohaga qiziquvchilar uchun — boshlang‘ichdan ekspert darajasigacha tizimli darslar.",
  },
  {
    q: 'Premium dizayn qanday afzallik beradi?',
    a: 'Toza UI, tez sahifalar, aniq kontent tuzilmasi — o‘qish jarayoni chalg‘itmaydi, diqqat saqlanib qoladi va motivatsiya oshadi.',
  },
  {
    q: 'Sertifikatlar rasman tan olinadimi?',
    a: "Ha, sertifikatlar O'zbekiston SSV talablariga mos va ish beruvchilar tomonidan e'tirof etiladi. Tasdiqlash kodi bilan tekshiriladi.",
  },
  {
    q: 'Kurslarni qancha vaqtda tugatish mumkin?',
    a: "Har bir talaba o'z tezligida o'rganadi. O'rtacha 4-8 hafta, lekin sizga mos ritmda davom ettirishingiz mumkin.",
  },
  {
    q: 'Mobil ilova mavjudmi?',
    a: 'Albatta! iOS va Android ilovalar tezkor ishlaydi, offline rejimda ham darslarni saqlab o‘qishingiz mumkin.',
  },
  {
    q: 'Pulni qaytarish kafolati bormi?',
    a: '30 kun to‘liq kafolat. Agar qoniqmasangiz, bir marta bosish bilan bekor qilasiz — hech qanday savolsiz.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-[#fcfdff]">
      <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />

      <div className="relative max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-5"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="font-display text-[30px] sm:text-[42px] font-[700] leading-[0.95] tracking-[-0.03em] text-slate-900"
          >
            Savollaringiz <span className="gradient-text">bormi?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-[13.5px] leading-[1.6] text-slate-500"
          >
            Eng ko‘p so‘raladigan savollar — joyning o‘zida javob.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.04, ease: [0.22,1,0.36,1] }}
              className={`group relative rounded-[18px] border bg-white transition-all duration-300 overflow-hidden no-flicker
                ${openIndex === i
                  ? 'border-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)]'
                  : 'border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
              >
                <span className={`font-display text-[14px] font-[600] leading-[1.3] tracking-tight ${openIndex === i ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${openIndex === i ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-[13px] leading-[1.6] text-slate-500">{faq.a}</p>
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
