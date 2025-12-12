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

1. **Creates project directory**
2. **Clones the template** from GitHub
3. **Updates configuration** with your project name
4. **Installs dependencies**
5. **Initializes git** repository

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
│   ├── hooks/                  # Custom hooks
│   └── styles/                 # CSS files
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── icons/                  # App icons
│   └── .well-known/            # Asset links
├── twa/                        # TWA configuration
│   ├── twa-manifest.json
│   ├── CustomLauncherActivity.java
│   └── scripts/build-twa.sh
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

### Build TWA

```bash
cd twa
bubblewrap init --manifest https://your-deployed-url.com/manifest.json
bubblewrap build
```

## Example Workflow

```bash
# 1. Create project
npx create-solana-pwa my-defi-app --network devnet

# 2. Enter directory
cd my-defi-app

# 3. Start development
npm run dev

# 4. Customize app
# - Edit src/app/page.tsx
# - Update public/manifest.json
# - Add your features

# 5. Deploy PWA
npm run build
# Deploy to Vercel, Netlify, etc.

# 6. Build Android app
cd twa
bubblewrap init --manifest https://my-defi-app.vercel.app/manifest.json
bubblewrap build

# 7. Test APK
adb install app-release-signed.apk
```

## Troubleshooting

### "Directory already exists"

```bash
# Remove existing directory
rm -rf my-dapp

# Or use a different name
npx create-solana-pwa my-dapp-v2
```

### "Failed to clone template"

Check internet connection, then try again:

```bash
npx create-solana-pwa my-dapp
```

Or clone manually:

```bash
git clone https://github.com/kshitij-hash/Solana-Mobile-PWA-Template.git my-dapp
cd my-dapp
npm install
```

### "npm install failed"

```bash
cd my-dapp
npm install --legacy-peer-deps
```

## Help

```bash
npx create-solana-pwa --help
```

## Links

- **npm:** [npmjs.com/package/create-solana-pwa](https://www.npmjs.com/package/create-solana-pwa)
- **GitHub:** [github.com/kshitij-hash/Solana-Mobile-PWA-Template](https://github.com/kshitij-hash/Solana-Mobile-PWA-Template)
- **Demo:** [solana-pwa-template.vercel.app](https://solana-pwa-template.vercel.app)
