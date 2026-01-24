# 🚀 Quick Start Guide - Dark Mode & Translations

## 1-Minute Setup

Your application now has:
- ✅ Dark/Light mode toggle
- ✅ 3 Languages (EN, FR, AR)
- ✅ Smooth animations
- ✅ Persistent preferences

## Where to Find Features

### Theme Toggle Button
**Location:** Top-right of the header  
**Look for:** Sun ☀️ / Moon 🌙 button  
**Click to:** Switch between light and dark themes

### Language Selector
**Location:** Top-right corner, above the header  
**Look for:** Flag button (🇫🇷 FR by default)  
**Click to:** Open language dropdown and select your language

## Quick Test

1. **Open the app** in your browser
2. **Find the theme button** (sun/moon icon in header)
3. **Click it** - watch everything smoothly transition!
4. **Find the language selector** (flag at top-right)
5. **Try Arabic** - watch the layout flip to RTL!
6. **Refresh the page** - your preferences are saved!

## Code Examples

### Use Theme in Your Components
```tsx
import { useTheme } from '@/contexts/theme-context';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-900">
      <button onClick={toggleTheme}>
        Current: {theme}
      </button>
    </div>
  );
}
```

### Use Translations in Your Components
```tsx
import { useLanguage } from '@/contexts/language-context';

function MyComponent() {
  const { t, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('course.biochemistry')}</h1>
      <button onClick={() => setLanguage('ar')}>
        Switch to Arabic
      </button>
    </div>
  );
}
```

## Add New Translation Keys

1. Open `src/contexts/language-context.tsx`
2. Find the `translations` object
3. Add your key to all three languages:

```tsx
en: {
  "my.key": "Hello",
  // ...
},
fr: {
  "my.key": "Bonjour",
  // ...
},
ar: {
  "my.key": "مرحبا",
  // ...
}
```

4. Use it: `{t('my.key')}`

## Styling for Dark Mode

Always add both light and dark variants:

```tsx
// ✅ Good
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// ❌ Bad (only works in one mode)
<div className="bg-white text-black">
```

## Common Patterns

### Buttons
```tsx
className="bg-gray-100 dark:bg-gray-800 
           hover:bg-gray-200 dark:hover:bg-gray-700 
           transition-all duration-300"
```

### Cards
```tsx
className="bg-gray-50 dark:bg-gray-900 
           border border-gray-300 dark:border-white/20
           transition-colors duration-300"
```

### Text
```tsx
className="text-gray-900 dark:text-white"           // Primary text
className="text-gray-600 dark:text-white/80"        // Secondary text
className="text-gray-400 dark:text-white/60"        // Muted text
```

## Troubleshooting

### Theme not persisting?
- Check browser localStorage is enabled
- Clear cache and reload

### Language not changing?
- Ensure you're using the `t()` function
- Check the key exists in all languages

### Flashing on page load?
- The inline script in layout.tsx should prevent this
- Make sure it's before the body content

## Files Reference

| Purpose | File |
|---------|------|
| Theme logic | `src/contexts/theme-context.tsx` |
| Translation logic | `src/contexts/language-context.tsx` |
| Language selector UI | `src/components/dashboard/LanguageSelector.tsx` |
| Theme toggle UI | `src/components/dashboard/Header.tsx` |
| Tailwind config | `tailwind.config.ts` |
| Global styles | `src/styles/globals.css` |

## Support

- 📖 Full documentation: `THEME_AND_TRANSLATION.md`
- 🎨 Visual guide: `VISUAL_FEATURES.md`
- 📋 This summary: `IMPLEMENTATION_SUMMARY.md`

---

**Everything is ready to use! Start toggling! 🎉**
