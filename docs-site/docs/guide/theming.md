# Theming

Customize the look and feel of your Solana Mobile PWA.

## CSS Variables

Edit `src/styles/mobile.css` to change theme colors:

```css
:root {
  /* Primary brand color */
  --color-primary: #9945ff;
  --color-primary-dark: #7c3acd;

  /* Accent color */
  --color-secondary: #14f195;

  /* Background colors */
  --color-background: #0d0d0d;
  --color-surface: #1a1a1a;
  --color-surface-elevated: #242424;

  /* Text colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;

  /* Border color */
  --color-border: #333333;

  /* Status colors */
  --color-success: #14f195;
  --color-error: #ff4444;
  --color-warning: #ffaa00;
}
```

## Light Mode

Support automatic light/dark mode:

```css
@media (prefers-color-scheme: light) {
  :root {
    --color-background: #ffffff;
    --color-surface: #f5f5f5;
    --color-surface-elevated: #ebebeb;
    --color-text-primary: #0d0d0d;
    --color-text-secondary: #666666;
    --color-border: #e0e0e0;
  }
}
```

## Using Theme Variables

### In CSS

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.card-subtitle {
  color: var(--color-text-secondary);
}
```

### In Tailwind

Configure `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
      },
    },
  },
};
```

Then use in components:

```tsx
<div className="bg-surface text-primary">
  Themed content
</div>
```

## Button Styles

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  transition: transform 0.2s, opacity 0.2s;
}

.btn-primary:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 12px 24px;
}
```

## Card Styles

```css
.card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid var(--color-border);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

## Gradients

Create branded gradients:

```css
.gradient-primary {
  background: linear-gradient(135deg, #9945ff 0%, #14f195 100%);
}

.gradient-solana {
  background: linear-gradient(90deg, #9945ff 0%, #14f195 50%, #00c2ff 100%);
}

.text-gradient {
  background: linear-gradient(135deg, #9945ff 0%, #14f195 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Typography

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Courier New', monospace;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
}

.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; }
```

## Animations

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}

.animate-fade-in {
  animation: fadeIn var(--transition-normal) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-slide-up {
  animation: slideUp var(--transition-normal) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Touch Targets

Maintain accessibility with minimum touch sizes:

```css
:root {
  --touch-target-min: 48px;
}

.touch-target {
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  display: flex;
  align-items: center;
  justify-content: center;
}

button, a {
  min-height: var(--touch-target-min);
}
```

## Theme Switching (Optional)

Implement manual theme switching:

```tsx
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return { theme, toggle };
}
```

```css
[data-theme="light"] {
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  /* ... light colors */
}

[data-theme="dark"] {
  --color-background: #0d0d0d;
  --color-surface: #1a1a1a;
  /* ... dark colors */
}
```
