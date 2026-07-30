import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Madina Karimova',
    role: 'Klinik farmasevt, Toshkent',
    avatar: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: "Interaktiv darslar va amaliy laboratoriya karyeramni o'zgartirdi. Maoshim 2 barobarga oshdi!",
    rating: 5,
    tag: 'Premium',
    color: 'from-blue-500 to-violet-500',
  },
  {
    name: 'Jasur Alimov',
    role: 'Dorixona mudiri, Samarqand',
    avatar: 'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Platforma juda qulay, mentorlar doim yordamda. Kontent sifati ajoyib. 10/10!',
    rating: 5,
    tag: 'Mentorlik',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Nilufar Azimova',
    role: 'Farmasevt-stajyor, Buxoro',
    avatar: 'https://images.pexels.com/photos/32315949/pexels-photo-32315949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: "O'zbek tilidagi sifatli kontent topish qiyin edi. PharmLearn bu muammoni hal qildi.",
    rating: 5,
    tag: 'Kontent',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Bobur Rahimov',
    role: 'Sifat nazorati mutaxassisi',
    avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Farmatsevtik texnologiya kursini tugatib, yirik ishlab chiqarish korxonasida ish topdim.',
    rating: 5,
    tag: 'Karyera',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Dilorom Tursunova',
    role: 'Dorixona farmasevti, Namangan',
    avatar: 'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Mobil ilova tez va qulay ishlaydi. Sertifikat kasbiy o‘sishimga katta hissa qo‘shdi.',
    rating: 5,
    tag: 'Mobile',
    color: 'from-slate-600 to-slate-800',
  },
  {
    name: 'Sardor Xalikov',
    role: 'Farmakolog, Ilmiy markaz',
    avatar: 'https://images.pexels.com/photos/23471215/pexels-photo-23471215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Ilmiy metodologiya kursi dissertatsiyam uchun juda foydali bo‘ldi. Tavsiya qilaman.',
    rating: 5,
    tag: 'Ilmiy',
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-4"
            >
              Sharhlar
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-display text-[30px] sm:text-[42px] font-[700] leading-[0.96] tracking-[-0.03em] text-slate-900"
            >
              Talabalar <span className="gradient-text">nima deyishadi</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[14px] leading-[1.6] text-slate-500 max-w-[360px]"
          >
            10 000+ faol o‘quvchilarning haqiqiy fikrlari.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22,1,0.36,1] }}
              className="group relative rounded-[20px] bg-white border border-slate-200 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:translate-y-[-2px] transition-all duration-300 cursor-default no-flicker"
            >
              <div className={`absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r ${t.color} opacity-50`} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${t.color} text-white text-[9px] font-bold tracking-widest uppercase shadow-sm`}>{t.tag}</div>
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-amber-50 border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-slate-900">{t.rating}</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px]">“</div>
              </div>

              <p className="text-[13.5px] leading-[1.55] text-slate-700">"{t.text}"</p>

              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold tracking-tight text-slate-900 truncate">{t.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
