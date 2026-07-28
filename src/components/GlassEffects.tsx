/**
 * PharmLearn — 3D Partikullar va Glasmorfizm эффектлари
 */

// 3D айланувчи капсулалар учун SVG
export function Pill3D({ className = "w-8 h-8", color1 = "#6366f1", color2 = "#0d9488" }: { className?: string; color1?: string; color2?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="16" height="12" rx="6" fill="url(#pillGrad)" opacity="0.9" />
      <rect x="4" y="6" width="8" height="12" rx="6" fill="white" opacity="0.15" />
      <rect x="10" y="8" width="0.5" height="8" fill="white" opacity="0.3" />
    </svg>
  );
}

// Партикулалар эффекти
export function ParticleField({ count = 30, colors = ['#6366f1', '#0d9488', '#14b8a6', '#8b5cf6'] }: { count?: number; colors?: string[] }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    driftX: (Math.random() - 0.5) * 30,
    driftY: (Math.random() - 0.5) * 30,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}40`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { transform: translate(var(--drift-x), var(--drift-y)) scale(1.5); opacity: 0.6; }
          100% { transform: translate(calc(var(--drift-x) * -1), calc(var(--drift-y) * -1)) scale(1); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

// Анимацияли рақамлар counter
export function AnimatedNumber({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) {
  return (
    <span className="tabular-nums">{value}{suffix}</span>
  );
}

// Glasmorfizm card wrapper
export function GlassCard({ children, className = '', glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl ${glow ? 'shadow-primary-500/10' : ''} ${className}`}>
      {glow && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary-500/20 to-emerald-500/20 opacity-50 blur-sm -z-10" />
      )}
      {children}
    </div>
  );
}

// 3D айланувчи элемент
export function FloatingElement({ children, duration = 6, delay = 0, className = '' }: { children: React.ReactNode; duration?: number; delay?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        animation: `float-3d ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <style>{`
        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          25% { transform: translateY(-8px) rotateY(5deg); }
          50% { transform: translateY(-4px) rotateY(0deg); }
          75% { transform: translateY(-10px) rotateY(-5deg); }
        }
      `}</style>
      {children}
    </div>
  );
}
