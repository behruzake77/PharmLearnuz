/**
 * PharmLearn — gopharm.uz dan olingan haqiqiy dori ma'lumotlari
 */

export interface DrugData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  drugForm: string;
  activeSubstance: string;
  manufacturer: string;
  country: string;
  prescription: string;
  price: string;
  rating: number;
  students: number;
  level: string;
  duration: string;
  modules: number;
  lessons: number;
  tag: string;
  tagColor: string;
  topics: string[];
  description: string;
}

export interface DrugLesson {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  sections: { time: string; title: string; description: string }[];
  keyPoints: string[];
  quiz: { question: string; options: string[]; correct: number }[];
  pharmacology: {
    mechanism: string;
    indications: string[];
    contraindications: string[];
    dosage: string;
    sideEffects: string[];
  };
}

// Haqiqiy dori ma'lumotlari — gopharm.uz dan
export const realDrugsData: DrugData[] = [
  {
    id: 1,
    title: 'Лораталь (Loratal)',
    subtitle: 'Лоратадин 10мг №10 — Антигистамин, Узбекистан',
    image: 'https://cdn.gopharm.uz/drugs/loratal-tab-10mg-no10.webp',
    category: 'Антигистаминные препараты',
    drugForm: 'Таблетки',
    activeSubstance: "Лоратадин (Loratadin)",
    manufacturer: 'Нобель-Фармсаноат',
    country: 'Узбекистан',
    prescription: 'Без рецепта',
    price: '28 500 сум',
    rating: 4.9,
    students: 3240,
    level: 'Boshlang\'ich',
    duration: '40 соат',
    modules: 6,
    lessons: 24,
    tag: 'Eng mashhur',
    tagColor: 'bg-amber-100 text-amber-700',
    topics: ['H1-блокатор 2-авлод', 'Аллергик ринит', 'Крапивница', '24 соат таъсир'],
    description: 'Лоратадин — 2-авлод селектив H1-гистамин рецепторлар блокатори. Аллергик ринит, крапивница ва бошқа аллергик ҳолатларда қўлланилади. Таъсири 1-3 соатда бошланиб, 24 соатгача давом этади. Минимал седатив эффектга эга.'
  },
  {
    id: 2,
    title: 'Алер-G (Aler-G)',
    subtitle: 'Цетиризин 10мг №20 — Антигистамин, Грузия',
    image: 'https://cdn.gopharm.uz/drugs/alerji.webp',
    category: 'Антигистаминные препараты',
    drugForm: 'Таблетки',
    activeSubstance: 'Цетиризин (Cetirizin)',
    manufacturer: 'GM Pharmaceuticals Ltd',
    country: 'Грузия',
    prescription: 'Без рецепта',
    price: '43 800 сум',
    rating: 4.8,
    students: 2180,
    level: 'Boshlang\'ich',
    duration: '36 соат',
    modules: 5,
    lessons: 20,
    tag: 'Yangi',
    tagColor: 'bg-emerald-100 text-emerald-700',
    topics: ['H1-блокатор 2-авлод', 'Гидроксизин метаболити', 'Поллиноз', '10 соат T½'],
    description: 'Цетиризин — гидроксизиннинг фаол метаболити, селектив H1-блокатор. Аллергик ринит, конъюнктивит, крапивницада қўлланилади. Седатив таъсир потенциал мавжуд.'
  },
  {
    id: 3,
    title: 'Вольтарен Эмульгель',
    subtitle: 'Диклофенак 1% 100г — НПВС гель, Швейцария',
    image: 'https://cdn.gopharm.uz/drugs/voltaren-emulgel-gel-1-100g-1.webp',
    category: 'Обезболивающие и противовоспалительные',
    drugForm: 'Гель для наружного применения',
    activeSubstance: 'Диклофенак (Diclofenac)',
    manufacturer: 'Новартис',
    country: 'Швейцария',
    prescription: 'Без рецепта',
    price: '65 700 сум',
    rating: 4.9,
    students: 2980,
    level: 'O\'rta',
    duration: '32 соат',
    modules: 5,
    lessons: 20,
    tag: 'Eng mashhur',
    tagColor: 'bg-amber-100 text-amber-700',
    topics: ['НПВП', 'ЦОГ-1/ЦОГ-2 ингибитори', 'Остеоартроз', '6% абсорбция'],
    description: 'Диклофенак — НПВП, ЦОГ-1 ва ЦОГ-2 ни ингибирлайди. Маҳаллий яллиғланишга қарши ва оғриқ қолдирувчи восита. Синовиал сувда концентрация плазмадан 20 марта юқори.'
  },
  {
    id: 4,
    title: 'Эссенциале форте Н',
    subtitle: 'Фосфолипиды 300мг №30 — Гепатопротектор, Франция',
    image: 'https://cdn.gopharm.uz/drugs/essentsiale-forte-n-kaps-no30.webp',
    category: 'Гепатопротекторы и желчегонные',
    drugForm: 'Капсулы',
    activeSubstance: 'Эссенциальные фосфолипиды (EPL)',
    manufacturer: 'Sanofi Winthrop industries',
    country: 'Франция',
    prescription: 'Без рецепта',
    price: '176 600 сум',
    rating: 4.9,
    students: 2560,
    level: 'Ilg\'or',
    duration: '44 соат',
    modules: 7,
    lessons: 28,
    tag: 'Premium',
    tagColor: 'bg-primary-100 text-primary-700',
    topics: ['Гепатопротектор', 'Фосфолипидлар', 'Гепатит', 'Жигар циррози'],
    description: 'Эссенциал фосфолипидлар (EPL) соядан олинади. Жигар ҳужайралари мембранасини тиклайди, детоксикация функциясини яхшилайди. 90% дан ортиғи ингичка ичакда сўрилади.'
  },
  {
    id: 5,
    title: 'Нурофен для детей',
    subtitle: 'Ибупрофен 100мг/5мл 150мл — Суспензия, Великобритания',
    image: 'https://cdn.gopharm.uz/drugs/item_photo%20-%201%20(41).webp',
    category: 'Противопростудные препараты',
    drugForm: 'Суспензия',
    activeSubstance: 'Ибупрофен (Ibuprofen)',
    manufacturer: 'Reckitt Benckiser Healthcare',
    country: 'Великобритания',
    prescription: 'Без рецепта',
    price: '55 800 сум',
    rating: 4.8,
    students: 3120,
    level: 'Boshlang\'ich',
    duration: '28 соат',
    modules: 4,
    lessons: 16,
    tag: 'Eng mashhur',
    tagColor: 'bg-amber-100 text-amber-700',
    topics: ['НПВП', 'Антипиретик', 'Болалар 3 ойдан', '5-10 мг/кг'],
    description: 'Ибупрофен — НПВП, антипиретик ва анальгетик. Болаларда лихорадка, оғриқ, яллиғланишда қўлланилади. Доза: 5-10 мг/кг хар 6-8 соат. 3 ойликдан бошлаб.'
  },
  {
    id: 6,
    title: 'Терафлю (Theraflu)',
    subtitle: 'Парацетамол+Фенилэфрин+Фенирамин №10 — Швейцария',
    image: 'https://cdn.gopharm.uz/drugs/teraflju-ot-gripprost-por-no10-limon-1.webp',
    category: 'Противопростудные препараты',
    drugForm: 'Порошок для раствора',
    activeSubstance: 'Парацетамол+Фенилэфрин+Фенирамин+Витамин C',
    manufacturer: 'Новартис',
    country: 'Швейцария',
    prescription: 'Без рецепта',
    price: '89 500 сум',
    rating: 4.7,
    students: 1850,
    level: 'Boshlang\'ich',
    duration: '24 соат',
    modules: 4,
    lessons: 16,
    tag: 'Ommabop',
    tagColor: 'bg-blue-100 text-blue-700',
    topics: ['Комбинированный', 'Грипп/ОРВИ', '12 ёшдан', 'Антипиретик'],
    description: '4 компонентли: Парацетамол (антипиретик), Фенилэфрин (вазоконстриктор), Фенирамин (антигистамин), Аскорбин кислотаси. Грипп ва шамоллаш симптомларини комплекс даволайди.'
  },
  {
    id: 7,
    title: 'Стрепсилс Интенсив',
    subtitle: 'Флурбипрофен 8.75мг спрей 15мл — Томоқ, Великобритания',
    image: 'https://cdn.gopharm.uz/drugs/strepsils-sprey.webp',
    category: 'Препараты для лечения горла',
    drugForm: 'Спрей',
    activeSubstance: 'Флурбипрофен (Flurbiprofen)',
    manufacturer: 'Reckitt Benckiser Healthcare',
    country: 'Великобритания',
    prescription: 'Без рецепта',
    price: '54 400 сум',
    rating: 4.6,
    students: 1780,
    level: 'Boshlang\'ich',
    duration: '20 соат',
    modules: 3,
    lessons: 12,
    tag: 'Yangi',
    tagColor: 'bg-emerald-100 text-emerald-700',
    topics: ['НПВП маҳаллий', 'Фарингит', '15-30 мин таъсир', '12 ёшдан'],
    description: 'Флурбипрофен — маҳаллий НПВП спрей. Томоқ оғриғи, фарингит ва тонзиллитда яллиғланишга қарши ва оғриқ қолдирувчи восита. Таъсири 15-30 мин да бошланади.'
  },
  {
    id: 8,
    title: 'Диалак Форте',
    subtitle: 'Симетикон 240мг №20 — Метеоризм, Испания',
    image: 'https://cdn.gopharm.uz/drugs/dialac-forte.webp',
    category: 'Желудочно-кишечные препараты',
    drugForm: 'Капсулы',
    activeSubstance: 'Симетикон (Simethicone)',
    manufacturer: 'Alcala Farma S.L',
    country: 'Испания',
    prescription: 'Без рецепта',
    price: '70 100 сум',
    rating: 4.5,
    students: 1420,
    level: 'Boshlang\'ich',
    duration: '16 соат',
    modules: 3,
    lessons: 12,
    tag: 'Ommabop',
    tagColor: 'bg-blue-100 text-blue-700',
    topics: ['Пеногаситель', 'Метеоризм', 'Қонга сўрилмайди', 'Хавфсиз'],
    description: 'Симетикон — пеногаситель. Ичакдаги газ пуфакчаларини бирлаштириб, уларнинг табиий чиқиб кетишини таъминлайди. Қонга сўрилмайди, фақат ичак бўшлиғида ишлайди. 100% хавфсиз.'
  },
  {
    id: 9,
    title: 'Элевит Пронаталь',
    subtitle: 'Поливитамин+минералы №100 — Ҳомиладорлик, Германия',
    image: 'https://cdn.gopharm.uz/drugs/elevit-pronatal-tab-no100-1.webp',
    category: 'Витамины и БАДы',
    drugForm: 'Таблетки',
    activeSubstance: 'Поливитамины + минералы',
    manufacturer: 'Bayer Pharma AG',
    country: 'Германия',
    prescription: 'Без рецепта',
    price: '243 000 сум',
    rating: 4.9,
    students: 2100,
    level: 'O\'rta',
    duration: '30 соат',
    modules: 5,
    lessons: 20,
    tag: 'Ommabop',
    tagColor: 'bg-blue-100 text-blue-700',
    topics: ['Пренатал', 'Фолат 800 мкг', 'Темир 60 мг', '12 витамин+6 минерал'],
    description: '12 витамин + 6 минералдан иборат пренатал комплекс. Фолиевая кислота (800 мкг) неврал най нуқсонларини олдини олади. Темир (60 мг) анемиянинг олдини олади. Режалаштиришдан бошлаб.'
  },
  {
    id: 10,
    title: 'Терафлекс Хондрокрем Форте',
    subtitle: 'Глюкозамин+Хондроитин+Диклофенак крем 30г — Германия',
    image: 'https://cdn.gopharm.uz/drugs/terafleks-xondrokrem-forte-30gr.webp',
    category: 'Обезболивающие и противовоспалительные',
    drugForm: 'Крем',
    activeSubstance: 'Глюкозамин+Хондроитин+Диклофенак',
    manufacturer: 'Bayer Pharma AG',
    country: 'Германия',
    prescription: 'Без рецепта',
    price: '57 000 сум',
    rating: 4.8,
    students: 1650,
    level: 'O\'rta',
    duration: '28 соат',
    modules: 4,
    lessons: 16,
    tag: 'Premium',
    tagColor: 'bg-primary-100 text-primary-700',
    topics: ['Хондропротектор', 'Остеоартроз', '3-компонент', '14-21 кун курс'],
    description: '3-компонентли: Глюкозамин (хрящ синтези), Хондроитин (деградацияни камайтиради), Диклофенак (яллиғланишга қарши). Остеоартроз ва бўғим касалликларида маҳаллий қўлланади.'
  }
];

