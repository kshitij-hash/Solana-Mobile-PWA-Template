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

      {/* Footer */}
      <div className="splash-footer">
        <span>Powered by</span>
        <SolanaTextLogo />
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

function SolanaTextLogo() {
  return (
    <svg height="20" viewBox="0 0 646 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M108.53 75.6899L90.81 94.6899C90.4267 95.1026 89.9626 95.432 89.4464 95.6573C88.9303 95.8827 88.3732 95.9994 87.81 95.9999H3.81C3.40937 95.9997 3.01749 95.8827 2.68235 95.6631C2.34722 95.4436 2.08338 95.1311 1.92313 94.7639C1.76288 94.3967 1.71318 93.9908 1.78012 93.5958C1.84706 93.2008 2.02788 92.834 2.3 92.5399L20 73.5765C20.3833 73.1638 20.8474 72.8344 21.3636 72.6091C21.8797 72.3837 22.4368 72.267 23 72.2665H107C107.4 72.2667 107.792 72.3837 108.127 72.6032C108.462 72.8228 108.726 73.1353 108.886 73.5025C109.047 73.8697 109.096 74.2756 109.029 74.6706C108.962 75.0656 108.782 75.4324 108.51 75.7265L108.53 75.6899Z"
        fill="white"
      />
      <path
        d="M108.53 3.00659L90.81 22.0066C90.4282 22.4209 89.9646 22.7519 89.4483 22.9785C88.932 23.2051 88.3743 23.3226 87.81 23.3232H3.81C3.40937 23.3231 3.01749 23.2061 2.68235 22.9865C2.34722 22.767 2.08338 22.4545 1.92313 22.0873C1.76288 21.7201 1.71318 21.3142 1.78012 20.9192C1.84706 20.5242 2.02788 20.1574 2.3 19.8632L20 0.863253C20.3818 0.448947 20.8454 0.117878 21.3617 -0.108726C21.878 -0.33533 22.4357 -0.452789 23 -0.453369H107C107.4 -0.452323 107.791 -0.334685 108.125 -0.114886C108.46 0.104913 108.723 0.417473 108.883 0.784624C109.042 1.15177 109.092 1.55741 109.025 1.95215C108.958 2.3469 108.778 2.71349 108.506 3.00759L108.53 3.00659Z"
        fill="white"
      />
      <path
        d="M2.3 57.04L20 76.04C20.3833 76.4527 20.8474 76.7821 21.3636 77.0074C21.8797 77.2328 22.4368 77.3495 23 77.35H107C107.4 77.3498 107.792 77.2328 108.127 77.0133C108.462 76.7937 108.726 76.4812 108.886 76.114C109.047 75.7468 109.096 75.3409 109.029 74.9459C108.962 74.5509 108.782 74.1841 108.51 73.89L90.81 54.89C90.4267 54.4773 89.9626 54.1479 89.4464 53.9226C88.9303 53.6972 88.3732 53.5805 87.81 53.58H3.81C3.40937 53.5802 3.01749 53.6972 2.68235 53.9167C2.34722 54.1363 2.08338 54.4488 1.92313 54.816C1.76288 55.1832 1.71318 55.5891 1.78012 55.9841C1.84706 56.3791 2.02788 56.7459 2.3 57.04Z"
        fill="white"
      />
      <path
        d="M210.5 73.35C206.5 69.49 204.5 63.87 204.5 56.52V0.0499573H224.85V55.3C224.85 59.1 225.687 61.89 227.36 63.67C229.04 65.4433 231.437 66.33 234.55 66.33C237.663 66.33 240.06 65.4433 241.74 63.67C243.42 61.89 244.26 59.1 244.26 55.3V0.0499573H264.74V56.52C264.74 63.87 262.74 69.49 258.74 73.35C254.74 77.2167 249.167 79.15 242 79.15H227.28C220.033 79.15 214.447 77.2167 210.52 73.35H210.5Z"
        fill="white"
      />
      <path d="M281.43 78V0H301.79V78H281.43Z" fill="white" />
      <path
        d="M370.88 78L352.59 43.91L345.59 52.29V78H325.23V0H345.59V28.96L369.1 0H393.33L364.37 33.51L394.81 78H370.88Z"
        fill="white"
      />
      <path
        d="M454.26 78L449.2 63.28H421.57L416.51 78H394.63L424.55 0H446.35L476.28 78H454.26ZM426.56 47.56H444.12L435.28 21.24L426.56 47.56Z"
        fill="white"
      />
      <path d="M488.67 78V0H509L543.5 48.87V0H563.86V78H543.5L509 29.17V78H488.67Z" fill="white" />
      <path
        d="M633.14 78L628.08 63.28H600.45L595.39 78H573.51L603.43 0H625.23L655.16 78H633.14ZM605.44 47.56H623L614.16 21.24L605.44 47.56Z"
        fill="white"
      />
      <path
        d="M174.94 53.58C181.247 53.58 186.79 51.7 191.57 47.94C196.35 44.1733 199.557 39.2067 201.19 33.04L181.48 28.06C180.833 30.54 179.493 32.5467 177.46 34.08C175.427 35.6067 173.017 36.37 170.23 36.37C166.663 36.37 163.72 35.2167 161.4 32.91C159.08 30.6033 157.92 27.66 157.92 24.08C157.92 20.5 159.08 17.5567 161.4 15.25C163.72 12.9433 166.663 11.79 170.23 11.79C172.97 11.79 175.357 12.5533 177.39 14.08C179.423 15.6 180.787 17.5833 181.48 20.03L201.19 15.12C199.557 8.95333 196.35 4 191.57 0.259995C186.797 -3.48667 181.253 -5.36334 174.94 -5.36334H169.23C161.117 -5.36334 154.187 -2.54334 148.44 3.09666C142.693 8.74333 139.82 15.6 139.82 23.66V24.59C139.82 32.65 142.693 39.5067 148.44 45.16C154.193 50.8067 161.123 53.6267 169.23 53.62L174.94 53.58Z"
        fill="white"
      />
    </svg>
  );
}
