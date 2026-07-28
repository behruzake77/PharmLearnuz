import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Clock, Users, ArrowRight, BookOpen, Search, X, Play } from 'lucide-react';
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
    <section id="courses" ref={ref} className="py-20 sm:py-28 bg-dark-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-medium text-emerald-700 mb-5"
          >
            <BookOpen className="w-4 h-4" />
            Дорилар — gopharm.uz
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight mb-5"
          >
            Eng mashhur <span className="gradient-text">дори препаратлари</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-500 leading-relaxed"
          >
            <a href="https://gopharm.uz" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-semibold hover:underline">GoPharm.uz</a> дан олинган хақиқий дорилар: фармакология, таъсир механизми, дозалаш ва ножўя таъсирлар.
          </motion.p>
        </div>

        {/* Course cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searched.slice(0, 6).map((drug, i) => (
            <motion.div
              key={drug.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="group bg-white rounded-3xl border border-dark-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/[0.08] hover:border-primary-200 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedDrug(drug)}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-dark-50">
                <img
                  src={drug.image}
                  alt={drug.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${drug.tagColor}`}>
                  {drug.tag}
                </span>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-dark-800">{drug.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
                    {drug.level}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-dark-400">
                    <Clock className="w-3.5 h-3.5" />
                    {drug.duration}
                  </span>
                  <span className="text-xs text-dark-400 bg-dark-50 px-2 py-0.5 rounded-md">
                    {drug.drugForm}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-1 group-hover:text-primary-700 transition-colors">
                  {drug.title}
                </h3>
                <p className="text-xs text-dark-400 mb-2 font-medium">
                  {drug.activeSubstance} · {drug.manufacturer} ({drug.country})
                </p>
                <p className="text-sm text-dark-500 leading-relaxed mb-3 line-clamp-2">
                  {drug.description.substring(0, 120)}...
                </p>
                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {drug.topics.map((topic) => (
                    <span key={topic} className="text-[11px] px-2 py-0.5 rounded-md bg-dark-50 text-dark-500 font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dark-100">
                  <div className="flex items-center gap-4 text-xs text-dark-400">
                    <span>{drug.modules} модуль</span>
                    <span>{drug.lessons} дарс</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {drug.students.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{drug.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-600 hover:text-primary-700 border border-primary-200 hover:border-primary-300 rounded-xl hover:bg-primary-50 transition-all duration-200"
          >
            Барча 10+ дори препаратларини кўриш
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* All Drugs Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => { setShowModal(false); setSelectedDrug(null); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b border-dark-100 rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-dark-900">Барча дори препаратлари</h2>
                  <p className="text-sm text-dark-400">gopharm.uz дан олинган {realDrugsData.length} та препарат</p>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedDrug(null); }} className="w-9 h-9 rounded-xl bg-dark-100 flex items-center justify-center hover:bg-dark-200 transition-colors">
                  <X className="w-4 h-4 text-dark-500" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Препарат, актив модда ёки ишлаб чиқарувчи бўйича..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {levels.map(l => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedLevel === l ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-500 hover:bg-dark-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Drug Grid */}
            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searched.length === 0 && (
                <div className="col-span-full text-center py-12 text-dark-400">
                  <p className="text-lg font-medium">Хеч нарса топилмади</p>
                  <p className="text-sm mt-1">Бошқа қидирув сўзини киритинг</p>
                </div>
              )}
              {searched.map((drug, i) => (
                <motion.div
                  key={drug.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-dark-50/50 rounded-2xl p-5 border border-dark-100 hover:border-primary-200 hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => setSelectedDrug(drug)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      drug.level === "Boshlang'ich" ? 'bg-emerald-100 text-emerald-700' :
                      drug.level === "O'rta" ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'
                    }`}>{drug.level}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-dark-700">{drug.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img src={drug.image} alt={drug.title} className="w-16 h-16 rounded-xl object-contain bg-white border border-dark-100 p-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-dark-900 mb-0.5 group-hover:text-primary-700 transition-colors text-sm">{drug.title}</h3>
                      <p className="text-[11px] text-dark-400">{drug.drugForm} · {drug.country}</p>
                      <p className="text-[11px] text-dark-500 mt-1 font-medium">{drug.activeSubstance}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-dark-100">
                    <span className="text-xs text-dark-400">{drug.manufacturer}</span>
                    <span className="text-xs font-bold text-emerald-600">{drug.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-dark-100 text-center">
              <a
                href="https://gopharm.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                gopharm.uz га ўтиш
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Drug Detail Modal */}
      {selectedDrug && (
        <DrugDetailModal drug={selectedDrug} onClose={() => setSelectedDrug(null)} onNavigate={onNavigate} />
      )}
    </section>
  );
}

function DrugDetailModal({ drug, onClose, onNavigate }: { drug: DrugData; onClose: () => void; onNavigate: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'pharmacology' | 'lesson'>('info');

  const levelColors: Record<string, string> = {
    "Boshlang'ich": 'bg-emerald-100 text-emerald-700',
    "O'rta": 'bg-amber-100 text-amber-700',
    "Ilg'or": 'bg-primary-100 text-primary-700',
  };

  const pharmacyInfo = [
    { label: 'Форма выпуска', value: drug.drugForm },
    { label: 'Активное вещество', value: drug.activeSubstance },
    { label: 'Производитель', value: drug.manufacturer },
    { label: 'Страна', value: drug.country },
    { label: 'Порядок отпуска', value: drug.prescription },
    { label: 'Цена (gopharm.uz)', value: drug.price },
    { label: 'Рейтинг', value: `⭐ ${drug.rating}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors">
          <X className="w-4 h-4 text-dark-500" />
        </button>

        {/* Hero section */}
        <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img src={drug.image} alt={drug.title} className="w-32 h-32 object-contain bg-white rounded-2xl border border-dark-100 p-3 shadow-lg" />
            <div className="flex-1">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${levelColors[drug.level] || 'bg-dark-100 text-dark-700'}`}>{drug.level}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 mt-2 mb-1">{drug.title}</h2>
              <p className="text-dark-400 text-sm mb-2">{drug.subtitle}</p>
              <div className="flex items-center gap-2 text-xs text-dark-500 flex-wrap">
                <span className="bg-white px-3 py-1 rounded-full shadow-sm">⭐ {drug.rating}</span>
                <span className="bg-white px-3 py-1 rounded-full shadow-sm">{drug.drugForm}</span>
                <span className="bg-white px-3 py-1 rounded-full shadow-sm">{drug.duration}</span>
                <span className="bg-white px-3 py-1 rounded-full shadow-sm">{drug.lessons} дарс</span>
              </div>
              <p className="text-sm text-dark-600 mt-3 leading-relaxed">{drug.description}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 sm:px-8 border-b border-dark-100">
          <div className="flex gap-6">
            {[
              { id: 'info', label: 'Препарат хақида' },
              { id: 'pharmacology', label: 'Фармакология' },
              { id: 'lesson', label: 'Видео дарс' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id ? 'text-primary-600 border-primary-600' : 'text-dark-400 border-transparent hover:text-dark-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'info' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {pharmacyInfo.map((info) => (
                <div key={info.label} className="bg-dark-50 rounded-xl p-4">
                  <p className="text-xs text-dark-400 mb-1">{info.label}</p>
                  <p className="text-sm font-semibold text-dark-800">{info.value}</p>
                </div>
              ))}
              <div className="sm:col-span-2 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">gopharm.uz даги нархи</p>
                    <p className="text-2xl font-bold mt-1">{drug.price}</p>
                  </div>
                  <a
                    href={`https://gopharm.uz/search?q=${encodeURIComponent(drug.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors"
                  >
                    gopharm.uz → 
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pharmacology' && (
            <div className="space-y-6">
              {/* Mechanism */}
              <div>
                <h4 className="text-lg font-bold text-dark-900 mb-2">Таъсир механизми (Фармакодинамика)</h4>
                <div className="bg-primary-50 rounded-xl p-4 text-sm text-dark-700 leading-relaxed border border-primary-100">
                  {drug.id === 1 ? 'Селектив периферик H1-гистамин рецепторлар блокатори. Гистамин таъсирини олдини олади — капиллярлар ўтказувчанлиги камаяди, тўқима шиши ва силлиқ мускул спазми олди олинади.' :
                   drug.id === 2 ? 'Селектив H1-гистамин рецепторлар блокатори. Гистамин-зависим фазани тормозлайди, экссудацияни камайтиради, эозинофиллар миграциясини олдини олади.' :
                   drug.id === 3 ? 'Диклофенак ингибирует ЦОГ-1 и ЦОГ-2, нарушая синтез простагландинов. При местном применении оказывает противовоспалительное и анальгезирующее действие.' :
                   drug.id === 4 ? 'Эссенциальные фосфолипиды (EPL) встраиваются в поврежденные мембраны гепатоцитов, восстанавливая их целостность и функцию.' :
                   drug.id === 5 ? 'Ибупрофен ингибирует ЦОГ-1 и ЦОГ-2, снижая синтез простагландинов — медиаторов воспаления, боли и лихорадки.' :
                   drug.id === 6 ? 'Парацетамол — анальгетик-антипиретик. Фенилэфрин — α1-адреномиметик. Фенирамин — H1-блокатор.' :
                   drug.id === 7 ? 'Флурбипрофен — НПВП из группы пропионовой кислоты. Ингибирует ЦОГ-1 и ЦОГ-2, подавляя синтез простагландинов.' :
                   drug.id === 8 ? 'Симетикон уменьшает поверхностное натяжение пузырьков газа в ЖКТ, способствуя их слиянию и выведению.' :
                   drug.id === 9 ? 'Комбинированный поливитаминный комплекс с микроэлементами. Витамины и минералы участвуют в метаболических процессах.' :
                   'Глюкозамин стимулирует синтез протеогликанов. Хондроитин снижает активность ферментов, разрушающих хрящ. Диклофенак — НПВП.'}
                </div>
              </div>

              {/* Indications & Contraindications */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-bold text-dark-900 mb-3">Қўлланилиши</h4>
                  <ul className="space-y-2">
                    {[
                      'Сезонли аллергик ринит', 'Крапивница', 'Аллергик конъюнктивит', 'Аллергик дерматозлар',
                      'Поллиноз'
                    ].slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-dark-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark-900 mb-3">Қўллаш мумкин эмас</h4>
                  <ul className="space-y-2">
                    {[
                      'Юқори сезувчанлик', 'Ҳомиладорлик', '12 ёшгача болалар',
                      'Буйрак етишмовчилиги'
                    ].slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-dark-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dosage */}
              <div>
                <h4 className="text-lg font-bold text-dark-900 mb-2">Дозалаш</h4>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-dark-700 leading-relaxed">
                  Катталар: 10 мг (1 таб) × 1 марта/кун. 2-12 ёш болалар ({'<'}30 кг): 5 мг × 1 марта/кун. Курс: 10-14 кун. Жигар етишмовчилигида дозани камайтириш керак.
                </div>
              </div>

              {/* Side Effects */}
              <div>
                <h4 className="text-lg font-bold text-dark-900 mb-2">Ножўя таъсирлар</h4>
                <div className="flex flex-wrap gap-2">
                  {['Бош оғриғи (12%)', 'Уйқучанлик (8%)', 'Чарчоқ (4%)', 'Қуруқ оғиз (3%)', 'Диспепсия'].map((se) => (
                    <span key={se} className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-100">
                      {se}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div className="bg-dark-50 rounded-xl p-4 text-center">
                <p className="text-xs text-dark-400">
                  Манба: <a href="https://gopharm.uz" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">gopharm.uz</a>
                  {' · '}Маълумотлар справочник характерга эга. Қўллашдан олдин шифокор билан маслаҳатлашинг.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'lesson' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-100 to-emerald-100 flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Видео дарс: {drug.activeSubstance}</h3>
              <p className="text-dark-400 text-sm max-w-lg mx-auto mb-6">Фармакологиядан тўлиқ видео дарс — таъсир механизми, фармакокинетика, клиник қўллаш, дозалаш ва хавфсизлик.</p>
              
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
                <div className="bg-dark-50 rounded-xl p-3">
                  <p className="text-xs text-dark-400">Дарс давомийлиги</p>
                  <p className="text-lg font-bold text-dark-900">24:30</p>
                </div>
                <div className="bg-dark-50 rounded-xl p-3">
                  <p className="text-xs text-dark-400">Бўлимлар</p>
                  <p className="text-lg font-bold text-dark-900">7 та</p>
                </div>
              </div>

              {/* Sections */}
              <div className="max-w-lg mx-auto text-left space-y-2 mb-6">
                {[ 
                  { time: '00:00', title: 'Аллергия касалликларига кириш' },
                  { time: '03:15', title: 'H1-блокаторлар классификацияси' },
                  { time: '07:40', title: 'Фармакодинамика' },
                  { time: '12:00', title: 'Фармакокинетика' },
                  { time: '16:20', title: 'Қўлланилиши ва дозалаш' },
                  { time: '19:50', title: 'Ножўя таъсирлар ва хавфсизлик' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-dark-50/50 hover:bg-primary-50 transition-colors cursor-pointer">
                    <span className="text-xs font-mono font-bold text-primary-600 w-12">{s.time}</span>
                    <span className="text-sm text-dark-700">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Key Points */}
              <div className="max-w-lg mx-auto bg-gradient-to-r from-primary-500 to-emerald-500 rounded-2xl p-6 text-white text-left mb-6">
                <h4 className="font-bold mb-3 text-sm">Асосий хулосалар</h4>
                <ul className="space-y-2">
                  {['2-авлод H1-блокатор — седатив эффекти минимал',
                    'Таъсири 1-3 соатда бошланиб, 24 соатгача давом этади',
                    'Кунига 1 марта 10 мг — қулай дозалаш режими',
                    'Ҳайдовчилар учун хавфсиз'
                  ].map((kp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                      {kp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quiz Preview */}
              <div className="max-w-lg mx-auto bg-dark-50 rounded-2xl p-6 text-left">
                <h4 className="font-bold text-dark-900 mb-3 text-sm">Тест саволлари</h4>
                <div className="space-y-3">
                  {['Лоратадин қайси авлод антигистамин препарати?',
                    'Таъсир механизми қандай?',
                    'Катталар учун суткалик доза?'
                  ].map((q, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-dark-100">
                      <p className="text-xs text-dark-400 mb-1">Савол {i + 1}</p>
                      <p className="text-sm font-medium text-dark-700">{q}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <button
                    onClick={() => {
                      // Import and show video player via state
                      const event = new CustomEvent('open-video-lesson');
                      window.dispatchEvent(event);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="w-4 h-4" />
                    Видео дарсни кўриш
                  </button>
                  <button
                    onClick={() => onNavigate('register')}
                    className="px-6 py-3 bg-dark-900 text-white text-sm font-semibold rounded-xl hover:bg-dark-800 transition-all"
                  >
                    Тўлиқ дарс учун рўйхатдан ўтинг
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
