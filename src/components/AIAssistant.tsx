import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Loader2, Settings, X, Sparkles,
  MessageSquare, Zap, Cpu, AlertCircle, Trash2,
  ChevronDown, ChevronUp, Info,
} from 'lucide-react';
import { askPharmacist, searchDrugWithAI, generateQuiz, AI_MODELS, hasApiKey, setApiKey, getApiKey, testConnection } from '../services/ai';
import { realDrugsData } from '../data/drugData';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  usage?: { total: number; prompt: number; completion: number };
}

interface AIAssistantProps {
  onClose?: () => void;
  isFullPage?: boolean;
}

const quickActions = [
  { label: 'Лоратадин таъсири', query: 'Лоратадин (Лораталь) қандай ишлайди?' },
  { label: 'Ибупрофен vs Парацетамол', query: 'Ибупрофен ва Парацетамол фарқи нима?' },
  { label: 'Антибиотиклар', query: 'Антибиотиклар қандай ишлайди?' },
  { label: 'NLP савол', query: 'Фармакокинетика нима?' },
];

const systemPrompt = `Сиз PharmLearn AI фармацевтик ёрдамчисисиз.
Сизнинг вазифангиз — фармацевтика, дорилар, фармакология ва уларнинг қўлланилиши ҳақида 
аниқ, илмий асосланган ва тушунарли маълумот бериш.

Қоидалар:
1. Фақат илмий исботланган маълумотларни беринг
2. Дориларни тавсия қилманг — буни шифокор қилиши керак
3. Ножўя таъсирлар ва контриндикациялар ҳақида огоҳлантиринг
4. Ўзбек, рус тилларида жавоб бера оласиз
5. Иложи борича оддий ва тушунарли тилда жавоб беринг`;

