import { motion } from 'framer-motion';
import { Play, ArrowRight, Check } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onShowVideo?: () => void;
}

export default function Hero({ onNavigate, onShowVideo }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-[88px] pb-12 overflow-hidden bg-[#fcfdff]">
      {/* ===== STATIC BACKGROUND - NO FLICKER ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#fcfdff]" />
        {/* Static mesh */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-grid opacity-[0.5]" />
        {/* Soft blobs - static, no animation */}
        <div
          className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full blur-[60px] opacity-[0.06] no-flicker"
          style={{ background: 'radial-gradient(circle, #1a6df5 0%, transparent 65%)', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute top-[40%] -right-32 w-[640px] h-[640px] rounded-full blur-[80px] opacity-[0.05] no-flicker"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 65%)', transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">

          {/* ========= LEFT COPY ========= */}
          <div className="relative max-w-[620px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 pl-1 pr-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-6 no-flicker"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.14em] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Yangi
              </span>
              <span className="text-[12.5px] font-[500] tracking-tight text-slate-600">
                2 000+ preparatlar bazasi yangilandi
              </span>
              <span className="hidden sm:inline-flex w-5 h-5 rounded-full bg-slate-50 border border-slate-200 items-center justify-center text-[10px] ml-1">↗</span>
            </motion.div>

            {/* Headline - editorial, tight, no animated gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-[700] leading-[0.92] tracking-[-0.04em] text-slate-900 
                         text-[38px] sm:text-[52px] lg:text-[60px] xl:text-[66px]"
            >
              <span className="block">Farmatsevtika</span>
              <span className="block">
                <span className="gradient-text-hero">bilimini</span> amaliyotda
              </span>
              <span className="block font-[500] tracking-[-0.03em] text-slate-700 text-[0.86em] mt-1">
                mustahkamlang
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 sm:mt-6 text-[16px] sm:text-[17.5px] leading-[1.6] tracking-[-0.01em] text-slate-500 max-w-[520px] font-[420]"
            >
              Zamonaviy platforma: <span className="font-[600] text-slate-900">interaktiv darslar</span>, jonli laboratoriya va AI yordamchi —
              10 000+ mutaxassis tanlagan ta’lim tizimi.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => onNavigate('register')}
                className="group relative inline-flex items-center justify-center gap-2.5 pl-6 pr-1.5 py-1.5 text-[14.5px] font-[600] tracking-tight text-white bg-slate-900 rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.22)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-300 cursor-pointer no-flicker"
              >
                <span>Bepul boshlash</span>
                <span className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:rotate-[35deg] transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <button
                onClick={onShowVideo}
                className="group inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 cursor-pointer no-flicker"
              >
                <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-black transition-colors">
                  <Play className="w-4 h-4 text-white ml-px" />
                </div>
                <div className="text-left">
                  <div className="text-[12.5px] font-[600] tracking-tight text-slate-900 leading-none">Demo ko'rish</div>
                  <div className="text-[11px] text-slate-400 mt-[2px]">2:34 • Tanishtiruv</div>
                </div>
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-3 pl-1 pr-3.5 py-1 rounded-full bg-white border border-slate-100 shadow-sm">
                <div className="flex -space-x-2">
                  {[
                    'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&w=80',
                    'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&w=80',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-7 h-7 rounded-full border-[2px] border-white object-cover" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-100 text-slate-800">★ 4.9</span>
                  <span className="text-[11px] text-slate-500 font-medium">10K+ talaba</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11.5px] font-[500] text-slate-500">
                <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 200+ kurs</span>
                <span className="w-px h-3 bg-slate-200" />
                <span className="inline-flex items-center gap-1.5">✓ Sertifikat</span>
              </div>
            </motion.div>
          </div>

          {/* ========= RIGHT VISUAL - PREMIUM PRODUCT MOCK ======== */}
          <div className="relative lg:h-[620px] flex items-center justify-center no-flicker">
            {/* Subtle orbit rings behind */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
              <div className="w-[520px] h-[520px] rounded-full border border-dashed border-slate-200" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-[380px] h-[380px] rounded-full border border-dashed border-slate-200" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[440px] no-flicker"
            >
              {/* Outer glow - static */}
              <div className="absolute -inset-4 bg-gradient-to-br from-slate-200/40 to-slate-100/20 rounded-[32px] blur-[16px] -z-10 no-flicker" />

              {/* Main card */}
              <div className="relative rounded-[24px] bg-white border border-slate-200 shadow-[0_16px_64px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] overflow-hidden no-flicker">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/40">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10.5px] font-[500] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    pharmlearn.uz • Jonli
                  </div>
                </div>

                {/* Media */}
                <div className="relative aspect-[4/2.9] bg-slate-50 overflow-hidden group">
                  <img
                    src="https://images.pexels.com/photos/8667961/pexels-photo-8667961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                    alt="Pharmacy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/5 to-transparent" />

                  {/* Bottom mini player */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="glass-ultra rounded-[14px] p-2.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-[13px] text-white">◍</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-[600] text-slate-900 truncate">Farmakologiya • Antihistaminlar</p>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">HD</span>
                        </div>
                        <div className="mt-1.5 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-[64%] bg-slate-900 rounded-full" />
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
                        <Play className="w-3 h-3 text-white ml-px" />
                      </div>
                    </div>
                  </div>

                  <button onClick={onShowVideo} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center hover:scale-[1.05] active:scale-[0.97] transition-transform no-flicker">
                    <Play className="w-5 h-5 text-slate-900 ml-px" />
                  </button>
                </div>

                {/* Bottom meta */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-[600] text-[15px] leading-tight tracking-[-0.01em] text-slate-900">H1-blokatorlar farmakologiyasi</h3>
                      <p className="text-[11px] text-slate-400 mt-1">12 modul • 48 dars • Sertifikat</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-100">
                      <span className="text-[10px]">★</span><span className="text-[11px] font-bold text-slate-800">4.9</span>
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                      <span className="text-[11.5px] font-[500] text-slate-600">Malika K., PhD</span>
                      <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></span>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded-full bg-slate-900 text-white">Premium</span>
                  </div>
                </div>
              </div>

              {/* Floating cards - only transform Y */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 sm:-right-8 glass-ultra rounded-[16px] px-3.5 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.10)] flex items-center gap-3 min-w-[150px] no-flicker"
                style={{ willChange: 'transform' }}
              >
                <div className="w-10 h-10 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm">
                  <span className="text-white text-[13px] font-bold">↗</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 leading-none">Muvaffaqiyat</div>
                  <div className="text-[18px] font-[800] leading-none tracking-tight text-slate-900 mt-1">98%</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -bottom-5 -left-6 sm:-left-8 glass-ultra rounded-[14px] p-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.10)] flex items-center gap-2.5 no-flicker"
                style={{ willChange: 'transform' }}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[14px]">📚</div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 leading-none">Kurslar</div>
                  <div className="text-[12.5px] font-bold text-slate-900 leading-none mt-1">200+ mavjud</div>
                </div>
                <div className="ml-2 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[84px] bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
