import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  { name: 'Toshkent Farmatsevtika', abbr: 'TFA' },
  { name: 'O\'zbekiston Farmatsiya', abbr: 'OF' },
  { name: 'MedPharma Academy', abbr: 'MPA' },
  { name: 'FarmUniver', abbr: 'FU' },
  { name: 'Dorivor.uz', abbr: 'DU' },
  { name: 'PharmTech Lab', abbr: 'PTL' },
];

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-dark-50/50 border-y border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium text-dark-400 uppercase tracking-widest mb-10"
        >
          Ishonchli tashkilotlar tomonidan qo'llab-quvvatlanadi
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark-200 to-dark-300 group-hover:from-primary-100 group-hover:to-primary-200 flex items-center justify-center text-sm font-bold text-dark-500 group-hover:text-primary-600 transition-all duration-300">
                {logo.abbr}
              </div>
              <span className="text-sm font-semibold text-dark-500 group-hover:text-dark-700 transition-colors hidden sm:block">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
