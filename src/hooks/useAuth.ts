import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (provider: string, name: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  specialization?: string;
  agreeTerms: boolean;
}

const AUTH_KEY = 'pharmlearn_auth';
const USERS_KEY = 'pharmlearn_users';
const DEMO_SEEDED_KEY = 'pharmlearn_demo_seeded';

function getStoredUsers(): Array<{ email: string; password: string; fullName: string; phone?: string; specialization?: string; createdAt: string }> {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function storeUser(user: { email: string; password: string; fullName: string; phone?: string; specialization?: string; createdAt: string }) {
  const users = getStoredUsers();
  // Check if user already exists
  const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (!exists) {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function seedDemoUsers() {
  // Seed only once
  if (localStorage.getItem(DEMO_SEEDED_KEY)) return;

  const demoUsers = [
    { email: 'test@pharmlearn.uz', password: 'test123', fullName: 'Test Foydalanuvchi', phone: '+998901234567', specialization: 'Klinik farmasevt', createdAt: '2025-01-15T08:30:00.000Z' },
    { email: 'ali.valiyev@gmail.com', password: 'SocialLogin2024!', fullName: 'Ali Valiyev', phone: '+998901112233', specialization: 'Dorixona farmasevti', createdAt: '2025-03-10T10:00:00.000Z' },
    { email: 'madina.karimova@mail.uz', password: 'Madina2024!', fullName: 'Madina Karimova', phone: '+998907654321', specialization: 'Klinik farmasevt', createdAt: '2025-02-20T12:00:00.000Z' },
  ];

  const users = getStoredUsers();
  for (const demo of demoUsers) {
    const exists = users.find(u => u.email.toLowerCase() === demo.email.toLowerCase());
    if (!exists) {
      users.push(demo);
    }
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(DEMO_SEEDED_KEY, 'true');
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Seed demo users on first load
    seedDemoUsers();

    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      setIsLoading(false);
      return { success: false, error: 'Bu email bilan foydalanuvchi topilmadi' };
    }

    if (found.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Parol noto\'g\'ri. Qaytadan urinib ko\'ring' };
    }

    const loggedUser: User = {
      id: btoa(found.email),
      fullName: found.fullName,
      email: found.email,
      role: found.specialization || 'Farmasevt',
      joinedAt: found.createdAt,
    };

    setUser(loggedUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
    setIsLoading(false);
    return { success: true };
  };

  const socialLogin = async (provider: string, name: string, email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    // Check if user exists, if not auto-register
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      // Auto-register
      const newUserData = {
        email,
        password: 'SocialLogin2024!',
        fullName: name,
        phone: '',
        specialization: 'Farmasevt',
        createdAt: new Date().toISOString(),
      };
      storeUser(newUserData);

      const loggedUser: User = {
        id: btoa(email),
        fullName: name,
        email,
        role: 'Farmasevt',
        joinedAt: newUserData.createdAt,
      };

      setUser(loggedUser);
      localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
      setIsLoading(false);
      return { success: true };
    }

    // Login existing
    const loggedUser: User = {
      id: btoa(found.email),
      fullName: found.fullName,
      email: found.email,
      role: found.specialization || 'Farmasevt',
      joinedAt: found.createdAt,
    };

    setUser(loggedUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const users = getStoredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    if (exists) {
      setIsLoading(false);
      return { success: false, error: 'Bu email allaqachon ro\'yxatdan o\'tgan' };
    }

    const newUserData = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phone: data.phone,
      specialization: data.specialization,
      createdAt: new Date().toISOString(),
    };

    storeUser(newUserData);

    const loggedUser: User = {
      id: btoa(data.email),
      fullName: data.fullName,
      email: data.email,
      role: data.specialization || 'Farmasevt',
      joinedAt: newUserData.createdAt,
    };

    setUser(loggedUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return {
    user,
    isLoading,
    login,
    register,
    socialLogin,
    logout,
    isAuthenticated: !!user,
  };
}

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
