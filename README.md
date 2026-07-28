# PharmLearn — Farmasevtlar uchun Premium O'quv Platformasi

![PharmLearn](https://img.shields.io/badge/PharmLearn-v1.0.0-1a6df5?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer)

---

**PharmLearn** — O'zbekistondagi farmasevtlar uchun maxsus ishlab chiqilgan zamonaviy, interaktiv onlayn ta'lim platformasi. Platforma farmatsevtika sohasidagi mutaxassislar, talabalar va stajorlar uchun yuqori sifatli kurslar, ekspert mentorlar va rasmiy sertifikatlar bilan kasbiy rivojlanish imkoniyatini taqdim etadi.

> 🌐 **Til**: O'zbek (lotin) — barcha kontent va interfeys to'liq o'zbek tilida.
> 
> 📍 **Hudud**: O'zbekiston bo'ylab 10,000+ foydalanuvchi.

---

## 📋 Mundarija

- [Loyiha haqida](#-loyiha-haqida)
- [Asosiy xususiyatlar](#-asosiy-xususiyatlar)
- [Texnologik stack](#-texnologik-stack)
- [Loyiha tuzilishi](#-loyiha-tuzilishi)
- [O'rnatish va ishga tushirish](#-ornatish-va-ishga-tushirish)
- [Sahifalar va komponentlar](#-sahifalar-va-komponentlar)
- [Auth tizimi](#-auth-tizimi)
- [Bild olish](#-bild-olish)
- [Litsenziya](#-litsenziya)

---

## 🎯 Loyiha haqida

PharmLearn — bu O'zbekiston farmatsevtika sohasidagi mutaxassislar uchun #1 onlayn ta'lim platformasi. Loyiha quyidagi muammolarni hal qilish uchun yaratilgan:

- ✅ Farmasevtlar uchun o'zbek tilidagi sifatli kontent yetishmasligi
- ✅ Kasbiy malaka oshirish uchun markazlashgan platforma yo'qligi
- ✅ Zamonaviy farmatsevtik bilimlarni olish imkoniyatining cheklanganligi
- ✅ Rasmiy tan olinadigan sertifikatlar olishning murakkabligi
- ✅ Uzoq hududlardagi farmasevtlar uchun ta'lim olish imkoniyatining pastligi

Platforma **200+ kurs**, **50+ ekspert mentor** va **10,000+ faol foydalanuvchi** bilan O'zbekistondagi eng yirik farmatsevtik ta'lim ekotizimi hisoblanadi.

---

## ✨ Asosiy xususiyatlar

| Xususiyat | Tavsifi |
|-----------|---------|
| 🎬 **Interaktiv video darslar** | HD sifatdagi professional video darslar bilan real vaqtda o'qitish |
| 🤖 **AI yordamchi tizim** | Sun'iy intellekt asosidagi shaxsiylashtirilgan ta'lim rejasi va tavsiyalar |
| 🏆 **Rasmiy sertifikatlar** | Davlat va xalqaro tan olinadigan sertifikatlar |
| 👨‍🏫 **Mentor qo'llab-quvvatlashi** | Tajribali farmasevt mentorlar bilan to'g'ridan-to'g'ri aloqa |
| 🔬 **Amaliy laboratoriya** | Virtual laboratoriya muhitida xavfsiz tajribalar |
| 📱 **Mobil ilova** | iOS va Android ilovalar orqali to'liq kirish imkoniyati |
| 📊 **Taraqqiyot tahlili** | Batafsil statistika va vizualizatsiyalar |
| 🌐 **O'zbek tilidagi kontent** | Barcha materiallar o'zbek tilida |
| 🛡️ **Kafolatlangan sifat** | Ekspertlar tomonidan tekshirilgan yuqori sifatli kurslar |

### Narx rejalari

| Reja | Narx | Xususiyatlar |
|------|------|-------------|
| 🆓 **Starter** | Bepul | 5 ta kurs, asosiy darslar, hamjamiyat forumi, mobil ilova |
| ⭐ **Professional** | 79,000 so'm/oy (yillik) | Barcha kurslar, sertifikatlar, mentor qo'llab-quvvatlashi, AI yordamchi |
| 👑 **Enterprise** | 159,000 so'm/oy (yillik) | 4K darslar, shaxsiy mentor, to'liq laboratoriya, ilg'or AI |

---

## 🛠 Texnologik stack

### Frontend

| Texnologiya | Versiya | Vazifasi |
|-------------|---------|----------|
| **React** | 19.2.6 | UI framework |
| **TypeScript** | 5.9.3 | Type-safety |
| **Vite** | 7.3.2 | Build tool |
| **Tailwind CSS** | 4.1.17 | CSS framework |
| **Framer Motion** | 12.42.2 | Animatsiyalar |
| **Lucide React** | 1.27.0 | Ikonkalar |

### Kutubxonalar

| Paket | Vazifasi |
|-------|----------|
| `clsx` + `tailwind-merge` | Class name birlashtirish (`cn()` utility) |
| `vite-plugin-singlefile` | Build natijasini bitta HTML faylga yig'ish |

---

## 📁 Loyiha tuzilishi

```
pharmlearn-uz/
│
├── index.html                 # Asosiy HTML (Google Fonts, meta)
├── package.json               # Dependencies va skriptlar
├── tsconfig.json              # TypeScript konfiguratsiyasi
├── vite.config.ts             # Vite konfiguratsiyasi
│
├── src/
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Root komponent (Router)
│   ├── index.css              # Tailwind + custom CSS
│   │
│   ├── hooks/
│   │   ├── useAuth.ts         # Authentication hook (Context)
│   │   └── useScrollReveal.ts # Scroll animatsiyalar uchun hook
│   │
│   ├── utils/
│   │   └── cn.ts              # Tailwind class merge utility
│   │
│   └── components/
│       ├── Navbar.tsx          # Navigatsiya paneli
│       ├── Hero.tsx            # Landing hero section
│       ├── SocialProof.tsx     # Ijtimoiy isbot (tashkilotlar)
│       ├── Features.tsx        # Imkoniyatlar grid
│       ├── Courses.tsx         # Kurslar kataloglari
│       ├── Benefits.tsx        # Afzalliklar (dark section)
│       ├── Testimonials.tsx    # Fikrlar (testimonials)
│       ├── Pricing.tsx         # Narx rejalari
│       ├── FAQ.tsx             # Tez-tez beriladigan savollar
│       ├── CTA.tsx             # Call-to-action section
│       ├── Footer.tsx          # Footer
│       │
│       └── auth/
│           ├── LoginPage.tsx   # Kirish sahifasi
│           ├── RegisterPage.tsx# Ro'yxatdan o'tish (2-step)
│           └── Dashboard.tsx   # Shaxsiy kabinet
```

---

## 🚀 O'rnatish va ishga tushirish

### Talablar

- **Node.js** >= 18
- **npm** >= 9

### O'rnatish

```bash
# 1. Reponi clone qilish
git clone https://github.com/behruzake77/PharmLearnuz.git
cd PharmLearnuz

# 2. Dependencies o'rnatish
npm install

# 3. Development serverni ishga tushirish
npm run dev
```

Browserda quyidagi manzil ochiladi: [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

Build natijasi `dist/` papkasiga yoziladi — bitta `index.html` fayl (vite-plugin-singlefile orqali barcha CSS va JS inline qilingan).

### Preview

```bash
npm run preview
```

---

## 📄 Sahifalar va komponentlar

### Landing page (Asosiy sahifa)

Landing page quyidagi sectionlardan iborat:

1. **Navbar** — Sticky navigatsiya, login/register tugmalari, mobil menu, foydalanuvchi profili
2. **Hero** — Katta sarlavha, CTA tugmalar, statistika, hero visual
3. **SocialProof** — Hamkor tashkilotlar logotiplari
4. **Features** — 9 ta asosiy imkoniyat kartalari
5. **Courses** — Eng mashhur 3 ta kurs (Farmakologiya, Klinik farmatsiya, Farmatsevtik texnologiya)
6. **Benefits** — Dark section, afzalliklar ro'yxati, statistika
7. **Testimonials** — 6 ta talaba fikrlari
8. **Pricing** — 3 ta tarif rejasi, oylik/yillik toggle
9. **FAQ** — Accordion: 7 ta savol
10. **CTA** — Yakuniy call-to-action
11. **Footer** — To'liq footer (aloqa, havolalar)

### Auth sahifalari

- **LoginPage** — Email/parol orqali kirish, Google/Facebook login, animatsiyalar
- **RegisterPage** — 2 bosqichli ro'yxatdan o'tish:
  - 1-qadam: Shaxsiy ma'lumotlar (ism, email, telefon, mutaxassislik)
  - 2-qadam: Parol o'rnatish (kuch ko'rsatkichi bilan), shartlarga rozilik

### Dashboard

Shaxsiy kabinet quyidagi imkoniyatlarni taqdim etadi:

- Kirish statistikasi (kurslar, darslar, soatlar, seriya)
- Davom etayotgan kurslar (progress bar bilan)
- So'nggi faoliyat feed
- Haftalik o'rganish seriyasi kalendar
- Profil kartasi
- Sidebar navigatsiya
- Qidiruv paneli

---

## 🔐 Auth tizimi

Autentifikatsiya **localStorage** asosida ishlaydi (frontend-only, demo uchun):

### Imkoniyatlari

- **Ro'yxatdan o'tish**: Ism, email, telefon (ixtiyoriy), mutaxassislik (ixtiyoriy), parol
- **Kirish**: Email va parol orqali
- **Chiqish**: Authentifikatsiyani tozalash
- **Sesiya saqlash**: Foydalanuvchi ma'lumotlari localStorage'da saqlanadi

### Auth Hook

```typescript
const { user, isLoading, login, register, logout, isAuthenticated } = useAuth();
```

### Foydalanuvchi interfeysi

```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: string;
  joinedAt: string;
}
```

### Xavfsizlik

- Parol kuchi indikatori (5 daraja)
- Email validatsiyasi
- Parolni tasdiqlash
- "Meni eslab qolish" opsiyasi

> ⚠️ **Eslatma**: Bu demo versiya. Haqiqiy backend ulash uchun `useAuth` hook'ini va backend API bilan almashtirish kerak.

---

## 🏗 Bild olish

Build natijasida `dist/index.html` fayli hosil bo'ladi. Bu bitta fayl bo'lib, barcha CSS va JS inline qilingan. Uni istalgan statik hostingga (Netlify, Vercel, GitHub Pages, yoki oddiy web server) joylashtirish mumkin.

```bash
npm run build
# dist/index.html - tayyor fayl
```

---

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/new-feature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add new feature'`)
4. Branch'ni push qiling (`git push origin feature/new-feature`)
5. Pull Request oching

---

## 📞 Aloqa

- 🌐 **Web**: [pharmlearn.uz](https://pharmlearn.uz)
- 📧 **Email**: info@pharmlearn.uz
- 📞 **Tel**: +998 90 123 45 67
- 📍 **Manzil**: Toshkent, O'zbekiston

---

## ⚖️ Litsenziya

© 2025 PharmLearn. Barcha huquqlar himoyalangan.

---

<p align="center">
  <strong>PharmLearn</strong> — Farmatsevtika bilimingizni yangi bosqichga olib chiqing 🚀
</p>
