'use client';

import { useEffect, useState } from 'react';
import '@/styles/splash.css';

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export function SplashScreen({ onComplete, minDisplayTime = 1500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Detect if running as standalone PWA/TWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ||
      document.referrer.includes('android-app://');

    // For standalone mode, show splash longer for smooth transition from native splash
    const displayTime = isStandalone ? minDisplayTime : 800;

    const timer = setTimeout(() => {
      setIsFading(true);
      // Wait for fade animation to complete
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 300);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  if (!isVisible) return null;

  return (
    <div id="splash" className={isFading ? 'fade-out' : ''}>
      <div className="splash-bg" />

      <div className="splash-content">
        {/* Logo */}
        <div className="splash-logo">
          <SolanaLogo />
        </div>

        {/* App Name */}
        <h1 className="splash-title">Solana PWA</h1>

        {/* Loading dots */}
        <div className="splash-loader">
          <div className="splash-loader-dot" />
          <div className="splash-loader-dot" />
          <div className="splash-loader-dot" />
        </div>
      </div>

    </div>
  );
}

function SolanaLogo() {
  return (
    <svg viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill="url(#paint2_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="360.879"
          y1="-37.4553"
          x2="141.213"
          y2="383.294"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="264.829"
          y1="-87.6014"
          x2="45.163"
          y2="333.147"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="312.548"
          y1="-62.6882"
          x2="92.8822"
          y2="358.061"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

