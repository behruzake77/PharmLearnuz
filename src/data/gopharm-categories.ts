/**
 * gopharm.uz — Барча категориялар ва уларнинг таркиби
 * 
 * Манба: https://gopharm.uz
 * Сана: 2025
 * 
 * Категориялар сони: 8 та асосий + 70+ кичик
 * Препаратлар сони: 12,000+
 */

export interface GopharmCategory {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  url: string;
  icon: string;
  productCount?: number;
  subcategories?: GopharmSubcategory[];
}

export interface GopharmSubcategory {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  url: string;
  productCount?: number;
}

export const GOPHARM_CATEGORIES: GopharmCategory[] = [
  {
    id: 'lekarstvennye-preparaty',
    nameRu: 'Лекарственные препараты',
    nameUz: 'Дори препаратлари',
    name: 'Drugs',
    url: '/catalog/lekarstvennye-preparaty',
    icon: '💊',
    productCount: 8000,
    subcategories: [
      { id: 'antibakterialnye-preparaty', nameRu: 'Антибактериальные препараты', nameUz: 'Антибактериал препаратлар', name: 'Antibacterial', url: '/catalog/antibakterialnye-preparaty', productCount: 274 },
      { id: 'antibiotiki', nameRu: 'Антибиотики', nameUz: 'Антибиотиклар', name: 'Antibiotics', url: '/catalog/antibiotiki', productCount: 727 },
      { id: 'antigistaminnye-preparaty', nameRu: 'Антигистаминные препараты', nameUz: 'Антигистамин препаратлар', name: 'Antihistamines', url: '/catalog/antigistaminnye-preparaty', productCount: 162 },
      { id: 'obezbolivajuschie-i-protivovospalitelnye-preparaty', nameRu: 'Обезболивающие и противовоспалительные', nameUz: 'Оғриқ қолдирувчи ва яллиғланишга қарши', name: 'Pain relief', url: '/catalog/obezbolivajuschie-i-protivovospalitelnye-preparaty', productCount: 445 },
      { id: 'gepatoprotektory-i-zhelchegonnye-preparaty', nameRu: 'Гепатопротекторы и желчегонные', nameUz: 'Гепатопротекторлар', name: 'Hepatoprotectors', url: '/catalog/gepatoprotektory-i-zhelchegonnye-preparaty', productCount: 160 },
      { id: 'protivovirusnye-preparaty', nameRu: 'Противовирусные препараты', nameUz: 'Вирусга қарши препаратлар', name: 'Antivirals', url: '/catalog/protivovirusnye-preparaty' },
      { id: 'protivoprostudnye-preparaty', nameRu: 'Противопростудные препараты', nameUz: 'Шамоллашга қарши', name: 'Cold remedies', url: '/catalog/protivoprostudnye-preparaty' },
      { id: 'preparaty-dlja-lechenija-gorla', nameRu: 'Препараты для лечения горла', nameUz: 'Томоқ дорилари', name: 'Throat', url: '/catalog/preparaty-dlja-lechenija-gorla' },
      { id: 'zheludochno-kishechnye-preparaty', nameRu: 'Желудочно-кишечные препараты', nameUz: 'Ошқозон-ичак препаратлари', name: 'GI tract', url: '/catalog/zheludochno-kishechnye-preparaty' },
      { id: 'nevrologicheskie-preparaty', nameRu: 'Неврологические препараты', nameUz: 'Неврологик препаратлар', name: 'Neurology', url: '/catalog/nevrologicheskie-preparaty' },
      { id: 'nootropnye-preparaty', nameRu: 'Ноотропные препараты', nameUz: 'Ноотроп препаратлар', name: 'Nootropics', url: '/catalog/nootropnye-preparaty' },
      { id: 'gipotenzivnye-preparaty', nameRu: 'Гипотензивные препараты', nameUz: 'Босим туширувчи', name: 'Antihypertensives', url: '/catalog/gipotenzivnye-preparaty' },
      { id: 'gormonalnye-preparaty', nameRu: 'Гормональные препараты', nameUz: 'Гормонал препаратлар', name: 'Hormones', url: '/catalog/gormonalnye-preparaty' },
      { id: 'diabeticheskie-preparaty', nameRu: 'Диабетические препараты', nameUz: 'Диабет препаратлари', name: 'Diabetes', url: '/catalog/diabeticheskie-preparaty' },
      { id: 'dermatovenerologicheskie-preparaty', nameRu: 'Дерматовенерологические препараты', nameUz: 'Тери касалликлари', name: 'Dermatology', url: '/catalog/dermatovenerologicheskie-preparaty' },
      { id: 'ginekologicheskie-preparaty', nameRu: 'Гинекологические препараты', nameUz: 'Гинекологик препаратлар', name: 'Gynecology', url: '/catalog/ginekologicheskie-preparaty' },
      { id: 'urologicheskie-preparaty', nameRu: 'Урологические препараты', nameUz: 'Урологик препаратлар', name: 'Urology', url: '/catalog/urologicheskie-preparaty' },
      { id: 'sedativnye-preparaty', nameRu: 'Седативные препараты', nameUz: 'Седатив препаратлар', name: 'Sedatives', url: '/catalog/sedativnye-preparaty' },
      { id: 'snotvornye-preparaty', nameRu: 'Снотворные препараты', nameUz: 'Ухлатувчи препаратлар', name: 'Sleep aids', url: '/catalog/snotvornye-preparaty' },
      { id: 'spazmolitiki', nameRu: 'Спазмолитики', nameUz: 'Спазмолитиклар', name: 'Spasmolytics', url: '/catalog/spazmolitiki' },
      { id: 'protivogribkovye-preparaty', nameRu: 'Противогрибковые препараты', nameUz: 'Замбуруқга қарши', name: 'Antifungals', url: '/catalog/protivogribkovye-preparaty' },
      { id: 'protivomigrenoznye-preparaty', nameRu: 'Противомигренозные препараты', nameUz: 'Мигренга қарши', name: 'Antimigraine', url: '/catalog/protivomigrenoznye-preparaty' },
      { id: 'revmatologicheskie-preparaty', nameRu: 'Ревматологические препараты', nameUz: 'Ревматологик', name: 'Rheumatology', url: '/catalog/revmatologicheskie-preparaty' },
      { id: 'onkologicheskie-preparaty', nameRu: 'Онкологические препараты', nameUz: 'Онкологик препаратлар', name: 'Oncology', url: '/catalog/onkologicheskie-preparaty' },
      { id: 'protivogelmintnye-preparaty', nameRu: 'Противогельминтные препараты', nameUz: 'Гельминтга қарши', name: 'Anthelmintics', url: '/catalog/protivogelmintnye-preparaty' },
      { id: 'immunostimulirujuschie-preparaty', nameRu: 'Иммуностимулирующие препараты', nameUz: 'Иммуностимуляторлар', name: 'Immunostimulants', url: '/catalog/immunostimulirujuschie-preparaty' },
      { id: 'preparaty-dlja-lechenija-endokrinnoj-sistemy', nameRu: 'Препараты для эндокринной системы', nameUz: 'Эндокрин тизим', name: 'Endocrine', url: '/catalog/preparaty-dlja-lechenija-endokrinnoj-sistemy' },
      { id: 'mochegonnye-preparaty', nameRu: 'Мочегонные препараты', nameUz: 'Сийдик ҳайдовчи', name: 'Diuretics', url: '/catalog/mochegonnye-preparaty' },
      { id: 'antiseptiki-i-dezinfitsirujuschie-sredstva', nameRu: 'Антисептики и дезинфицирующие', nameUz: 'Антисептиклар', name: 'Antiseptics', url: '/catalog/antiseptiki-i-dezinfitsirujuschie-sredstva' },
      { id: 'gemorroidalnye-i-venotonicheskie-preparaty', nameRu: 'Геморроидальные и венотонические', nameUz: 'Геморрой ва вена', name: 'Hemorrhoids', url: '/catalog/gemorroidalnye-i-venotonicheskie-preparaty' },
      { id: 'preparaty-zheleza', nameRu: 'Препараты железа', nameUz: 'Темир препаратлари', name: 'Iron supplements', url: '/catalog/preparaty-zheleza' },
      { id: 'preparaty-kaltsija', nameRu: 'Препараты кальция', nameUz: 'Кальций препаратлари', name: 'Calcium', url: '/catalog/preparaty-kaltsija' },
      { id: 'preparaty-kalija', nameRu: 'Препараты калия', nameUz: 'Калий препаратлари', name: 'Potassium', url: '/catalog/preparaty-kalija' },
      { id: 'regeneratsija-hrjaschevoj-tkani', nameRu: 'Регенерация хрящевой ткани', nameUz: 'Тўқима регенерацияси', name: 'Cartilage', url: '/catalog/regeneratsija-hrjaschevoj-tkani' },
      { id: 'sredstva-dlja-irrigatsii-nosovoj-polosti', nameRu: 'Средства для лечения ринита', nameUz: 'Бурун дорилари', name: 'Nasal', url: '/catalog/sredstva-dlja-irrigatsii-nosovoj-polosti' },
      { id: 'preparaty-pri-zabolevanii-glaz-i-ushej', nameRu: 'Препараты для глаз и ушей', nameUz: 'Кўз ва қулоқ', name: 'Eyes & Ears', url: '/catalog/preparaty-pri-zabolevanii-glaz-i-ushej' },
      { id: 'preparaty-predstatelnoj-zhelezy-i-reguljatory-potentsii', nameRu: 'Препараты предстательной железы', nameUz: 'Простата препаратлари', name: 'Prostate', url: '/catalog/preparaty-predstatelnoj-zhelezy-i-reguljatory-potentsii' },
    ]
  },
  {
    id: 'vitaminy-i-bady',
    nameRu: 'Витамины и БАДы',
    nameUz: 'Витаминлар ва БАДлар',
    name: 'Vitamins',
    url: '/catalog/vitaminy-i-bady',
    icon: '💪',
    productCount: 2000,
    subcategories: [
      { id: 'vitaminy-mineraly', nameRu: 'Витамины, минералы', nameUz: 'Витаминлар, минераллар', name: 'Vitamins & Minerals', url: '/catalog/vitaminy-mineraly' },
      { id: 'bady', nameRu: 'БАДЫ', nameUz: 'БАДлар', name: 'Supplements', url: '/catalog/bady' },
      { id: 'dlja-detej-i-podrostkov', nameRu: 'Для детей и подростков', nameUz: 'Болалар ва ўсмирлар учун', name: 'For kids', url: '/catalog/dlja-detej-i-podrostkov' },
      { id: 'dlja-zhenshen', nameRu: 'Для женщин', nameUz: 'Аёллар учун', name: 'For women', url: '/catalog/dlja-zhenshen' },
      { id: 'dlja-zrenija', nameRu: 'Для зрения', nameUz: 'Кўриш учун', name: 'For vision', url: '/catalog/dlja-zrenija' },
      { id: 'monovitaminy', nameRu: 'Моновитамины', nameUz: 'Моновитаминлар', name: 'Single vitamins', url: '/catalog/monovitaminy' },
      { id: 'probiotiki-prebiotiki', nameRu: 'Пробиотики', nameUz: 'Пробиотиклар', name: 'Probiotics', url: '/catalog/probiotiki-prebiotiki' },
    ]
  },
  {
    id: 'fitopreparaty',
    nameRu: 'Фитопрепараты',
    nameUz: 'Фито препаратлар',
    name: 'Herbal',
    url: '/catalog/fitopreparaty',
    icon: '🌿',
    productCount: 500,
    subcategories: [
      { id: 'travy-plody-sbory', nameRu: 'Травы, плоды, сборы', nameUz: 'Ўтлар, мевалар', name: 'Herbs', url: '/catalog/travy-plody-sbory' },
      { id: 'gastroenterologicheskie-preparaty', nameRu: 'Гастроэнтерологические', nameUz: 'Гастроэнтерологик', name: 'Gastrointestinal', url: '/catalog/gastroenterologicheskie-preparaty' },
    ]
  },
  {
    id: 'mama-i-malysh',
    nameRu: 'Мама и малыш',
    nameUz: 'Она ва бола',
    name: 'Mom & Baby',
    url: '/catalog/mama-i-malysh',
    icon: '👶',
    productCount: 300,
    subcategories: [
      { id: 'podguzniki-i-pelenki', nameRu: 'Подгузники и пеленки', nameUz: 'Памперслар', name: 'Diapers', url: '/catalog/podguzniki-i-pelenki' },
      { id: 'tovary-dlja-kormlenija', nameRu: 'Товары для кормления', nameUz: 'Озиқлантириш', name: 'Feeding', url: '/catalog/tovary-dlja-kormlenija' },
    ]
  },
  {
    id: 'meditsinskie-izdelija',
    nameRu: 'Медицинские изделия',
    nameUz: 'Тиббий буюмлар',
    name: 'Medical supplies',
    url: '/catalog/meditsinskie-izdelija',
    icon: '🏥',
    productCount: 600,
    subcategories: [
      { id: 'maski-meditsinskie', nameRu: 'Маски медицинские', nameUz: 'Тиббий ниқоблар', name: 'Masks', url: '/catalog/maski-meditsinskie' },
      { id: 'perevjazochnye-materialy', nameRu: 'Перевязочные материалы', nameUz: 'Боғлов материаллари', name: 'Bandages', url: '/catalog/perevjazochnye-materialy' },
      { id: 'perchatki-meditsinskie', nameRu: 'Перчатки медицинские', nameUz: 'Тиббий қўлқоплар', name: 'Gloves', url: '/catalog/perchatki-meditsinskie' },
      { id: 'shpritsy-katetery-sistemy-dlja-infuzij', nameRu: 'Шприцы, катетеры', nameUz: 'Шприцлар, катетерлар', name: 'Syringes', url: '/catalog/shpritsy-katetery-sistemy-dlja-infuzij' },
    ]
  },
  {
    id: 'pribory-meditsinskie',
    nameRu: 'Приборы медицинские',
    nameUz: 'Тиббий асбоблар',
    name: 'Medical devices',
    url: '/catalog/pribory-meditsinskie',
    icon: '🩺',
    productCount: 200,
    subcategories: [
      { id: 'tonometry', nameRu: 'Тонометры', nameUz: 'Тонометрлар', name: 'Blood pressure monitors', url: '/catalog/tonometry' },
      { id: 'gljukometry', nameRu: 'Глюкометры и тест полоски', nameUz: 'Глюкометрлар', name: 'Glucometers', url: '/catalog/gljukometry' },
      { id: 'ingaljatory-nebulajzery', nameRu: 'Ингаляторы / небулайзеры', nameUz: 'Ингаляторлар', name: 'Inhalers', url: '/catalog/ingaljatory-nebulajzery' },
      { id: 'termometry', nameRu: 'Термометры', nameUz: 'Термометрлар', name: 'Thermometers', url: '/catalog/termometry' },
    ]
  },
  {
    id: 'gigiena-krasota-i-uhod',
    nameRu: 'Гигиена, красота и уход',
    nameUz: 'Гигиена, гўзаллик ва парвариш',
    name: 'Hygiene',
    url: '/catalog/gigiena-krasota-i-uhod',
    icon: '🧴',
    productCount: 500,
  },
];

// Барча категория номларини олиш
export function getAllCategoryNames(): string[] {
  const names: string[] = [];
  GOPHARM_CATEGORIES.forEach(cat => {
    names.push(cat.nameRu);
    cat.subcategories?.forEach(sub => names.push(sub.nameRu));
  });
  return names;
}

// Категория бўйича излаш
export function findCategory(query: string): GopharmCategory | GopharmSubcategory | undefined {
  const q = query.toLowerCase();
  for (const cat of GOPHARM_CATEGORIES) {
    if (cat.nameRu.toLowerCase().includes(q) || cat.nameUz.toLowerCase().includes(q)) return cat;
    const sub = cat.subcategories?.find(s => s.nameRu.toLowerCase().includes(q) || s.nameUz.toLowerCase().includes(q));
    if (sub) return sub;
  }
  return undefined;
}

// Статистика
export function getGopharmStats() {
  let totalProducts = 0;
  let totalSubcategories = 0;
  GOPHARM_CATEGORIES.forEach(cat => {
    totalProducts += cat.productCount || 0;
    totalSubcategories += cat.subcategories?.length || 0;
  });
  return {
    totalCategories: GOPHARM_CATEGORIES.length,
    totalSubcategories,
    totalProducts,
  };
}
