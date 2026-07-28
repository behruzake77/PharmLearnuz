/**
 * PharmLearn — Bluesminds AI API xizmati
 * 
 * Bluesminds (https://api.bluesminds.com) — OpenAI-compatible
 * Unified API Gateway for 160+ AI Models
 * 
 * API: https://api.bluesminds.com/v1/chat/completions
 */

const BLUESMINDS_BASE_URL = 'https://api.bluesminds.com/v1';

let API_KEY = '';

export function setApiKey(key: string) {
  API_KEY = key;
  localStorage.setItem('pharmlearn_ai_key', key);
}

export function getApiKey(): string {
  if (API_KEY) return API_KEY;
  const stored = localStorage.getItem('pharmlearn_ai_key');
  if (stored) { API_KEY = stored; return stored; }
  const envKey = import.meta.env.VITE_BLUESMINDS_API_KEY as string;
  if (envKey) { API_KEY = envKey; return envKey; }
  return '';
}

export function hasApiKey(): boolean {
  return !!getApiKey();
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  choices: { message: { content: string } }[];
  usage?: { total_tokens: number; prompt_tokens: number; completion_tokens: number };
}

// Моделлар
export const AI_MODELS = {
  DEEPSEEK: 'deepseek',
  DEEPSEEK_R1: 'deepseek-r1',
  DEEPSEEK_R1_7B: 'deepseek-r1-7b',
  DEEPSEEK_V4_FLASH: 'deepseek-v4-flash',
  CLAUDE_HAIKU: 'claude-haiku',
  YI_LARGE: '01-ai/yi-large',
  STARCODER: 'bigcode/starcoder2-15b',
  SEED_OSS: 'bytedance/seed-oss-36b-instruct',
  BGE_M3: 'baai/bge-m3',
  DRACARYS: 'abacusai/dracarys-llama-3.1-70b-instruct',
} as const;

export type AIModel = string;

// Барча моделлар (unique)
const ALL_MODELS: string[] = [
  AI_MODELS.DEEPSEEK,
  AI_MODELS.DEEPSEEK_R1,
  AI_MODELS.CLAUDE_HAIKU,
  AI_MODELS.DEEPSEEK_V4_FLASH,
  AI_MODELS.YI_LARGE,
  AI_MODELS.STARCODER,
  AI_MODELS.SEED_OSS,
  AI_MODELS.DRACARYS,
  AI_MODELS.BGE_M3,
];

