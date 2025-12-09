'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, Send, Settings } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  href: string;
}

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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive ? item.activeIcon : item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
