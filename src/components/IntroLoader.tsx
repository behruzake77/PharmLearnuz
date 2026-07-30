import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const BRAND = 'PHARMLEARN';
const PROGRESS_DURATION = 1300;
const CURTAIN_DURATION = 560;

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    let frame = 0;
    let progressTimer = 0;
    let completeTimer = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const ratio = Math.min((now - startedAt) / PROGRESS_DURATION, 1);
      setProgress(Math.round(ratio * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    progressTimer = window.setTimeout(() => setIsLifting(true), PROGRESS_DURATION + 80);
    completeTimer = window.setTimeout(onComplete, PROGRESS_DURATION + 80 + CURTAIN_DURATION);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(progressTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-dark-950 text-white overflow-hidden will-change-transform"
      initial={{ y: 0 }}
      animate={isLifting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
      aria-label="PharmLearn loading"
    >
      <div className="absolute inset-0 bg-[#0d1017]" />
      <div className="absolute inset-0 opacity-30 bg-grid-dark" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/15 blur-[80px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-950/30 to-transparent" />

      <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.8 }}
          className="mb-8 inline-flex h-16 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <div className="flex h-12 w-24 items-center justify-center rounded-full bg-white text-dark-950 shadow-inner">
            <span className="font-display text-[24px] font-[800] tracking-[-0.06em]">Rx</span>
          </div>
        </motion.div>

        <div className="flex overflow-hidden" aria-hidden="true">
          {BRAND.split('').map((letter, index) => (
            <span key={`${letter}-${index}`} className="block overflow-hidden">
              <motion.span
                className="block font-display text-[34px] font-[800] leading-none tracking-[0.14em] sm:text-[54px]"
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.58, delay: 0.12 + index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </div>
        <span className="sr-only">PHARMLEARN</span>

        <div className="mt-9 w-full max-w-[320px]">
          <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            <span>Premium motion</span>
            <span>{progress}%</span>
          </div>
          <div className="h-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-primary-300 via-emerald-300 to-white will-change-transform"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
