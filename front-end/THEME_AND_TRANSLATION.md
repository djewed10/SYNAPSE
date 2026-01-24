# 🌗 Dark/Light Mode & 🌍 Translation System

## Features Implemented

### ✨ Dark/Light Mode
- **Smooth transitions** between themes (300ms cubic-bezier)
- **Persistent storage** - theme preference saved to localStorage
- **System preference detection** - automatically detects user's OS theme
- **No flash on page load** - inline script prevents FOUC (Flash of Unstyled Content)
- **Beautiful toggle button** with sun/moon icons and smooth animation
- **Class-based dark mode** using Tailwind CSS

### 🌐 Multi-Language Support
Languages available:
- 🇬🇧 **English (en)**
- 🇫🇷 **Français (fr)** - Default
- 🇸🇦 **العربية (ar)** - with RTL support

Features:
- **Elegant language selector** with flags and dropdown
- **Persistent storage** - language preference saved
- **RTL support** for Arabic with automatic direction switching
- **Smooth animations** for language selector dropdown
- **Translation keys** for all UI text

## Usage

### Using Dark/Light Mode

```tsx
import { useTheme } from '@/contexts/theme-context';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Using Translations

```tsx
import { useLanguage } from '@/contexts/language-context';

function MyComponent() {
  const { language, setLanguage, t, dir } = useLanguage();
  
  return (
    <div>
      <p>{t('course.biochemistry')}</p>
      <button onClick={() => setLanguage('ar')}>العربية</button>
    </div>
  );
}
```

## Translation Keys

All translation keys are defined in `src/contexts/language-context.tsx`:

### Dashboard
- `courses.count` - "courses" / "Cours" / "دروس"
- `profile` - "Profile" / "Profil" / "الملف الشخصي"
- `theme.toggle` - "Toggle theme" / "Changer le thème" / "تبديل المظهر"

### Buttons
- `button.filter` - "Filter" / "Filtrer" / "تصفية"
- `button.review` - "Review" / "Réviser" / "مراجعة"

### Course Card
- `course.start` - "Start" / "Commencer" / "ابدأ"
- `course.review` - "Review" / "Réviser" / "راجع"
- `course.filter` - "Filter" / "Filtrer" / "تصفية"
- `course.stats` - "Stats" / "Stats" / "إحصائيات"
- `course.layer` - "Layer" / "Couche" / "طبقة"
- `course.progress` - "of" / "sur" / "من"

### Filter Section
- `filter.sources.hyper` - "Highly Testable Sources"
- `filter.sources.medium` - "Moderately Testable Sources"
- `filter.sources.other` - "Other Sources"

## Adding New Translations

1. Open `src/contexts/language-context.tsx`
2. Add your key to all three language objects (en, fr, ar):

```tsx
const translations: Record<Language, Record<string, string>> = {
  en: {
    "my.new.key": "Hello World",
    // ...
  },
  fr: {
    "my.new.key": "Bonjour le monde",
    // ...
  },
  ar: {
    "my.new.key": "مرحبا بالعالم",
    // ...
  },
};
```

3. Use it in your component:

```tsx
const { t } = useLanguage();
<p>{t('my.new.key')}</p>
```

## Styling Guidelines

### Dark Mode Classes

Use Tailwind's dark mode variant:

```tsx
<div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
  Content
</div>
```

### Smooth Transitions

Add `transition-colors duration-300` for smooth theme transitions:

```tsx
<button className="bg-white dark:bg-gray-800 transition-colors duration-300">
  Button
</button>
```

### Common Color Patterns

- **Backgrounds**: `bg-white dark:bg-gray-950`
- **Cards**: `bg-gray-50 dark:bg-gray-900`
- **Borders**: `border-gray-300 dark:border-white/20`
- **Text**: `text-gray-900 dark:text-white`
- **Muted text**: `text-gray-500 dark:text-white/60`

## Components Updated

All components now support dark mode and translations:

1. ✅ **DashboardHeader** - Theme toggle with icons
2. ✅ **ActionButtons** - Translated labels
3. ✅ **CourseCard** - Full dark mode + translations
4. ✅ **FilterSection** - Animated hover effects
5. ✅ **LanguageSelector** - New component for language switching

## Architecture

### Context Providers

```
ThemeProvider
  └─ LanguageProvider
      └─ DrawerProvider
          └─ AuthProvider
              └─ QueryProvider
                  └─ Your App
```

### Theme System
- **ThemeContext** (`src/contexts/theme-context.tsx`)
- **ThemeProvider** wraps the app in `layout.tsx`
- **useTheme** hook for components

### Translation System
- **LanguageContext** (`src/contexts/language-context.tsx`)
- **LanguageProvider** wraps the app in `layout.tsx`
- **useLanguage** hook for components
- **RTL Support** automatic direction switching

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ Respects system preferences
- ✅ LocalStorage for persistence

## Performance

- **No flash on load** - inline script sets theme before render
- **Smooth animations** - GPU-accelerated transitions
- **Minimal re-renders** - Context API with proper memoization
- **CSS transitions** - All theme changes use CSS, not JS

## Future Enhancements

Ideas for further improvements:
- Add more languages (Spanish, German, etc.)
- Theme customization (custom colors)
- High contrast mode
- Font size preferences
- Animation speed controls

---

**Happy coding! 🚀**
