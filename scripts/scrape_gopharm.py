#!/usr/bin/env python3
"""
PharmLearn — gopharm.uz маълумотларини тўлиқ юклаб олиш скрипти

Фойдаланиш:
    python3 scripts/scrape_gopharm.py

Талаблар:
    pip install requests beautifulsoup4

Натижа:
    src/data/gopharm_data.json — барча маълумотлар
    src/data/drugData.ts — TypeScript файли (янгиланган)
"""

import json
import re
import os
import sys
import time

# ВАЖНО: Бу скриптни ишлатиш учун requests ва beautifulsoup4 керак
# pip install requests beautifulsoup4

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("❌ Керакли пакетлар йўқ. Ўрнатиш:")
    print("   pip install requests beautifulsoup4")
    sys.exit(1)

BASE_URL = "https://gopharm.uz"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# Категориялар (асосий)
CATEGORIES = {
    "Лекарственные препараты": {
        "url": "/catalog/lekarstvennye-preparaty",
        "subcategories": [
            "antibakterialnye-preparaty", "antibiotiki", "antigistaminnye-preparaty",
            "obezbolivajuschie-i-protivovospalitelnye-preparaty", "gepatoprotektory-i-zhelchegonnye-preparaty",
            "protivovirusnye-preparaty", "protivoprostudnye-preparaty", "preparaty-dlja-lechenija-gorla",
            "zheludochno-kishechnye-preparaty", "nevrologicheskie-preparaty", "nootropnye-preparaty",
            "gipotenzivnye-preparaty", "gormonalnye-preparaty", "diabeticheskie-preparaty",
            "dermatovenerologicheskie-preparaty", "ginekologicheskie-preparaty",
            "preparaty-dlja-lechenija-serdechno-sosudistoj-sistemy-7rz6",
            "protivogribkovye-preparaty", "protivomigrenoznye-preparaty",
            "urologicheskie-preparaty", "sedativnye-preparaty", "snotvornye-preparaty",
            "spazmolitiki", "revmatologicheskie-preparaty", "regeneratsija-hrjaschevoj-tkani",
            "onkologicheskie-preparaty", "protivogelmintnye-preparaty",
            "preparaty-predstatelnoj-zhelezy-i-reguljatory-potentsii",
            "preparaty-pri-zabolevanii-glaz-i-ushej", "preparaty-zheleza",
            "preparaty-kalija", "preparaty-kaltsija", "immunostimulirujuschie-preparaty",
            "sredstva-dlja-irrigatsii-nosovoj-polosti",
            "profilaktika-i-lechenie-bronhialnoj-astmy-bronhospazma",
            "preparaty-dlja-lechenija-endokrinnoj-sistemy",
            "preparaty-dlja-lechenija-respiratornoj-sistemy-protivokashlevye-preparaty",
            "mochegonnye-preparaty", "metabolicheskoe-sredstvo",
            "krovoostanavlivajuschie-preparaty", "lechenie-bolezni-parkinsona",
            "antiseptiki-i-dezinfitsirujuschie-sredstva",
            "gemorroidalnye-i-venotonicheskie-preparaty", "plazmozameschajuschij",
            "mestnoanestezirujuschee-sredstvo", "solevye-rastvory",
            "preparaty-ot-ozhogov-i-regeneratsii-kozhi", "preparaty-pri-nederzhanii-mochi",
            "protivomikrobnye-i-protivoprotozojnye-preparaty",
            "sprei-dlja-lechenija-allergicheskogo-rinita",
            "dlja-uluchshenija-krovoobraschenija",
        ]
    },
    "Витамины и БАДы": {
        "url": "/catalog/vitaminy-i-bady",
        "subcategories": ["vitaminy-mineraly", "bady", "dlja-detej-i-podrostkov", 
                          "dlja-zhenshen", "dlja-zrenija", "monovitaminy", "probiotiki-prebiotiki"]
    },
    "Фитопрепараты": {
        "url": "/catalog/fitopreparaty",
        "subcategories": ["gastroenterologicheskie-preparaty", 
                          "preparaty-dlja-lechenija-serdechno-sosudistoj-sistemy", "travy-plody-sbory"]
    },
    "Мама и малыш": {
        "url": "/catalog/mama-i-malysh",
        "subcategories": ["gigiena-i-kosmetika", "podguzniki-i-pelenki", "tovary-dlja-kormlenija"]
    },
    "Медицинские изделия": {
        "url": "/catalog/meditsinskie-izdelija",
        "subcategories": ["maski-meditsinskie", "perevjazochnye-materialy", "perchatki-meditsinskie",
                          "shpritsy-katetery-sistemy-dlja-infuzij", "meditsinskie-instrumenty"]
    },
    "Приборы медицинские": {
        "url": "/catalog/pribory-meditsinskie",
        "subcategories": ["gljukometry", "ingaljatory-nebulajzery", "termometry", "tonometry"]
    },
}

