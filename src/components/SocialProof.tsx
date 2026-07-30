import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  { name: 'Toshkent Farmatsevtika', abbr: 'TFA', color: 'from-blue-500 to-cyan-500' },
  { name: 'O‘zbekiston Farmatsiya', abbr: 'OF', color: 'from-emerald-500 to-teal-500' },
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
        className="flex gap-3 will-change-transform no-flicker"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.abbr}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all duration-300 cursor-default no-flicker"
          >
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${logo.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
              {logo.abbr}
            </div>
            <span className="text-[12.5px] font-[550] tracking-tight text-slate-700 pr-1">{logo.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-10 sm:py-14 relative overflow-hidden bg-white border-y border-slate-100">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[9px] font-bold tracking-[0.12em] uppercase">TRUSTED BY</div>
            <p className="text-[12.5px] font-medium tracking-tight text-slate-500">
              Ishonchli tashkilotlar • <span className="text-slate-900 font-semibold">Premium hamkorlar</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="space-y-2.5">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k: '10K+', v: 'Faol talaba', sub: '+342 bu oy' },
            { k: '200+', v: 'Premium kurs', sub: '4K video' },
            { k: '98%', v: 'Qoniqish', sub: '⭐ 4.9 reyting' },
            { k: '50+', v: 'Ekspert mentor', sub: 'Tasdiqlangan' },
          ].map((stat, i) => (
            <motion.div
              key={stat.v}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="rounded-[14px] bg-slate-50 border border-slate-200 px-4 py-3 flex items-center justify-between hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 no-flicker"
            >
              <div>
                <div className="font-display font-bold text-[17px] leading-none tracking-tight text-slate-900">{stat.k}</div>
                <div className="text-[11px] font-medium text-slate-500 mt-1">{stat.v}</div>
              </div>
              <div className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white border border-slate-200 text-slate-600">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