// Умумий чат соҳрови — auto fallback
export async function chatCompletion(
  messages: ChatMessage[],
  preferredModel: string = AI_MODELS.DEEPSEEK,
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<{ content: string; usage?: { total: number; prompt: number; completion: number }; model?: string }> {
  const key = getApiKey();
  if (!key) {
    throw new Error('AI API калити топилмади. Илтимос, API калитни киритинг.');
  }

  const modelsToTry = [preferredModel, ...ALL_MODELS.filter(m => m !== preferredModel)];
  let lastError = '';

  for (const model of modelsToTry) {
    try {
      const response = await fetch(BLUESMINDS_BASE_URL + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens ?? 2000,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = errorText;
        
        // rate limit (429) ёки narxланмаган модел — skip
        if (response.status === 429 || 
            errorText.includes('daily limit') || 
            errorText.includes('rate_limit') ||
            errorText.includes('not been priced') || 
            errorText.includes('not configured')) {
          continue;
        }
        throw new Error('AI хато (' + response.status + '): ' + errorText);
      }

      const data: ChatCompletionResponse = await response.json();
      
      return {
        content: data.choices?.[0]?.message?.content || '',
        usage: data.usage ? {
          total: data.usage.total_tokens,
          prompt: data.usage.prompt_tokens,
          completion: data.usage.completion_tokens,
        } : undefined,
        model,
      };
    } catch (err: any) {
      if (err.message?.includes('daily limit') || 
          err.message?.includes('rate_limit') ||
          err.message?.includes('429') ||
          err.message?.includes('not been priced') || 
          err.message?.includes('not configured')) {
        lastError = err.message;
        continue;
      }
      throw err;
    }
  }

  throw new Error('AI API: кунлик лимит (600/кун) тўлган ёки барча моделлар ишламади. Эртага қайта урининг. Хато: ' + lastError);
}

// Фармацевтик AI ёрдамчи
export async function askPharmacist(question: string, model: string = AI_MODELS.DEEPSEEK): Promise<{ answer: string; usage?: any; model?: string }> {
  return chatCompletion([
    { role: 'system', content: 'Сиз PharmLearn платформасининг фармацевтик AI ёрдамчисисиз. Фармацевтика, дорилар, фармакология ҳақида аниқ, илмий асосланган маълумот беринг. Дориларни тавсия қилманг. Ножўя таъсирлар ҳақида огоҳлантиринг. Ўзбек, рус тилларида жавоб беринг.' },
    { role: 'user', content: question },
  ], model);
}

// Дори қидирув
export async function searchDrugWithAI(query: string, model: string = AI_MODELS.DEEPSEEK): Promise<{ answer: string; usage?: any; model?: string }> {
  return askPharmacist('"' + query + '" — бу ҳақида маълумот беринг.', model);
}

// Тест генератори
export async function generateQuiz(topic: string, count: number = 5, model: string = AI_MODELS.DEEPSEEK): Promise<{ content: string; usage?: any; model?: string }> {
  return chatCompletion([
    { role: 'system', content: 'Сиз фармакология ўқитувчисисиз. "' + topic + '" мавзуси бўйича ' + count + ' та тест саволи тузинг.' },
    { role: 'user', content: 'Саволлар тузинг.' },
  ], model, { temperature: 0.8, max_tokens: 3000 });
}

// Дорилар ўзаро таъсири
export async function checkDrugInteraction(drugs: string[], model: string = AI_MODELS.DEEPSEEK): Promise<{ content: string; usage?: any; model?: string }> {
  return chatCompletion([
    { role: 'system', content: 'Сиз фармаколог мутахассиссиз. Дорилар ўзаро таъсирини таҳлил қиласиз.' },
    { role: 'user', content: 'Текширинг: ' + drugs.join(', ') },
  ], model);
}

// Stream API
export async function streamChat(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onDone: (full: string) => void,
  onError: (err: Error) => void,
  model: string = AI_MODELS.DEEPSEEK
) {
  const key = getApiKey();
  if (!key) { onError(new Error('AI API калити топилмади')); return; }

  const modelsToTry = [model, ...ALL_MODELS.filter(m => m !== model)];

  for (const tryModel of modelsToTry) {
    try {
      const response = await fetch(BLUESMINDS_BASE_URL + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({ model: tryModel, messages, temperature: 0.7, max_tokens: 2000, stream: true }),
      });

      if (!response.ok) {
        const err = await response.text();
        if (err.includes('daily limit') || err.includes('not been priced') || err.includes('rate_limit')) continue;
        throw new Error('AI хато (' + response.status + ')');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Stream reader мавжуд emas');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) { fullContent += content; onChunk(content); }
          } catch { }
        }
      }
      onDone(fullContent);
      return;
    } catch (error) {
      if (error instanceof Error && (error.message.includes('daily limit') || error.message.includes('rate_limit') || error.message.includes('not been priced'))) continue;
      onError(error instanceof Error ? error : new Error(String(error)));
      return;
    }
  }
  onError(new Error('Барча моделлар ишламади. Кунлик лимит тўлган бўлиши мумкин.'));
}

// Тест уланиши
export async function testConnection(): Promise<{ ok: boolean; model: string; message: string }> {
  for (const model of ALL_MODELS) {
    try {
      const res = await fetch(BLUESMINDS_BASE_URL + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getApiKey() },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: 'test' }], max_tokens: 1 }),
      });
      if (res.ok) return { ok: true, model, message: '✅ "' + model + '" ишлаяпти!' };
    } catch { }
  }
  return { ok: false, model: '', message: '❌ Хеч қандай модел ишламаяпти.' };
}