export default function AIAssistant({ onClose, isFullPage }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 **Ассалому алейкум!** Мен PharmLearn AI фармацевтик ёрдамчисиман.\n\nДорилар, фармакология, таъсир механизмлари ва бошқа фармацевтик саволларингизга жавоб бера оламан.\n\n**Менга савол беринг:**',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<string>(AI_MODELS.DEEPSEEK);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getApiKey());
  const [showDrugSearch, setShowDrugSearch] = useState(false);
  const [drugSearchQuery, setDrugSearchQuery] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizTopic, setQuizTopic] = useState('');
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async (content?: string) => {
    const text = (content || input).trim();
    if (!text || isLoading) return;

    if (!hasApiKey()) {
      setShowSettings(true);
      return;
    }

    setInput('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await askPharmacist(text, model);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer,
        timestamp: new Date(),
        model,
        usage: result.usage,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Хато:** ${error.message || 'AI API га уланишда муаммо'}.\n\nТекширинг:\n1. API калити тўғри киритилганми?\n2. Bluesminds хисобингизда баланс борми?\n3. Модель номи тўғрими (${model})?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleDrugSearch = async () => {
    if (!drugSearchQuery.trim() || isLoading || !hasApiKey()) return;
    setShowDrugSearch(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `🔍 "${drugSearchQuery}" дориси ҳақида маълумот`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await searchDrugWithAI(drugSearchQuery, model);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer,
        timestamp: new Date(),
        model,
        usage: result.usage,
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
      scrollToBottom();
    }
  };

  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim() || quizLoading || !hasApiKey()) return;
    setQuizLoading(true);
    setShowQuiz(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `📝 "${quizTopic}" мавзуси бўйича тест саволлари тузинг`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await generateQuiz(quizTopic, 5, model);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.content,
        timestamp: new Date(),
        model,
        usage: result.usage,
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ Хато: ${error.message}`,
        timestamp: new Date(),
      }]);
    } finally {
      setQuizLoading(false);
      scrollToBottom();
    }
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowSettings(false);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep welcome message
  };

  const modelLabels: Record<string, string> = {
    'deepseek': 'DeepSeek ⚡',
    'deepseek-r1': 'DeepSeek R1 🧠',
    'deepseek-r1-7b': 'DeepSeek R1 7B 🚀',
    'deepseek-v4-flash': 'DeepSeek V4 Flash 💨',
    'claude-haiku': 'Claude Haiku 🎯',
    '01-ai/yi-large': 'Yi Large 🌊',
  };

  return (
    <div className={`flex flex-col ${isFullPage ? 'h-full' : 'h-[600px]'} bg-white rounded-2xl border border-dark-100 shadow-xl overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-dark-100 bg-gradient-to-r from-primary-500 to-emerald-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">PharmLearn AI</h3>
            <p className="text-[11px] text-white/70">Фармацевтик ёрдамчи</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasApiKey() && (
            <span className="text-[10px] bg-green-400/20 text-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {modelLabels[model] || model}
            </span>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          {onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-dark-100 bg-dark-50"
          >
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-dark-700 mb-1.5 block">Bluesminds API Kaliti</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="sk-..." 
                    className="flex-1 px-3 py-2 rounded-xl border border-dark-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    Saqlash
                  </button>
                </div>
                <p className="text-[10px] text-dark-400 mt-1">Калитни <strong>api.bluesminds.com</strong> дан олинг</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark-700 mb-1.5 block">AI Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {Object.entries(modelLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setModel(key)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        model === key
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-white text-dark-600 border border-dark-200 hover:border-primary-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href="https://api.bluesminds.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-primary-600 hover:underline flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                Bluesminds API документацияси
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions + Drug Search + Quiz */}
      <div className="px-4 py-2 border-b border-dark-100 bg-dark-50/50">
        <div className="flex flex-wrap gap-1.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSend(action.query)}
              disabled={isLoading || !hasApiKey()}
              className="px-2.5 py-1 bg-white border border-dark-200 rounded-lg text-[10px] font-medium text-dark-500 hover:border-primary-300 hover:text-primary-600 transition-colors disabled:opacity-50"
            >
              {action.label}
            </button>
          ))}
          <button
            onClick={() => setShowDrugSearch(!showDrugSearch)}
            className="px-2.5 py-1 bg-primary-50 border border-primary-200 rounded-lg text-[10px] font-medium text-primary-600 hover:bg-primary-100 transition-colors"
          >
            🔍 Dori izlash
          </button>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] font-medium text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            📝 Test yaratish
          </button>
        </div>

        {/* Drug Search */}
        <AnimatePresence>
          {showDrugSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={drugSearchQuery}
                  onChange={(e) => setDrugSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDrugSearch()}
                  placeholder="Дори номини киритинг..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-dark-200 text-xs focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
                <button
                  onClick={handleDrugSearch}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  Излаш
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Generator */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                  placeholder="Мавзуни киритинг: Фармакология, Антибиотиклар..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-dark-200 text-xs focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
                <button
                  onClick={handleGenerateQuiz}
                  disabled={quizLoading}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {quizLoading ? '...' : 'Яратиш'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-50/30">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role !== 'user' && msg.role !== 'system' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl rounded-br-md px-4 py-3'
                : msg.role === 'system'
                ? 'bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3'
                : 'bg-white border border-dark-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'
            }`}>
              <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' ? 'text-white' : 'text-dark-700'
              }`}>
                {msg.content}
              </div>
              {msg.usage && (
                <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/50' : 'text-dark-400'}`}>
                  ⚡ {msg.usage.total} tokens
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-dark-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-dark-500" />
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-dark-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                Фикрлаш...
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-100 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={hasApiKey() ? "Фармацевтик саволингизни ёзинг..." : "AI API калитини киритинг (⚙)"}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-dark-200 text-sm text-dark-900 placeholder:text-dark-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all disabled:opacity-50"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-dark-400 hover:bg-dark-100 transition-colors"
              title="Тозаланг"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading || !hasApiKey()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary-600 to-emerald-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        {!hasApiKey() && (
          <p className="text-[10px] text-amber-600 mt-1.5 text-center">
            ⚠️ AI дан фойдаланиш учун ⚙ тугаасини босиб API калитини киритинг
          </p>
        )}
      </div>
    </div>
  );
}
