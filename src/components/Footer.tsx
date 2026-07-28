import { GraduationCap, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { scrollToSection } from '../App';

interface FooterProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

const sections = [
  { label: 'Kurslar', id: 'courses' },
  { label: 'Imkoniyatlar', id: 'features' },
  { label: 'Afzalliklar', id: 'benefits' },
  { label: 'Fikrlar', id: 'testimonials' },
  { label: 'Narxlar', id: 'pricing' },
  { label: 'FAQ', id: 'faq' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 text-dark-300 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-primary-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-16 sm:py-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 mb-5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Pharm<span className="text-primary-400">Learn</span>
              </span>
            </button>
            <p className="text-sm text-dark-400 leading-relaxed mb-6 max-w-sm">
              O'zbekistondagi farmasevtlar uchun #1 onlayn ta'lim platformasi. Zamonaviy kurslar, ekspert mentorlar va sertifikatlar bilan kasbiy muvaffaqiyatga erishing.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@pharmlearn.uz" className="flex items-center gap-2.5 text-sm text-dark-400 hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@pharmlearn.uz
              </a>
              <a href="tel:+998901234567" className="flex items-center gap-2.5 text-sm text-dark-400 hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />
                +998 90 123 45 67
              </a>
              <div className="flex items-center gap-2.5 text-sm text-dark-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Toshkent, O'zbekiston
              </div>
            </div>
          </div>

          {/* Platforma */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platforma</h4>
            <ul className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kompaniya */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Kompaniya</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('landing')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Jamoamiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Karyera
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Hamkorlik
                </button>
              </li>
            </ul>
          </div>

          {/* Yordam */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Yordam</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollToSection('faq')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Юқорига
                </button>
              </li>
              <li>
                <a href="mailto:support@pharmlearn.uz" className="text-sm text-dark-400 hover:text-primary-400 transition-colors">
                  Qo'llab-quvvatlash
                </a>
              </li>
              <li>
                <a href="mailto:info@pharmlearn.uz" className="text-sm text-dark-400 hover:text-primary-400 transition-colors">
                  Aloqa
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Maxfiylik siyosati
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors cursor-pointer">
                  Foydalanish shartlari
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} PharmLearn. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('landing')} className="text-xs text-dark-500 hover:text-primary-400 transition-colors cursor-pointer">
              Maxfiylik
            </button>
            <button onClick={() => onNavigate('landing')} className="text-xs text-dark-500 hover:text-primary-400 transition-colors cursor-pointer">
              Shartlar
            </button>
            <button onClick={() => onNavigate('admin')} className="text-xs bg-dark-800 px-3 py-1 rounded-lg text-dark-500 hover:text-primary-400 transition-colors cursor-pointer">
              ⚙ Admin
            </button>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-dark-800 hover:bg-primary-600 flex items-center justify-center text-dark-400 hover:text-white transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
