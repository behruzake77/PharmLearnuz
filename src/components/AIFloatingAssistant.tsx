import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Loader2, X, Sparkles, Zap, Trash2,
  Image, FileText, HelpCircle, BarChart3, ChevronDown,
} from 'lucide-react';
import {
  askPharmacist, searchDrugWithAI, generateQuiz, AI_MODELS,
  hasApiKey, setApiKey,
} from '../services/ai';
import { generateSlideContent, generateVideoLesson, compareDrugs } from '../services/contentGenerator';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function AIFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Салом!** Мен PharmLearn AI ёрдамчисиман.

**Мен қила оламан:**
💊 Дорилар ҳақида маълумот
🎬 Слайд ва видео дарс тайёрлаш
📝 Тест саволлари тузиш
🔬 Фармакология саволларига жавоб
⚖️ Дориларни солиштириш

*Нима ёрдам керак?*`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'slide' | 'video' | 'quiz' | 'compare'>('chat');
  const [showModes, setShowModes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');

    const key = getApiKeyFromEnv();
    if (!key) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: '⚠️ AI калити топилмади. Илтимос, `.env` га `VITE_BLUESMINDS_API_KEY` ни ёзинг ёки администраторга мурожаат қилинг.',
        timestamp: new Date(),
      }]);
      return;
    }

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }]);

    setIsLoading(true);

    try {
      let result;
      switch (mode) {
        case 'slide':
          result = await generateSlideContent(text, 'Фармакология');
          break;
        case 'video':
          result = await generateVideoLesson(text);
          break;
        case 'quiz':
          result = await generateQuiz(text, 5);
          break;
        case 'compare': {
          const drugs = text.split(',').map(d => d.trim());
          result = await compareDrugs(drugs[0] || text, drugs[1] || '');
          break;
        }
        default:
          result = await askPharmacist(text);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.content,
        timestamp: new Date(),
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ Хато: ${error.message}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getApiKeyFromEnv = () => {
    try {
      return (window as any).__env?.VITE_BLUESMINDS_API_KEY ||
        import.meta.env.VITE_BLUESMINDS_API_KEY as string ||
        localStorage.getItem('pharmlearn_ai_key') || '';
    } catch {
      return localStorage.getItem('pharmlearn_ai_key') || '';
    }
  };

  const modes = [
    { id: 'chat' as const, icon: Bot, label: 'Чат', color: 'from-primary-500 to-primary-600' },
    { id: 'slide' as const, icon: Image, label: 'Слайд', color: 'from-purple-500 to-pink-500' },
    { id: 'video' as const, icon: FileText, label: 'Видео дарс', color: 'from-emerald-500 to-teal-500' },
    { id: 'quiz' as const, icon: HelpCircle, label: 'Тест', color: 'from-amber-500 to-orange-500' },
    { id: 'compare' as const, icon: BarChart3, label: 'Солиштириш', color: 'from-cyan-500 to-blue-500' },
  ];

  const placeholders: Record<string, string> = {
    chat: 'Дори ёки фармакология ҳақида савол...',
    slide: 'Дори номини ёзинг, слайд тайёрлайман...',
    video: 'Қайси дори учун видео дарс керак?',
    quiz: 'Қайси мавзу бўйича тест тузай?',
    compare: 'Дориларни ёзинг: Лоратадин, Цетиризин',
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-gradient-to-r from-primary-600 to-emerald-500 text-white shadow-2xl shadow-primary-500/40 hover:shadow-primary-500/60 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        <Bot className="w-6 h-6 group-hover:animate-bounce" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: isMinimized ? 320 : 420,
              height: isMinimized ? 60 : 600,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[999] bg-white rounded-3xl shadow-2xl border border-dark-100 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)', maxWidth: 'calc(100vw - 40px)' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-primary-600 via-primary-700 to-emerald-600 text-white p-4 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">PharmLearn AI</h3>
                    <p className="text-[10px] text-white/70">DeepSeek V3 · Фармацевтик ёрдамчи</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Mode selector */}
                <div className="flex-shrink-0 px-3 py-2 border-b border-dark-100 bg-dark-50/50">
                  <div className="flex flex-wrap gap-1">
                    {modes.map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setMode(m.id); setShowModes(false); }}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                          mode === m.id
                            ? `bg-gradient-to-r ${m.color} text-white shadow-sm`
                            : 'bg-white text-dark-500 border border-dark-200 hover:border-primary-300'
                        }`}
                      >
                        <m.icon className="w-3 h-3" />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-dark-50/30">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role !== 'user' && msg.role !== 'system' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl rounded-br-md px-3.5 py-2.5'
                          : msg.role === 'system'
                          ? 'bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2.5'
                          : 'bg-white border border-dark-100 rounded-2xl rounded-bl-md px-3.5 py-2.5 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-dark-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-dark-500" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white border border-dark-100 rounded-2xl px-3.5 py-2.5 shadow-sm flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-600" />
                        <span className="text-xs text-dark-500">
                          {mode === 'slide' ? 'Слайд тайёрланяпти...' :
                           mode === 'video' ? 'Видео дарс яратиляпти...' :
                           mode === 'quiz' ? 'Тест саволлари тузиляпти...' :
                           mode === 'compare' ? 'Солиштириляпти...' :
                           'Фикрлаш...'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Mode hint */}
                <div className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-primary-50 to-emerald-50 border-t border-dark-100">
                  <p className="text-[10px] text-dark-400 text-center">
                    {mode === 'slide' && '🎨 Дори номини ёзинг — AI слайд тайёрлайди'}
                    {mode === 'video' && '🎬 Дори номини ёзинг — AI видео дарс структурасини яратади'}
                    {mode === 'quiz' && '📝 Мавзуни ёзинг — AI 5 та тест саволи тузади'}
                    {mode === 'compare' && '⚖️ Икки дорини ёзинг: "Лоратадин, Цетиризин"'}
                    {mode === 'chat' && '💬 Фармакология бўйича савол беринг'}
                  </p>
                </div>

                {/* Input */}
                <div className="flex-shrink-0 p-3 border-t border-dark-100 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={placeholders[mode]}
                      disabled={isLoading}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-dark-200 text-xs text-dark-900 placeholder:text-dark-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary-600 to-emerald-500 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 flex-shrink-0"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[8px] text-dark-400 text-center mt-1.5">
                    DeepSeek V3 · Bluesminds API · Маълумотлар илмий асосланган
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
