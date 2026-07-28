/**
 * PharmLearn Admin — Ma'lumotlar bazasi (localStorage)
 * Banerlar, yangiliklar, platforma sozlamalari
 */

// ========== BANNERLAR ==========
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  bgColor: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

const BANNERS_KEY = 'pharmlearn_banners';
const DEFAULT_BANNERS: Banner[] = [
  {
    id: 'banner_1',
    title: "PharmLearn'da o'qishni boshlang!",
    subtitle: "200+ kurs",
    description: "Farmatsevtika bilimingizni yangi bosqichga olib chiqing",
    imageUrl: '',
    linkUrl: '#courses',
    bgColor: 'from-primary-600 to-emerald-600',
    isActive: true,
    order: 0,
    createdAt: '2025-01-01',
  },
  {
    id: 'banner_2',
    title: 'Haftaning eng yaxshi kurslari',
    subtitle: "30% chegirma",
    description: "Farmakologiya asoslari va klinik farmatsiya",
    imageUrl: '',
    linkUrl: '#courses',
    bgColor: 'from-purple-600 to-pink-600',
    isActive: true,
    order: 1,
    createdAt: '2025-01-01',
  },
];

export function getBanners(): Banner[] {
  try {
    const data = localStorage.getItem(BANNERS_KEY);
    return data ? JSON.parse(data) : DEFAULT_BANNERS;
  } catch { return DEFAULT_BANNERS; }
}

export function saveBanner(banner: Banner): void {
  const banners = getBanners();
  const idx = banners.findIndex(b => b.id === banner.id);
  if (idx >= 0) banners[idx] = banner;
  else banners.push(banner);
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
}

export function deleteBanner(id: string): void {
  const banners = getBanners().filter(b => b.id !== id);
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
}

export function reorderBanners(ids: string[]): void {
  const banners = getBanners();
  const ordered = ids.map((id, i) => {
    const b = banners.find(b => b.id === id);
    if (b) { b.order = i; return b; }
    return null;
  }).filter(Boolean) as Banner[];
  localStorage.setItem(BANNERS_KEY, JSON.stringify(ordered));
}

// ========== YANGILIKLAR ==========
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'yangilik' | 'e\'lon' | 'maqola' | 'video' | 'chegirma';
  imageUrl: string;
  isPinned: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const NEWS_KEY = 'pharmlearn_news';
const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news_1',
    title: "PharmLearn — farmasevtlar uchun yangi platforma!",
    summary: "O'zbekistondagi farmasevtlar uchun maxsus onlayn ta'lim platformasi ishga tushdi",
    content: "PharmLearn — bu O'zbekistondagi farmasevtlar uchun yaratilgan birinchi onlayn ta'lim platformasi. Platformada 200+ kurs, 50+ ekspert mentor va AI yordamchi mavjud.",
    category: 'yangilik',
    imageUrl: '',
    isPinned: true,
    isPublished: true,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
    views: 1240,
  },
  {
    id: 'news_2',
    title: "Farmakologiya asoslari — yangi kurs!",
    summary: "12 modul, 48 dars va sertifikat bilan yangi kurs qo'shildi",
    content: "Farmakologiya asoslari kursi 12 modul va 48 darsdan iborat. Kurs yakunida rasmiy sertifikat beriladi.",
    category: 'e\'lon',
    imageUrl: '',
    isPinned: false,
    isPublished: true,
    createdAt: '2025-02-01',
    updatedAt: '2025-02-01',
    views: 890,
  },
];

export function getNews(): NewsItem[] {
  try {
    const data = localStorage.getItem(NEWS_KEY);
    return data ? JSON.parse(data) : DEFAULT_NEWS;
  } catch { return DEFAULT_NEWS; }
}

export function getPublishedNews(): NewsItem[] {
  return getNews().filter(n => n.isPublished);
}

export function saveNews(item: NewsItem): void {
  const items = getNews();
  const idx = items.findIndex(n => n.id === item.id);
  if (idx >= 0) items[idx] = item;
  else items.push(item);
  localStorage.setItem(NEWS_KEY, JSON.stringify(items));
}

export function deleteNews(id: string): void {
  const items = getNews().filter(n => n.id !== id);
  localStorage.setItem(NEWS_KEY, JSON.stringify(items));
}

export function incrementNewsViews(id: string): void {
  const items = getNews();
  const item = items.find(n => n.id === id);
  if (item) { item.views++; localStorage.setItem(NEWS_KEY, JSON.stringify(items)); }
}

// ========== ADMIN AUTH ==========
const ADMIN_KEY = 'pharmlearn_admin_logged';

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}

export function adminLogin(password: string): boolean {
  const masterKey = (window as any).__env?.PHARMLEARN_ADMIN_KEY ||
    import.meta.env.VITE_PHARMLEARN_ADMIN_KEY || 'admin123';
  if (password === masterKey) {
    localStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(ADMIN_KEY);
}

// ========== PLATFORM STATS ==========
export function getPlatformStats() {
  const news = getNews();
  const banners = getBanners();
  return {
    totalNews: news.length,
    publishedNews: news.filter(n => n.isPublished).length,
    totalBanners: banners.length,
    activeBanners: banners.filter(b => b.isActive).length,
    totalViews: news.reduce((sum, n) => sum + n.views, 0),
    pinnedItems: news.filter(n => n.isPinned).length,
  };
}

// ========== PLATFORM SOZLAMALARI ==========
export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: { telegram: string; instagram: string; facebook: string };
  maintenance: boolean;
  maintenanceMessage: string;
}

const SETTINGS_KEY = 'pharmlearn_settings';
const DEFAULT_SETTINGS: PlatformSettings = {
  siteName: 'PharmLearn',
  siteDescription: "Farmasevtlar uchun #1 o'quv platformasi",
  contactEmail: 'info@pharmlearn.uz',
  contactPhone: '+998 90 123 45 67',
  address: 'Toshkent, O\'zbekiston',
  socialLinks: { telegram: 'https://t.me/pharmlearn', instagram: 'https://instagram.com/pharmlearn', facebook: 'https://facebook.com/pharmlearn' },
  maintenance: false,
  maintenanceMessage: 'Platformada texnik ishlar olib borilmoqda',
};

export function getSettings(): PlatformSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
}

export function saveSettings(settings: PlatformSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
