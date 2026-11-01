export type Theme = 'light' | 'dark';

export function resolveTheme(savedTheme: string | null, prefersDark: boolean): Theme {
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return prefersDark ? 'dark' : 'light';
}

export function toggleThemeValue(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light';
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveTheme(saved, prefersDark);
  } catch {
    return 'light';
  }
}

export function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}
