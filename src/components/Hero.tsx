import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Sparkles, Check, Star, GraduationCap, FlaskConical, Award } from 'lucide-react';
import { ProceduralGradientLoop, OrbitSystem, VectorPattern } from './JitterPremium';
import { useRef } from 'react';

interface HeroProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onShowVideo?: () => void;
}

export default function Hero({ onNavigate, onShowVideo }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-[100vh] flex items-center pt-20 pb-10 overflow-hidden selection:bg-primary-500/20">
      {/* === JITTER PROCEDURAL GRADIENT BACKGROUND LOOP === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#fcfdff]" />
        {/* Mesh gradients - Jitter template style */}
        <ProceduralGradientLoop className="absolute inset-0">
          <div />
        </ProceduralGradientLoop>
        
        {/* Extra blurred orbs like Jitter */}
        <motion.div
          style={{ y }}
          className="absolute -top-24 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-violet-400 rounded-full" />
        </motion.div>
        <motion.div
          style={{ y }}
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.14] pointer-events-none"
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Subtle grid - Jitter style */}
        <div className="absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-center">
          
          {/* LEFT: Copy - Jitter Typography System */}
          <div className="relative max-w-[640px]">
            {/* Premium pill badge - Jitter Share Your Work */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1 rounded-full bg-white border border-dark-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl mb-7 group"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900 text-white text-[11px] font-semibold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                #1 PLATFORMA
              </span>
              <span className="text-[13px] font-medium text-dark-600 tracking-tight">Jitter motion dizaynidan ilhomlangan</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 ml-1 group-hover:rotate-12 transition-transform" />
            </motion.div>

            {/* Headline - Jitter bold display */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
                className="font-display text-[40px] sm:text-[56px] lg:text-[64px] xl:text-[72px] font-[700] leading-[0.9] tracking-[-0.04em] text-dark-900"
              >
                <span className="block">Farmatsevtika</span>
                <span className="block relative">
                  <span className="gradient-text-hero">bilimingizni</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: [0.22,1,0.36,1] }}
                    className="absolute bottom-2 left-0 w-full h-[8px] bg-gradient-to-r from-primary-200/60 to-emerald-200/60 rounded-full -z-10 origin-left"
                  />
                </span>
                <span className="block font-[500] tracking-[-0.03em] text-[0.88em] text-dark-700">yangi bosqichga</span>
              </motion.h1>

              {/* Vector pattern near headline */}
              <VectorPattern className="absolute -right-8 top-0 opacity-[0.6] hidden lg:block" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22,1,0.36,1] }}
              className="mt-6 text-[17px] sm:text-[18px] leading-[1.6] tracking-[-0.01em] text-dark-500 max-w-[520px] font-[450]"
            >
              Zamonaviy motion graphics va interaktiv kurslar orqali 10,000+ farmasevt
              ishonch bildirgan <span className="font-semibold text-dark-900 underline decoration-primary-200 decoration-2 underline-offset-4">premium platforma</span>da o'rganing.
            </motion.p>

            {/* CTA - Jitter style buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22,1,0.36,1] }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <button
                onClick={() => onNavigate('register')}
                className="shimmer-btn group relative inline-flex items-center justify-center gap-2.5 px-7 py-[14px] text-[15px] font-[600] tracking-tight text-white bg-dark-900 rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Bepul boshlash
                  <span className="w-7 h-7 rounded-full bg-white text-dark-900 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </button>

              <button
                onClick={onShowVideo}
                className="group inline-flex items-center gap-3 px-2.5 py-1.5 pr-5 rounded-full bg-white border border-dark-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-dark-200 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-dark-50 group-hover:bg-dark-900 flex items-center justify-center transition-colors duration-300">
                  <Play className="w-4 h-4 text-dark-700 group-hover:text-white ml-0.5 transition-colors" />
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-semibold tracking-tight text-dark-900 leading-none">Demo video</div>
                  <div className="text-[11px] text-dark-400 mt-0.5">2:34 • Premium dizayn</div>
                </div>
              </button>
            </motion.div>

            {/* Trust row - Jitter social proof pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-white border border-dark-100 shadow-sm">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&w=80',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-[2.5px] border-white object-cover shadow-sm" />
                  ))}
                </div>
                <div className="flex flex-col leading-none">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[12px] font-bold text-dark-900">4.9/5</span>
                    <span className="text-[11px] text-dark-400">• 10K+ talaba</span>
                  </div>
                  <span className="text-[10px] font-medium tracking-wide uppercase text-dark-400 mt-0.5">Ishonchli ta'lim</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2.5 text-[12px] font-medium text-dark-500">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 200+ kurs</span>
                <span className="w-px h-3 bg-dark-200" />
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Sertifikat</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Jitter Orbit + Stack Visual */}
          <div className="relative lg:h-[640px] flex items-center justify-center">
            {/* Orbit system background */}
            <OrbitSystem />

            {/* Main premium glass card showcase - Jitter Orbit Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22,1,0.36,1] }}
              className="relative w-full max-w-[440px]"
            >
              {/* Glow behind main card */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/20 via-violet-500/10 to-emerald-500/20 rounded-[32px] blur-[24px] -z-10" />

              {/* Main hero card - like Jitter template preview */}
              <div className="relative rounded-[28px] bg-white border border-dark-100 shadow-[0_20px_80px_rgba(15,23,42,0.08),0_4px_16px_rgba(15,23,42,0.04)] overflow-hidden">
                {/* Top bar - window chrome like Jitter */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-dark-50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-50 text-[11px] font-medium text-dark-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live • pharmlearn.uz
                  </div>
                </div>

                {/* Image area with overlay content - Jitter style */}
                <div className="relative aspect-[4/3] bg-dark-50 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/8667961/pexels-photo-8667961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                    alt="Pharmacy learning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/10 to-transparent" />
                  
                  {/* Floating video progress like Jitter editing UI */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="glass-ultra rounded-2xl p-3.5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-900 flex items-center justify-center flex-shrink-0">
                        <FlaskConical className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[12px] font-semibold text-dark-900">Farmakologiya • 2-dars</p>
                          <p className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary-100 text-primary-700">HD</p>
                        </div>
                        <div className="h-1 bg-dark-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "64%" }}
                            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary-600 to-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play button overlay */}
                  <button onClick={onShowVideo} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-dark-900 ml-0.5" />
                  </button>
                </div>

                {/* Bottom meta like Jitter card details */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-[16px] leading-tight tracking-tight text-dark-900">H1-blokatorlar farmakologiyasi</h3>
                      <p className="text-[12px] text-dark-400 mt-1">12 modul • 48 dars • Sertifikat bilan</p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-bold text-dark-900">4.9</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                      <span className="text-[12px] font-medium text-dark-600">Malika Karimova, PhD</span>
                      <span className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></span>
                    </div>
                    <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-dark-900 text-white">Premium</span>
                  </div>
                </div>
              </div>

              {/* Floating orbit cards - Jitter Orbit style */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-10 glass-ultra rounded-[18px] p-3.5 shadow-xl flex items-center gap-3 min-w-[156px]"
              >
                <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-violet-500 to-primary-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-dark-400">MUVOFFAQIYAT</div>
                  <div className="text-[20px] font-extrabold leading-none tracking-tight text-dark-900 mt-0.5">98%</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8], rotate: [0, -1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-8 glass-ultra rounded-[16px] p-3 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <span className="text-[16px]">📚</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-dark-400 leading-none">KURSLAR</div>
                  <div className="text-[14px] font-bold text-dark-900 leading-none mt-1">200+ mavjud</div>
                </div>
                <div className="ml-2 w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 7, -4], x: [-1, 1, -1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[40%] -left-12 hidden xl:flex glass-ultra rounded-full px-3 py-1.5 shadow-lg items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-tight text-dark-700">Live dars • 342 ishtirokchi</span>
              </motion.div>

              {/* Decorative blur behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-br from-primary-200/30 to-emerald-200/20 blur-[50px] rounded-full -z-10" />
            </motion.div>

            {/* Background large typography - Jitter watermark style */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-20 overflow-hidden select-none">
              <span className="font-display font-[800] text-[220px] leading-none tracking-[-0.06em] text-dark-900/[0.02]">PHARM</span>
            </div>
          </div>
        </div>

        {/* Bottom edge fade - Jitter seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </motion.div>

      {/* Scroll indicator - Jitter style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-dark-400">Aylaning</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-dark-300 to-transparent" />
      </motion.div>
    </section>
  );
}
