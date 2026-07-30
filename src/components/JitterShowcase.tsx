import { motion } from 'framer-motion';
import { Sparkles, Layers, Orbit, LayoutGrid, MousePointer2, ArrowUpRight } from 'lucide-react';
import { OrbitSystem } from './JitterPremium';

// === REAL JITTER ASSETS — lokal, optimallashtirilgan WebP (public/jitter-assets) ===
const SHOWCASE_ASSETS = {
  main: {
    src: '/jitter-assets/showcase-learning-hub.webp',
    alt: 'Pharma Learning Hub — real glass dashboard (light)',
    label: 'The Stack • Learning Hub',
    badge: 'LIGHT GLASS',
  },
  sideA: {
    src: '/jitter-assets/showcase-ops.webp',
    alt: 'Pharmacy Operational Overview — real neon glass dashboard',
    label: 'Orbit • Operational Overview',
    badge: 'NEON GLASS',
  },
  sideB: {
    src: '/jitter-assets/showcase-connect.webp',
    alt: 'Pharma Connect — pharmacy management dashboard',
    label: 'Gradient Loop • Pharma Connect',
    badge: 'ORBIT CARDS',
  },
} as const;

const TEMPLATE_TAGS = [
  { icon: Sparkles, label: 'Gradient Background Loop' },
  { icon: Orbit, label: 'Orbit: Cards' },
  { icon: Layers, label: 'The Stack' },
  { icon: LayoutGrid, label: 'Glass Dashboard' },
];

function WindowChrome({ badge }: { badge: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-dark-950/60 backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold tracking-[0.14em] text-white/80">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {badge}
      </div>
    </div>
  );
}

function AssetCard({
  asset,
  className = '',
  float = {},
  delay = 0,
}: {
  asset: { src: string; alt: string; label: string; badge: string };
  className?: string;
  float?: Record<string, unknown>;
  delay?: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [-7, 7, -7], ...float }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
        className="relative rounded-[22px] overflow-hidden border border-white/12 bg-dark-900 shadow-[0_24px_80px_rgba(13,16,23,0.55)]"
      >
        <WindowChrome badge={asset.badge} />
        <div className="relative">
          <img
            src={asset.src}
            alt={asset.alt}
            width={1200}
            height={670}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Jitter gradient sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary-600/0 via-transparent to-emerald-400/10" />
        </div>
        <figcaption className="flex items-center justify-between gap-3 px-4 py-3 bg-dark-950/80 backdrop-blur-md border-t border-white/10">
          <span className="text-[12px] font-semibold tracking-tight text-white/90">{asset.label}</span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-300">
            Real asset <ArrowUpRight className="w-3 h-3" />
          </span>
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}

export default function JitterShowcase() {
  return (
    <section id="jitter-showcase" className="relative py-20 sm:py-28 overflow-hidden bg-dark-950">
      {/* === JITTER GRADIENT LOOP DARK BACKGROUND === */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/3 -left-1/4 w-[70%] h-[70%] rounded-full blur-[130px] opacity-[0.16]"
          style={{ background: 'radial-gradient(circle at center, #1a6df5 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-1/3 -right-1/4 w-[70%] h-[70%] rounded-full blur-[140px] opacity-[0.13]"
          style={{ background: 'radial-gradient(circle at center, #10b981 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 bg-grid-dark opacity-[0.5]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              Jitter Showcase
            </span>
            <span className="text-[13px] font-medium text-white/60 tracking-tight">Real assetlar • Placeholder emas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[34px] sm:text-[48px] lg:text-[56px] font-[700] leading-[1.02] tracking-[-0.03em] text-white"
          >
            Haqiqiy Jitter dizayn
            <span className="block gradient-text">dashboard kolleksiyasi</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[16px] sm:text-[17px] leading-[1.65] text-white/50 font-[450]"
          >
            Platforma interfeyslari Jitter.video premium template'laridan ilhomlangan,
            lokal <span className="text-white/80 font-semibold">real glass dashboard</span> assetlari bilan ishlaydi —
            hech qanday tashqi placeholder rasm ishlatilmaydi.
          </motion.p>

          {/* Template tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {TEMPLATE_TAGS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-[12px] font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-primary-300" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* === THE STACK COMPOSITION — 3 real assets === */}
        <div className="relative">
          <OrbitSystem />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Main large card */}
            <AssetCard asset={SHOWCASE_ASSETS.main} className="relative z-20" delay={0} />

            {/* Side stacked cards */}
            <div className="relative flex flex-col gap-6 lg:gap-8">
              <AssetCard asset={SHOWCASE_ASSETS.sideA} className="relative z-10 lg:-rotate-1 lg:translate-x-6" delay={0.15} />
              <AssetCard asset={SHOWCASE_ASSETS.sideB} className="relative z-0 lg:rotate-1 lg:-translate-x-2" delay={0.3} />
            </div>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gradient-to-br from-primary-600/20 via-transparent to-emerald-500/15 blur-[90px] rounded-full -z-10" />
        </div>

        {/* Bottom hint bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] font-medium text-white/40"
        >
          <span className="inline-flex items-center gap-2">
            <MousePointer2 className="w-3.5 h-3.5 text-primary-300" />
            3 ta real dashboard asseti — /jitter-assets/
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/15" />
          <span>Optimallashtirilgan WebP • 1200×670</span>
          <span className="hidden sm:block w-px h-3 bg-white/15" />
          <span>Jitter motion • The Stack + Orbit kompozitsiyasi</span>
        </motion.div>
      </div>
    </section>
  );
}
