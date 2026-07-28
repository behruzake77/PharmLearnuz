/**
 * PharmLearn — AI Content Generator
 * Bluesminds API (DeepSeek V3) орқали контент генерацияси
 */

import { chatCompletion, AI_MODELS } from './ai';

// Slide yaratish
export async function generateSlideContent(
  drugName: string,
  topic: string,
  model: string = AI_MODELS.DEEPSEEK
) {
  const messages = [
    {
      role: 'system' as const,
      content: `Сиз PharmLearn платформасида фармакология слайдларини тайёрловчи AI ёрдамчисиз.
"${drugName}" препарати ҳақида "${topic}" мавзусида слайд контентини яратинг.

Қуйидаги форматда беринг:
{
  "title": "Слайд сарлавҳаси",
  "subtitle": "Кичик сарлавҳа",
  "content": "Слайд матни (3-5 та пункт)",
  "design": "Дизайн тавсияси (ranglar, иконкалар)",
  "bulletPoints": ["нукта 1", "нукта 2", "нукта 3"],
  "imagePrompt": "Слайд учун расм таврифи (лотин алифбосида)"
}`,
    },
    { role: 'user' as const, content: `"${drugName}" — ${topic}` },
  ];

  return chatCompletion(messages, model, { temperature: 0.7, max_tokens: 2000 });
}

// Тўлиқ видео дарс структураси
export async function generateVideoLesson(
  drugName: string,
  model: string = AI_MODELS.DEEPSEEK
) {
  const messages = [
    {
      role: 'system' as const,
      content: `Сиз PharmLearn учун видео дарс тайёрловчи AI ёрдамчисиз.
"${drugName}" препарати ҳақида тўлиқ видео дарс структурасини яратинг.

Формат (JSON):
{
  "title": "Дарс номи",
  "duration": "Умумий давомийлиги (дақиқа)",
  "slides": [
    {
      "id": 1,
      "title": "Слайд номи",
      "duration": "Давомийлиги (секунд)",
      "content": "Матн",
      "narration": "Овозли матн",
      "imagePrompt": "Расм учун тавриф (лотин алифбосида)",
      "bulletPoints": ["..."]
    }
  ],
  "quiz": [
    {
      "question": "Савол",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Изоҳ"
    }
  ],
  "keyPoints": ["Асосий хулоса 1", "Асосий хулоса 2"]
}`,
    },
    { role: 'user' as const, content: `"${drugName}" — тўлиқ видео дарс ишлаб чиқинг.` },
  ];

  return chatCompletion(messages, model, { temperature: 0.8, max_tokens: 4000 });
}

// Тест саволлари
export async function generateQuizQuestions(
  drugName: string,
  count: number = 5,
  model: string = AI_MODELS.DEEPSEEK
) {
  const messages = [
    {
      role: 'system' as const,
      content: `"${drugName}" препарати бўйича ${count} та тест саволи тузинг.
Формат (JSON):
[
  {
    "question": "Савол",
    "options": ["A", "B", "C", "D"],
    "correct": 0,
    "explanation": "Изоҳ"
  }
]`,
    },
    { role: 'user' as const, content: `5 та савол тузинг.` },
  ];

  return chatCompletion(messages, model, { temperature: 0.8, max_tokens: 3000 });
}

// Дориларни солиштириш
export async function compareDrugs(
  drug1: string,
  drug2: string,
  model: string = AI_MODELS.DEEPSEEK
) {
  const messages = [
    {
      role: 'system' as const,
      content: `"${drug1}" ва "${drug2}" препаратларини солиштиринг.

Формат (JSON):
{
  "title": "Солиштириш",
  "similarities": ["Ўхшашлик 1", "Ўхшашлик 2"],
  "differences": [
    { "aspect": "Таъсир механизми", "drug1": "...", "drug2": "..." },
    { "aspect": "Нарх", "drug1": "...", "drug2": "..." }
  ],
  "verdict": "Хулоса",
  "table": { "headers": ["Жиҳат", drug1, drug2], "rows": [["...", "...", "..."]] }
}`,
    },
    { role: 'user' as const, content: `Солиштиринг.` },
  ];

  return chatCompletion(messages, model, { temperature: 0.7, max_tokens: 3000 });
}

// Клиник сценарий
export async function generateClinicalCase(
  drugName: string,
  model: string = AI_MODELS.DEEPSEEK
) {
  const messages = [
    {
      role: 'system' as const,
      content: `"${drugName}" препарати иштирокида клиник сценарий (кейс) яратинг.
Бемор, ташхис, даволаш, натижа — тўлиқ баён қилинг.

Формат:
{
  "title": "Кейс номи",
  "patient": { "age": 45, "gender": "эркак", "diagnosis": "..." },
  "complaints": ["...", "..."],
  "treatment": { "drug": drugName, "dosage": "...", "duration": "..." },
  "result": "Даволаш натижаси",
  "discussion": "Муҳокама",
  "takeaway": "Асосий хулоса"
}`,
    },
    { role: 'user' as const, content: `Кейс яратинг.` },
  ];

  return chatCompletion(messages, model, { temperature: 0.9, max_tokens: 3000 });
}
