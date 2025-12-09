'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, showBack = false, rightAction }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="header">
      <div className="flex items-center justify-between w-full h-full">
        {/* Left side - Back button or spacer */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="touchable flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-(--color-surface-elevated)"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        {/* Center - Title */}
        <h1 className="text-lg font-semibold truncate">{title}</h1>

        {/* Right side - Action or spacer */}
        <div className="w-10 flex justify-end">{rightAction}</div>
      </div>
    </header>
  );
}
