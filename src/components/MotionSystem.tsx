import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const orbitStyle = (radius: string) => ({ '--orbit-radius': radius }) as CSSProperties;

// Premium procedural gradient background loop
export function ProceduralGradientLoop({ children, className = '' }: { children?: ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  const primaryMotion = isMobile ? undefined : {
    scale: [1, 1.2, 1],
    rotate: [0, 5, 0],
    x: [0, 30, 0],
    y: [0, -20, 0],
  };
  const secondaryMotion = isMobile ? undefined : {
    scale: [1, 1.3, 1],
    rotate: [0, -8, 0],
    x: [0, -20, 0],
    y: [0, 30, 0],
  };
  const violetMotion = isMobile ? undefined : {
    scale: [1, 1.25, 1],
    x: [0, 40, 0],
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Mesh gradient layers */}
      <div className="absolute inset-0">
        <motion.div
          animate={primaryMotion}
          transition={isMobile ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/2 -left-1/2 w-[120%] h-[120%] rounded-full blur-[120px] opacity-[0.18]"
          style={{ background: 'radial-gradient(circle at center, #1a6df5 0%, transparent 70%)' }}
        />
        <motion.div
          animate={secondaryMotion}
          transition={isMobile ? undefined : { duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-1/2 -right-1/2 w-[130%] h-[130%] rounded-full blur-[130px] opacity-[0.14]"
          style={{ background: 'radial-gradient(circle at center, #10b981 0%, transparent 70%)' }}
        />
        <motion.div
          animate={violetMotion}
          transition={isMobile ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[30%] left-[40%] w-[80%] h-[80%] rounded-full blur-[100px] opacity-[0.10]"
          style={{ background: 'radial-gradient(circle at center, #8b5cf6 0%, transparent 70%)' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.6] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Orbit System
export function OrbitSystem({ className = '' }: { className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`}>
      {/* Orbit rings */}
      <div className="relative w-[520px] h-[520px]">
        {/* Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-primary-200/20"
        />
        {/* Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[60px] rounded-full border border-dashed border-emerald-200/20"
        />
        {/* Ring 3 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[120px] rounded-full border border-dashed border-violet-200/15"
        />

        {/* Orbit dots */}
        <motion.div
          style={orbitStyle('260px')}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5"
        >
          <div className="orbit-item w-2 h-2 rounded-full bg-primary-400 shadow-lg shadow-primary-400/30" style={orbitStyle('260px')} />
        </motion.div>

        <motion.div
          style={orbitStyle('200px')}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5"
        >
          <div className="orbit-item w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" style={orbitStyle('200px')} />
        </motion.div>
      </div>
    </div>
  );
}

// The Stack Card
export function StackCards() {
  const cards = [
    { rot: '-6deg', z: 1, bg: 'from-white to-primary-50/50', label: 'GMP Standard', value: '100% mos', icon: '✓' },
    { rot: '4deg', z: 2, bg: 'from-white to-emerald-50/50', label: 'Talabalar', value: '10K+ faol', icon: '👨‍⚕️' },
    { rot: '-2deg', z: 3, main: true, bg: 'from-white to-white', label: 'Farmakologiya', value: '48 dars', icon: '📚' },
  ];

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ y: 50, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 1, rotate: card.rot }}
          transition={{ delay: i * 0.15 + 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: card.z, '--rot': card.rot } as CSSProperties}
          className={`absolute w-[340px] ${card.main ? 'h-[220px] shadow-2xl shadow-primary-500/10' : 'h-[180px]'} rounded-[24px] p-6 premium-card bg-gradient-to-br ${card.bg}
            ${card.main ? 'border-primary-100' : 'opacity-90 scale-[0.94]'}
            flex flex-col justify-between
          `}
        >
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl
              ${card.main ? 'bg-gradient-to-br from-primary-600 to-emerald-500 text-white shadow-lg' : 'bg-dark-50 text-dark-600'}
            `}>
              {card.icon}
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="w-1 h-1 rounded-full bg-dark-200" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-dark-400 font-medium mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-dark-900 tracking-tight">{card.value}</p>
            {card.main && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-dark-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-600 to-emerald-500 rounded-full"
                  />
                </div>
                <span className="text-xs font-semibold text-primary-600">72%</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Premium Badge
export function PremiumBadge({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white border border-dark-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        NEW
      </div>
      <span className="text-[13px] font-medium text-dark-700 tracking-tight">{children}</span>
    </motion.div>
  );
}

// Vector Pattern
export function VectorPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} width="200" height="200" viewBox="0 0 200 200" fill="none">
      <g opacity="0.08">
        <circle cx="100" cy="100" r="80" stroke="#1a6df5" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="100" cy="100" r="60" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="40" stroke="#8b5cf6" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 40;
          const y1 = 100 + Math.sin(angle) * 40;
          const x2 = 100 + Math.cos(angle) * 80;
          const y2 = 100 + Math.sin(angle) * 80;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a6df5" strokeWidth="0.5" opacity={0.5} />;
        })}
      </g>
    </svg>
  );
}
