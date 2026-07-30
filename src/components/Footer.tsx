import { GraduationCap, Mail, Phone, MapPin, ArrowUp, Sparkles } from 'lucide-react';
import { scrollToSection } from '../App';

interface FooterProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard' | 'admin') => void;
}

const sections = [
  { label: 'Kurslar • Orbit', id: 'courses' },
  { label: 'Imkoniyatlar • Bento', id: 'features' },
  { label: 'Afzalliklar • Gradient', id: 'benefits' },
  { label: 'Fikrlar • Stack', id: 'testimonials' },
  { label: 'Narxlar • Premium', id: 'pricing' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark-950 text-dark-300 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-primary-900/10 to-transparent blur-[60px] rounded-full" />
        <div className="absolute inset-0 bg-grid-dark opacity-[0.2]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-16 sm:py-20">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-3 mb-5 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:rotate-[-8deg] transition-transform">
                <GraduationCap className="w-6 h-6 text-dark-900" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[18px] font-display font-bold tracking-tight text-white">Pharm<span className="text-white/60">Learn</span></div>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/40 mt-0.5">PREMIUM EDITION</div>
              </div>
            </button>
            <p className="text-[13px] leading-[1.6] tracking-tight text-white/50 max-w-[360px] mb-6">
              The Stack, Orbit Cards va Gradient Loop patternlari asosida yaratilgan
              O'zbekistondagi #1 farmasevtlar premium platformasi. Motion + glass + orbit.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium tracking-tight text-white/60">
              <Sparkles className="w-3.5 h-3.5 text-primary-300" />
              Premium motion • 2026
            </div>
            <div className="mt-6 space-y-2.5">
              <a href="mailto:info@pharmlearn.uz" className="flex items-center gap-2.5 text-[12px] tracking-tight text-white/40 hover:text-white/80 transition-colors"><Mail className="w-4 h-4" /> info@pharmlearn.uz</a>
              <a href="tel:+998901234567" className="flex items-center gap-2.5 text-[12px] tracking-tight text-white/40 hover:text-white/80 transition-colors"><Phone className="w-4 h-4" /> +998 90 123 45 67</a>
              <div className="flex items-center gap-2.5 text-[12px] tracking-tight text-white/40"><MapPin className="w-4 h-4" /> Toshkent • Premium orbit</div>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-4">Platforma • Premium</h4>
            <ul className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button onClick={() => scrollToSection(s.id)} className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors cursor-pointer text-left">{s.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-4">Kompaniya</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('landing')} className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors cursor-pointer">Biz haqimizda — Premium</button></li>
              <li><button onClick={() => onNavigate('landing')} className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors cursor-pointer">Jamoa • Orbit</button></li>
              <li><button onClick={() => onNavigate('register')} className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors cursor-pointer">Blog • Motion</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-4">Yordam</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => scrollToSection('faq')} className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors cursor-pointer">FAQ • Stack</button></li>
              <li><a href="mailto:support@pharmlearn.uz" className="text-[13px] tracking-tight text-white/40 hover:text-white transition-colors">Support • Orbit</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-tight text-white/30">© {new Date().getFullYear()} PharmLearn • Premium platforma • Barcha huquqlar</p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('admin')} className="text-[11px] tracking-tight px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/40 hover:text-white/80 cursor-pointer">⚙ Admin • Premium</button>
            <button onClick={scrollToTop} className="w-8 h-8 rounded-full bg-white text-dark-900 flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer"><ArrowUp className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
