# Navigation

Configure the mobile-optimized navigation components.

## Bottom Navigation

The template includes a mobile-style bottom navigation bar.

### Configuration

Edit `src/components/navigation/BottomNav.tsx`:

```tsx
const navItems: NavItem[] = [
  {
    icon: <Home size={24} strokeWidth={1.5} />,
    activeIcon: <Home size={24} strokeWidth={2} />,
    label: 'Home',
    href: '/',
  },
  {
    icon: <Wallet size={24} strokeWidth={1.5} />,
    activeIcon: <Wallet size={24} strokeWidth={2} />,
    label: 'Wallet',
    href: '/wallet',
  },
  {
    icon: <Send size={24} strokeWidth={1.5} />,
    activeIcon: <Send size={24} strokeWidth={2} />,
    label: 'Send',
    href: '/send',
  },
  {
    icon: <Settings size={24} strokeWidth={1.5} />,
    activeIcon: <Settings size={24} strokeWidth={2} />,
    label: 'Settings',
    href: '/settings',
  },
];
```

### Adding Items

```tsx
import { Bell } from 'lucide-react';

// Add to navItems array
{
  icon: <Bell size={24} strokeWidth={1.5} />,
  activeIcon: <Bell size={24} strokeWidth={2} />,
  label: 'Alerts',
  href: '/alerts',
}
```

### Styling

```css
/* src/styles/mobile.css */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(56px + var(--sab));
  padding-bottom: var(--sab);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 48px;
  padding: 4px 12px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-item.active {
  color: var(--color-primary);
}

.nav-label {
  font-size: 12px;
  margin-top: 2px;
}
```

## Header

### Basic Usage

```tsx
import { Header } from '@/components/navigation/Header';

export default function WalletPage() {
  return (
    <>
      <Header title="Wallet" showBack />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Page title |
| `showBack` | boolean | false | Show back button |
| `rightAction` | ReactNode | - | Custom right element |

### With Right Action

```tsx
<Header
  title="Settings"
  rightAction={
    <button onClick={handleSave}>
      Save
    </button>
  }
/>
```

### Styling

```css
.header {
  position: sticky;
  top: 0;
  height: calc(56px + var(--sat));
  padding-top: var(--sat);
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  z-index: 50;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  text-align: center;
}

.back-button {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -12px;
}
```

## Page Transitions

Use the PageTransition component for smooth navigation:

```tsx
import { PageTransition } from '@/components/ui/AnimatedComponents';

export default function MyPage() {
  return (
    <PageTransition>
      <div>Page content</div>
    </PageTransition>
  );
}
```

### Transition Types

```tsx
// Fade (default)
<PageTransition type="fade">

// Slide from right
<PageTransition type="slide">

// Scale
<PageTransition type="scale">
```

## Tab Navigation (Alternative)

For pages with tabs instead of bottom nav:

```tsx
function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

```css
.tab-nav {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tab {
  flex: 1;
  min-width: max-content;
  padding: 12px 16px;
  border: none;
  background: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.tab.active {
  color: var(--color-primary);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
}
```

## Best Practices

1. **Limit nav items to 4-5** - More clutters the UI
2. **Use clear icons** - Recognizable at a glance
3. **Show labels** - Don't rely on icons alone
4. **Highlight active state** - Users should know where they are
5. **Respect safe areas** - Bottom nav must account for gesture bars
6. **48px touch targets** - Minimum for accessibility
