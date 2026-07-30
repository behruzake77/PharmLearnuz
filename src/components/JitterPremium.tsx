import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Static mesh background - no heavy blur animation, no flicker
export function ProceduralGradientLoop({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Static radial gradients - GPU friendly, no animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle at center, #1a6df5 0%, transparent 70%)', transform: 'translateZ(0)' }} />
        <div className="absolute -bottom-[30%] -right-[15%] w-[75%] h-[75%] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle at center, #10b981 0%, transparent 70%)', transform: 'translateZ(0)' }} />
        <div className="absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at center, #8b5cf6 0%, transparent 70%)', transform: 'translateZ(0)' }} />
      </div>
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Subtle orbit rings - only rotate transform (GPU), no scale/blur animation
export function OrbitSystem() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none no-flicker">
      <div className="relative w-[560px] h-[560px] no-flicker">
        {/* Static rings */}
        <div className="absolute inset-0 rounded-full border border-dashed border-slate-200/70" />
        <div className="absolute inset-[72px] rounded-full border border-dashed border-slate-200/50" />
        <div className="absolute inset-[144px] rounded-full border border-dashed border-slate-200/40" />
        {/* Dots - very slow rotate only */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-0 h-0 no-flicker"
          style={{ willChange: 'transform' }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-400 shadow-sm -translate-y-[280px] translate-x-[-4px]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-0 h-0 no-flicker"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm -translate-y-[208px] translate-x-[-4px]" />
        </motion.div>
      </div>
    </div>
  );
}

// Premium stacked cards - static hover only, no entrance flicker
export function StackCards() {
  const cards = [
    { rot: '-4deg', z: 1, label: 'GMP Standard', value: '100% mos', icon: '✓', bg: 'bg-slate-50' },
    { rot: '3deg', z: 2, label: 'Mutaxassislar', value: '10K+ faol', icon: '◍', bg: 'bg-blue-50/60' },
    { rot: '-1deg', z: 3, main: true, label: 'Farmakologiya', value: '48 dars', icon: '✦', bg: 'bg-white' },
  ];

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center no-flicker">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: card.z, rotate: card.rot } as any}
          className={`absolute w-[340px] ${card.main ? 'h-[200px] shadow-[0_16px_48px_rgba(15,23,42,0.08)]' : 'h-[170px] opacity-95'} rounded-[20px] p-5
            bg-white border border-slate-200/60 flex flex-col justify-between no-flicker
          `}
        >
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${card.main ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {card.icon}
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="w-1 h-1 rounded-full bg-slate-300" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-1">{card.label}</p>
            <p className="text-[20px] font-bold tracking-tight text-slate-900">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PremiumBadge({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm no-flicker"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        NEW
      </div>
      <span className="text-[12px] font-medium text-slate-700 tracking-tight">{children}</span>
    </motion.div>
  );
}

export function VectorPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none no-flicker ${className}`} width="160" height="160" viewBox="0 0 160 160" fill="none">
      <g opacity="0.06" stroke="#0f172a" strokeWidth="1">
        <circle cx="80" cy="80" r="60" strokeDasharray="3 4" />
        <circle cx="80" cy="80" r="40" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 80 + Math.cos(angle) * 40;
          const y1 = 80 + Math.sin(angle) * 40;
          const x2 = 80 + Math.cos(angle) * 60;
          const y2 = 80 + Math.sin(angle) * 60;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.5} />;
        })}
      </g>
    </svg>
  );
}
