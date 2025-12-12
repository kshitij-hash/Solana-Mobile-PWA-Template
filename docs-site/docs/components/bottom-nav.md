# Bottom Navigation

Mobile-style tab bar navigation.

## Basic Usage

```tsx
import { BottomNav } from '@/components/navigation/BottomNav';

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <BottomNav />
    </>
  );
}
```

## Configuration

Edit items in `src/components/navigation/BottomNav.tsx`:

```tsx
import { Home, Wallet, Send, Settings } from 'lucide-react';

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

## NavItem Interface

```tsx
interface NavItem {
  icon: ReactNode;       // Default icon
  activeIcon?: ReactNode; // Icon when active (optional)
  label: string;         // Text label
  href: string;          // Route path
  badge?: number;        // Optional badge count
}
```

## Adding Badge

Show notification counts:

```tsx
{
  icon: <Bell size={24} />,
  label: 'Alerts',
  href: '/alerts',
  badge: 3, // Shows "3" badge
}
```

```tsx
function NavItem({ item, isActive }) {
  return (
    <Link href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
      <div className="nav-icon-wrapper">
        {isActive ? item.activeIcon || item.icon : item.icon}
        {item.badge && item.badge > 0 && (
          <span className="nav-badge">{item.badge}</span>
        )}
      </div>
      <span className="nav-label">{item.label}</span>
    </Link>
  );
}
```

## Styling

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
  font-weight: 500;
}

.nav-icon-wrapper {
  position: relative;
}

.nav-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  background: var(--color-error);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Safe Area Support

The nav automatically handles safe areas:

```css
.bottom-nav {
  height: calc(56px + var(--sab));
  padding-bottom: var(--sab);
}
```

This adds padding for gesture navigation bars on modern phones.

## Content Padding

Add padding to your content to prevent overlap:

```css
.page-content {
  padding-bottom: calc(56px + var(--sab) + 16px);
}
```

Or use flexbox layout:

```css
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.bottom-nav {
  flex-shrink: 0;
}
```

## Active State Detection

```tsx
'use client';

import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
```

## Animated Active Indicator

Add a sliding indicator:

```tsx
function BottomNav() {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <nav className="bottom-nav">
      <motion.div
        className="active-indicator"
        animate={{ x: `${activeIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {navItems.map((item, index) => (
        <NavItem key={item.href} item={item} isActive={index === activeIndex} />
      ))}
    </nav>
  );
}
```

```css
.active-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%; /* 100% / number of items */
  height: 2px;
  background: var(--color-primary);
}
```

## Hide on Scroll

Hide nav when scrolling down:

```tsx
function BottomNav() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bottom-nav ${visible ? '' : 'hidden'}`}>
      {/* ... */}
    </nav>
  );
}
```

```css
.bottom-nav.hidden {
  transform: translateY(100%);
}
```

## Best Practices

1. **Limit to 4-5 items** - More clutters the UI
2. **Use clear icons** - Recognizable at a glance
3. **Always show labels** - Don't rely on icons alone
4. **48px touch targets** - Accessibility requirement
5. **Highlight active state** - Clear visual feedback
