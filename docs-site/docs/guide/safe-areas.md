# Safe Areas

Handle device-specific safe areas for notches, rounded corners, and gesture navigation bars.

## What Are Safe Areas?

Modern mobile devices have:
- **Notches** - Camera/sensor cutouts at the top
- **Rounded corners** - Content might be clipped
- **Gesture bars** - Bottom home indicator areas

Safe areas ensure your content isn't hidden behind these elements.

## Viewport Configuration

The template includes proper viewport configuration in `layout.tsx`:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

The `viewport-fit=cover` is required for safe area support.

## CSS Environment Variables

Use CSS `env()` for safe area insets:

```css
.header {
  padding-top: env(safe-area-inset-top, 0px);
}

.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.content {
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}
```

The fallback value (e.g., `0px`) is used on devices without notches.

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

The hook:
- Returns pixel values for each inset
- Updates on resize and orientation change
- Returns `0` for devices without safe areas

## useStandalone Hook

Detect if running as installed PWA:

```tsx
import { useStandalone } from '@/hooks/useSafeArea';

function MyComponent() {
  const isStandalone = useStandalone();

  // Show different UI when installed as PWA
  if (isStandalone) {
    return <FullscreenLayout />;
  }

  return <BrowserLayout />;
}
```

## Common Patterns

### App Layout with Fixed Header/Footer

```css
.app-container {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* Dynamic viewport height */
}

.header {
  flex-shrink: 0;
  padding-top: env(safe-area-inset-top);
}

.content {
  flex: 1;
  overflow-y: auto;
}

.bottom-nav {
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Bottom Sheet / Modal

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  border-radius: 24px 24px 0 0;
}
```

## Testing

### Chrome DevTools

1. Open DevTools (F12)
2. Toggle device toolbar
3. Select a device with notch (iPhone 14)
4. Verify content respects safe areas

### Real Device

1. Deploy to HTTPS
2. Test on iOS and Android devices
3. Check landscape orientation
4. Test with gesture navigation enabled

## Best Practices

1. **Always provide fallbacks** - `env(safe-area-inset-bottom, 0px)`
2. **Use `100dvh`** - Dynamic viewport height respects mobile browser UI
3. **Test both orientations** - Safe areas change in landscape
4. **Don't hardcode values** - Different devices have different insets
