/**
 * gopharm.uz — Render/локально ишлатиладиган скрипт
 * 
 * Ишлатиш:
 *   node scripts/build-scrape.mjs
 * 
 * Бу скрипт gopharm.uz дан барча категорияларни юклаб олади
 * ва drugData.ts файлига қўшади.
 */

const BASE = 'https://gopharm.uz';
const OUTPUT = './src/data/gopharm-raw.json';

// Асосий категориялар
const CATEGORIES = [
  'antibakterialnye-preparaty', 'antibiotiki', 'antigistaminnye-preparaty',
  'obezbolivajuschie-i-protivovospalitelnye-preparaty', 'gepatoprotektory-i-zhelchegonnye-preparaty',
  'protivovirusnye-preparaty', 'protivoprostudnye-preparaty', 'preparaty-dlja-lechenija-gorla',
  'zheludochno-kishechnye-preparaty', 'nevrologicheskie-preparaty', 'nootropnye-preparaty',
  'gipotenzivnye-preparaty', 'gormonalnye-preparaty', 'diabeticheskie-preparaty',
  'dermatovenerologicheskie-preparaty', 'ginekologicheskie-preparaty',
  'urologicheskie-preparaty', 'sedativnye-preparaty',
  'spazmolitiki', 'protivogribkovye-preparaty',
  'revmatologicheskie-preparaty', 'protivogelmintnye-preparaty',
  'onkologicheskie-preparaty', 'immunostimulirujuschie-preparaty',
  'preparaty-dlja-lechenija-respiratornoj-sistemy-protivokashlevye-preparaty',
  'regeneratsija-hrjaschevoj-tkani',
  'preparaty-zheleza', 'preparaty-kaltsija',
  'mochegonnye-preparaty',
  'preparaty-ot-ozhogov-i-regeneratsii-kozhi',
  'protivomigrenoznye-preparaty',
  // Витамины
  'vitaminy-mineraly', 'bady', 'dlja-detej-i-podrostkov', 'dlja-zhenshen',
  'monovitaminy', 'probiotiki-prebiotiki',
  // Фитопрепараты
  'travy-plody-sbory',
  // Мама и малыш
  'podguzniki-i-pelenki', 'tovary-dlja-kormlenija',
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (compatible; PharmLearnBot/1.0)',
          'Accept': 'text/html',
        },
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) return await res.text();
      console.log(`  ⚠️ HTTP ${res.status} for ${url}, retry ${i + 1}/${retries}`);
    } catch (e) {
      console.log(`  ⚠️ Error: ${e.message}, retry ${i + 1}/${retries}`);
    }
    await sleep(2000 * (i + 1));
  }
  return null;
}

function parseDrugs(html, category) {
  const drugs = [];
  if (!html) return drugs;
  
  // Дори карточкаларини парс қилиш
  // Паттерн: <a href="/product/..."><img src="..."><h6>NAME</h6></a>
  const productRegex = /<a\s+href="\/product\/([^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?(?:<h6[^>]*>([^<]+)<\/h6>)?[\s\S]*?от\s+([\d\s]+)\s+сум[\s\S]*?(?:<p[^>]*>([^<]+)<\/p>)?/gi;
  
  // Симплер паттерн — блокларни ажратиш
  const blocks = html.split(/<a\s+href="\/product\//);
  
  for (const block of blocks.slice(1)) {
    const id = block.split('"')[0];
    const nameMatch = block.match(/<h6[^>]*>([^<]+)<\/h6>/);
    const name = nameMatch ? nameMatch[1].trim() : id;
    const imgMatch = block.match(/src="(https:\/\/cdn\.gopharm\.uz\/drugs\/[^"]+)"/);
    const image = imgMatch ? imgMatch[1] : '';
    const priceMatch = block.match(/от\s+([\d\s]+)\s+сум/);
    const price = priceMatch ? priceMatch[1].trim().replace(/\s/g, ' ') + ' сум' : '';
    const manufMatch = block.match(/<p[^>]*>([^<]+)<\/p>/);
    const manufacturer = manufMatch ? manufMatch[1].trim() : '';
    
    if (id && !drugs.find(d => d.id === id)) {
      drugs.push({ id, name, image, price, manufacturer, category });
    }
  }
  
  return drugs;
}

async function scrapeAll() {
  console.log('='.repeat(60));
  console.log('📍 gopharm.uz — Барча маълумотларни юклаб олиш');
  console.log('='.repeat(60));
  console.log(`📊 ${CATEGORIES.length} та категория\n`);
  
  const allDrugs = [];
  const seen = new Set();
  let successCount = 0;
  
  for (const cat of CATEGORIES) {
    const url = `${BASE}/catalog/${cat}`;
    process.stdout.write(`  📄 ${cat.padEnd(45)} `);
    
    const html = await fetchWithRetry(url);
    if (html) {
      const drugs = parseDrugs(html, cat);
      let newCount = 0;
      for (const d of drugs) {
        if (!seen.has(d.id)) {
          seen.add(d.id);
          allDrugs.push(d);
          newCount++;
        }
      }
      successCount++;
      process.stdout.write(`✅ +${newCount} янгы (жами ${allDrugs.length})\n`);
    } else {
      process.stdout.write(`❌\n`);
    }
    
    await sleep(800); // Серверга юклама бермаслик
  }
  
  // JSON сақлаш
  const fs = await import('fs');
  const output = {
    total: allDrugs.length,
    categories: successCount,
    timestamp: new Date().toISOString(),
    source: 'https://gopharm.uz',
    drugs: allDrugs,
  };
  
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ ${successCount}/${CATEGORIES.length} категория юкланди`);
  console.log(`📦 ${allDrugs.length} та дори`);
  console.log(`💾 ${OUTPUT}`);
  console.log(`📏 ${(fs.statSync(OUTPUT).size / 1024).toFixed(1)} KB`);
  console.log('='.repeat(60));
  
  // Қисқача статистика
  const categories = {};
  allDrugs.forEach(d => {
    categories[d.category] = (categories[d.category] || 0) + 1;
  });
  console.log('\n📊 Категориялар бўйича:');
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count} та`));
}

scrapeAll().catch(e => {
  console.error('❌ Хато:', e.message);
  process.exit(1);
});