all_products = []
seen_products = set()

def scrape_page(url, retries=3):
    """Саҳифани юклаб олиш"""
    for i in range(retries):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                return resp.text
            print(f"  ⚠️ HTTP {resp.status_code} for {url}")
        except Exception as e:
            print(f"  ⚠️ Error: {e}")
        time.sleep(1)
    return None

def extract_products(html, category, subcategory=""):
    """HTML дан дориларни ажратиб олиш"""
    soup = BeautifulSoup(html, 'html.parser')
    products = []
    
    # Дори карточкаларини топиш
    # gopharm.uz да дорилар <a> теглари ичида
    for item in soup.select('a[href*="/product/"]'):
        href = item.get('href', '')
        if not href.startswith('/product/'):
            continue
        
        product_id = href.split('/product/')[1].split('/')[0]
        if product_id in seen_products:
            continue
        
        # Расм
        img = item.select_one('img')
        image = img.get('src', '') if img else ''
        
        # Ном — h6 ёки img alt
        name = ''
        h6 = item.select_one('h6')
        if h6:
            name = h6.get_text(strip=True)
        if not name and img:
            name = img.get('alt', '')
        if not name:
            name = product_id.replace('-', ' ').title()
        
        # Нарх
        price_text = ''
        price_elem = item.find(string=re.compile(r'\d+.*сум'))
        if price_elem:
            price_text = price_elem.strip()
        if not price_text:
            parent = item.parent
            if parent:
                price_span = parent.select_one('[class*="price"]')
                if price_span:
                    price_text = price_span.get_text(strip=True)
        
        # Ишлаб чиқарувчи
        manufacturer = ''
        text_blocks = item.select_one('p, span, div')
        if text_blocks:
            txt = text_blocks.get_text(strip=True)
            if txt and 'сум' not in txt:
                manufacturer = txt
        
        seen_products.add(product_id)
        
        products.append({
            "id": product_id,
            "name": name,
            "image": image,
            "url": BASE_URL + href,
            "price": price_text,
            "manufacturer": manufacturer,
            "category": category,
            "subcategory": subcategory,
        })
    
    return products

def scrape_all():
    """Барча категорияларни юклаб олиш"""
    print("=" * 60)
    print("📍 gopharm.uz — Барча маълумотларни юклаб олиш")
    print("=" * 60)
    
    for cat_name, cat_info in CATEGORIES.items():
        print(f"\n📂 {cat_name}")
        
        for subcat in cat_info["subcategories"]:
            url = f"{BASE_URL}/catalog/{subcat}"
            print(f"  📄 {subcat}...", end=" ", flush=True)
            
            html = scrape_page(url)
            if html:
                products = extract_products(html, cat_name, subcat)
                all_products.extend(products)
                print(f"✅ {len(products)} та дори")
            else:
                print("❌ Юклаб олинмади")
            
            time.sleep(0.3)  # Серверга юклама бермаслик учун
    
    print(f"\n{'=' * 60}")
    print(f"📊 Жами: {len(all_products)} та дори")
    print(f"📊 Уникал: {len(seen_products)} та")
    
    # JSON сақлаш
    output = {
        "total": len(all_products),
        "unique": len(seen_products),
        "categories": list(CATEGORIES.keys()),
        "products": all_products,
        "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "source": "https://gopharm.uz",
    }
    
    output_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'gopharm_data.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"💾 Сақланди: {output_path}")
    print(f"📦 Ҳажми: {os.path.getsize(output_path) / 1024:.1f} KB")
    
    return all_products

if __name__ == "__main__":
    scrape_all()
