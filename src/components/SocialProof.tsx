import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  { name: 'Toshkent Farmatsevtika', abbr: 'TFA', color: 'from-blue-500 to-cyan-500' },
  { name: 'Oʻzbekiston Farmatsiya', abbr: 'OF', color: 'from-emerald-500 to-teal-500' },
  { name: 'MedPharma Academy', abbr: 'MPA', color: 'from-violet-500 to-purple-500' },
  { name: 'FarmUniver', abbr: 'FU', color: 'from-amber-500 to-orange-500' },
  { name: 'Dorivor.uz', abbr: 'DU', color: 'from-rose-500 to-pink-500' },
  { name: 'PharmTech Lab', abbr: 'PTL', color: 'from-slate-600 to-slate-800' },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...logos, ...logos, ...logos, ...logos];
  return (
    <div className="relative flex overflow-hidden group">
      <motion.div
        className="flex gap-3 will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.abbr}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-dark-900/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-dark-900/[0.10] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${logo.color} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}>
              {logo.abbr}
            </div>
            <span className="text-[13px] font-[550] tracking-tight text-dark-700 pr-1">{logo.name}</span>
            <span className="w-6 h-6 rounded-full bg-dark-50 flex items-center justify-center text-[10px]">↗</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-12 sm:py-16 relative overflow-hidden bg-white border-y border-dark-900/[0.06]">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="px-3 py-1 rounded-full bg-dark-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase">TRUSTED BY</div>
            <p className="text-[13px] font-medium tracking-tight text-dark-500">
              Ishonchli tashkilotlar • <span className="text-dark-900 font-semibold">Jitter motion dizayn</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-dark-400"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live partners orbiting • Hover to pause
          </motion.div>
        </div>
      </div>

      {/* Double marquee - Jitter Orbit Showreel style */}
      <div className="space-y-3">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      {/* Metrics bar - Jitter style */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k: '10K+', v: 'Faol talaba', sub: '+342 bu oy' },
            { k: '200+', v: 'Premium kurs', sub: '4K video' },
            { k: '98%', v: 'Qoniqish', sub: '⭐ 4.9 reyting' },
            { k: '50+', v: 'Ekspert mentor', sub: 'Verified' },
          ].map((stat, i) => (
            <motion.div
              key={stat.v}
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="rounded-[16px] bg-dark-50 border border-dark-100 px-4 py-3 flex items-center justify-between hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:border-dark-200 transition-all duration-300"
            >
              <div>
                <div className="font-display font-bold text-[18px] leading-none tracking-tight text-dark-900">{stat.k}</div>
                <div className="text-[11px] font-medium text-dark-500 mt-1">{stat.v}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white border border-dark-100 text-dark-600">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
