'use client';

import { Header } from '@/components/navigation/Header';
import { useStandalone } from '@/hooks/useSafeArea';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Smartphone, Globe, Info, ExternalLink, Download } from 'lucide-react';

export default function SettingsPage() {
  const isStandalone = useStandalone();
  const { isInstallable, promptInstall } = usePWAInstall();

  return (
    <>
      <Header title="Settings" showBack />

      <main className="main-content">
        <div className="space-y-6">
          {/* App Mode */}
          <div className="card">
            <h3 className="font-semibold mb-4">App Mode</h3>
            <div className="flex items-center gap-3">
              {isStandalone ? (
                <>
                  <Smartphone className="text-(--color-secondary)" size={24} />
                  <div>
                    <p className="font-medium">Standalone PWA</p>
                    <p className="text-sm text-(--color-text-secondary)">
                      Running as installed app
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Globe className="text-(--color-primary)" size={24} />
                  <div>
                    <p className="font-medium">Browser Mode</p>
                    <p className="text-sm text-(--color-text-secondary)">Running in web browser</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Network */}
          <div className="card">
            <h3 className="font-semibold mb-4">Network</h3>
            <div className="flex items-center justify-between">
              <span>Solana Devnet</span>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-medium rounded-full">
                Testnet
              </span>
            </div>
          </div>

          {/* About */}
          <div className="card">
            <h3 className="font-semibold mb-4">About</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-(--color-text-secondary)">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--color-text-secondary)">Template</span>
                <span>Solana Mobile PWA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card">
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              <a
                href="https://docs.solanamobile.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 touchable"
              >
                <span>Solana Mobile Docs</span>
                <ExternalLink size={16} className="text-(--color-text-secondary)" />
              </a>
              <a
                href="https://github.com/solana-mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 touchable"
              >
                <span>GitHub</span>
                <ExternalLink size={16} className="text-(--color-text-secondary)" />
              </a>
            </div>
          </div>

          {/* Install Prompt (only in browser mode) */}
          {!isStandalone && (
            <div className="card bg-(--color-primary)/10 border-(--color-primary)/20">
              <div className="flex items-start gap-3">
                <Info className="text-(--color-primary) shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="font-semibold">Install as App</p>
                  <p className="text-sm text-(--color-text-secondary) mt-1">
                    {isInstallable
                      ? 'This app can be installed on your device for a better experience.'
                      : 'Add this app to your home screen for the best experience. Look for "Add to Home Screen" in your browser menu.'}
                  </p>
                  {isInstallable && (
                    <button onClick={promptInstall} className="btn btn-primary mt-3 w-full">
                      <Download size={20} />
                      <span>Install App</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
