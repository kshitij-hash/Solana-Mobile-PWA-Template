# Toast Notifications

Display brief messages to users.

## Basic Usage

```tsx
import { Toast, useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast, toastProps } = useToast();

  const handleAction = () => {
    showToast('Action completed!', 'success');
  };

  return (
    <>
      <button onClick={handleAction}>Do Action</button>
      <Toast {...toastProps} />
    </>
  );
}
```

## Toast Types

```tsx
// Success
showToast('Transaction confirmed!', 'success');

// Error
showToast('Transaction failed', 'error');

// Warning
showToast('Low balance', 'warning');

// Info (default)
showToast('Wallet connected');
```

## useToast Hook

```tsx
const {
  showToast,  // (message, type?, duration?) => void
  hideToast,  // () => void
  toastProps, // Props to spread on Toast component
} = useToast();
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | - | Toast message |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | 'info' | Toast variant |
| `duration` | `number` | 3000 | Auto-hide delay (ms) |
| `visible` | `boolean` | false | Visibility state |
| `onClose` | `() => void` | - | Close callback |

## Implementation

```tsx
// src/components/ui/Toast.tsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
}

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

export function Toast({ message, type = 'info', visible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`toast toast-${type}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <span className="toast-icon">{icons[type]}</span>
          <span className="toast-message">{message}</span>
          <button className="toast-close" onClick={onClose}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useToast() {
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as ToastType,
    visible: false,
  });

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 3000) => {
      setToast({ message, type, visible: true });

      if (duration > 0) {
        setTimeout(() => {
          setToast((prev) => ({ ...prev, visible: false }));
        }, duration);
      }
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return {
    showToast,
    hideToast,
    toastProps: {
      ...toast,
      onClose: hideToast,
    },
  };
}
```

## Styling

```css
.toast {
  position: fixed;
  bottom: calc(72px + var(--sab));
  left: 16px;
  right: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.toast-success {
  background: #14f195;
  color: #0d0d0d;
}

.toast-error {
  background: #ff4444;
  color: white;
}

.toast-warning {
  background: #ffaa00;
  color: #0d0d0d;
}

.toast-info {
  background: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  flex-shrink: 0;
  padding: 4px;
  background: none;
  border: none;
  opacity: 0.7;
  cursor: pointer;
}
```

## Global Toast Provider

For app-wide access:

```tsx
// src/contexts/ToastContext.tsx
import { createContext, useContext } from 'react';
import { Toast, useToast } from '@/components/ui/Toast';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function ToastProvider({ children }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast {...toast.toastProps} />
    </ToastContext.Provider>
  );
}

export function useGlobalToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useGlobalToast must be used within ToastProvider');
  }
  return context;
}
```

Usage:

```tsx
// In any component
import { useGlobalToast } from '@/contexts/ToastContext';

function MyComponent() {
  const { showToast } = useGlobalToast();

  return (
    <button onClick={() => showToast('Hello!', 'success')}>
      Show Toast
    </button>
  );
}
```

## Transaction Toasts

```tsx
async function sendTransaction() {
  showToast('Sending transaction...', 'info', 0); // No auto-hide

  try {
    const signature = await wallet.sendTransaction(tx, connection);
    showToast('Transaction sent!', 'info');

    await connection.confirmTransaction(signature);
    showToast('Transaction confirmed!', 'success');
  } catch (error) {
    showToast('Transaction failed', 'error');
  }
}
```

## Best Practices

1. **Keep messages brief** - 1-2 sentences max
2. **Use appropriate types** - Match message severity
3. **Don't stack toasts** - Show one at a time
4. **Allow dismissal** - Users can close manually
5. **Position above nav** - Don't overlap bottom navigation
