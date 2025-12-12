# Safe Areas

Handle device-specific safe areas for notches, rounded corners, and gesture navigation bars.

## What Are Safe Areas?

Modern mobile devices have:
- **Notches** - Camera/sensor cutouts at the top
- **Rounded corners** - Content might be clipped
- **Gesture bars** - Bottom home indicator areas
- **Dynamic Island** - iPhone 14 Pro+ floating notch

Safe areas ensure your content isn't hidden behind these elements.

## CSS Environment Variables

The template uses CSS `env()` for safe areas:

```css
/* src/styles/mobile.css */
:root {
  --sat: env(safe-area-inset-top);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
  --sar: env(safe-area-inset-right);
}
```

## Using Safe Areas

### Header

```css
.header {
  padding-top: calc(16px + var(--sat));
  height: calc(56px + var(--sat));
}
```

### Bottom Navigation

```css
.bottom-nav {
  padding-bottom: var(--sab);
  height: calc(56px + var(--sab));
}
```

### Full-Width Content

```css
.full-width-section {
  padding-left: calc(16px + var(--sal));
  padding-right: calc(16px + var(--sar));
}
```

## Viewport Meta Tag

The template includes proper viewport configuration in `layout.tsx`:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

The `viewport-fit=cover` is essential for safe area support.

## useSafeArea Hook

Get safe area values in JavaScript:

```tsx
import { useSafeArea } from '@/hooks/useSafeArea';

function MyComponent() {
  const { top, bottom, left, right } = useSafeArea();

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      Content respects safe areas
    </div>
  );
}
```

### Hook Implementation

```tsx
// src/hooks/useSafeArea.ts
import { useState, useEffect } from 'react';

export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const style = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(style.getPropertyValue('--sat') || '0'),
        bottom: parseInt(style.getPropertyValue('--sab') || '0'),
        left: parseInt(style.getPropertyValue('--sal') || '0'),
        right: parseInt(style.getPropertyValue('--sar') || '0'),
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
}
```

## Common Patterns

### Scrollable Content with Fixed Header/Footer

```css
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height */
}

.header {
  flex-shrink: 0;
  padding-top: var(--sat);
}

.content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.bottom-nav {
  flex-shrink: 0;
  padding-bottom: var(--sab);
}
```

### Modal/Overlay

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  padding: var(--sat) var(--sar) var(--sab) var(--sal);
}

.modal-content {
  max-height: calc(100vh - var(--sat) - var(--sab) - 48px);
  overflow-y: auto;
}
```

### Bottom Sheet

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: var(--sab);
  border-radius: 24px 24px 0 0;
}
```

## Testing Safe Areas

### Chrome DevTools

1. Open DevTools (F12)
2. Toggle device toolbar
3. Select a device with notch (iPhone 12/13/14)
4. Verify content respects safe areas

### Real Device Testing

1. Deploy to HTTPS URL
2. Test on actual iOS/Android devices
3. Check landscape orientation
4. Test with gesture navigation enabled

## Device-Specific Values

| Device | Top | Bottom |
|--------|-----|--------|
| iPhone 14 Pro | 59px | 34px |
| iPhone 14 | 47px | 34px |
| iPhone SE | 20px | 0px |
| Pixel 7 | 0px | 24px |
| Galaxy S23 | 0px | 24px |

## Best Practices

1. **Always use CSS env()** - Works across all browsers
2. **Provide fallbacks** - `padding: env(safe-area-inset-bottom, 0px)`
3. **Test both orientations** - Safe areas change in landscape
4. **Use dvh units** - `100dvh` respects dynamic viewport
5. **Don't hardcode values** - Different devices have different insets
