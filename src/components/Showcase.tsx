import { motion } from 'framer-motion';
import { Activity, BookOpenCheck, PlugZap, Sparkles } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useScrollReveal } from '../hooks/useScrollReveal';

const showcaseItems = [
  {
    title: 'Operatsion panel',
    description: 'Kurslar, progress va mentor sessiyalarini bitta shaffof dashboard orqali boshqaring.',
    image: '/dashboard-assets/showcase-ops.webp',
    icon: Activity,
    accent: 'from-primary-500 to-violet-500',
    stat: '98% yakunlash',
  },
  {
    title: 'Ulangan ekotizim',
    description: 'AI yordamchi, dori katalogi va video darslar uzluksiz premium oqimda ishlaydi.',
    image: '/dashboard-assets/showcase-connect.webp',
    icon: PlugZap,
    accent: 'from-emerald-500 to-cyan-500',
    stat: '24/7 sync',
  },
  {
    title: 'Learning hub',
    description: 'Farmatsevtika bilimlarini modul, test, sertifikat va analitika bilan mustahkamlang.',
    image: '/dashboard-assets/showcase-learning-hub.webp',
    icon: BookOpenCheck,
    accent: 'from-amber-500 to-rose-500',
    stat: '200+ kurs',
  },
];

export default function Showcase() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const isMobile = useIsMobile();

  return (
    <section id="showcase" ref={ref} className="relative overflow-hidden bg-dark-950 py-20 sm:py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark opacity-[0.26]" />
        <motion.div
          animate={isMobile ? undefined : { scale: [1, 1.18, 1], x: [0, 24, 0], y: [0, -18, 0] }}
          transition={isMobile ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[22%] top-[-28%] h-[620px] w-[620px] rounded-full bg-primary-500/20 blur-[110px]"
        />
        <motion.div
          animate={isMobile ? undefined : { scale: [1, 1.24, 1], x: [0, -26, 0], y: [0, 18, 0] }}
          transition={isMobile ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -right-[18%] bottom-[-30%] h-[640px] w-[640px] rounded-full bg-emerald-500/16 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-[720px] text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Premium dashboard showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[32px] font-[700] leading-[0.95] tracking-[-0.04em] text-white sm:text-[46px] lg:text-[56px]"
          >
            Real glass dashboardlar bilan{' '}
            <span className="bg-gradient-to-r from-primary-200 via-emerald-200 to-white bg-clip-text text-transparent">premium tajriba</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-[580px] text-[15px] leading-[1.65] tracking-[-0.01em] text-white/58 sm:text-[17px]"
          >
            PharmLearn interfeysi kurslarni boshqarish, progressni kuzatish va dori kontentini o‘rganish uchun tayyorlangan real premium vizuallar bilan ishlaydi.
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            const desktopFloat = isVisible && !isMobile
              ? { opacity: 1, y: [0, index % 2 === 0 ? -10 : 10, 0], rotate: [0, index % 2 === 0 ? 0.6 : -0.6, 0] }
              : isVisible
                ? { opacity: 1, y: 0, rotate: 0 }
                : {};

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={desktopFloat}
                transition={isMobile
                  ? { duration: 0.55, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 7 + index, repeat: Infinity, ease: 'easeInOut', delay: 0.18 + index * 0.12 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.06] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r ${item.accent} opacity-70`} />
                <div className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-dark-900">
                  <img
                    src={item.image}
                    alt={`${item.title} PharmLearn dashboard`}
                    className="aspect-[1200/670] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/76 via-dark-950/8 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.accent} shadow-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold tracking-tight text-white">{item.title}</p>
                        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">{item.stat}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 pb-3 pt-5">
                  <h3 className="font-display text-[22px] font-[650] leading-[1.05] tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] tracking-[-0.01em] text-white/55">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
