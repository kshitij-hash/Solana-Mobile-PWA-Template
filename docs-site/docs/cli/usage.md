# CLI Usage

Create new Solana Mobile PWA projects with a single command.

## Quick Start

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

## Installation

The CLI is available via npx (no installation required):

```bash
npx create-solana-pwa <project-name>
```

Or install globally:

```bash
npm install -g create-solana-pwa
create-solana-pwa my-dapp
```

## What It Does

1. Creates project directory
2. Clones the template from GitHub
3. Updates configuration with your project name
4. Installs dependencies
5. Initializes git repository

## Interactive Mode

Run without arguments for prompts:

```bash
npx create-solana-pwa
```

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   create-solana-pwa                                   ║
║   Solana Mobile PWA Template                          ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

? Project name: my-awesome-dapp
```

## Generated Structure

```
my-dapp/
├── src/
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   └── hooks/                  # Custom hooks
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── icons/                  # App icons
│   └── .well-known/            # Asset links
├── twa/                        # TWA configuration
│   ├── twa-manifest.template.json
│   ├── CustomLauncherActivity.java
│   └── scripts/
│       ├── init-twa.sh         # First-time TWA setup
│       └── build-twa.sh        # Rebuild TWA
├── package.json
└── README.md
```

## After Creation

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Build TWA (Android App)

```bash
cd twa
./scripts/init-twa.sh
```

The init script will prompt for app name, package ID, and host URL, then build your APK.

## Example Workflow

```bash
# 1. Create project
npx create-solana-pwa my-defi-app --network devnet

# 2. Start development
cd my-defi-app
npm run dev

# 3. Customize your app
# - Edit src/app/page.tsx
# - Update public/manifest.json

# 4. Deploy PWA to Vercel/Netlify
npm run build

# 5. Build Android app
cd twa
./scripts/init-twa.sh

# 6. Test APK
adb install app-release-signed.apk
```

## Troubleshooting

### "Directory already exists"

```bash
rm -rf my-dapp
npx create-solana-pwa my-dapp
```

### "Failed to clone template"

Check internet connection and try again, or clone manually:

```bash
git clone https://github.com/kshitij-hash/Solana-Mobile-PWA-Template.git my-dapp
cd my-dapp
rm -rf cli docs-site .git
npm install
```

### "npm install failed"

```bash
cd my-dapp
npm install --legacy-peer-deps
```

## Links

- [npm](https://www.npmjs.com/package/create-solana-pwa)
- [GitHub](https://github.com/kshitij-hash/Solana-Mobile-PWA-Template)
- [Demo](https://solana-pwa-template.vercel.app)
