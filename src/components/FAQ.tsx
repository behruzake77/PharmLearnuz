import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'PharmLearn platformasida qanday kurslar mavjud?',
    a: 'Platformamizda farmakologiya, klinik farmatsiya, farmatsevtik texnologiya, farmakognostika, GMP standartlari, dori vositalari sifat nazorati va boshqa 200+ kurs mavjud. Har bir kurs tajribali ekspertlar tomonidan tayyorlangan.',
  },
  {
    q: 'Sertifikatlar rasman tan olinadimi?',
    a: 'Ha, bizning sertifikatlarimiz O\'zbekiston Sog\'liqni saqlash vazirligi va xalqaro farmatsevtika tashkilotlari tomonidan tan olinadi. Ular sizning kasbiy portfelingizni boyitishga xizmat qiladi.',
  },
  {
    q: 'Kurslarni qancha vaqtda tugatish mumkin?',
    a: 'Har bir kurs o\'z tezligingizda o\'rganish uchun mo\'ljallangan. O\'rtacha bitta kursni 4-8 haftada tugatish mumkin, lekin siz o\'zingizga qulay bo\'lgan tezlikda o\'rganishingiz mumkin. Kurs materiallariga kirish muddati cheklanmagan.',
  },
  {
    q: 'Mobil ilovada ham o\'rganish mumkinmi?',
    a: 'Albatta! PharmLearn iOS va Android ilovalarida to\'liq mavjud. Siz darslarni oflayn yuklab olib, internet bo\'lmagan joyda ham o\'rganishingiz mumkin.',
  },
  {
    q: 'Mentor bilan qanday bog\'lanish mumkin?',
    a: 'Professional va Enterprise tarif rejalari mentor xizmatini o\'z ichiga oladi. Siz shaxsiy mentor bilan haftalik video qo\'ng\'iroqlar, chat orqali savol-javob va loyiha tekshiruvi xizmatlaridan foydalanishingiz mumkin.',
  },
  {
    q: 'Pulni qaytarish kafolati bormi?',
    a: 'Ha, barcha pulli rejalarda 30 kunlik to\'liq pulni qaytarish kafolati mavjud. Agar platformamiz sizga mos kelmasa, hech qanday savolsiz pulingizni qaytaramiz.',
  },
  {
    q: 'AI yordamchi qanday ishlaydi?',
    a: 'Sun\'iy intellekt yordamchimiz sizning o\'rganish uslubingizni tahlil qilib, shaxsiylashtirilgan ta\'lim rejasi tuzadi, qiyin mavzularni tushuntiradi, test savollari generatsiya qiladi va taraqqiyotingizni real vaqtda kuzatadi.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-sm font-medium text-violet-700 mb-5"
          >
            <HelpCircle className="w-4 h-4" />
            Tez-tez beriladigan savollar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-5"
          >
            Savollaringiz <span className="gradient-text">bormi?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-500"
          >
            Eng ko'p so'raladigan savollarga javoblarni bu yerda toping.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === i
                  ? 'bg-white border-primary-200 shadow-lg shadow-primary-500/[0.05]'
                  : 'bg-white border-dark-100 hover:border-primary-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className={`text-base font-semibold transition-colors ${openIndex === i ? 'text-primary-700' : 'text-dark-800'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-primary-100 text-primary-600 rotate-0'
                    : 'bg-dark-100 text-dark-500'
                }`}>
                  {openIndex === i ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-sm sm:text-base text-dark-500 leading-relaxed">
                        {faq.a}
                      </p>
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
