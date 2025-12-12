# Animated Components

Framer Motion component library for smooth animations.

## Available Components

| Component | Description |
|-----------|-------------|
| `PageTransition` | Route transition wrapper |
| `AnimatedCard` | Cards with hover/tap effects |
| `AnimatedButton` | Buttons with spring animations |
| `BottomSheet` | Slide-up modal |
| `AnimatedToast` | Toast with enter/exit |
| `AnimatedSpinner` | Loading spinner |
| `Skeleton` | Loading placeholder |
| `AnimatedNumber` | Number counter |
| `Presence` | Conditional animation wrapper |

## PageTransition

Wrap pages for smooth transitions:

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

### Variants

```tsx
<PageTransition variant="fade">     {/* Fade in/out */}
<PageTransition variant="slide">    {/* Slide from right */}
<PageTransition variant="scale">    {/* Scale up */}
```

## AnimatedCard

Interactive cards:

```tsx
import { AnimatedCard } from '@/components/ui/AnimatedComponents';

<AnimatedCard onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | Click handler |
| `delay` | `number` | Animation delay |
| `className` | `string` | Custom class |

## AnimatedButton

Buttons with spring physics:

```tsx
import { AnimatedButton } from '@/components/ui/AnimatedComponents';

<AnimatedButton onClick={handleClick} variant="primary">
  Click Me
</AnimatedButton>
```

### Variants

```tsx
<AnimatedButton variant="primary">Primary</AnimatedButton>
<AnimatedButton variant="secondary">Secondary</AnimatedButton>
<AnimatedButton variant="ghost">Ghost</AnimatedButton>
```

## BottomSheet

Slide-up modal:

```tsx
import { BottomSheet } from '@/components/ui/AnimatedComponents';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Sheet</button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Sheet Title</h2>
        <p>Sheet content</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </BottomSheet>
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Visibility state |
| `onClose` | `() => void` | Close callback |
| `children` | `ReactNode` | Sheet content |

## AnimatedSpinner

Loading indicator:

```tsx
import { AnimatedSpinner } from '@/components/ui/AnimatedComponents';

{isLoading && <AnimatedSpinner size={32} />}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | 24 | Spinner size |
| `color` | `string` | primary | Spinner color |

## Skeleton

Loading placeholders:

```tsx
import { Skeleton } from '@/components/ui/AnimatedComponents';

{isLoading ? (
  <>
    <Skeleton width="100%" height={20} />
    <Skeleton width="60%" height={16} />
  </>
) : (
  <div>{content}</div>
)}
```

### Props

| Prop | Type | Default |
|------|------|---------|
| `width` | `string \| number` | '100%' |
| `height` | `string \| number` | 16 |
| `borderRadius` | `number` | 8 |

## AnimatedNumber

Counter animation:

```tsx
import { AnimatedNumber } from '@/components/ui/AnimatedComponents';

<AnimatedNumber value={balance} decimals={2} prefix="$" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Number to display |
| `decimals` | `number` | 0 | Decimal places |
| `prefix` | `string` | '' | Prefix (e.g., '$') |
| `suffix` | `string` | '' | Suffix (e.g., ' SOL') |
| `duration` | `number` | 0.5 | Animation duration |

## Presence

Conditional animations:

```tsx
import { Presence } from '@/components/ui/AnimatedComponents';

<Presence show={isVisible}>
  <div>This animates in/out</div>
</Presence>
```

## Implementation

```tsx
// src/components/ui/AnimatedComponents.tsx
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition({ children, variant = 'fade' }) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, onClick, delay = 0, className }) {
  return (
    <motion.div
      className={`animated-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function BottomSheet({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bottom-sheet-handle" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

## Best Practices

1. **Don't over-animate** - Subtle is better
2. **Respect reduced motion** - Check `prefers-reduced-motion`
3. **Keep durations short** - 200-300ms for UI
4. **Use spring physics** - More natural feel
5. **Animate opacity + transform** - GPU-accelerated
