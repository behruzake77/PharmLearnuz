import { GraduationCap, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { scrollToSection } from '../App';

interface FooterProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard' | 'admin') => void;
}

const sections = [
  { label: 'Kurslar', id: 'courses' },
  { label: 'Imkoniyatlar', id: 'features' },
  { label: 'Afzalliklar', id: 'benefits' },
  { label: 'Sharhlar', id: 'testimonials' },
  { label: 'Narxlar', id: 'pricing' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[50px] rounded-full" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute inset-0 bg-grid-dark opacity-[0.15]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-3 mb-5 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:rotate-[-6deg] transition-transform">
                <GraduationCap className="w-5 h-5 text-slate-900" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[17px] font-display font-bold tracking-tight text-white">Pharm<span className="text-white/60">Learn</span></div>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30 mt-0.5">Premium • 2026</div>
              </div>
            </button>
            <p className="text-[12.5px] leading-[1.6] text-white/45 max-w-[340px] mb-6">
              O‘zbekistondagi farmasevtlar uchun zamonaviy, tez va ishonchli premium ta’lim platformasi.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:info@pharmlearn.uz" className="flex items-center gap-2 text-[12px] text-white/40 hover:text-white/70 transition-colors"><Mail className="w-3.5 h-3.5" /> info@pharmlearn.uz</a>
              <a href="tel:+998901234567" className="flex items-center gap-2 text-[12px] text-white/40 hover:text-white/70 transition-colors"><Phone className="w-3.5 h-3.5" /> +998 90 123 45 67</a>
              <div className="flex items-center gap-2 text-[12px] text-white/40"><MapPin className="w-3.5 h-3.5" /> Toshkent</div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.12em] uppercase text-white mb-4">Platforma</h4>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <button onClick={() => scrollToSection(s.id)} className="text-[12.5px] text-white/40 hover:text-white transition-colors cursor-pointer text-left">{s.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.12em] uppercase text-white mb-4">Kompaniya</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('landing')} className="text-[12.5px] text-white/40 hover:text-white transition-colors cursor-pointer">Biz haqimizda</button></li>
              <li><button onClick={() => onNavigate('landing')} className="text-[12.5px] text-white/40 hover:text-white transition-colors cursor-pointer">Jamoa</button></li>
              <li><button onClick={() => onNavigate('register')} className="text-[12.5px] text-white/40 hover:text-white transition-colors cursor-pointer">Blog</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.12em] uppercase text-white mb-4">Yordam</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('faq')} className="text-[12.5px] text-white/40 hover:text-white transition-colors cursor-pointer">FAQ</button></li>
              <li><a href="mailto:support@pharmlearn.uz" className="text-[12.5px] text-white/40 hover:text-white transition-colors">Qo‘llab-quvvatlash</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">© {new Date().getFullYear()} PharmLearn • Barcha huquqlar himoyalangan</p>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('admin')} className="text-[11px] px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/40 hover:text-white/70 cursor-pointer">Admin</button>
            <button onClick={scrollToTop} className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer"><ArrowUp className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
