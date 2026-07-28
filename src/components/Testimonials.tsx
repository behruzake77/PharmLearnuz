import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Madina Karimova',
    role: 'Klinik farmasevt, Toshkent',
    avatar: 'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'PharmLearn mening kasbiy hayotimni tubdan o\'zgartirdi. Klinik farmatsiya kursini tugatganimdan so\'ng, maoshim 2 barobar oshdi va men endi kasalxonada yuqori lavozimda ishlayman.',
    rating: 5,
  },
  {
    name: 'Jasur Alimov',
    role: 'Dorixona mudiri, Samarqand',
    avatar: 'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Platformadagi interaktiv darslar va amaliy mashg\'ulotlar juda foydali. Mentorlar har doim yordamga tayyor. 10 dan 10 ball beraman!',
    rating: 5,
  },
  {
    name: 'Nilufar Azimova',
    role: 'Farmatsevt-stajyor, Buxoro',
    avatar: 'https://images.pexels.com/photos/32315949/pexels-photo-32315949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'O\'zbek tilida bunday sifatli farmatsevtika kurslari topish juda qiyin edi. PharmLearn buni hal qildi. AI yordamchi tizimi mening o\'rganish tezligimni sezilarli oshirdi.',
    rating: 5,
  },
  {
    name: 'Bobur Rahimov',
    role: 'Sifat nazorati mutaxassisi',
    avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Farmatsevtik texnologiya kursini tugatib, yangi kasbiy ko\'nikmalar egallashim menga katta ishlab chiqarish korxonasida ish topishga yordam berdi. Ajoyib platforma!',
    rating: 5,
  },
  {
    name: 'Dilorom Tursunova',
    role: 'Dorixona farmasevti, Namangan',
    avatar: 'https://images.pexels.com/photos/7640741/pexels-photo-7640741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Mobil ilova orqali ish vaqtida ham o\'rgana oldim. Sertifikat olganim menga professional sifatida tan olinishimga katta hissa qo\'shdi.',
    rating: 5,
  },
  {
    name: 'Sardor Xalikov',
    role: 'Farmakolog, Ilmiy markaz',
    avatar: 'https://images.pexels.com/photos/23471215/pexels-photo-23471215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Ilmiy tadqiqot metodologiyasi kursi mening dissertatsiyam uchun juda foydali bo\'ldi. PharmLearn — bu investitsiya emas, bu kelajakka qo\'yilgan pul.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-sm font-medium text-amber-700 mb-5"
          >
            <MessageCircle className="w-4 h-4" />
            Fikrlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-5"
          >
            Talabalarimiz nima <span className="gradient-text">deyishadi</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-500 leading-relaxed"
          >
            10,000 dan ortiq farmasevtlar PharmLearn orqali o'z karyeralarini yangi bosqichga olib chiqishdi.
          </motion.p>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group relative bg-white rounded-3xl border border-dark-100 p-6 sm:p-8 hover:shadow-xl hover:shadow-primary-500/[0.05] hover:border-primary-200 transition-all duration-500"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary-100 mb-4 group-hover:text-primary-200 transition-colors" />

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-dark-600 leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-dark-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <p className="text-sm font-semibold text-dark-900">{t.name}</p>
                  <p className="text-xs text-dark-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
