'use client';

import { useState, useEffect } from 'react';

interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Hook to get safe area insets for handling notches, gesture bars, etc.
 * Returns pixel values for each safe area inset.
 */
export function useSafeArea(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const computeInsets = () => {
      // Create a temporary element to measure CSS env() values
      const testEl = document.createElement('div');
      testEl.style.cssText = `
        position: fixed;
        top: env(safe-area-inset-top);
        bottom: env(safe-area-inset-bottom);
        left: env(safe-area-inset-left);
        right: env(safe-area-inset-right);
        pointer-events: none;
        visibility: hidden;
      `;
      document.body.appendChild(testEl);

      const computed = getComputedStyle(testEl);

      setInsets({
        top: parseInt(computed.top) || 0,
        bottom: parseInt(computed.bottom) || 0,
        left: parseInt(computed.left) || 0,
        right: parseInt(computed.right) || 0,
      });

      document.body.removeChild(testEl);
    };

    computeInsets();

    // Recompute on resize (orientation changes, etc.)
    window.addEventListener('resize', computeInsets);

    // Also listen for orientation changes specifically
    window.addEventListener('orientationchange', computeInsets);

    return () => {
      window.removeEventListener('resize', computeInsets);
      window.removeEventListener('orientationchange', computeInsets);
    };
  }, []);

  return insets;
}

/**
 * Hook to detect if app is running in standalone/PWA mode
 */
export function useStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');

      setIsStandalone(standalone);
    };

    checkStandalone();

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkStandalone);

    return () => {
      mediaQuery.removeEventListener('change', checkStandalone);
    };
  }, []);

  return isStandalone;
}