// Video dars ma'lumotlari
export const realDrugLessons: DrugLesson[] = [
  {
    id: 1,
    title: 'Лоратадин — Антигистамин препаратлар',
    subtitle: 'Лораталь (Loratal) — H1-блокатор 2-авлод',
    image: 'https://cdn.gopharm.uz/drugs/loratal-tab-10mg-no10.webp',
    description: 'Лоратадиннинг фармакологияси, таъсир механизми, клиник қўлланилиши ва хавфсизлик профили ҳақида тўлиқ видео дарс.',
    sections: [
      { time: '00:00', title: 'Аллергия касалликларига кириш', description: 'Аллергик ринит, крапивница, атопик дерматит — эпидемиология ва патогенез' },
      { time: '03:15', title: 'H1-блокаторлар классификацияси', description: '1-авлод (Димедрол, Супрастин) vs 2-авлод (Лоратадин, Цетиризин) — фарқлар, афзалликлар' },
      { time: '07:40', title: 'Лоратадин фармакодинамикаси', description: 'Селектив периферик H1-рецептор блокацияси, гистамин индуцирланган реакцияларни олдини олиш' },
      { time: '12:00', title: 'Фармакокинетика', description: 'Сўрилиш, тарқалиш (97% плазма оқсили), CYP3A4/CYP2D6 метаболизми, T½ 3-20 соат' },
      { time: '16:20', title: 'Қўлланилиши ва дозалаш', description: 'Катталар: 10 мг/кун; болалар 2-12 ёш: 5 мг/кун; жигар етишмовчилигида дозани камайтириш' },
      { time: '19:50', title: 'Ножўя таъсирлар ва хавфсизлик', description: 'Бош оғриғи (12%), уйқучанлик (8%), дорилар ўзаро таъсири (кетоконазол, эритромицин)' }
    ],
    keyPoints: [
      '2-авлод H1-блокатор — седатив эффекти минимал',
      'Таъсири 1-3 соатда бошланиб, 24 соатгача давом этади',
      'Кунига 1 марта 10 мг — қулай дозалаш режими',
      'Жигар етишмовчилигида дозани камайтириш керак',
      'Ҳайдовчилар учун хавфсиз — психомотор функцияларга таъсир қилмайди',
      'Кетоконазол, эритромицин лоратадин концентрациясини оширади'
    ],
    quiz: [
      { question: 'Лоратадин қайси авлод антигистамин препарати?', options: ['1-авлод', '2-авлод', '3-авлод', '4-авлод'], correct: 1 },
      { question: 'Лоратадиннинг таъсир механизми?', options: ['H2-рецепторларни блоклайди', 'H1-рецепторларни блоклайди', 'Лейкотриенларни ингибирлайди', 'МАО ни блоклайди'], correct: 1 },
      { question: 'Катталар учун суткалик доза?', options: ['5 мг', '10 мг', '15 мг', '20 мг'], correct: 1 },
      { question: 'Лоратадин метаболизмида қайси ферментлар иштирок этади?', options: ['CYP2C9/CYP2C19', 'CYP3A4/CYP2D6', 'CYP1A2/CYP2E1', 'CYP2B6/CYP2C8'], correct: 1 },
      { question: 'Лоратадиннинг афзаллиги?', options: ['Кучли седация', 'Минимал седатив эффект', 'Фақат инъекция', 'Тез ўрганадиган'], correct: 1 }
    ],
    pharmacology: {
      mechanism: 'Селектив периферик H1-гистамин рецепторлар блокатори. Гистамин таъсирини олдини олади — капиллярлар ўтказувчанлиги камаяди, тўқима шиши ва силлиқ мускул спазми олди олинади.',
      indications: ['Сезонли ва круглогодичный аллергик ринит', 'Аллергик конъюнктивит', 'Крапивница', 'Аллергик дерматозлар'],
      contraindications: ['Юқори сезувчанлик', 'Ҳомиладорлик I триместр', 'Эмизиш даври', '2 ёшгача болалар'],
      dosage: 'Катталар: 10 мг (1 таб) × 1 марта/кун. 2-12 ёш <30 кг: 5 мг × 1 марта/кун. Курс: 10-14 кун.',
      sideEffects: ['Бош оғриғи (12%)', 'Уйқучанлик (8%)', 'Чарчоқ (4%)', 'Қуруқ оғиз (3%)']
    }
  },
  {
    id: 2,
    title: 'Цетиризин — Иккинчи авлод H1-блокатор',
    subtitle: 'Алер-G (Aler-G) — Фаол метаболит',
    image: 'https://cdn.gopharm.uz/drugs/alerji.webp',
    description: 'Цетиризин фармакологияси, гидроксизин билан фарқи, аллергик касалликларда қўлланилиши.',
    sections: [
      { time: '00:00', title: 'Цетиризин — умумий маълумот', description: 'GM Pharmaceuticals Ltd (Грузия) препарати, 2-авлод H1-блокатор' },
      { time: '03:20', title: 'Гидроксизин метаболити', description: 'Цетиризин гидроксизиннинг карбоксилланган фаол метаболити — 1-авлодга нисбатан афзалликлар' },
      { time: '07:00', title: 'H1-блокация ва яллиғланиш', description: 'H1-рецепторларга юқори аффинлик, эозинофиллар миграциясини камайтириш' },
      { time: '11:30', title: 'Фармакокинетик хусусиятлар', description: 'Cmax 1 соат, 93% плазма оқсиллари билан боғланиш, 70% буйрак орқали чиқарилиш' },
      { time: '15:00', title: 'Клиник қўллаш', description: 'Поллиноз, аллергик ринит, крапивница, дерматит — самарадорлик тадқиқотлари' },
      { time: '19:00', title: 'Хавфсизлик профили', description: 'Седация 14%, буйрак етишмовчилигида дозани камайтириш, антихолинергик таъсир' }
    ],
    keyPoints: [
      'Гидроксизиннинг фаол метаболити',
      '93% плазма оқсиллари билан боғланади',
      'T½ — 10 соат',
      '70% буйрак орқали ўзгармаган ҳолда чиқарилади',
      'Буйрак етишмовчилигида: КК га қараб дозани камайтириш',
      'Седация потенциал — ҳайдовчилар эҳтиёт бўлиши керак'
    ],
    quiz: [
      { question: 'Цетиризин ниманинг фаол метаболити?', options: ['Лоратадин', 'Гидроксизин', 'Димедрол', 'Супрастин'], correct: 1 },
      { question: 'Цетиризиннинг T½ қанча?', options: ['6 соат', '10 соат', '20 соат', '24 соат'], correct: 1 },
      { question: 'Қандай чиқарилади?', options: ['Нажас (50%)', 'Сийдик (70%)', 'Тер (30%)', 'Ўпка (10%)'], correct: 1 },
      { question: 'Қандай ҳолатда доза камайтирилади?', options: ['Жигар етишмовчилиги', 'Буйрак етишмовчилиги', 'Қандли диабет', 'Юрак етишмовчилиги'], correct: 1 }
    ],
    pharmacology: {
      mechanism: 'Селектив H1-гистамин рецепторлар блокатори. Гистамин-зависим фазани тормозлайди, экссудацияни камайтиради, эозинофиллар миграциясини олдини олади.',
      indications: ['Сезонли аллергик ринит', 'Аллергик конъюнктивит', 'Хроническая крапивница', 'Поллиноз'],
      contraindications: ['Юқори сезувчанлик', 'Терминал буйрак етишмовчилиги (КК<10)', 'Ҳомиладорлик', '6 ёшгача'],
      dosage: 'Катталар: 10 мг × 1 кун (кечқурун). 6-12 ёш: 5 мг × 2 марта. Буйрак етишмовчилигида: 5 мг/кун.',
      sideEffects: ['Уйқучанлик (14%)', 'Бош оғриғи (10%)', 'Қуруқ оғиз (6%)', 'Диспепсия']
    }
  }
];

// Import qilish uchun
export function getDrugById(id: number): DrugData | undefined {
  return realDrugsData.find(d => d.id === id);
}

export function getDrugLessonById(id: number): DrugLesson | undefined {
  return realDrugLessons.find(l => l.id === id);
}

export function searchDrugs(query: string): DrugData[] {
  const q = query.toLowerCase();
  return realDrugsData.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.activeSubstance.toLowerCase().includes(q) ||
    d.category.toLowerCase().includes(q) ||
    d.manufacturer.toLowerCase().includes(q)
  );
}
