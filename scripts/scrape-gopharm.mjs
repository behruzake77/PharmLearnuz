/**
 * gopharm.uz маълумотларини юклаб олиш скрипти (Node.js)
 * 
 * Ишлатиш: node scripts/scrape-gopharm.mjs
 */

const BASE = 'https://gopharm.uz';

const CATEGORIES = [
  'antibakterialnye-preparaty', 'antibiotiki', 'antigistaminnye-preparaty',
  'obezbolivajuschie-i-protivovospalitelnye-preparaty', 'gepatoprotektory-i-zhelchegonnye-preparaty',
  'protivovirusnye-preparaty', 'protivoprostudnye-preparaty', 'preparaty-dlja-lechenija-gorla',
  'zheludochno-kishechnye-preparaty', 'nevrologicheskie-preparaty', 'nootropnye-preparaty',
  'gipotenzivnye-preparaty', 'gormonalnye-preparaty', 'diabeticheskie-preparaty',
  'dermatovenerologicheskie-preparaty', 'ginekologicheskie-preparaty',
  'urologicheskie-preparaty', 'sedativnye-preparaty', 'snotvornye-preparaty',
  'spazmolitiki', 'protivogribkovye-preparaty', 'protivomigrenoznye-preparaty',
  'revmatologicheskie-preparaty', 'protivogelmintnye-preparaty',
  'onkologicheskie-preparaty', 'immunostimulirujuschie-preparaty',
  'protivomikrobnye-i-protivoprotozojnye-preparaty',
  'preparaty-dlja-lechenija-respiratornoj-sistemy-protivokashlevye-preparaty',
  'sredstva-dlja-irrigatsii-nosovoj-polosti',
  'regeneratsija-hrjaschevoj-tkani',
  'preparaty-predstatelnoj-zhelezy-i-reguljatory-potentsii',
  'preparaty-pri-zabolevanii-glaz-i-ushej',
  'preparaty-zheleza', 'preparaty-kaltsija', 'preparaty-kalija',
  'mochegonnye-preparaty', 'metabolicheskoe-sredstvo',
  'gemorroidalnye-i-venotonicheskie-preparaty',
  'preparaty-ot-ozhogov-i-regeneratsii-kozhi',
  'plazmozameschajuschij',
];

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PharmLearn/1.0)' }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}

function extractDrugs(html, category) {
  const drugs = [];
  // Find drug cards by pattern
  const regex = /<a\s+href="\/product\/([^"]+)"[^>]*>[\s\S]*?<\/a>/gi;
  let match;
  
  // Extract using simpler patterns
  const productLinks = html.match(/href="\/product\/([^"]+)"[^>]*>/g) || [];
  const imageMatches = html.match(/<img[^>]+src="https:\/\/cdn\.gopharm\.uz\/drugs\/([^"]+)"[^>]*>/g) || [];
  const nameMatches = html.match(/<h6[^>]*>([^<]+)<\/h6>/g) || [];
  
  return { count: productLinks.length, products: productLinks.slice(0, 20) };
}

async function scrapeAll() {
  console.log('📍 gopharm.uz — Маълумотларни юклаб олиш\n');
  
  const allData = [];
  let total = 0;
  let success = 0;
  
  for (const cat of CATEGORIES) {
    const url = `${BASE}/catalog/${cat}`;
    process.stdout.write(`  📄 ${cat}... `);
    
    const html = await fetchPage(url);
    if (html) {
      const result = extractDrugs(html, cat);
      total += result.count;
      success++;
      process.stdout.write(`✅ ${result.count} та\n`);
    } else {
      process.stdout.write(`❌\n`);
    }
    
    // Don't overwhelm the server
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n📊 ${success}/${CATEGORIES.length} категория юкланди`);
  console.log(`📊 ${total} та дори топилди`);
}

scrapeAll().catch(console.error);
