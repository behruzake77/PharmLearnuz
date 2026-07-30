import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Madina Karimova',
    role: 'Klinik farmasevt, Toshkent',
    avatar: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: "Premium motion uslubidagi premium dizayn va interaktiv darslar mening karyeramni o'zgartirdi. Maoshim 2x oshdi!",
    rating: 5,
    tag: 'The Stack',
    color: 'from-blue-500 to-violet-500',
  },
  {
    name: 'Jasur Alimov',
    role: 'Dorixona mudiri, Samarqand',
    avatar: 'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Platformadagi orbit cards va vector animatsiyalar juda yoqimli. Mentorlar doim yordamda. 10/10!',
    rating: 5,
    tag: 'Orbit Cards',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Nilufar Azimova',
    role: 'Farmasevt-stajyor, Buxoro',
    avatar: 'https://images.pexels.com/photos/32315949/pexels-photo-32315949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: "O'zbek tilidagi premium kontent topish qiyin edi. PharmLearn Premium sifat darajasida hal qildi.",
    rating: 5,
    tag: 'Gradient Loop',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Bobur Rahimov',
    role: 'Sifat nazorati mutaxassisi',
    avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Farmatsevtik texnologiya kursini tugatib, yirik ishlab chiqarish korxonasida ish topdim. Premium!',
    rating: 5,
    tag: 'Premium UI',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Dilorom Tursunova',
    role: 'Dorixona farmasevti, Namangan',
    avatar: 'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Mobil ilova Premium kabi silliq ishlaydi. Sertifikat professional tan olinishimga hissa qoʻshdi.',
    rating: 5,
    tag: 'Mobile First',
    color: 'from-slate-600 to-dark-800',
  },
  {
    name: 'Sardor Xalikov',
    role: 'Farmakolog, Ilmiy markaz',
    avatar: 'https://images.pexels.com/photos/23471215/pexels-photo-23471215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Ilmiy metodologiya kursi dissertatsiyam uchun foydali boʻldi. Bu kelajakka investitsiya.',
    rating: 5,
    tag: 'Research',
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid opacity-[0.25]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary-50/60 to-transparent blur-[50px] rounded-full" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-900 text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              The Stack • Fikrlar
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-[32px] sm:text-[44px] font-[700] leading-[0.95] tracking-[-0.04em] text-dark-900"
            >
              Talabalar <span className="gradient-text">nima deyishadi</span> — stacked
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-[15px] leading-[1.6] text-dark-500 max-w-[380px]"
          >
            Premium “The Stack: Testimonial” template uslubida 10,000+ talabalar silliq orbitda fikr bildirishadi.
          </motion.p>
        </div>

        {/* Stacked testimonials - Premium style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -1 : 1 }}
              animate={isVisible ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22,1,0.36,1] }}
              whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
              className="group relative rounded-[24px] bg-white border border-dark-900/[0.06] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_8px_24px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] hover:border-dark-900/[0.10] transition-all duration-500 cursor-default"
            >
              <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${t.color} opacity-60`} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${t.color} text-white text-[10px] font-bold tracking-widest uppercase shadow-sm`}>{t.tag}</div>
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-amber-50 border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-dark-900">{t.rating}</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-dark-50 border border-dark-100 flex items-center justify-center text-[12px] group-hover:rotate-12 transition-transform">“</div>
              </div>

              <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-dark-700 font-[450]">"{t.text}"</p>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-dark-50">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-dark-100 shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white">✓</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold tracking-tight text-dark-900 truncate">{t.name}</p>
                  <p className="text-[11px] text-dark-400 truncate">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
