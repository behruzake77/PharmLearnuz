import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Clock, ArrowRight, BookOpen, Search, X, Play, FlaskConical, Sparkles } from 'lucide-react';
import { realDrugsData, DrugData } from '../data/drugData';

interface CoursesProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
  onShowAll?: () => void;
}

export default function Courses({ onNavigate }: CoursesProps) {
  const { ref, isVisible } = useScrollReveal();
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugData | null>(null);

  const levels = ['Barchasi', "Boshlang'ich", "O'rta", "Ilg'or"];
  const filtered = selectedLevel === 'Barchasi'
    ? realDrugsData
    : realDrugsData.filter(d => d.level === selectedLevel);

  const searched = searchQuery
    ? filtered.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.activeSubstance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  return (
    <section id="courses" ref={ref} className="py-20 sm:py-28 relative overflow-hidden bg-[#fcfdff]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-50/50 to-transparent rounded-full blur-[60px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.12em] uppercase mb-4"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Дорилар каталоги • 2000+
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-display text-[30px] sm:text-[42px] font-[700] leading-[0.95] tracking-[-0.03em] text-slate-900"
            >
              Eng mashhur <span className="gradient-text">дори препаратлари</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[14px] leading-[1.6] text-slate-500 max-w-[420px]">
              <a href="https://gopharm.uz" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline decoration-slate-200">GoPharm.uz</a> дан haqiqiy ma'lumotlar bilan boyutilgan katalog.
            </p>
            <div className="flex items-center gap-2">
              {levels.slice(0, 3).map(l => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-tight transition-all cursor-pointer ${selectedLevel === l ? 'bg-dark-900 text-white shadow-md' : 'bg-white border border-dark-100 text-dark-500 hover:border-dark-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards Grid - premium */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {searched.slice(0, 6).map((drug, i) => (
            <motion.div
              key={drug.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={isVisible ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22,1,0.36,1] }}
              className="group relative rounded-[28px] bg-white border border-dark-900/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03),0_12px_40px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] hover:border-dark-900/[0.10] hover:translate-y-[-4px] hover:rotate-[0.4deg] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
              onClick={() => setSelectedDrug(drug)}
            >
              {/* Top shine */}
              <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image area */}
              <div className="relative h-[220px] bg-gradient-to-br from-dark-50 to-primary-50/50 p-5 overflow-hidden">
                {/* Orbit rings bg */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] group-hover:opacity-[0.10] transition-opacity">
                  <div className="w-[280px] h-[280px] rounded-full border border-dashed border-dark-300" />
                  <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-dark-300" />
                </div>

                <div className="relative h-full flex items-center justify-center">
                  <motion.img
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    src={drug.image}
                    alt={drug.title}
                    className="w-[130px] h-[130px] object-contain bg-white rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-dark-50 p-3"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${drug.tagColor} shadow-sm`}>{drug.tag}</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-dark-100 shadow-sm">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-bold text-dark-800">{drug.rating}</span>
                </div>

                {/* Bottom play indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900 text-white text-[11px] font-semibold shadow-lg"
                >
                  <Play className="w-3 h-3" /> Video dars • {drug.lessons} dars
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded-full bg-dark-900 text-white">{drug.level}</span>
                  <span className="flex items-center gap-1 text-[11px] text-dark-400"><Clock className="w-3 h-3" />{drug.duration}</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-dark-50 border border-dark-100 text-dark-500">{drug.drugForm}</span>
                </div>

                <h3 className="font-display font-semibold text-[18px] leading-[1.25] tracking-tight text-dark-900 group-hover:text-black transition-colors line-clamp-2">
                  {drug.title}
                </h3>
                <p className="text-[11px] font-medium text-dark-400 mt-1">{drug.activeSubstance} • {drug.manufacturer}</p>
                <p className="text-[12.5px] leading-[1.5] text-dark-500 mt-2.5 line-clamp-2">{drug.description}</p>

                <div className="flex flex-wrap gap-1 mt-3.5">
                  {drug.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-medium px-2 py-1 rounded-full bg-dark-50 border border-dark-100 text-dark-500">{t}</span>
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-dark-50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-[9px] font-bold text-white">P</div>
                    <span className="text-[11px] text-dark-400">{drug.students.toLocaleString()} o'rgangan</span>
                  </div>
                  <span className="text-[13px] font-bold tracking-tight text-dark-900 flex items-center gap-1">
                    {drug.price.split(' ')[0]} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-dark-900/[0.08] shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-dark-900/[0.12] text-[13px] font-semibold tracking-tight text-dark-700 hover:text-dark-900 transition-all cursor-pointer"
          >
            Барча {realDrugsData.length}+ препаратлар — to‘liq ko‘rish
            <span className="w-7 h-7 rounded-full bg-dark-900 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* All Drugs Modal - Premium */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-dark-900/20 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => { setShowModal(false); setSelectedDrug(null); }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ ease: [0.22,1,0.36,1], duration: 0.5 }}
            className="relative w-full max-w-6xl bg-white rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.16)] max-h-[90vh] overflow-hidden flex flex-col my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-10 p-6 border-b border-dark-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-[22px] font-bold tracking-tight">Барча препаратлар</h2>
                  <p className="text-[12px] text-dark-400 mt-0.5">gopharm.uz • {realDrugsData.length} та препарат • Premium katalog</p>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedDrug(null); }} className="w-9 h-9 rounded-full bg-dark-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Препарат, актив модда..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-dark-200 text-[13px] focus:border-dark-900 focus:ring-2 focus:ring-dark-900/10 outline-none transition-all"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                </div>
                <div className="flex gap-1.5">
                  {levels.map(l => (
                    <button key={l} onClick={() => setSelectedLevel(l)} className={`px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer ${selectedLevel === l ? 'bg-dark-900 text-white' : 'bg-dark-50 text-dark-500 border border-dark-100 hover:bg-white'}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
              {searched.map((drug) => (
                <div key={drug.id} className="rounded-[18px] border border-dark-100 p-4 hover:border-dark-900/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all cursor-pointer group" onClick={() => setSelectedDrug(drug)}>
                  <div className="flex gap-3">
                    <img src={drug.image} alt={drug.title} className="w-14 h-14 rounded-[12px] object-contain bg-dark-50 border border-dark-100 p-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[13px] leading-tight tracking-tight group-hover:text-primary-600">{drug.title}</h3>
                      <p className="text-[10px] text-dark-400 mt-0.5">{drug.drugForm} • {drug.country}</p>
                      <p className="text-[11px] font-medium text-dark-500 mt-1 truncate">{drug.activeSubstance}</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">{drug.price.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedDrug && <DrugDetailModal drug={selectedDrug} onClose={() => setSelectedDrug(null)} onNavigate={onNavigate as any} />}
    </section>
  );
}

function DrugDetailModal({ drug, onClose, onNavigate }: { drug: DrugData; onClose: () => void; onNavigate: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'pharmacology' | 'lesson'>('info');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-dark-900/30 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ ease: [0.22,1,0.36,1], duration: 0.5 }}
        className="relative w-full max-w-4xl bg-white rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.2)] max-h-[90vh] overflow-hidden flex flex-col my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-dark-900 text-white flex items-center justify-center hover:bg-black shadow-lg cursor-pointer"><X className="w-4 h-4" /></button>

        <div className="rounded-t-[28px] bg-gradient-to-br from-dark-50 to-primary-50/40 p-7 sm:p-8 border-b border-dark-100">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative">
              <img src={drug.image} alt={drug.title} className="w-32 h-32 object-contain bg-white rounded-[20px] border border-dark-100 p-3 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-dark-900 text-white flex items-center justify-center text-[10px]">↗</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-dark-900 text-white">{drug.level}</span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white border border-dark-100 text-dark-600">⭐ {drug.rating}</span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white border border-dark-100 text-dark-600">{drug.drugForm}</span>
              </div>
              <h2 className="font-display font-bold text-[22px] sm:text-[26px] leading-[1.1] tracking-tight text-dark-900">{drug.title}</h2>
              <p className="text-[12px] text-dark-400 mt-1">{drug.subtitle}</p>
              <p className="text-[13px] leading-[1.5] text-dark-600 mt-3 max-w-[520px]">{drug.description}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-1 p-1 rounded-full bg-dark-900/[0.04] border border-dark-900/[0.06] w-fit">
            {[
              { id: 'info', label: 'Препарат' },
              { id: 'pharmacology', label: 'Фармакология' },
              { id: 'lesson', label: 'Video dars' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-tight transition-all cursor-pointer ${activeTab === tab.id ? 'bg-dark-900 text-white shadow-md' : 'text-dark-500 hover:text-dark-900'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-7 overflow-y-auto">
          {activeTab === 'info' && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { l: 'Форма выпуска', v: drug.drugForm },
                { l: 'Активное вещество', v: drug.activeSubstance },
                { l: 'Производитель', v: drug.manufacturer },
                { l: 'Страна', v: drug.country },
                { l: 'Отпуск', v: drug.prescription },
                { l: 'Цена', v: drug.price },
              ].map((i) => (
                <div key={i.l} className="rounded-[14px] bg-dark-50 border border-dark-100 px-4 py-3">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-dark-400">{i.l}</p>
                  <p className="text-[13px] font-semibold text-dark-900 mt-1">{i.v}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-[16px] bg-dark-900 text-white p-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-wide uppercase opacity-60">gopharm.uz нархи</p>
                  <p className="text-[22px] font-bold tracking-tight mt-1">{drug.price}</p>
                </div>
                <a href={`https://gopharm.uz/search?q=${encodeURIComponent(drug.title)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white text-dark-900 text-[12px] font-semibold hover:bg-dark-50 transition-colors">gopharm.uz →</a>
              </div>
            </div>
          )}

          {activeTab === 'pharmacology' && (
            <div className="space-y-5">
              <div className="rounded-[16px] bg-primary-50 border border-primary-100 p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary-700 mb-2">Таъсир механизми</p>
                <p className="text-[13px] leading-[1.6] text-dark-700">Селектив периферик H1-гистамин рецептор блокатори. Аллергик реакцияларни олдини олади.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[13px] tracking-tight mb-2">Қўлланилиши</h4>
                  <ul className="space-y-1.5">
                    {['Сезонли аллергик ринит', 'Крапивница', 'Аллергик конъюнктивит'].map(x => (
                      <li key={x} className="flex gap-2 text-[12px] text-dark-600"><span className="w-1 h-1 rounded-full bg-emerald-500 mt-2" />{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[13px] tracking-tight mb-2">Ножўя таъсирлар</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Бош оғриғи 12%', 'Уйқучанлик 8%', 'Қуруқ оғиз 3%'].map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-[11px] font-medium text-red-700">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lesson' && (
            <div className="space-y-4">
              <div className="rounded-[20px] bg-dark-900 text-white p-6 flex gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-white/10 flex items-center justify-center"><FlaskConical className="w-6 h-6" /></div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[15px]">Video dars: {drug.activeSubstance}</h3>
                  <p className="text-[12px] text-white/60 mt-1">7 бөлим • 24:30 • Premium video</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => { window.dispatchEvent(new CustomEvent('open-video-lesson')); onClose(); }} className="px-4 py-2 rounded-full bg-white text-dark-900 text-[12px] font-semibold flex items-center gap-1.5 hover:bg-dark-50 cursor-pointer"><Play className="w-3.5 h-3.5" /> Кўриш</button>
                    <button onClick={() => onNavigate('register')} className="px-4 py-2 rounded-full bg-white/10 text-white text-[12px] font-semibold hover:bg-white/15 cursor-pointer">Тўлиқ дары — Register</button>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { time: '00:00', title: 'Аллергия кириш' },
                  { time: '03:15', title: 'H1 классификация' },
                  { time: '07:40', title: 'Фармакодинамика' },
                  { time: '12:00', title: 'Фармакокинетика' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-[12px] bg-dark-50 border border-dark-100 hover:bg-white hover:shadow-sm transition-all">
                    <span className="font-mono text-[11px] font-bold text-primary-600">{s.time}</span>
                    <span className="text-[12px] font-medium text-dark-700">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
