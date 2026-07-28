import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, LogOut, Send, Bot, User, Loader2, X, Sparkles,
  Image, Newspaper, Settings, BarChart3, Plus, Trash2, Edit3,
  Eye, EyeOff, Star, Pin, Globe, ChevronDown, ArrowUp, ArrowDown,
  Layout, Bell, Moon, Sun, Save, AlertTriangle, CheckCircle2,
  Menu, GraduationCap,
} from 'lucide-react';
import { AI_MODELS, getApiKey, hasApiKey } from '../../services/ai';
import {
  isAdminLoggedIn, adminLogin, adminLogout, getPlatformStats,
  getBanners, saveBanner, deleteBanner, Banner,
  getNews, saveNews, deleteNews, incrementNewsViews, NewsItem,
  getSettings, saveSettings, PlatformSettings,
} from '../../data/adminData';

interface AdminPanelProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
}

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'menyu' | 'banner' | 'yangilik' | 'stats'>('menyu');

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-emerald-500 flex items-center justify-center shadow-lg mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
              <p className="text-sm text-dark-400 mt-1">Faqat adminlar uchun</p>
            </div>
            {loginError && <p className="text-red-400 text-xs text-center mb-3">❌ Noto'g'ri parol</p>}
            <input
              type="password" value={password} onChange={e => { setPassword(e.target.value); setLoginError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Admin parolini kiriting" autoFocus
              className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm placeholder:text-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all mb-4"
            />
            <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all">
              Kirish
            </button>
            <button onClick={() => onNavigate('landing')} className="w-full mt-2 py-2 text-xs text-dark-400 hover:text-white transition-colors">
              ← Bosh sahifaga qaytish
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  function handleLogin() {
    if (adminLogin(password)) { setLoggedIn(true); setLoginError(false); }
    else setLoginError(true);
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 cursor-pointer">
            <GraduationCap className="w-5 h-5 text-primary-400" />
            <span className="font-bold text-sm">Pharm<span className="text-primary-400">Learn</span></span>
          </button>
          <span className="text-[10px] bg-primary-600/20 text-primary-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <Shield className="w-3 h-3" /> ADMIN
          </span>
        </div>
        <button onClick={() => { adminLogout(); setLoggedIn(false); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors">
          <LogOut className="w-3.5 h-3.5" /> Chiqish
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-dark-900 border-r border-dark-800 min-h-screen hidden md:block flex-shrink-0 p-3">
          <nav className="space-y-1">
            {[
              { id: 'menyu', icon: Bot, label: 'AI yordamchi' },
              { id: 'yangilik', icon: Newspaper, label: 'Yangiliklar' },
              { id: 'banner', icon: Image, label: 'Banerlar' },
              { id: 'stats', icon: BarChart3, label: 'Statistika' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden w-full overflow-x-auto bg-dark-900 border-b border-dark-800 p-2">
          <div className="flex gap-2">
            {[
              { id: 'menyu', icon: Bot, label: 'AI' },
              { id: 'yangilik', icon: Newspaper, label: 'Yangiliklar' },
              { id: 'banner', icon: Image, label: 'Banerlar' },
              { id: 'stats', icon: BarChart3, label: 'Statistika' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-dark-800 text-dark-400'
                }`}>
                <tab.icon className="w-3 h-3 inline mr-1" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'menyu' && <AdminAIChat />}
          {activeTab === 'banner' && <BannerManager />}
          {activeTab === 'yangilik' && <NewsManager />}
          {activeTab === 'stats' && <AdminStats />}
        </div>
      </div>
    </div>
  );
}

/* ===== ADMIN AI CHAT ===== */
function AdminAIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "👋 **Assalomu alaykum, Admin!**\n\nMen sizning shaxsiy AI yordamchigingizman. PharmLearn platformasini boshqarishda yordam bera olaman:\n\n🎬 **Video dars** — yangi dori uchun video dars tayyorlash\n📝 **Slayd** — farmakologiya slaydlarini yaratish\n🔬 **Ma'lumot** — dorilar haqida tahlil\n📊 **Statistika** — platforma tahlili\n💡 **G'oyalar** — platformani rivojlantirish bo'yicha tavsiyalar\n\n*Men bilan istagan narsangiz haqida yozishingiz mumkin!*" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    
    const sysMsg = `Siz PharmLearn platformasining admin AI yordamchisisiz. 
    Sizga faqat admin (loyiha egasi) yozadi.
    Sizning vazifangiz: farmakologiya, dorilar, slayd yaratish, 
    video dars tayyorlash bo'yicha maslahat berish.
    O'zbek va rus tillarida javob bering.
    Admin bilan do'stona va professional tarzda muloqot qiling.
    Platformani rivojlantirish bo'yicha g'oyalar bering.`;

    try {
      const res = await fetch('https://api.bluesminds.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getApiKey()}` },
        body: JSON.stringify({
          model: AI_MODELS.DEEPSEEK,
          messages: [
            { role: 'system', content: sysMsg },
            ...messages.slice(-10).map(m => m.role === 'user' ? { role: 'user' as const, content: m.content } : { role: 'assistant' as const, content: m.content }),
            { role: 'user', content: text },
          ],
          temperature: 0.7, max_tokens: 2000,
        }),
      });
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content || '❌ Javob olishda xatolik';
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ API ga ulanishda xatolik. Bluesminds API kalitini tekshiring.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            AI yordamchi
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">DeepSeek V3</span>
          </h1>
          <p className="text-xs text-dark-400">Men bilan maslahatlashing — slayd, video dars, tahlil va бошқа</p>
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-primary-600 to-emerald-500 text-white rounded-2xl rounded-br-md px-4 py-3'
                  : 'bg-dark-800 border border-dark-700 rounded-2xl rounded-bl-md px-4 py-3 text-dark-200'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-dark-300" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-dark-800 border border-dark-700 rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary-400" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 border-t border-dark-800">
          <div className="flex items-center gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()} disabled={loading}
              placeholder="Slayd tayyorlang, video dars yarating, maslahat bering..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm placeholder:text-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:opacity-50"
            />
            <button onClick={send} disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-emerald-500 flex items-center justify-center text-white hover:shadow-lg disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== BANNER MANAGER ===== */
function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>(getBanners());
  const [editing, setEditing] = useState<Banner | null>(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => setBanners([...getBanners()]);

  const handleSave = (banner: Banner) => { saveBanner(banner); setEditing(null); setShowForm(false); refresh(); };
  const handleDelete = (id: string) => { if (confirm("O'chirilsinmi?")) { deleteBanner(id); refresh(); }};
  const handleToggle = (b: Banner) => { saveBanner({ ...b, isActive: !b.isActive }); refresh(); };

  const bgColors = [
    'from-primary-600 to-emerald-600', 'from-purple-600 to-pink-600',
    'from-amber-500 to-orange-500', 'from-cyan-500 to-blue-500',
    'from-rose-500 to-red-600', 'from-teal-500 to-green-600',
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2"><Image className="w-5 h-5 text-primary-400" /> Banerlar boshqaruvi</h1>
        <button onClick={() => { setEditing({ id: 'banner_' + Date.now(), title: '', subtitle: '', description: '', imageUrl: '', linkUrl: '#', bgColor: bgColors[0], isActive: true, order: banners.length, createdAt: new Date().toISOString() }); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-xs font-semibold rounded-xl hover:shadow-lg transition-all">
          <Plus className="w-3.5 h-3.5" /> Yangi banner
        </button>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <p className="text-xs text-dark-400 mb-2">📍 Saytda ko'rinishi:</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {banners.filter(b => b.isActive).sort((a,b) => a.order - b.order).map(b => (
            <div key={b.id} className={`min-w-[280px] h-32 rounded-2xl bg-gradient-to-br ${b.bgColor} p-5 flex flex-col justify-center flex-shrink-0`}>
              <p className="text-xs text-white/60 uppercase">{b.subtitle}</p>
              <p className="text-lg font-bold text-white">{b.title}</p>
              <p className="text-xs text-white/70 mt-1">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {banners.sort((a,b) => a.order - b.order).map(b => (
          <div key={b.id} className="bg-dark-900 border border-dark-800 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${b.bgColor} flex-shrink-0 flex items-center justify-center`}>
              <Image className="w-6 h-6 text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="text-xs text-dark-400 truncate">{b.description}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => handleToggle(b)} className={`w-7 h-7 rounded-lg flex items-center justify-center ${b.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-dark-800 text-dark-500'}`}>
                {b.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => { setEditing(b); setShowForm(true); }} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-blue-400"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(b.id)} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showForm && editing && (
          <BannerForm banner={editing} onSave={handleSave} onClose={() => { setShowForm(false); setEditing(null); }} bgColors={bgColors} />
        )}
      </AnimatePresence>
    </div>
  );
}

function BannerForm({ banner, onSave, onClose, bgColors }: { banner: Banner; onSave: (b: Banner) => void; onClose: () => void; bgColors: string[] }) {
  const [form, setForm] = useState(banner);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg bg-dark-900 border border-dark-700 rounded-3xl p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Banner tahrirlash</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Sarlavha</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500" />
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Kichik sarlavha</label>
            <input type="text" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500" />
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Tavsif</label>
            <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500" />
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Rang</label>
            <div className="flex flex-wrap gap-1.5">
              {bgColors.map(c => (
                <button key={c} onClick={() => setForm({...form, bgColor: c})} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c} ${form.bgColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-900' : ''}`} />
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => onSave(form)} className="w-full mt-4 py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all">
          <Save className="w-4 h-4 inline mr-1.5" /> Saqlash
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ===== NEWS MANAGER ===== */
function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>(getNews());
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const refresh = () => setNews([...getNews()]);

  const categoryColors: Record<string, string> = {
    'yangilik': 'bg-blue-500/20 text-blue-400',
    'e\'lon': 'bg-amber-500/20 text-amber-400',
    'maqola': 'bg-purple-500/20 text-purple-400',
    'video': 'bg-emerald-500/20 text-emerald-400',
    'chegirma': 'bg-rose-500/20 text-rose-400',
  };
  const categoryLabels: Record<string, string> = {
    'yangilik': '📰 Yangilik', 'e\'lon': '📢 E\'lon',
    'maqola': '📝 Maqola', 'video': '🎬 Video', 'chegirma': '🏷 Chegirma',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2"><Newspaper className="w-5 h-5 text-primary-400" /> Yangiliklar boshqaruvi</h1>
        <button onClick={() => { setEditing({ id: 'news_' + Date.now(), title: '', summary: '', content: '', category: 'yangilik', imageUrl: '', isPinned: false, isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), views: 0 }); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-xs font-semibold rounded-xl hover:shadow-lg transition-all">
          <Plus className="w-3.5 h-3.5" /> Yangi yangilik
        </button>
      </div>

      <div className="space-y-2">
        {news.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(n => (
          <div key={n.id} className="bg-dark-900 border border-dark-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[n.category] || 'bg-dark-700 text-dark-400'}`}>
                    {categoryLabels[n.category] || n.category}
                  </span>
                  {n.isPinned && <Pin className="w-3 h-3 text-amber-400" />}
                  {!n.isPublished && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Qoralama</span>}
                </div>
                <h3 className="font-semibold text-sm">{n.title}</h3>
                <p className="text-xs text-dark-400 mt-0.5 truncate">{n.summary}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-dark-500">
                  <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                  <span>👁 {n.views}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => { saveNews({...n, isPinned: !n.isPinned}); refresh(); }} className={`w-7 h-7 rounded-lg flex items-center justify-center ${n.isPinned ? 'text-amber-400 bg-amber-500/10' : 'text-dark-500 bg-dark-800 hover:text-dark-300'}`}>
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { saveNews({...n, isPublished: !n.isPublished}); refresh(); }} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white">
                  {n.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => { setEditing(n); setShowForm(true); }} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-blue-400"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => { if (confirm("O'chirilsinmi?")) { deleteNews(n.id); refresh(); }}} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && editing && (
          <NewsForm item={editing} onSave={(item) => { saveNews(item); setShowForm(false); refresh(); }} onClose={() => { setShowForm(false); setEditing(null); }} />
        )}
      </AnimatePresence>
    </div>
  );
}

function NewsForm({ item, onSave, onClose }: { item: NewsItem; onSave: (n: NewsItem) => void; onClose: () => void }) {
  const [form, setForm] = useState(item);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-xl bg-dark-900 border border-dark-700 rounded-3xl p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Yangilik tahrirlash</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400"><X className="w-3.5 h-3.5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Sarlavha</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-dark-400 mb-1 block">Kategoriya</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value as any})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500">
                <option value="yangilik">📰 Yangilik</option>
                <option value="e'lon">📢 E'lon</option>
                <option value="maqola">📝 Maqola</option>
                <option value="video">🎬 Video</option>
                <option value="chegirma">🏷 Chegirma</option>
              </select>
            </div>
            <div className="flex items-end gap-2 pb-1">
              <button onClick={() => setForm({...form, isPinned: !form.isPinned})} className={`px-3 py-2 rounded-xl text-xs font-semibold ${form.isPinned ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-dark-800 text-dark-400 border border-dark-600'}`}>📌 Pin</button>
              <button onClick={() => setForm({...form, isPublished: !form.isPublished})} className={`px-3 py-2 rounded-xl text-xs font-semibold ${form.isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-dark-800 text-dark-400 border border-dark-600'}`}>
                {form.isPublished ? '✅ Nashr' : '⏸ Qoralama'}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1 block">Qisqacha (summary)</label>
            <input type="text" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500" />
          </div>
          <div>
            <label className="text-xs text-dark-400 mb-1 block">To'liq matn</label>
            <textarea rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-600 text-sm text-white outline-none focus:border-primary-500 resize-none" />
          </div>
        </div>
        <button onClick={() => onSave({...form, updatedAt: new Date().toISOString()})} className="w-full mt-4 py-3 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all">
          <Save className="w-4 h-4 inline mr-1.5" /> Saqlash
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ===== ADMIN STATS ===== */
function AdminStats() {
  const stats = getPlatformStats();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold flex items-center gap-2 mb-6"><BarChart3 className="w-5 h-5 text-primary-400" /> Platforma statistikasi</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Yangiliklar', value: stats.totalNews, icon: Newspaper, color: 'from-blue-500 to-purple-600' },
          { label: 'Nashr qilingan', value: stats.publishedNews, icon: Eye, color: 'from-emerald-500 to-teal-600' },
          { label: 'Pinlangan', value: stats.pinnedItems, icon: Pin, color: 'from-amber-500 to-orange-600' },
          { label: 'Banerlar', value: stats.totalBanners, icon: Image, color: 'from-pink-500 to-rose-600' },
          { label: 'Faol banerlar', value: stats.activeBanners, icon: Eye, color: 'from-cyan-500 to-blue-600' },
          { label: 'Ko\'rishlar', value: stats.totalViews.toLocaleString(), icon: BarChart3, color: 'from-violet-500 to-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-dark-900 border border-dark-800 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs text-dark-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
        <h2 className="font-bold mb-4">🤖 AI yordamchidan foydalanish</h2>
        <div className="space-y-3 text-sm text-dark-300">
          <p>✅ Bluesminds API: {hasApiKey() ? 'Ulangan' : '❌ Ulanmagan'}</p>
          <p>✅ Model: DeepSeek V3</p>
          <p>✅ API Base: api.bluesminds.com/v1</p>
          <div className="pt-3 border-t border-dark-700">
            <h3 className="font-semibold text-white mb-2">Tezkor buyruqlar:</h3>
            <div className="grid gap-2 text-xs">
              {[
                { cmd: '"Лоратадин" слайд тайёрла', desc: 'Slayd yaratish' },
                { cmd: '"Диклофенак" видео дарс', desc: 'Video dars tayyorlash' },
                { cmd: '5 та тест саволи туз', desc: 'Test generator' },
                { cmd: 'Платформани ривожлантириш', desc: 'AI bilan maslahat' },
              ].map((item, i) => (
                <div key={i} className="bg-dark-800 rounded-xl p-3">
                  <code className="text-primary-400">→ {item.cmd}</code>
                  <p className="text-dark-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
